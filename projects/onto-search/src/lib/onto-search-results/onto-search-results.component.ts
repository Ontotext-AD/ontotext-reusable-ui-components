import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {TableConfig} from './models/configuration-types';
import {Sort} from '@angular/material/sort';

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

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && changes.config.currentValue) {
      const permanentColumns = [...this.config.columnConfigurations
          .filter((column) => column.permanent)]
          .map((column) => column.name);

      const dynamicColumns = [...this.config.columnConfigurations
          .filter((column) => !column.permanent && !column.hidden)]
          .map((column) => column.name);

      this.displayColumns = [...permanentColumns, ...dynamicColumns];
    }
  }
}
