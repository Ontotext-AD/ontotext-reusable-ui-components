import {Component, OnInit} from '@angular/core';
import {SearchFacetType} from '../../../../projects/onto-search/src/lib/onto-search-facet/models/search-facet-type';
import {SearchFacetGroupModel} from '../../../../projects/onto-search/src/lib/onto-search-facet/models/search-facet-group-model';
import {SearchFacetModel} from '../../../../projects/onto-search/src/lib/onto-search-facet/models/search-facet-model';

@Component({
  selector: 'app-search-facet',
  templateUrl: './search-facet.component.html',
  styleUrls: ['./search-facet.component.scss']
})
export class SearchFacetComponent implements OnInit {
  public data: SearchFacetGroupModel;
  public type: SearchFacetType;
  public apiGroupResponse: any;
  public apiGroupNameResponse: any;
  public apiSelectedResponse: any;

  constructor() {
  }

  ngOnInit(): void {
    this.data = {facetGroupName: '', facetGroup: null, selected: []};

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

    this.data.facetGroupName = this.apiGroupNameResponse;
    this.data.facetGroup = this.transformToMap(this.apiGroupResponse);

    this.type = SearchFacetType.CHECKBOX;
  }

  // eslint-disable-next-line  @typescript-eslint/no-unused-vars
  public onSelectedEvent($event: any): void {
    // not implemented
  }

  transformToMap(facets:any): Map<number, SearchFacetModel> {
    const transformed = new Map<number, any>();

    let index = 0;
    Object.keys(facets).forEach((key) => {
      const position = this.apiSelectedResponse.indexOf(key);
      const isSelected = position !== -1;

      const facet = {
        label: key,
        count: facets[key],
        selected: isSelected
      };
      transformed.set(index++, facet);

      if (isSelected) {
        this.data.selected.push(facet);
      }
    });

    return transformed;
  }

  public deselect(): void {
    this.data.selected = [];
    this.data.facetGroup.forEach((v) => v.selected = false);
  }
}
