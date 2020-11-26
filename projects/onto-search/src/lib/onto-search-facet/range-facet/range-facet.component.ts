import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SearchFacetType} from '../models/search-facet-type';
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
   * Facet type holder.
   */
  @Input()
  public type: SearchFacetType;

  /**
   * On range selection change emitter.
   */
  @Output()
  public selectionChange: EventEmitter<any> = new EventEmitter<any>();
}
