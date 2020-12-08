import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input, OnChanges, OnDestroy,
  OnInit,
  Output, SimpleChanges, TemplateRef,
  ViewChild
} from '@angular/core';
import {SearchFacetModel} from '../../models/search-facet-model';
import {SelectedRange} from '../models/selected-range';
import {SearchRangeFacetGroupModel} from '../models/search-range-facet-group-model';
import {debounce} from 'rxjs/operators';
import {interval} from 'rxjs';
import {SearchFacetSelection} from '../../models/search-facet-selection';

@Component({
  selector: 'onto-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input()
  public data: SearchRangeFacetGroupModel;
  @Input()
  public facetTemplate: TemplateRef<any>;

  @ViewChild('slider')
  public slider: ElementRef;
  @ViewChild('minSlider')
  public minSlider: ElementRef;
  @ViewChild('maxSlider')
  public maxSlider: ElementRef;

  public _selectionChange: EventEmitter<SearchFacetSelection> = new EventEmitter<SearchFacetSelection>();

  // Add debounce of 2 s, as the event is emitted on every input change (drag of slider)
  @Output()
  public selectionChange = this._selectionChange.pipe(debounce(() => interval(2000)));

  @HostListener('window:resize')
  onResize(): void {}

  private facetData: SearchFacetModel[];
  public sum: number;

  // Size of the circle range slider button.
  // It is used so that the both circles can hit each other without overlapping.
  private rangeCircleSize = 14;
  public minValue;
  public maxValue;
  public selectedMin;
  public selectedMax;
  public minElement;
  public maxElement;

  ngOnInit(): void {
    this.initializeData();
  }

  public ngAfterViewInit(): void {
    this.minElement = this.minSlider.nativeElement;
    this.maxElement = this.maxSlider.nativeElement;

    this.init(this.selectedMin, this.selectedMax);
    this.onResize = (): void => this.update(this.parseInt(this.maxElement.getAttribute('max')));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes?.data?.currentValue) {
      this.initializeData();
      this.init(this.selectedMin, this.selectedMax);
    }
  }

  private initializeData(): void {
    this.facetData = [...this.data.facetGroupData];
    this.facetData.sort((a, b) => {
      try {
        return this.parseInt(a.label) - this.parseInt(b.label);
      } catch (e) {
        throw new Error('Facet labels must represent numbers! ' + e.message);
      }
    });

    this.minValue = this.facetData[0].label;
    this.maxValue = this.facetData[this.facetData.length - 1].label;

    this.selectedMin = this.data.selectedRange?.start || this.minValue;
    this.selectedMax = this.data.selectedRange?.end || this.maxValue;

    this.sum = this.sumRange();
  }

  draw(splitvalue: number): void {
    const thumbsize: any = this.parseInt(this.slider.nativeElement.getAttribute('data-thumbsize'));
    const rangewidth = this.slider.nativeElement.clientWidth;

    const rangemin = this.parseInt(this.slider.nativeElement.getAttribute('data-rangemin'));
    const rangemax = this.parseInt(this.slider.nativeElement.getAttribute('data-rangemax'));

    this.minElement.setAttribute('max', splitvalue);
    this.maxElement.setAttribute('min', splitvalue);

    this.minElement.style.width = this.parseInt(thumbsize + ((splitvalue - rangemin) / (rangemax - rangemin)) * (rangewidth - (2 * thumbsize))) + 'px';
    this.maxElement.style.width = this.parseInt(thumbsize + ((rangemax - splitvalue) / (rangemax - rangemin)) * (rangewidth - (2 * thumbsize))) + 'px';
    this.minElement.style.left = '0px';
    this.maxElement.style.left = this.parseInt(this.minElement.style.width) + 'px';

    // correct for 1 off at the end of the max slider
    if (this.maxElement.value > (rangemax - 1)) {
      this.maxElement.setAttribute('data-value', rangemax);
    }

    this.maxElement.value = this.maxElement.getAttribute('data-value');
    this.minElement.value = this.minElement.getAttribute('data-value');
  }

  init(min: any, max: any): void {
    if (!(this.minElement && this.maxElement)) {
      return;
    }
    this.minElement.removeEventListener('input', () => this.update);
    this.maxElement.removeEventListener('input', () => this.update);

    const rangemin: any = this.parseInt(this.minValue);
    const rangemax: any = this.parseInt(this.maxValue);

    const selectedMin = this.parseInt(min) || rangemin;
    const selectedMax = this.parseInt(max) || rangemax;

    const avgvalue = (selectedMin + selectedMax) / 2;

    this.minElement.setAttribute('data-value', selectedMin);
    this.maxElement.setAttribute('data-value', selectedMax);

    this.slider.nativeElement.setAttribute('data-rangemin', rangemin);
    this.slider.nativeElement.setAttribute('data-rangemax', rangemax);
    this.slider.nativeElement.setAttribute('data-thumbsize', this.rangeCircleSize);
    this.slider.nativeElement.setAttribute('data-rangewidth', this.slider.nativeElement.offsetWidth);

    this.draw(avgvalue);

    this.minElement.addEventListener('input', () => this.update(rangemax));
    this.maxElement.addEventListener('input', () => this.update(rangemax));
  }

  update(rangemax: number): void {
    // correction for min value calculation
    let minvalue;
    if (this.minElement.value > (rangemax - 1)) {
      minvalue = Math.floor(this.minElement.value - 1);
    } else {
      minvalue = Math.floor(this.minElement.value);
    }

    // correction for max value calculation
    let maxvalue;
    if (this.maxElement.value > (rangemax - 1)) {
      maxvalue = Math.ceil(this.maxElement.value);
    } else {
      maxvalue = Math.floor(this.maxElement.value);
    }

    this.minElement.setAttribute('data-value', minvalue);
    this.maxElement.setAttribute('data-value', maxvalue);

    this.selectedMin = minvalue;
    this.selectedMax = maxvalue;

    this.updateSelection();
    this.sum = this.sumRange();

    const avgvalue = Math.ceil((minvalue + maxvalue) / 2);
    this.draw(avgvalue);
  }


  public sumRange(): number {
    let sum = 0;
    this.data.facetGroupData.forEach((facet) => {
      if (this.isInRange(facet)) {
        sum += facet.count;
      }
    });
    return sum;
  }

  public onSelectionChange(): void {
    const selection = {
      name: this.data.facetGroupName,
      selected: this.data.selectedRange,
      count: this.sumRange()
    } as SearchFacetSelection;
    this._selectionChange.emit(selection);
  }

  private updateSelection(): void {
    this.data.selectedRange = {
      start: this.selectedMin,
      end: this.selectedMax
    } as SelectedRange;
    this.onSelectionChange();
  }

  private isInRange(facet: SearchFacetModel): boolean {
    const value = this.parseInt(facet.label);
    return value >= this.parseInt(this.selectedMin) && value <= this.parseInt(this.selectedMax);
  }

  private parseInt(value: string): number {
    try {
      return parseInt(value);
    } catch (e) {
      throw new Error(`Parsing ${value} to number failed! ` + e.message);
    }
  }

  public ngOnDestroy(): void {
    this.onResize = function(): void {};
    this.minElement.removeEventListener('input', () => this.update);
    this.maxElement.removeEventListener('input', () => this.update);
  }
}
