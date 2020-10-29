import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OntoSearchModule} from "projects/onto-search/src/lib/onto-search/onto-search.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OntoSearchModule,
  ],

  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule {
}
