import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TableConfig} from '../../../../projects/onto-search/src/lib/onto-search-results/models/configuration-types';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  @ViewChild('template', {static: true}) template: TemplateRef<any>;


  datasource: any[];
  config: TableConfig;
  tableSort: Sort;

  constructor() {
  }

  ngOnInit(): void {
    this.initTable();
  }

  private initTable(): void {
    this.config = {
      columnConfigurations: [
        {
          name: 'username',
          label: 'User Name',
          dataFunction: (data): string => 'Username: ' + data.username,
          footerFunction: (): string => '5',
          enableSort: true
        },
        {
          name: 'name',
          label: 'Name',
          dataFunction: (data): string => 'Name: ' + data.name,
          footerFunction: (): string => '5',
          enableSort: true
        },
        {
          name: 'column3',
          label: 'column 3 Label',
          footerFunction: (datasource, columnConfig): string => {
            return datasource.map((data: any) => data[columnConfig.name]).reduce((previousValue, currentValue) => previousValue + currentValue);
          },
          dataFunction: (data): string => data.column3,
          enableSort: false
        },
        {
          name: 'column4',
          label: 'column 4 Label',
          footerFunction: (): string => '5',
          dataTemplate: this.template
        }
      ],
      showFooter: true,
      enableSort: true,
    };

    this.datasource = [
      {username: 'user1', name: 'user 1', column3: 13, column4: 'column 41'},
      {username: 'user2', name: 'user 2', column3: 18, column4: 'column 42'},
    ];

    this.tableSort = {
      active: 'name',
      direction: 'asc'
    };
    this.sortChanged(this.tableSort);
  }

  sortChanged($event: Sort): void {
    this.datasource.sort((a, b) => {
      let result;
      if (a[$event.active] > b[$event.active]) {
        result = 1;
      } else if (a[$event.active] < b[$event.active]) {
        result = -1;
      } else {
        result = 0;
      }
      if ($event.direction === 'asc') {
        return result;
      } else if ($event.direction === 'desc') {
        return result * -1;
      }
      return;
    });
    this.datasource = [...this.datasource];
  }
}
