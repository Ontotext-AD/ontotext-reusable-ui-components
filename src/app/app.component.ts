import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TableConfig} from '../../projects/onto-search/src/lib/onto-search-results/models/configuration-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('template', {static: true}) template: TemplateRef<any>;

  title = 'ontotext-reusable-ui-components';

  datasource: any[];
  config: TableConfig;

  constructor() {
  }

  public ngOnInit(): void {
    console.log(this.template);
    this.initTable();
  }

  private initTable(): void {
    this.config = {
      columnConfigurations: [
        {name: 'username', label: 'User Name', dataFunction: (data) => 'Username: ' + data.username, footerFunction: () => '5'},
        {name: 'name', label: 'Name', dataFunction: (data) => 'Name: ' + data.name, footerFunction: () => '5'},
        {name: 'column3', label: 'column 3 Label', footerFunction: () => '5', dataFunction: (data) => data.column3},
        {name: 'column4', label: 'column 4 Label', footerFunction: () => '5', dataTemplate: this.template},
      ],
      showFooter: true,
    };

    this.datasource = [
      {username: 'user1', name: 'user 1', column3: 'column 3', column4: 'column 41'},
      {username: 'user2', name: 'user 2', column3: 'column 3', column4: 'column 42'},
      {username: 'user2', name: 'user 2', column3: 'column 3', column4: 'column 42'},
      {username: 'user2', name: 'user 2', column3: 'column 3', column4: 'column 42'},
      {username: 'user3', name: 'user 3', column3: 'column 3', column4: 'column 43'},
      {username: 'user3', name: 'user 3', column3: 'column 3', column4: 'column 44'},
    ];
  }
}
