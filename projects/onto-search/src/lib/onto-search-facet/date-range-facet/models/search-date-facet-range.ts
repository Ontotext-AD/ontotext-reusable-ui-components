import {DateRange} from '@angular/material/datepicker';

/**
 * Return from date range OntoSearchFaced and used to pass preselection to facet
 *
 * @param {DateRange<Date>} dateRange - contains date range start and end Date
 * @param {number} count - contains a sum of all 'hit' counts for that date range
 */
export type SearchDateFacetRange = {
  dateRange: DateRange<Date>;
  count?: number;
};
