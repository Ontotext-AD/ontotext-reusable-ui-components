import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TableConfig} from './models/configuration-types';

@Component({
  selector: 'onto-search-results',
  templateUrl: './onto-search-results.component.html',
  styleUrls: ['./onto-search-results.component.scss'],
})
export class OntoSearchResultsComponent implements OnChanges {
  @Input()
  public datasource: any[];

  @Input()
  public config: TableConfig;

  @Input()
  componentClass: string | string[];

  displayColumns: string[];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && changes.config.currentValue) {
      this.displayColumns = this.config.columnConfigurations.map((column) => column.name);
    }
  }
}
