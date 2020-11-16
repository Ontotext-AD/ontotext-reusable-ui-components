/**
 * Interface that determines the minimum properties of a single facet.
 */
export interface SearchFacetModel {
  /**
   * Display label
   */
  label: string,

  /**
   * Additional data of the facet. Can be used for further processing of the facet.
   */
  facetData?: any,

  /**
   * Found results count
   */
  count: number,

  /**
   * Facet selected status
   */
  selected: boolean
}
