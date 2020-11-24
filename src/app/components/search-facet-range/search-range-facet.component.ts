import {Component, OnInit} from '@angular/core';
import {SearchFacetType} from '../../../../projects/onto-search/src/lib/onto-search-facet/models/search-facet-type';
import {SearchFacetModel} from '../../../../projects/onto-search/src/lib/onto-search-facet/models/search-facet-model';
import {SearchRangeFacetGroupModel} from '../../../../projects/onto-search/src/lib/onto-search-facet/range-facet/models/search-range-facet-group-model';

@Component({
  selector: 'app-search-facet-range',
  templateUrl: './search-range-facet.component.html',
  styleUrls: ['./search-range-facet.component.scss']
})
export class SearchRangeFacetComponent implements OnInit {
  public data: SearchRangeFacetGroupModel;
  public type: SearchFacetType;
  public apiGroupResponse: any;
  public apiGroupNameResponse: any;
  public apiSelectedResponse: any;
  public selected: SearchFacetModel[] = [];
  public facetTitleTemplate: any = null;
  public basicFacetTemplate: any = null;

  constructor() { }

  ngOnInit(): void {
    this.apiGroupNameResponse = 'Enrollment';
    this.apiGroupResponse = {
      '350': 4,
      '90': 8,
      '119': 3,
      '96': 5,
      '10': 15,
      '11': 3,
      '12': 12,
      '13': 3,
      '14': 9,
      '15': 11,
      '16': 11,
      '17': 3,
      '18': 10,
      '360': 6,
      '240': 5,
      '120': 21,
      '0': 38,
      '1': 3,
      '640': 3,
      '3': 7,
      '400': 16,
      '5': 5,
      '6': 9,
      '8': 8,
      '800': 8,
      '9': 5,
      '20': 40,
      '21': 4,
      '23': 6,
      '24': 17,
      '25': 8,
      '26': 4,
      '27': 3,
      '250': 13,
      '130': 5,
      '133': 3,
      '134': 4,
      '256': 3,
      '138': 3,
      '30': 37,
      '31': 3,
      '32': 11,
      '33': 4,
      '34': 7,
      '35': 6,
      '36': 10,
      '37': 4,
      '38': 3,
      '39': 3,
      '140': 6,
      '386': 3,
      '300': 20,
      '429': 3,
      '40': 28,
      '42': 9,
      '43': 5,
      '44': 6,
      '45': 5,
      '46': 6,
      '48': 8,
      '49': 3,
      '150': 15,
      '50': 36,
      '51': 4,
      '52': 5,
      '54': 6,
      '55': 5,
      '56': 10,
      '57': 3,
      '160': 6,
      '200': 37,
      '600': 6,
      '207': 4,
      '60': 43,
      '61': 3,
      '62': 4,
      '63': 5,
      '64': 4,
      '66': 6,
      '69': 4,
      '173': 3,
      '176': 3,
      '456': 3,
      '70': 5,
      '72': 7,
      '75': 9,
      '180': 9,
      '220': 4,
      '100': 35,
      '500': 12,
      '104': 5,
      '1000': 55,
      '80': 29
    };

    this.apiSelectedResponse = [];

    this.data = {
      facetGroupName: this.apiGroupNameResponse,
      selected: this.selected,
      facetGroupData: this.transformToFacetModel(this.apiGroupResponse),
      showHistogram: true
    };

    this.type = SearchFacetType.RANGE;
  }

  transformToFacetModel(facets:any): SearchFacetModel[] {
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
        this.selected.push(facet);
      }
    });

    return transformed;
  }

  public onSelectedEvent($event: any): void {
    console.log($event);
  }
}
