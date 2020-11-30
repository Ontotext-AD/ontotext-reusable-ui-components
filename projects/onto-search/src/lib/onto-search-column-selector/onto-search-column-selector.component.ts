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

  selectCtrl = new FormControl();
  private selection: SelectionColumn[] = [];
  private isSelectionChanged = false;

  ngOnChanges(changes: SimpleChanges): void {
    const defaultColumns = changes?.defaultColumns?.currentValue;
    const selectedColumns = changes?.selectedColumns?.currentValue;
    const columnGroups = changes?.columnGroups?.currentValue;

    if (defaultColumns && defaultColumns.length > 0 && !this.selectedColumns) {
      this.setFormColumnSelection(defaultColumns);
    }
    if (selectedColumns) {
      this.setFormColumnSelection(selectedColumns);
    }
    if (columnGroups?.length) {
      this.columnGroups.sort(this.compareColumnsByLabel);
    }
  }

  selectionChangedInternal($event: MatSelectChange): void {
    this.isSelectionChanged = true;
    this.selection = $event.value;
  }

  onClosed(): void {
    if (this.isSelectionChanged) {
      this.isSelectionChanged = false;
      this.selectionChanged.next(this.selection);
    }
  }

  compareColumnsLabels(columnA: SelectionColumn, columnB: SelectionColumn): boolean {
    return columnA.label === columnB.label;
  }

  resetColumns(): void {
    this.setFormColumnSelection(this.defaultColumns);
    this.onClosed();
  }

  private setFormColumnSelection(columns: SelectionColumn[]): void {
    this.selectCtrl.setValue([...columns]);
    this.selectCtrl.updateValueAndValidity();
    this.selection = columns;
    this.isSelectionChanged = true;
  }

  private compareColumnsByLabel(columnA: SelectionColumn, columnB: SelectionColumn): number {
    if (columnA.label > columnB.label) {
      return 1;
    } else if (columnB.label > columnA.label) {
      return -1;
    }
    return 0;
  }
}
