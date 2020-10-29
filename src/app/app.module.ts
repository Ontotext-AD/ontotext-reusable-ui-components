import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OntoSearchFieldModule} from 'projects/onto-search/src/lib/onto-search-field/onto-search-field.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OntoSearchFieldModule,
  ],

  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {
}
