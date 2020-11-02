import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OntoSearchFieldComponent} from './onto-search-field.component';
import {SearchComponent} from './search/search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {TRANSLOCO_CONFIG, TranslocoConfig, TranslocoModule, TranslocoService} from '@ngneat/transloco';
import en from './i18n/en.json';
import {DirectivesModule} from '../directives/directives.module';

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
  declarations: [OntoSearchFieldComponent, SearchComponent],
  exports: [
    OntoSearchFieldComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    MatOptionModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    TranslocoModule,
    DirectivesModule,
  ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfiguration,
    },
  ],
})
export class OntoSearchFieldModule {
  constructor(private translocoService: TranslocoService) {
    this.translocoService.setTranslation(en, 'en');
  }
}
