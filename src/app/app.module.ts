import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DirectivesModule} from './directives/directives.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {OntoSearchModule} from "projects/onto-search/src/lib/onto-search.module";

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, environment.httpLoaderPrefix, environment.httpLoaderSuffix);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    DirectivesModule,
    HttpClientModule,
    OntoSearchModule,


  ],
  providers: [TranslateService],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule {
}
