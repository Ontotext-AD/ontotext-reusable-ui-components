import {Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {SearchConfiguration} from './../models/search-configuration';
import {SearchModel} from './../models/search-model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input()
  private states: Observable<SearchModel[]>;
  private _states: SearchModel[];

  @Input()
  public workingTemplate: TemplateRef<any>;

  @Output()
  public onSearch: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('statesInput') statesInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  public statesList: Set<any> = new Set<any>();
  public stateCtrl = new FormControl();
  public filteredStates: Observable<any[]>;
  public currentTemplate: TemplateRef<any>;

  public selectable: boolean = SearchConfiguration.selectable;
  public removable: boolean = SearchConfiguration.removable;
  public separatorKeysCodes = SearchConfiguration.separatorKeysCodes;

  constructor() {
    this.filteredStates = this.stateCtrl.valueChanges
        .pipe(
            startWith(''),
            map((state: string | null) => state ? this._filterStates(state) : Array.from(this.statesList)));
  }

  public ngOnInit(): void {
    this.states.subscribe((states) => {
      this._states = states;
    });
    this.currentTemplate = this.workingTemplate;
  }

  private _filterStates(value: string): any[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value;
    return this._states.filter((state) => state.label.toLowerCase().indexOf(filterValue) === 0);
  }

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.statesList.add(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.stateCtrl.setValue(null);
    this.autocomplete.closePanel();
  }

  public remove(state: any) {
    this.statesList.delete(state);
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    this.statesList.add(event.option.value);
    this.statesInput.nativeElement.value = '';
    this.stateCtrl.setValue(null);
  }

  public search() {
    this.onSearch.emit(Array.from(this.statesList));
  }
}
