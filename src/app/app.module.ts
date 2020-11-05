import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OntoSearchFieldModule} from '../../projects/onto-search/src/lib/onto-search-field/onto-search-field.module';
import {OntoSearchResultsModule} from '../../projects/onto-search/src/lib/onto-search-results/onto-search-results.module';
import {DirectivesModule} from '../../projects/onto-search/src/lib/directives/directives.module';
import {SearchResultsComponent} from './components/search-results/search-results.component';
import {OntoSearchPaginatorModule} from '../../projects/onto-search/src/lib/onto-search-paginator/onto-search-paginator.module';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultsComponent,
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
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {
}
