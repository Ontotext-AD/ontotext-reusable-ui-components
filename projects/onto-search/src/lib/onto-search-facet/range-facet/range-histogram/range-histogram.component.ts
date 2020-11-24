import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {SearchFacetGroupModel} from '../../models/search-facet-group-model';
import {SearchFacetModel} from '../../models/search-facet-model';
import {Observable} from 'rxjs';
import {HistogramModel} from '../models/histogram-model';

@Component({
  selector: 'onto-range-histogram',
  templateUrl: './range-histogram.component.html',
  styleUrls: ['./range-histogram.component.scss']
})
export class RangeHistogramComponent implements AfterViewInit {
  @Input()
  public data: SearchFacetGroupModel;

  @Input()
  public containerWidth: Observable<number>;

  @Input()
  private histogramModel?: HistogramModel;

  @ViewChild('canvas')
  private canvas: ElementRef;

  private ctx;
  private width;

  public ngAfterViewInit(): void {
    this.containerWidth.subscribe((width) => {
      this.width = width;
      this.init();
    });
  }

  init():void {
    this.fitToContainer(this.canvas.nativeElement);
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.data.facetGroupData.forEach((e) => e);
    const data: any[] = JSON.parse(JSON.stringify(this.data.facetGroupData));

    data.sort((a, b) => parseInt(a.label)- parseInt(b.label));
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
    const fillStyle = this.histogramModel && this.histogramModel.fillStyle || 'rgba(200, 200, 200, 0.2)';

    let posX = 0;
    let posY = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].count > 0) {
        const height = parseInt(data[i].count) * scale;
        posX = i * space + i * width;
        posY = baseYPos - height;
        this.ctx.beginPath();
        this.ctx.arc(posX, posY, data[i].count*scale, 0, endAngle);
        this.ctx.fillStyle = fillStyle;
        this.ctx.fill();
        this.ctx.restore();
      }
    }

    this.ctx.restore();
  }

  fitToContainer(canvas: any): void {
    // Make it visually fill the positioned parent
    canvas.style.width = this.width + 'px';
    canvas.style.height='100%';

    // then set the internal size to match
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  compare(a: SearchFacetModel, b: SearchFacetModel): number {
    const parsedA = parseInt(a.label);
    const parsedB = parseInt(b.label);
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

    data.forEach((value:SearchFacetModel, index) => {
      filledArray.push(value);

      if (data[index + 1]) {
        let emptyValuesCount = parseInt(data[index + 1].label) - parseInt(data[index].label);
        while (emptyValuesCount > 1) {
          filledArray.push(empty);
          emptyValuesCount--;
        }
      }
    });

    return filledArray;
  }
}
