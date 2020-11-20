/**
 * Used for emitting selection events
 *
 * @param {string} name - name of the facet group
 * @param {any} selected - selected options
 * @param {number} count - total count for selected options
 */
export type SearchFacetSelection = {
  name: string,
  selected: any,
  count?: number,
};
