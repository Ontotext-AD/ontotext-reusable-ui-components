import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DirectivesModule} from '../directives/directives.module';
import {OntoSearchPaginatorComponent} from './onto-search-paginator.component';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [OntoSearchPaginatorComponent],
  exports: [OntoSearchPaginatorComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    MatPaginatorModule,
  ],
})
export class OntoSearchPaginatorModule {
}
