import {Component, OnInit} from '@angular/core';
import {SearchFacetType} from '../../../../projects/onto-search/src/lib/onto-search-facet/models/search-facet-type';
import {SearchDateFacetGroupModel} from '../../../../projects/onto-search/src/lib/onto-search-facet/date-range-facet/models/search-date-facet-group-model';
import {SearchDateFacetModel} from '../../../../projects/onto-search/src/lib/onto-search-facet/date-range-facet/models/search-date-facet-model';
import {DateRange} from '@angular/material/datepicker';
import {ActivatedRoute} from '@angular/router';
import {SearchDateFacetRange} from '../../../../projects/onto-search/src/lib/onto-search-facet/date-range-facet/models/search-date-facet-range';

@Component({
  selector: 'app-search-datepicker-facet',
  templateUrl: './search-datepicker-facet.component.html',
  styleUrls: ['./search-datepicker-facet.component.scss']
})
export class SearchDatepickerFacetComponent implements OnInit {
  public data: SearchDateFacetGroupModel;
  public type: SearchFacetType;
  public selected: SearchDateFacetRange;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.type = SearchFacetType.DATE_RANGE;

    this.data = {
      facetGroupName: apiResponse._name,
      facetGroupData: this.mapResponseToFacetModel(),
      selected: null,
      placeholder: 'Select date range',
      selectedRange: this.getPreselectRange()
    };
  }

  public onSelectedEvent($event: any): void {
    this.selected = $event;
  }

  public deselect(): void {
    this.selected = undefined;
    this.data.selectedRange = null;
  }

  private transformDateString(dateString: string): string {
    const dateParts = dateString.split('-');
    return [dateParts[1], dateParts[2], dateParts[0]].join('-');
  }

  private mapResponseToFacetModel(): SearchDateFacetModel[] {
    const facetData: SearchDateFacetModel[] = [];
    for (const key of Object.keys(apiResponse._values)) {
      const count = apiResponse._values[key];
      const transformedDateString = this.transformDateString(key);

      facetData.push({
        count,
        facetData: new Date(transformedDateString),
        selected: false,
        label: key
      });
    }
    return facetData;
  }

  private getPreselectRange(): SearchDateFacetRange {
    if (this.activatedRoute.snapshot.queryParams['usePreselectedRange']) {
      return {
        dateRange: new DateRange<Date>(new Date('11 1 2020'), new Date('11 27 2020'))
      };
    }
    return null;
  }
}

const apiResponse: any = {
  _name: 'Creation Date',
  _values: {
    '2020-05-12': 139,
    '2020-05-18': 141,
    '2020-11-25': 140,
    '2020-11-02': 155,
    '2020-11-28': 155,
    '2014-11-02': 144,
  }
};
