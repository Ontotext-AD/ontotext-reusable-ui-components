import { Component, OnInit } from '@angular/core';
import {Select2OptionData} from "src/app/onto-search/select2/select2-option-data";

@Component({
  selector: 'onto-search',
  templateUrl: './onto-search.component.html',
  styleUrls: ['./onto-search.component.scss']
})
export class OntoSearchComponent implements OnInit {
  public exampleData: Array<Select2OptionData>;

  constructor() { }

  ngOnInit(): void {
    this.exampleData = [
      {
        id: 'basic1',
        text: 'Basic 1'
      },
      {
        id: 'basic2',
        disabled: true,
        text: 'Basic 2'
      },
      {
        id: 'basic3',
        text: 'Basic 3'
      },
      {
        id: 'basic4',
        text: 'Basic 4'
      }
    ];
  }
}
