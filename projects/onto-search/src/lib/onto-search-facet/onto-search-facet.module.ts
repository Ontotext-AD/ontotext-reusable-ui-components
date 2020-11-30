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
import {RangeFacetModule} from './range-facet/range-facet.module';
import {TRANSLOCO_CONFIG, TranslocoConfig, TranslocoModule, TranslocoService} from '@ngneat/transloco';
import en from './i18n/en.json';
import {DropdownMultiSelectFacetComponent} from './dropdown-multi-select-facet/dropdown-multi-select-facet.component';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DropdownMultiSelectComponent} from './dropdown-multi-select-facet/dropdown-multi-select/dropdown-multi-select.component';
import {MatChipsModule} from '@angular/material/chips';
import en from './i18n/en.json';
import {TranslocoModule, TranslocoService} from '@ngneat/transloco';

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


const translocoConfiguration: TranslocoConfig = {
  availableLangs: ['en'],
  fallbackLang: ['en'],
  defaultLang: 'en',
  prodMode: true,
  reRenderOnLangChange: true,
  missingHandler: {
    useFallbackTranslation: true,
    logMissingKey: true,
  },
};

@NgModule({
  declarations: [OntoSearchFacetComponent, CheckboxFacetComponent, DateRangeFacetComponent, ToggleFacetComponent, DropdownMultiSelectFacetComponent, DropdownMultiSelectComponent],
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
    RangeFacetModule,
    TranslocoModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    NoopAnimationsModule,
    MatChipsModule,
    TranslocoModule
  ],
  exports: [OntoSearchFacetComponent],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: CUSTOM_MAT_DATE_FORMATS
    },
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfiguration,
    },
  ],
})
export class OntoSearchFacetModule {
  constructor(private translocoService: TranslocoService) {
    this.translocoService.setTranslation(en, 'en');
  }
}
