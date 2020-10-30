import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {Observable, of} from 'rxjs';
import {SearchModel} from './models/search-model';

@Component({
  selector: 'onto-search-field',
  templateUrl: './onto-search-field.component.html',
  styleUrls: ['./onto-search-field.component.scss'],
})
export class OntoSearchFieldComponent implements OnInit {
  @Input()
  customTemplate?: TemplateRef<any>;
  @Input()
  private selectedList: any[];
  @Input()
  private autocompleteData: Observable<SearchModel[]>;
  @Output()
  onSearch: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public onKeyPress: EventEmitter<any> = new EventEmitter<any>();

  states: Observable<SearchModel[]>;

  ngOnInit(): void {
    this.states = this.autocompleteData || of([]);
  }

  public onSearchEvent($event: any): void {
    this.onSearch.emit($event);
  }

  public getSelectedList(): any[] {
    return this.selectedList || [];
  }

  public onKeyPressEvent($event: any): void {
    this.onKeyPress.emit($event);
  }
}
