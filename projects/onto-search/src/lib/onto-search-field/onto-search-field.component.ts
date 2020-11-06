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
