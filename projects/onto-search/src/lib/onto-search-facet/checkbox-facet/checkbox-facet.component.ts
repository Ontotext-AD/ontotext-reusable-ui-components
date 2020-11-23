import {Component, Input, OnChanges, SimpleChanges, TemplateRef} from '@angular/core';
import {OntoSearchFacetComponent} from '../onto-search-facet.component';
import {SearchFacetType} from '../models/search-facet-type';
import {SearchFacetModel} from '../models/search-facet-model';

@Component({
  selector: 'onto-checkbox-facet',
  templateUrl: './checkbox-facet.component.html'
})
export class CheckboxFacetComponent extends OntoSearchFacetComponent implements OnChanges {
  @Input()
  public facetTemplate: TemplateRef<any>;

  @Input()
  public facetTitleTemplate: TemplateRef<any>;

  @Input()
  public type: SearchFacetType;

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    this.facetGroup.forEach((facet) => facet.selected = this.selected.includes(facet));
  }


  public updateAllSelected(facet: SearchFacetModel): void {
    const index = this.selected && this.selected.indexOf(facet);
    if (index > -1) {
      this.selected.splice(index, 1);
      facet.selected = false;
    } else {
      this.selected.push(facet);
      facet.selected = true;
    }
    const count = this.selected.map((selectedItem) => selectedItem.count)
        .reduce((totalCount, itemCount) => totalCount + itemCount, 0);

    this.onSelectionChange.emit({name: this.facetGroupName, selected: this.selected, count});
  }
}

