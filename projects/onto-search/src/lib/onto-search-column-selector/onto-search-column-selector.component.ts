import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {FormControl} from '@angular/forms';
import {SelectionColumn} from './models/selection-column';
import {SelectionColumnGroup} from './models/selection-column-group';

@Component({
  selector: 'onto-search-column-selector',
  templateUrl: './onto-search-column-selector.component.html',
  styleUrls: ['./onto-search-column-selector.component.scss']
})
export class OntoSearchColumnSelector implements OnChanges {
  selection: SelectionColumn[] = [];
  selectCtrl = new FormControl();

  /**
   * The groups of columns information for the dropdown select
   */
  @Input()
  columnGroups: SelectionColumnGroup[];

  /**
   * Sets selected columns in dropdown select
   */
  @Input()
  selectedColumns: SelectionColumn[];

  /**
   * Sets default columns. Shown when no selectedColumns are passed and when
   * reset button is pressed
   */
  @Input()
  defaultColumns: SelectionColumn[];

  /**
   * Fired when the dropdown panel is closed.
   * Sends an array {@link SelectionColumn}
   */
  @Output()
  selectionChanged: EventEmitter<SelectionColumn[]> = new EventEmitter<SelectionColumn[]>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const defaultColumns = changes?.defaultColumns?.currentValue;
    const selectedColumns = changes?.selectedColumns?.currentValue;
    if (defaultColumns) {
      if (!this.selectedColumns) {
        this.setFormColumnSelection(defaultColumns);
      }
    }
    if (selectedColumns) {
      this.setFormColumnSelection(selectedColumns);
    }
  }

  selectionChangedInternal($event: MatSelectChange): void {
    this.selection = $event.value;
  }

  onClosed(): void {
    this.selectionChanged.next(this.selection);
  }

  compareColumnsByLabel(column1: SelectionColumn, column2: SelectionColumn): boolean {
    return column1.label === column2.label;
  }

  resetColumns(): void {
    this.setFormColumnSelection(this.defaultColumns);
  }

  private setFormColumnSelection(columns: SelectionColumn[]): void {
    this.selectCtrl.setValue([...columns]);
    this.selectCtrl.updateValueAndValidity();
    this.selection = columns;
    this.onClosed();
  }
}
