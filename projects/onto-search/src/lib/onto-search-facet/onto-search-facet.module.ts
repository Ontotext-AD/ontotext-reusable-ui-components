import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OntoSearchFacetComponent} from './onto-search-facet.component';
import {CheckboxFacetComponent} from './checkbox-facet/checkbox-facet.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DirectivesModule} from '../directives/directives.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateRangeFacetComponent} from './date-range-facet/date-range-facet.component';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {ToggleFacetComponent} from './toggle-facet/toggle-facet.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

const CUSTOM_MAT_DATE_FORMATS = {
  parse: {
    dateInput: ['l', 'LL', 'DD/MM/YYYY', 'MM/DD/YYYY'],
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [OntoSearchFacetComponent, CheckboxFacetComponent, DateRangeFacetComponent, ToggleFacetComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    DirectivesModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ],
  exports: [OntoSearchFacetComponent],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: CUSTOM_MAT_DATE_FORMATS
    },
  ],
})
export class OntoSearchFacetModule {
}
