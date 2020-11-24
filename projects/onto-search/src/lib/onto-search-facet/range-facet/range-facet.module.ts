import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RangeSliderComponent} from './range-slider/range-slider.component';
import {RangeFacetComponent} from './range-facet.component';
import {MatSliderModule} from '@angular/material/slider';
import {RangeHistogramComponent} from './range-histogram/range-histogram.component';
import {TranslocoModule} from '@ngneat/transloco';
import {DirectivesModule} from '../../directives/directives.module';

@NgModule({
  declarations: [RangeFacetComponent, RangeSliderComponent, RangeHistogramComponent],
  imports: [
    CommonModule,
    MatSliderModule,
    TranslocoModule,
    DirectivesModule,

  ],
  exports: [RangeFacetComponent]
})
export class RangeFacetModule { }
