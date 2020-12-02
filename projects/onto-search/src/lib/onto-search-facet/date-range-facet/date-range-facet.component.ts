import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {OntoSearchFacetComponent} from '../onto-search-facet.component';
import {FormControl, FormGroup} from '@angular/forms';
import {SearchDateFacetGroupModel} from './models/search-date-facet-group-model';
import moment, {Moment} from 'moment';
import {DateRange, MatDateRangePicker} from '@angular/material/datepicker';
import {SearchDateFacetModel} from './models/search-date-facet-model';
import {SearchDateFacetRange} from './models/search-date-facet-range';
import {DomPortalOutlet, TemplatePortal} from '@angular/cdk/portal';

const DATE_PATTERNS = {
  YEAR: 'YYYY',
  MONTH: 'MMMM YYYY',
  DAY: 'MMMM D, YYYY'
};

@Component({
  selector: 'onto-daterange-facet',
  templateUrl: './date-range-facet.component.html',
  styleUrls: ['./date-range-facet.component.scss']
})
export class DateRangeFacetComponent extends OntoSearchFacetComponent implements OnChanges {
  @ViewChild('toolTipTemplate') toolTipTemplate: TemplateRef<any>;
  @Input()
  public data: SearchDateFacetGroupModel;
  @Output()
  public onSelectionChange: EventEmitter<SearchDateFacetRange> = new EventEmitter<SearchDateFacetRange>();

  dateRangeGroup: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  datePickerPlaceholder: string;

  private daysMap: Map<string, number> = new Map<string, number>();
  private monthsMap: Map<string, number> = new Map<string, number>();
  private yearsMap: Map<string, number> = new Map<string, number>();

  private buttonUnsubscribeFns: (() => void)[] = [];

  constructor(private renderer: Renderer2,
              private _viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private applicationRef: ApplicationRef,
              private injector: Injector) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    this.mapFacetDates(this.data.facetGroupData);

    this.datePickerPlaceholder = this.data.placeholder;
    if (this.data.selectedRange) {
      this.setSelectedRange(this.data.selectedRange);
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.unsubscribeBtnListeners();
  }

  calendarOpened(): void {
    // Add to event loop queue to execute after angular has finished working on the dom
    setTimeout(() => {
      this.unsubscribeBtnListeners();
      const buttons = this.getCalendarPanelButtons();
      this.subscribeToBtnListeners(buttons);
      this.updateDayStyles();
    });
  }

  calendarClosed(): void {
    this.unsubscribeBtnListeners();
    if (this.dateRangeGroup.get('end').value && this.dateRangeGroup.get('start').value) {
      this.data.selectedRange = this.getSearchDateFacetRange();
      this.onSelectionChange.emit(this.data.selectedRange);
    }
  }

  inputChange(picker: MatDateRangePicker<Moment>): void {
    if (!picker.opened) {
      this.calendarClosed();
    }
  }

  private mapFacetDates(facetGroupData: SearchDateFacetModel[]): void {
    for (const facet of facetGroupData) {
      const monthDate = moment(facet.facetData).startOf('month').toISOString();
      const yearDate = moment(facet.facetData).startOf('year').toISOString();
      this.daysMap.set(moment(facet.facetData).toISOString(), +facet.count);
      const existingMonth = this.monthsMap.get(monthDate) || 0;
      this.monthsMap.set(monthDate, existingMonth + +facet.count);
      const existingYear = this.yearsMap.get(yearDate) || 0;
      this.yearsMap.set(yearDate, existingYear + +facet.count);
    }
  }

  private updateDayStyles(): void {
    if (document.querySelector('mat-month-view')) {
      this.addTooltipsToCalendarCells('mat-month-view', this.daysMap, DATE_PATTERNS.DAY);
    } else if (document.querySelector('mat-multi-year-view')) {
      this.addTooltipsToCalendarCells('mat-multi-year-view', this.yearsMap, DATE_PATTERNS.YEAR);
    } else if (document.querySelector('mat-year-view')) {
      this.addTooltipsToCalendarCells('mat-year-view', this.monthsMap, DATE_PATTERNS.MONTH);
    }
  }

