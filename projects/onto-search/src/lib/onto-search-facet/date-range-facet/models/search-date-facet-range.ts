import {DateRange} from '@angular/material/datepicker';

/**
 * Return from date range OntoSearchFacet and used to pass preselection to facet
 *
 * @param {string} name - name of the facet group
 * @param {DateRange<Date>} selected - contains date range with start and end Date
 * @param {number} count - contains a sum of all 'hit' counts for that date range
 */
export type SearchDateFacetRange = {
  name: string
  selected: DateRange<Date>;
  count?: number;
};
