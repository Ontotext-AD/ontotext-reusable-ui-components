import {SearchToggleFacetSteps} from "../steps/search-toggle-facet-steps";
import {SearchDropdownMultiSelectFacetSteps} from "../steps/search-dropdown-multi-select-facet-steps";

describe('Search Dropdown Multi Select facet', () => {
  beforeEach(() => {
    SearchDropdownMultiSelectFacetSteps.visit();
  });

  it('Should show dropdown multi select facet', () => {
    SearchDropdownMultiSelectFacetSteps.getDropdownFacet().should('be.visible');
    SearchDropdownMultiSelectFacetSteps.getSelectedFacets().should('contain', 'Recruiting')
  });

  it('Should show select and deselect facets', () => {
    SearchDropdownMultiSelectFacetSteps.openDropdown()
    SearchDropdownMultiSelectFacetSteps.clickOptionByName('Not yet recruiting');
    SearchDropdownMultiSelectFacetSteps.getSelectedFacets().should((facets) => {
      expect(facets).to.have.length(2);
      expect(facets.eq(0)).to.contain('Recruiting,');
      expect(facets.eq(1)).to.contain('Not yet recruiting');
    });
    SearchDropdownMultiSelectFacetSteps.clickOptionByName('Not yet recruiting');
    SearchDropdownMultiSelectFacetSteps.getSelectedFacets().should('contain', 'Recruiting')

  });

  it('Should show not found label when no facets found', () => {
    SearchDropdownMultiSelectFacetSteps.openDropdown()
    SearchDropdownMultiSelectFacetSteps.type('Dart Vaider');
    SearchDropdownMultiSelectFacetSteps.notFound().should('be.visible');
  });
});
