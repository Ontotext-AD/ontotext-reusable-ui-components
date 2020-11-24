import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SearchFacetGroupModel} from '../../models/search-facet-group-model';
import {SearchFacetModel} from '../../models/search-facet-model';

@Component({
  selector: 'onto-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent implements OnInit, AfterViewInit {
  @Input()
  public data: SearchFacetGroupModel;

  @ViewChild('minMaxSlider')
  public slider: ElementRef;
  @ViewChild('minSlider')
  public minSlider: ElementRef;
  @ViewChild('maxSlider')
  public maxSlider: ElementRef;

  @Output()
  public sliderWidth: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public selectionChange: EventEmitter<any> = new EventEmitter<any>();


  private facetData: SearchFacetModel[];
  public sum: number;

  private thumbsize = 14;
  public min;
  public max;
  public selectedMin;
  public selectedMax;

  ngOnInit(): void {
    this.facetData = JSON.parse(JSON.stringify(this.data.facetGroupData));
    this.facetData.sort((a, b) => parseInt(a.label) - parseInt(b.label));
    this.min = this.facetData[0].label;
    this.max = this.facetData[this.facetData.length-1].label;
    this.selectedMin = this.min;
    this.selectedMax = this.max;

    this.sum = this.sumRange();
    this.updateSelection();
  }

  public ngAfterViewInit(): void {
    this.init();
    this.sliderWidth.emit(this.slider.nativeElement.clientWidth);
  }

  draw(splitvalue: number): void {
    const min = this.minSlider.nativeElement;
    const max = this.maxSlider.nativeElement;
    const thumbsize: any = parseInt(this.slider.nativeElement.getAttribute('data-thumbsize'));
    const rangewidth = this.slider.nativeElement.clientWidth;

    const rangemin = parseInt(this.slider.nativeElement.getAttribute('data-rangemin'));
    const rangemax = parseInt(this.slider.nativeElement.getAttribute('data-rangemax'));

    min.setAttribute('max', splitvalue);
    max.setAttribute('min', splitvalue);

    min.style.width = parseInt(thumbsize + ((splitvalue - rangemin) / (rangemax - rangemin)) * (rangewidth - (2 * thumbsize))) + 'px';
    max.style.width = parseInt(thumbsize + ((rangemax - splitvalue) / (rangemax - rangemin)) * (rangewidth - (2 * thumbsize))) + 'px';
    min.style.left = '0px';
    max.style.left = parseInt(min.style.width) + 'px';

    // correct for 1 off at the end of the max slider
    if (max.value > (rangemax - 1)) {
      max.setAttribute('data-value', rangemax);
    }

    max.value = max.getAttribute('data-value');
    min.value = min.getAttribute('data-value');
  }

  init(): void {
    const min = this.minSlider.nativeElement;
    const max = this.maxSlider.nativeElement;
    const rangemin: any = parseInt(min.getAttribute('min'));
    const rangemax: any = parseInt(max.getAttribute('max'));
    const avgvalue = (rangemin + rangemax) / 2;

    min.setAttribute('data-value', rangemin);
    max.setAttribute('data-value', rangemax);

    this.slider.nativeElement.setAttribute('data-rangemin', rangemin);
    this.slider.nativeElement.setAttribute('data-rangemax', rangemax);
    this.slider.nativeElement.setAttribute('data-thumbsize', this.thumbsize);
    this.slider.nativeElement.setAttribute('data-rangewidth', this.slider.nativeElement.offsetWidth);

    this.draw(avgvalue);

    min.addEventListener('input', () => this.update(rangemax));
    max.addEventListener('input', () => this.update(rangemax));
  }

  update(rangemax: number): void {
    const min = this.minSlider.nativeElement;
    const max = this.maxSlider.nativeElement;
    const minvalue = Math.floor(min.value);

    // correction for max value calculation
    let maxvalue;
    if (max.value > (rangemax - 1)) {
      maxvalue = Math.ceil(max.value);
    } else {
      maxvalue = Math.floor(max.value);
    }

    min.setAttribute('data-value', minvalue);
    max.setAttribute('data-value', maxvalue);

    this.selectedMin = minvalue;
    this.selectedMax = maxvalue;

    this.updateSelection();
    this.sum = this.sumRange();

    const avgvalue = Math.ceil((minvalue + maxvalue) / 2);
    this.draw(avgvalue);
  }


  private sumRange(): number {
    let sum = 0;
    this.data.facetGroupData.forEach((facet) => {
      if (this.isInRange(facet)) {
        sum += facet.count;
      }
    });
    return sum;
  }

  public onSelectionChange(): void {
    this.selectionChange.emit(this.data.selected);
  }

  private updateSelection(): void {
    this.data.selected = [];
    this.data.facetGroupData.forEach((facet) => {
      if (this.isInRange(facet)) {
        this.data.selected.push(facet);
      }
    });
    this.onSelectionChange();
  }

  private isInRange(facet: SearchFacetModel): boolean {
    const value = parseInt(facet.label);
    return value >= parseInt(this.selectedMin) && value <= parseInt(this.selectedMax);
  }
}
