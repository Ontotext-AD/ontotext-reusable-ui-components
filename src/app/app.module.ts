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
import {SearchColumnSelectorComponent} from './search-column-selector/search-column-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultsComponent,
    SearchFieldComponent,
    SearchColumnSelectorComponent,
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
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {
}
