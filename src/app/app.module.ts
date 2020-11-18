import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OntoSearchResultsModule} from '../../projects/onto-search/src/lib/onto-search-results/onto-search-results.module';
import {DirectivesModule} from '../../projects/onto-search/src/lib/directives/directives.module';
import {SearchResultsComponent} from './components/search-results/search-results.component';
import {SearchFieldComponent} from './components/search-field/search-field.component';
import {OntoSearchPaginatorModule} from '../../projects/onto-search/src/lib/onto-search-paginator/onto-search-paginator.module';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {OntoSearchFieldModule} from '../../projects/onto-search/src/lib/onto-search-field/onto-search-field.module';
import {OntoSearchColumnSelectorModule} from '../../projects/onto-search/src/lib/onto-search-column-selector/onto-search-column-selector.module';
import {SearchColumnSelectorComponent} from './components/search-column-selector/search-column-selector.component';
import {SearchDatepickerFacetComponent} from './components/search-datepicker-facet/search-datepicker-facet.component';
import {OntoSearchFacetModule} from '../../projects/onto-search/src/lib/onto-search-facet/onto-search-facet.module';
import {SearchCheckboxFacetComponent} from './components/search-checkbox-facet/search-checkbox-facet.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultsComponent,
    SearchFieldComponent,
    SearchColumnSelectorComponent,
    SearchCheckboxFacetComponent,
    SearchDatepickerFacetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OntoSearchFieldModule,
    OntoSearchResultsModule,
    DirectivesModule,
    OntoSearchPaginatorModule,
    MatButtonModule,
    MatToolbarModule,
    OntoSearchColumnSelectorModule,
    OntoSearchFacetModule,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {
}
