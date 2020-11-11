/**
 * Interface defining the minimal search facet group parameters.
 * Search facet groups must implement this interface in order facet's data to be processed.
 */
export interface SearchFacetModel {
  facetGroupName: string;
  facetGroup: Map<number, any>;

  /**
   * Array of selected facets
   */
  selected: string[];
}