  private addTooltipsToCalendarCells(view: string, datesMap: Map<string, number>, dateFormat: string): void {
    const calendarCells = this.getCalendarCellsForView(view);
    calendarCells.forEach((calendarCell) => {
      datesMap.forEach((count, dateString) => {
        const calendarCellDateString = moment(calendarCell.getAttribute('aria-label'), dateFormat);
        if (calendarCellDateString.isSame(dateString)) {
          this.createTooltipForCalendarCell(calendarCell, count);
        }
      });
    });
  }

  /**
   * Creates a portal outlet from the calendar cell div and attaches the tooltip template from view
   * Applies "onto-date-range-facet-tooltip" class to calendar cell child div
   *
   * @param calendarCell - calendar cell to which the span is appended
   * @param toolTipContext - context for the tooltip template
   */
  private createTooltipForCalendarCell(calendarCell, toolTipContext: number): void {
    const calendarCellContent = this.getCalendarCellContent(calendarCell);
    const tooltipElements = this.getCalendarCellTooltipElements(calendarCell);
    if (tooltipElements.length === 0) {
      const template = new TemplatePortal(this.toolTipTemplate, this._viewContainerRef);
      template.context = {$implicit: toolTipContext};

      const outlet = new DomPortalOutlet(calendarCellContent, this.componentFactoryResolver, this.applicationRef, this.injector);
      outlet.attachTemplatePortal(template);
      calendarCellContent.classList.add('onto-date-range-facet-tooltip');
    }
  }

  private getCalendarPanelButtons(): any {
    return document.querySelectorAll('mat-calendar .mat-calendar-body-cell, mat-calendar button, mat-calendar .mat-icon-button');
  }

  private setSelectedRange(selectedRange: SearchDateFacetRange): void {
    const momentDateRange = new DateRange<Moment>(moment(selectedRange.selected.start), moment(selectedRange.selected.end));
    this.dateRangeGroup.setValue(momentDateRange);
    this.dateRangeGroup.updateValueAndValidity();
    this.data.selectedRange = this.getSearchDateFacetRange();
  }

  private getSearchDateFacetRange(): SearchDateFacetRange {
    const start: Moment = this.dateRangeGroup.get('start').value;
    const end: Moment = this.dateRangeGroup.get('end').value;

    return {
      name: this.facetGroupName,
      selected: {
        start: start.toDate(),
        end: end.toDate()
      } as DateRange<Date>,
      count: this.getCountForRange(start, end)
    };
  }

  private getCountForRange(start: Moment, end: Moment): number {
    const dayKeys = [...this.daysMap.keys()];
    return dayKeys.filter((day) => start.isSameOrBefore(day) && end.isSameOrAfter(day))
        .map((key) => this.daysMap.get(key))
        .reduce((accumulator, count) => accumulator + count, 0);
  }

  private subscribeToBtnListeners(buttons: any): void {
    const unsubscribeFns = [];
    buttons.forEach((btn) => {
      const unsubscribe = this.renderer.listen(btn, 'click', () => {
        this.calendarOpened();
      });
      unsubscribeFns.push(unsubscribe);
    });
    this.buttonUnsubscribeFns = [...unsubscribeFns];
  }

  private unsubscribeBtnListeners(): void {
    this.buttonUnsubscribeFns.forEach((unsubscribeFn) => {
      unsubscribeFn();
    });
    this.buttonUnsubscribeFns = [];
  }

  private getCalendarCellsForView(view: string): any {
    const elements = document.querySelectorAll('.onto-date-range-picker ' + view);
    return elements.length > 0 ? elements[0].querySelectorAll('.mat-calendar-body-cell') : [];
  }

  private getCalendarCellContent(calendarCell): HTMLDivElement {
    return calendarCell.querySelectorAll('div')[0];
  }

  private getCalendarCellTooltipElements(calendarCell): HTMLDivElement[] {
    return calendarCell.querySelectorAll('span.onto-date-range-facet-tooltiptext');
  }
}
