import {NgModule} from '@angular/core';
import {OntoSearchColumnSelector} from './onto-search-column-selector.component';
import {DirectivesModule} from '../directives/directives.module';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {
  TRANSLOCO_CONFIG,
  TranslocoConfig,
  TranslocoModule,
  TranslocoService
} from '@ngneat/transloco';
import {CommonModule} from '@angular/common';
import en from './i18n/en.json';

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
  imports: [
    DirectivesModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslocoModule,
    CommonModule
  ],
  declarations: [OntoSearchColumnSelector],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfiguration,
    },
  ],
  exports: [
    OntoSearchColumnSelector
  ]
})
export class OntoSearchColumnSelectorModule {
  constructor(private translocoService: TranslocoService) {
    this.translocoService.setTranslation(en, 'en');
  }
}

