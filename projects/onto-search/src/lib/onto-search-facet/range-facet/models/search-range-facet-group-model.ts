import {SearchFacetGroupModel} from '../../models/search-facet-group-model';
import {SearchFacetModel} from '../../models/search-facet-model';
import {HistogramModel} from './histogram-model';
import {SelectedRange} from './selected-range';

/**
 * Facet group data model for Range Facet
 *
 * @param {string} facetGroupName - Used as label for the facet
 * @param {SearchFacetModel[]} facetGroupData - An array containing facet data
 * @param {SearchFacetModel[]} selected - Not used in Range facet
 * @param {SelectedRange} selectedRange - used to pass range and is emitted when there is a selection
 * @param {boolean} showHistogram - Flag to render a facet count histogram. By default is set to false.
 * @param {HistogramModel} histogramConfiguration - Used to define histogram configuration.
 */
export class SearchRangeFacetGroupModel implements SearchFacetGroupModel {
  facetGroupName: string;
  facetGroupData: SearchFacetModel[];
  // Not used in Range facet
  selected: SearchFacetModel[];
  selectedRange: SelectedRange;
  showHistogram?: boolean = false;
  histogramConfiguration?: HistogramModel;
}
