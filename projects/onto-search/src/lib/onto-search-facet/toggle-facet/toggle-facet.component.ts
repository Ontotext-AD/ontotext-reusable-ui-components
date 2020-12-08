import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {OntoSearchFacetComponent} from '../onto-search-facet.component';
import {SearchFacetSelection} from '../models/search-facet-selection';
import {SearchFacetModel} from '../models/search-facet-model';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {SearchToggleGroupModel} from './search-toggle-group-model';

@Component({
  selector: 'onto-toggle-facet',
  templateUrl: './toggle-facet.component.html'
})
export class ToggleFacetComponent extends OntoSearchFacetComponent implements OnChanges {
  @Input()
  public data: SearchToggleGroupModel;

  color;
  currentSelection: SearchFacetModel;
  currentValue: boolean;
  currentValueIndex: number;

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes?.data?.currentValue) {
      this.color = this.data.color;
      this.facetGroup.sort(this.compareByLabel);
    }
    if (this.selected.length) {
      const indexOfSelectedElement = this.facetGroup.map((item) => item.label).indexOf(this.selected[0].label);

      this.currentValueIndex = indexOfSelectedElement > 0 ? indexOfSelectedElement : 0;
      this.currentValue = Boolean(this.currentValueIndex);
      this.currentSelection = this.facetGroup[this.currentValueIndex];

      if (this.facetGroup.length === 1 && indexOfSelectedElement === 0) {
        this.currentValue = true;
      }
    } else if (this.facetGroup.length === 1) {
      this.currentSelection = this.facetGroup[0];
    } else {
      this.currentSelection = null;
      this.currentValue = null;
      this.currentValueIndex = null;
    }
  }

  onToggle($event: MatSlideToggleChange): void {
    let selection: SearchFacetSelection;
    if (this.facetGroup.length === 1) {
      this.facetGroup[0].selected = $event.checked;
      selection = {
        name: this.facetGroupName,
        selected: [this.currentSelection],
        count: this.currentSelection?.count
      };
    } else {
      this.currentValueIndex = $event.checked ? 1 : 0;
      this.currentSelection = this.facetGroup[this.currentValueIndex];
      this.refreshSelection(this.currentValueIndex);

      selection = {
        name: this.facetGroupName,
        selected: [this.currentSelection],
        count: this.currentSelection.count
      };
    }
    this.onSelectionChange.emit(selection);
  }

  refreshSelection(indexOfSelected: number): void {
    this.facetGroup.forEach((value, index) => value.selected = (index === indexOfSelected));
  }

  private compareByLabel(item1, item2): number {
    if (item1.label > item2.label) {
      return 1;
    } else if (item2.label > item1.label) {
      return -1;
    }
    return 0;
  }
}
