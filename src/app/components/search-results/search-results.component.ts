import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TableConfig} from '../../../../projects/onto-search/src/lib/onto-search-results/models/configuration-types';
import {Sort} from '@angular/material/sort';
import {PaginatorData} from '../../../../projects/onto-search/src/lib/onto-search-paginator/models/onto-search-paginator-models';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  @ViewChild('template', {static: true}) template: TemplateRef<any>;

  private datasource: any[] = [];
  pagedViewDatasource: any[];

  tableConfig: TableConfig;

  paginatorData: PaginatorData;
  pageSizeOptions = [5, 10, 20];

  tableSort: Sort;

  constructor() {
  }

  ngOnInit(): void {
    this.initDatasource();
    this.initTable();
    this.getPagedView({pageIndex: 0, pageSize: 10, length: this.datasource.length});
  }

  initDatasource(): void {
    for (let i = 0; i < 50; i++) {
      this.datasource.push({
        id: i,
        username: `user${i}`,
        name: `user ${i}`,
        column3: i * 10,
        column4: `column 4-${i}`,
      });
    }
  }

  initTable(): void {
    this.tableConfig = {
      columnConfigurations: [
        {
          name: 'username',
          label: 'User Name',
          dataFunction: (data): string => 'Username: ' + data.username,
          footerFunction: (): string => '5',
          enableSort: true,
          permanent: true,
          order: 1
        },
        {
          name: 'name',
          label: 'Name',
          dataFunction: (data): string => 'Name: ' + data.name,
          footerFunction: (): string => '5',
          enableSort: true,
          permanent: true,
          order: 0
        },
        {
          name: 'column3',
          label: 'column 3 Label',
          footerFunction: (datasource, columnConfig): string => {
            return datasource.map((data: any) => data[columnConfig.name]).reduce((previousValue, currentValue) => previousValue + currentValue);
          },
          dataFunction: (data): string => data.column3,
          enableSort: false,
          order: 44,
        },
        {
          name: 'id',
          label: 'Id',
          dataFunction: (data): string => data.id,
          footerFunction: (): string => null,
        },
        {
          name: 'column4',
          label: 'column 4 Label',
          footerFunction: (): string => '5',
          dataTemplate: this.template,
          order: 22
        }
      ],
      showFooter: true,
      enableSort: true,
    };
    this.tableSort = {
      active: 'id',
      direction: 'asc'
    };
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
    this.getPagedView(this.paginatorData);
  }

  onPageChanged(pageData: PaginatorData): void {
    this.pagedViewDatasource = this.datasource.slice(pageData.pageIndex * pageData.pageSize, (pageData.pageIndex + 1) * pageData.pageSize);
    this.paginatorData.pageIndex = pageData.pageIndex;
  }

  private getPagedView(pageData?: PaginatorData): void {
    this.paginatorData = {
      pageIndex: pageData.pageIndex,
      length: pageData.length,
      pageSize: pageData.pageSize,
    };

    // Return paged view of datasource
    this.pagedViewDatasource = this.datasource
        .slice(this.paginatorData.pageIndex * this.paginatorData.pageSize,
            (this.paginatorData.pageIndex + 1) * this.paginatorData.pageSize);
  }
}
