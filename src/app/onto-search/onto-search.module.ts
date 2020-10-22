import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OntoSearchComponent} from "src/app/onto-search/onto-search.component";
import { Select2Component } from './select2/select2.component';

@NgModule({
  declarations: [
    OntoSearchComponent,
    Select2Component
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OntoSearchComponent
  ]
})
export class OntoSearchModule { }
