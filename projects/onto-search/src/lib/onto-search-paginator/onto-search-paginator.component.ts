import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers, OnChanges,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {PageData, PaginatorData} from './models/onto-search-paginator-models';

@Component({
  selector: 'onto-search-paginator',
  templateUrl: './onto-search-paginator.component.html',
  styleUrls: ['./onto-search-paginator.component.scss']
})
export class OntoSearchPaginatorComponent implements OnInit, OnChanges, DoCheck {
  /**
   * Paginator data
   */
  @Input()
  paginatorData: PaginatorData;

  /**
   * Array of page size options. Default is [5, 10, 20]
   */
  @Input()
  pageOptions: number[];

  /**
   * Fires when there is a change to page or page size.
   * Emits an {@link PageData} object
   */
  @Output()
  pageChanged: EventEmitter<PageData> = new EventEmitter<PageData>();

  // Default and initial values
  length: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 20];
  pageIndex: number = 0;

  private paginatorDataDiff: KeyValueDiffer<string, any>;

  constructor(private keyValueDiffer: KeyValueDiffers) {
  }

  ngOnInit(): void {
    this.length = this.paginatorData.length;
    this.pageSize = this.paginatorData.pageSize;
    this.pageSizeOptions = this.pageOptions;
    this.pageIndex = this.paginatorData.pageIndex;
    this.paginatorDataDiff = this.keyValueDiffer.find(this.paginatorData).create();
  }

  /**
   * Takes care of change detection in pageOptions properties
   */
  ngDoCheck(): void {
    const changes = this.paginatorDataDiff.diff(this.paginatorData);
    if (changes) {
      this.configurationChanged(changes);
    }
  }

  /**
   * Monitors changes to inputs and sets corresponding internal properties
   * @param changes - input changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.pageOptions.currentValue) {
      this.pageSizeOptions = changes.pageOptions.currentValue;
    }
  }

  onPageChanged(pageEvent: PageEvent): void {
    const pageData: PageData = {
      pageIndex: pageEvent.pageIndex,
      pageSize: pageEvent.pageSize
    };
    this.pageChanged.next(pageData);
  }

  /**
   * Applies changes from pageOption to internal properties
   * @param changes - contains changes of pageOption properties
   */
  private configurationChanged(changes: KeyValueChanges<string, any>): void {
    changes.forEachChangedItem((change) => this[change.key] = change.currentValue);
  }
}
