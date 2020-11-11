import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OntoSearchFacetComponent} from './onto-search-facet.component';
import {BasicFacetComponent} from './basic-facet/basic-facet.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {DirectivesModule} from '../directives/directives.module';

@NgModule({
  declarations: [OntoSearchFacetComponent, BasicFacetComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    DirectivesModule
  ],
  exports: [OntoSearchFacetComponent]
})
export class OntoSearchFacetModule { }
