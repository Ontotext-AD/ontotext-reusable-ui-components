import {SearchFacetModel} from './search-facet-model';

/**
 * Interface defining the minimal search facet group parameters.
 * Search facet groups must implement this interface in order facet's data to be processed.
 */
export interface SearchFacetGroupModel {
  facetGroupName: string;
  facetGroup: Map<number, SearchFacetModel>;

  /**
   * Array of selected facets
   */
  selected: string[];
}
