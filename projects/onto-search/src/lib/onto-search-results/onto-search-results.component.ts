import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ColumnConfig, TableConfig} from './models/configuration-types';
import {Sort} from '@angular/material/sort';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'onto-search-results',
  templateUrl: './onto-search-results.component.html',
  styleUrls: ['./onto-search-results.component.scss'],
})
export class OntoSearchResultsComponent implements OnChanges {
  /**
   * The data source for the table
   */
  @Input()
  public datasource: any[];

  /**
   * Table configuration, containing table and column specific configuration
   * If configuration is changed dynamically it must be passed as new object to
   * be detected by angular change detection
   */
  @Input()
  public config: TableConfig;

  /**
   * Table sort information
   */
  @Input()
  sort: Sort;

  /**
   * Styling class applied to div wrapper of the table
   */
  @Input()
  componentClass: string | string[];

  /**
   * Fired whenever there is change in sorting column or direction.
   * Sends a {@link Sort} object
   */
  @Output()
  sortData: EventEmitter<Sort> = new EventEmitter<Sort>();
  displayColumns: string[];

  private initialSort = true;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && changes.config.currentValue) {
      if (this.initialSort) {
        this.sortColumnConfigurations();
        this.initialSort = false;
      }
      this.setDisplayColumns([...this.getVisibleColumnNames()]);
    }
  }

  reorderColumns(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
        this.config.columnConfigurations,
        this.findColumnConfigIndexByName(this.displayColumns[event.previousIndex]),
        this.findColumnConfigIndexByName(this.displayColumns[event.currentIndex]));
    this.setDisplayColumns(this.getVisibleColumnNames());
  }

  private findColumnConfigIndexByName(name: string): number {
    return this.config.columnConfigurations.findIndex((columnConfig) => columnConfig.name === name);
  }

  /**
   * Sorts the column configurations by permanent columns first
   */
  private sortColumnConfigurations(): void {
    const permanentCC = this.getFilteredColumnConfigs((column) => column.permanent);
    const dynamicCC = this.getFilteredColumnConfigs((column) => !column.permanent);
    this.config.columnConfigurations = [...permanentCC, ...dynamicCC];
  }

  private setDisplayColumns(columnNamesArray: string[]): void {
    this.displayColumns = columnNamesArray;
  }

  private getFilteredColumnConfigs(filterPredicate: (column: ColumnConfig) => boolean): ColumnConfig[] {
    return this.config.columnConfigurations.filter(filterPredicate);
  }

  private getVisibleColumnNames(): string[] {
    return this.getFilteredColumnConfigs((column) => column.permanent || !column.hidden)
        .map((column) => column.name);
  }
}
