import {SearchFacetModel} from '../../models/search-facet-model';

/**
 * Facet data model for date range OntoSearchFaced
 *
 * @param {number} count - the 'hit' count for the facet
 * @param {Date} facetData - date object for current facet
 * @param {string} label - not used in Date Range Facet
 * @param {boolean} selected - not used in Date Range Facet
 */
export class SearchDateFacetModel implements SearchFacetModel {
  count: number;
  facetData: Date;
  label: string;
  selected: boolean;
}
