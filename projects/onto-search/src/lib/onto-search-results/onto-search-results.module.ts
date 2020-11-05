import {NgModule} from '@angular/core';
import {OntoSearchResultsComponent} from './onto-search-results.component';
import {CdkTableModule} from '@angular/cdk/table';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {DirectivesModule} from '../directives/directives.module';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [OntoSearchResultsComponent],
  exports: [OntoSearchResultsComponent],
  imports: [
    CdkTableModule,
    CommonModule,
    DirectivesModule,
    MatTableModule,
    MatSortModule,
  ],
})
export class OntoSearchResultsModule {}
