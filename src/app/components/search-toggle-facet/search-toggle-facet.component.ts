import {Component} from '@angular/core';
import {SearchFacetModel} from '../../../../projects/onto-search/src/lib/onto-search-facet/models/search-facet-model';
import {SearchFacetSelection} from '../../../../projects/onto-search/src/lib/onto-search-facet/models/search-facet-selection';
import {SearchFacetType} from '../../../../projects/onto-search/src/lib/onto-search-facet/models/search-facet-type';
import {SearchToggleGroupModel} from '../../../../projects/onto-search/src/lib/onto-search-facet/toggle-facet/search-toggle-group-model';
import {ActivatedRoute} from '@angular/router';

const apiResponse = {
  _name: 'Expanded Access',
  _values: {
    false: 343987,
    true: 616
  }
};

@Component({
  selector: 'app-search-toggle-facet',
  templateUrl: './search-toggle-facet.component.html'
})
export class SearchToggleFacetComponent {
  toggleFacetType = SearchFacetType.TOGGLE;
  groupModel: SearchToggleGroupModel;
  groupModelSingleValue: SearchToggleGroupModel;

  selected: SearchFacetModel = {
    label: 'Should I filter?',
    count: 666,
    selected: true,
    facetData: {}
  };

  selectedFilter: SearchFacetSelection;

  constructor(private activatedRoute: ActivatedRoute) {
    const preselectedFilterValue = this.activatedRoute.snapshot.queryParams['preselectedFilterValue'];

    this.groupModel = {
      facetGroupName: apiResponse._name,
      selected: [],
      facetGroupData: Object.keys(apiResponse._values).map((key) => {
        return {label: key, selected: false, count: apiResponse._values[key]};
      })
    };
    const selected = preselectedFilterValue ? [this.selected] : [];
    this.groupModelSingleValue = {
      facetGroupName: 'Toggle facet single value',
      selected,
      facetGroupData: [
        this.selected
      ],
    };
  }

  onSelectionChanged($event): void {
    this.selectedFilter = $event;
    console.log($event);
  }
}
