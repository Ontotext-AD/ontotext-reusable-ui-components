import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef} from '@angular/core';
import {SearchFacetGroupModel} from './models/search-facet-group-model';
import {SearchFacetType} from './models/search-facet-type';
import {SearchFacetModel} from './models/search-facet-model';
import {OnDestroyMixin} from '@w11k/ngx-componentdestroyed';
import {SearchFacetSelection} from './models/search-facet-selection';

@Component({
  selector: 'onto-search-facet',
  templateUrl: './onto-search-facet.component.html',
  styleUrls: ['./onto-search-facet.component.scss']
})
export class OntoSearchFacetComponent extends OnDestroyMixin implements OnChanges {
  /**
   * Holds the facet group data.
   */
  @Input()
  public data: SearchFacetGroupModel;

  /**
   * Used do define the facet type.
   */
  @Input()
  public type: SearchFacetType;

  /**
   * Custom template reference. Will override the template used in facet preview.
   * When creating the custom template, a variable must be declared in order to access the object and its properties.
   * The variable represents a map element - the key holds the label of the facet. The value is a two element object,
   * containing the search result's count and a boolean variable, bind to the selected status.
   * e.q. "Facet Label" => {count: 5, selected: true}
   *
   * For example, if you name you variable item:
   * <ng-template #checkboxFacetTemplate let-item>
   * <span class="facet-label">{{item.key}}</span>
   * <span class="facet-count">({{item.value.count}})</span>
   * </ng-template>
   */
  @Input()
  public facetTemplate: TemplateRef<any>;

  /**
   * Custom template reference. Will override the template used in facet name preview.
   * You can pass directly the desired facet group name=
   *
   * For example:
   * <ng-template #facetTitleTemplate>
   * <strong>{{facetGroupName}}</strong>
   * </ng-template>
   */
  @Input()
  public facetTitleTemplate: TemplateRef<any>;

  /**
   * Emits selected search facets on selection change.
   */
  @Output()
  public onSelectionChange: EventEmitter<SearchFacetSelection> = new EventEmitter<SearchFacetSelection>();

  public CHECKBOX: SearchFacetType = SearchFacetType.CHECKBOX;
  public DATEPICKER: SearchFacetType = SearchFacetType.DATE_RANGE;
  public TOGGLE: SearchFacetType = SearchFacetType.TOGGLE;
  public RANGE: SearchFacetType = SearchFacetType.RANGE;
  public DROPDOWN_MULTI_SELECT: SearchFacetType = SearchFacetType.DROPDOWN_MULTI_SELECT;

  public facetGroup: SearchFacetModel[];
  public facetGroupName: string;
  public selected: SearchFacetModel[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      this.facetGroupName = this.data.facetGroupName;
      this.facetGroup = this.data.facetGroupData;
      this.selected = this.data.selected;
    }
  }

  public onSelectionEvent($event): void {
    this.onSelectionChange.emit($event);
  }
}
