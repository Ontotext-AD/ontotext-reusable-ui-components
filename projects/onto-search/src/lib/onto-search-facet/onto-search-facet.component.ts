import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {SearchFacetModel} from './models/search-facet-model';
import {SearchFacetType} from './models/search-facet-type';

@Component({
  selector: 'onto-search-facet',
  templateUrl: './onto-search-facet.component.html',
  styleUrls: ['./onto-search-facet.component.scss']
})
export class OntoSearchFacetComponent implements OnInit {
  /**
   * Holds the facet group data.
   */
  @Input()
  public data: SearchFacetModel;

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
   * <ng-template #basicFacetTemplate let-item>
   * <span class="facet-label">{{item.key}}</span>
   * <span class="facet-count">({{item.value.count}})</span>
   * </ng-template>
   */
  @Input()
  public basicFacetTemplate?: TemplateRef<any>;

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
  public facetTitleTemplate?: TemplateRef<any>;

  /**
   * Emits selected search facets on selection change.
   */
  @Output()
  public onSelectionChange: EventEmitter<any> = new EventEmitter<any>();

  public BASIC: SearchFacetType = SearchFacetType.BASIC;
  public facetGroup: Map<number, any>;
  public facetGroupName: string | Date | number;
  public selected: string[];

  ngOnInit(): void {
    this.facetGroupName = this.data.facetGroupName;
    this.selected = this.data.selected;
    this.facetGroup = this.data.facetGroup;
  }

  public onSelectionEvent(): void {
    this.onSelectionChange.emit(this.selected);
  }
}