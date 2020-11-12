import {Component, Input, TemplateRef} from '@angular/core';
import {OntoSearchFacetComponent} from '../onto-search-facet.component';

@Component({
  selector: 'onto-basic-facet',
  templateUrl: './basic-facet.component.html'
})
export class BasicFacetComponent extends OntoSearchFacetComponent {
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

