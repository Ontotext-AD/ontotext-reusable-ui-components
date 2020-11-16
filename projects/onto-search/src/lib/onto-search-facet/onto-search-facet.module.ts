import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OntoSearchFacetComponent} from './onto-search-facet.component';
import {CheckboxFacetComponent} from './checkbox-facet/checkbox-facet.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {DirectivesModule} from '../directives/directives.module';

@NgModule({
  declarations: [OntoSearchFacetComponent, CheckboxFacetComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    DirectivesModule
  ],
  exports: [OntoSearchFacetComponent]
})
export class OntoSearchFacetModule { }
