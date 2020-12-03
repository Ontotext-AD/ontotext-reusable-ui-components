import {Component, Input, TemplateRef} from '@angular/core';
import {OntoSearchFacetComponent} from '../onto-search-facet.component';
import {SearchRangeFacetGroupModel} from './models/search-range-facet-group-model';

@Component({
  selector: 'onto-range-facet',
  templateUrl: './range-facet.component.html',
  styleUrls: ['./range-facet.component.scss']
})
export class RangeFacetComponent extends OntoSearchFacetComponent {
  /**
   * Holds the range facet group data.
   */
  @Input()
  public data: SearchRangeFacetGroupModel;

  /**
   * Custom template reference. Will override the template used in facet preview.
   * When creating the custom template, a variable must be declared in order to access the object and its properties.
   * The variable represents the selected range.
   * e.q. {start: 5, end: 100}
   *
   * A second variable is declared to represent the sum of the objects found in the selected range.
   *
   * For example, if you name you range variable item, and your sum variable sum:
   *
   * <ng-template #basicFacetTemplate let-item let-sum="sum">
   * <div class="selected-sum" appCypressData="selected-sum">Selected: {{sum}}</div>
   * <div class="selected-min" appCypressData="selected-min">Selected min: <span appCypressData="selected-min-value">{{item?.start}}</span></div>
   * <div class="selected-max" appCypressData="selected-max">Selected max: <span appCypressData="selected-max-value">{{item?.end}}</span></div>
    *</ng-template>
   */
  @Input()
  public facetTemplate: TemplateRef<any>;
}
