import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {Observable, of} from 'rxjs';
import {SearchFieldModel} from './models/search-field-model';


@Component({
  selector: 'onto-search-field',
  templateUrl: './onto-search-field.component.html',
  styleUrls: ['./onto-search-field.component.scss'],
})
export class OntoSearchFieldComponent implements OnInit {
  /**
   * Custom template reference. Will override the template used in autocomplete dropdown.
   * When creating the custom template, a variable must be declared in order to access the object and its properties.
   * The variable holds the index number of the element in it's index parameter, and the element in it's state parameter.
   *
   * For example, if you name you variable item:
   * <ng-template #customTemplate let-item>
   * <span [attr.appCypressData]="'custom-state-label-' + item.index" class="state-label">{{item.state.label}}</span>
   * </ng-template>
   */
  @Input()
  customTemplate?: TemplateRef<any>;

  /**
   * Preselected states list.
   */
  @Input()
  public selectedList: any[];

  /**
   * Observable of data that is provides autocomplete options
   */
  @Input()
  private autocompleteData: Observable<SearchFieldModel[]>;

  /**
   * If the results for the autocomplete are obtained at once and the component is responsible for filtering them,
   * then the true must be set.
   * By default is set to false assuming every key press sends a request for a new list of autocomplete results.
   */
  @Input()
  enableInnerAutocompleteFiltration: boolean;

  /**
   * A custom function that applies to each of the selected search objects, which is not free text.
   * The function is applied to the selected search phrases when Search button is pressed.
   *
   * If not specified, the component returns the selected object unmodified.
   *
   * Example:
   * this.searchResultMappingFunction = (data) => data.label;
   */
  @Input()
  public searchResultMappingFunction: any;

  /**
   * Emits selected search phrases on search button press.
   */
  @Output()
  onSearch: EventEmitter<any> = new EventEmitter<any>();

  /**
   * On key press event emitter.
   */
  @Output()
  public onKeyPress: EventEmitter<any> = new EventEmitter<any>();

  public states: Observable<SearchFieldModel[]>;

  ngOnInit(): void {
    this.states = this.autocompleteData || of([]);
  }

  public onSearchEvent($event: any): void {
    this.onSearch.emit($event);
  }

  public onKeyPressEvent($event: any): void {
    this.onKeyPress.emit($event);
  }
}
