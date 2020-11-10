import {Component, OnInit} from '@angular/core';
import {SelectionColumnGroup} from '../../../projects/onto-search/src/lib/onto-search-column-selector/models/selection-column-group';
import {SelectionColumn} from '../../../projects/onto-search/src/lib/onto-search-column-selector/models/selection-column';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-column-selector',
  templateUrl: './search-column-selector.component.html',
  styleUrls: ['./search-column-selector.component.scss']
})
export class SearchColumnSelectorComponent implements OnInit {
  defaultColumns: SelectionColumn[] = [{label: 'Username'}];
  selectedColumns: any;

  columnGroups: SelectionColumnGroup[] = [
    {
      label: 'Default Columns',
      columns: [...this.defaultColumns, {label: 'Name'}]
    },
    {
      label: 'Other Columns',
      columns: [{label: 'Other Column'}]
    }]
  outsideSelection: SelectionColumn[];

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const useDefaultOptions = this.activatedRoute.snapshot.queryParams['defaultOptions'];
    if (!useDefaultOptions) {
      this.outsideSelection = [this.columnGroups[0].columns[1]];
    }
  }

  onColumnSelection(selectedColumns: SelectionColumn): void {
    this.selectedColumns = selectedColumns;
  }

  changeSelection(): void {
    this.outsideSelection = [...this.columnGroups[1].columns];
  }
}
