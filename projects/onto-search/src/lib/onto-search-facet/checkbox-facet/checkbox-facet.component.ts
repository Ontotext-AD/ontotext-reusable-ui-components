import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {OntoSearchFacetComponent} from '../onto-search-facet.component';
import {SearchFacetType} from '../models/search-facet-type';
import {SearchFacetModel} from '../models/search-facet-model';

@Component({
  selector: 'onto-checkbox-facet',
  templateUrl: './checkbox-facet.component.html'
})
export class CheckboxFacetComponent extends OntoSearchFacetComponent {
  @Input()
  public facetTemplate: TemplateRef<any>;

  @Input()
  public facetTitleTemplate: TemplateRef<any>;

  @Input()
  public type: SearchFacetType;

  @Output()
  public onSelectionChange: EventEmitter<any>;

  public updateAllSelected(facet: SearchFacetModel): void {
    const index = this.data.selected.indexOf(facet);
    if (index > -1) {
      this.data.selected.splice(index, 1);
    } else if (facet.selected) {
      this.data.selected.push(facet);
    }

    this.onSelectionChange.emit(this.data.selected);
  }
}

