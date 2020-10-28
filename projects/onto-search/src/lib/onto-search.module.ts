import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OntoSearchComponent} from './onto-search.component';
import {SearchComponent} from './search/search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {DirectivesModule} from "src/app/directives/directives.module";


@NgModule({
  declarations: [OntoSearchComponent, SearchComponent],
  exports: [
    OntoSearchComponent,
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
        TranslateModule.forRoot(),
        FlexModule,
        DirectivesModule,
    ],
})
export class OntoSearchModule {
}
