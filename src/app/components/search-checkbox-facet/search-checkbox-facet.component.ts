import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SearchFacetType} from '../../../../projects/onto-search/src/lib/onto-search-facet/models/search-facet-type';
import {SearchFacetGroupModel} from '../../../../projects/onto-search/src/lib/onto-search-facet/models/search-facet-group-model';
import {SearchFacetModel} from '../../../../projects/onto-search/src/lib/onto-search-facet/models/search-facet-model';
import {SearchFacetSelection} from '../../../../projects/onto-search/src/lib/onto-search-facet/models/search-facet-selection';

@Component({
  selector: 'app-search-checkbox-facet',
  templateUrl: './search-checkbox-facet.component.html',
  styleUrls: ['./search-checkbox-facet.component.scss']
})
export class SearchCheckboxFacetComponent implements OnInit {
  public data: SearchFacetGroupModel;
  public type: SearchFacetType;
  public apiGroupResponse: any;
  public apiGroupNameResponse: any;
  public apiSelectedResponse: any;
  public selection: SearchFacetSelection;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.apiGroupNameResponse = 'Status';
    this.apiGroupResponse = {
      'Recruiting': 176,
      'Temporarily not available': 0,
      'Enrolling by invitation': 13,
      'No longer available': 1,
      'Not yet recruiting': 83,
      'Approved for marketing': 0,
      'Withheld': 10,
      'Terminated': 46,
      'Active, not recruiting': 72,
      'Completed': 658,
      'Withdrawn': 39,
      'Available': 0,
      'Unknown status': 221,
      'Suspended': 3
    };
    this.apiSelectedResponse = ['Recruiting'];
    this.selection = {
      name: this.apiGroupNameResponse,
      selected: [],
    };

    this.data = {
      facetGroupName: this.apiGroupNameResponse,
      selected: this.selection.selected,
      facetGroupData: this.transformToFacetModel(this.apiGroupResponse)
    };

    this.type = SearchFacetType.CHECKBOX;
  }

  public onSelectedEvent($event: any): void {
    this.selection = $event;
  }

  transformToFacetModel(facets: any): SearchFacetModel[] {
    const transformed = [];
    Object.keys(facets).forEach((key) => {
      const isSelected = this.apiSelectedResponse.indexOf(key) !== -1;

      const facet = {
        label: key,
        count: facets[key],
        selected: isSelected
      };
      transformed.push(facet);

      if (isSelected) {
        this.selection.selected.push(facet);
      }
    });

    return transformed;
  }

  public deselect(): void {
    this.selection = null;
    this.data = {
      facetGroupName: this.data.facetGroupName,
      selected: [],
      facetGroupData: this.data.facetGroupData,
    };
    this.changeDetectorRef.detectChanges();
  }
}
