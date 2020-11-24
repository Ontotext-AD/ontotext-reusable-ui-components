import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SearchFacetType} from '../models/search-facet-type';
import {OntoSearchFacetComponent} from '../onto-search-facet.component';
import {BehaviorSubject} from 'rxjs';
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

  @Input()
  public type: SearchFacetType;

  @Output()
  public selectionChange: EventEmitter<any> = new EventEmitter<any>();

  public containerWidth: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public onSliderWidth(width: number): void {
    this.containerWidth.next(width);
  }
}
