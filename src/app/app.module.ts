import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OntoSearchFieldModule} from '../../projects/onto-search/src/lib/onto-search-field/onto-search-field.module';
import {OntoSearchResultsModule} from '../../projects/onto-search/src/lib/onto-search-results/onto-search-results.module';
import {DirectivesModule} from '../../projects/onto-search/src/lib/directives/directives.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OntoSearchFieldModule,
    OntoSearchResultsModule,
    DirectivesModule,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {
}
