import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {SearchFacetGroupModel} from '../../models/search-facet-group-model';
import {SearchFacetModel} from '../../models/search-facet-model';
import {HistogramModel} from '../models/histogram-model';

@Component({
  selector: 'onto-range-histogram',
  templateUrl: './range-histogram.component.html',
  styleUrls: ['./range-histogram.component.scss']
})
export class RangeHistogramComponent implements AfterViewInit {
  /**
   * Facet data holder.
   */
  @Input()
  public data: SearchFacetGroupModel;

  /**
   * Histogram configuration.
   *
   */
  @Input()
  private histogramModel?: HistogramModel;

  @ViewChild('rangeHistogramCanvas')
  private canvas: ElementRef;

  private ctx;

  public ngAfterViewInit(): void {
    this.init();
  }

  init(): void {
    this.fitToContainer(this.canvas.nativeElement);
    this.ctx = this.canvas.nativeElement.getContext('2d');

    const data: SearchFacetModel[] = [...this.data.facetGroupData];

    data.sort((a, b) => {
      try {
        return this.parseInt(a.label) - this.parseInt(b.label);
      } catch (e) {
        throw new Error('Facet labels must represent numbers! ' + e.message);
      }
    });
    this.drawHistogram(this.fillEmptyValues(data));
  }

  drawHistogram(data): void {
    this.ctx.save();

    const canvasWidth = this.canvas.nativeElement.getBoundingClientRect().width;

    const width = canvasWidth / data.length;
    const space = this.histogramModel && this.histogramModel.space || 0;
    const scale = this.histogramModel && this.histogramModel.scale || 0.5;
    const baseYPos = this.histogramModel && this.histogramModel.baseYPos || 100;
    const endAngle = this.histogramModel && this.histogramModel.endAngle || 2 * Math.PI;
    const startAngle = this.histogramModel && this.histogramModel.endAngle || 0;
    const fillStyle = this.histogramModel && this.histogramModel.fillStyle || 'rgba(200, 200, 200, 0.2)';

    let posX = 0;
    let posY = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].count > 0) {
        const height = this.parseInt(data[i].count) * scale;
        posX = i * space + i * width;
        posY = baseYPos - height;
        this.ctx.beginPath();
        this.ctx.arc(posX, posY, data[i].count * scale, startAngle, endAngle);
        this.ctx.fillStyle = fillStyle;
        this.ctx.fill();
        this.ctx.restore();
      }
    }

    this.ctx.restore();
  }

  fitToContainer(canvas: any): void {
    // Make it visually fill the positioned parent
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    // then set the internal size to match
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  compare(a: SearchFacetModel, b: SearchFacetModel): number {
    const parsedA = this.parseInt(a.label);
    const parsedB = this.parseInt(b.label);
    if (parsedA < parsedB) {
      return -1;
    }
    if (parsedA > parsedB) {
      return 1;
    }
    return 0;
  }

  private fillEmptyValues(data: SearchFacetModel[]): SearchFacetModel[] {
    const empty = {label: '0', count: 0};
    const filledArray = [];

    data.forEach((value: SearchFacetModel, index) => {
      filledArray.push(value);

      if (data[index + 1]) {
        let emptyValuesCount = this.parseInt(data[index + 1].label) - this.parseInt(data[index].label);
        while (emptyValuesCount > 1) {
          filledArray.push(empty);
          emptyValuesCount--;
        }
      }
    });

    return filledArray;
  }

  private parseInt(value: string): number {
    try {
      return parseInt(value);
    } catch (e) {
      throw new Error(`Parsing ${value} to number failed! ` + e.message);
    }
  }
}
