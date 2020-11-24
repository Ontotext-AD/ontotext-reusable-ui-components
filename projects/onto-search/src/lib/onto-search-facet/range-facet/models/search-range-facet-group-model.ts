import {SearchFacetGroupModel} from '../../models/search-facet-group-model';
import {SearchFacetModel} from '../../models/search-facet-model';
import {HistogramModel} from './histogram-model';

/**
 * Facet group data model for Range Facet
 */
export class SearchRangeFacetGroupModel implements SearchFacetGroupModel {
  facetGroupName: string;
  facetGroupData: SearchFacetModel[];
  selected: SearchFacetModel[];
  showHistogram?: boolean = false;
  histogramConfiguration?: HistogramModel
}
