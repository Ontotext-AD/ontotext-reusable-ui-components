import {Component, Input, TemplateRef} from '@angular/core';
import {OntoSearchFacetComponent} from '../onto-search-facet.component';

@Component({
  selector: 'onto-checkbox-facet',
  templateUrl: './checkbox-facet.component.html'
})
export class CheckboxFacetComponent extends OntoSearchFacetComponent {
  @Input()
  public facetTemplate: TemplateRef<any>;

  @Input()
  public facetTitleTemplate: TemplateRef<any>;


  public updateAllSelected(selected: string): void {
    const index = this.selected.indexOf(selected);
    if (index > -1) {
      this.selected.splice(index, 1);
    } else {
      this.selected.push(selected);
    }

    this.onSelectionChange.emit();
  }
}

