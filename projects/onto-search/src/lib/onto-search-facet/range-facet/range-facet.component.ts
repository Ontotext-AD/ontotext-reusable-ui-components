import {Component, Input} from '@angular/core';
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
}
