import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SearchFacetType} from '../../../../projects/onto-search/src/lib/onto-search-facet/models/search-facet-type';
import {SearchFacetModel} from '../../../../projects/onto-search/src/lib/onto-search-facet/models/search-facet-model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-facet',
  templateUrl: './search-facet.component.html',
  styleUrls: ['./search-facet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFacetComponent implements OnInit {
  public data: SearchFacetModel = {facetGroupName: '', facetGroup: null, selected: []};
  public type: SearchFacetType;
  public selected: string[];
  public facetGroup: any;

  public useCustomTemplate: boolean = false;

  constructor(private routeParams: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.data.facetGroupName = 'Status';
    this.facetGroup = {
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
    this.data.selected = ['Recruiting'];
    this.type = SearchFacetType.BASIC;
    this.selected = this.data.selected;

    this.useCustomTemplate = this.routeParams.snapshot.queryParams['useCustomTemplate'];

    this.data.facetGroup = this.transformToMap(this.facetGroup);
  }

  public onSelectedEvent($event: any): void {
    this.selected = $event;
  }

  transformToMap(facets:any): Map<number, any> {
    const transformed = new Map<number, any>();

    let index = 0;
    Object.keys(facets).forEach((key) => {
      transformed.set(index++, {
        label: key,
        count: facets[key],
        selected: this.selected.includes(key)
      });
    });

    return transformed;
  }

  public deselect(): void {
    this.selected = [];
    this.data.facetGroup.forEach((v) => v.selected = false);
  }
}
