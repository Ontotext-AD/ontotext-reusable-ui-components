import {SearchFacetGroupModel} from '../../models/search-facet-group-model';
import {SearchDateFacetModel} from './search-date-facet-model';
import {SearchFacetModel} from '../../models/search-facet-model';
import {SearchDateFacetRange} from './search-date-facet-range';

/**
 * Facet group data model for Date Range Facet
 *
 * @param {string} facetGroupName - Used as label for the facet
 * @param {SearchDateFacetModel[]} facetGroupData - An array containing facet data
 * @param {SearchFacetModel[]} selected - not used in Date Range Facet
 * @param {string} [placeHolder] - placeholder for date picker
 * @param {SearchDateFacetRange} selectedRange - used to pass date range to facet group and is emitted when there is a selection
 */
export class SearchDateFacetGroupModel implements SearchFacetGroupModel {
  facetGroupName: string;
  facetGroupData: SearchDateFacetModel[];
  // Not used by date range OntoSearchFaced
  selected: SearchFacetModel[];
  placeholder?: string;
  selectedRange?: SearchDateFacetRange;
}
