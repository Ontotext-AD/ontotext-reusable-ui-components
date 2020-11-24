import {SearchFacetGroupModel} from '../models/search-facet-group-model';
import {SearchFacetModel} from '../models/search-facet-model';
import {ThemePalette} from '@angular/material/core';

/**
 * Facet group data model for Date Range Facet
 *
 * @param {string} facetGroupName - Used as label for the facet
 * @param {SearchFacetModel[]} facetGroupData - An array containing facet data
 * @param {SearchFacetModel[]} selected - not used in Date Range Facet
 * @param {ThemePalette} [color] - theme palette color for toggle slider
 */
export class SearchToggleGroupModel implements SearchFacetGroupModel {
  facetGroupName: string;
  facetGroupData: SearchFacetModel[];
  selected: SearchFacetModel[];
  color?: ThemePalette;
}
