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
  private preselectedStatesList: any[];

  @Input()
  public autocompleteOptionTemplate: TemplateRef<any>;

  @Output()
  public onSearch: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('statesInput') statesInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  public statesList: Set<any>;
  public stateCtrl = new FormControl();
  public filteredStates: Observable<any[]>;
  public currentTemplate: TemplateRef<any>;

  public selectable: boolean = SearchConfiguration.selectable;
  public removable: boolean = SearchConfiguration.removable;
  public separatorKeysCodes = SearchConfiguration.separatorKeysCodes;

  public ngOnInit(): void {
    this.filteredStates = this.stateCtrl.valueChanges
        .pipe(
            startWith(''),
            map((state: string | null) => state ? this.filterStates(state) : [...this.statesList]));

    this.states.subscribe((states) => {
      this._states = states;
    });

    this.currentTemplate = this.autocompleteOptionTemplate;
    this.statesList = new Set<any>([...this.preselectedStatesList]);
  }

  private filterStates(value: string): any[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value;
    return this._states.filter((state) => state.label.toLowerCase().indexOf(filterValue) === 0);
  }

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = (event.value || '').trim();

    if (value) {
      this.statesList.add(value);
    }

    if (input) {
      input.value = '';
    }

    this.stateCtrl.setValue(null);
    this.autocomplete.closePanel();
  }

  public remove(event, state: any): void {
    console.log(event);
    event.preventDefault();
    this.statesList.delete(state);
    this.autocomplete.closePanel();

    console.log(this.statesList);
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    this.statesList.add(event.option.value);
    this.statesInput.nativeElement.value = '';
    this.stateCtrl.setValue(null);
  }

  public search() {
    this.onSearch.emit([...this.statesList]);
  }
}
