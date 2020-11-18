import SearchCheckboxFacetSteps from '../steps/search-checkbox-facet-steps';

describe('Search Checkbox facet', () => {
  context('Checkbox facet', () => {
    beforeEach(() => {
      SearchCheckboxFacetSteps.visit();
    });

    it('Should load checkbox facets', () => {
      SearchCheckboxFacetSteps.getFacets().should('have.length', 14);
    });

    it('Should check preselected checkbox facets', () => {
      SearchCheckboxFacetSteps.getFacet(0).should('contain', 'Recruiting(176)');
    });

    it('Should emit checked and unchecked facets', () => {
      SearchCheckboxFacetSteps.getSelectedFacetList().should('have.length', 1);
      SearchCheckboxFacetSteps.getSelectedFacet(0).should('contain', 'Recruiting');

      SearchCheckboxFacetSteps.clickFacet(1);
      SearchCheckboxFacetSteps.getSelectedFacetList().should('have.length', 2);
      SearchCheckboxFacetSteps.getSelectedFacet(1).should('contain', 'Temporarily not available');

      SearchCheckboxFacetSteps.clickFacet(2);
      SearchCheckboxFacetSteps.getSelectedFacetList().should('have.length', 3);
      SearchCheckboxFacetSteps.getSelectedFacet(2).should('contain', 'Enrolling by invitation');

      SearchCheckboxFacetSteps.clickFacet(2);
      SearchCheckboxFacetSteps.getSelectedFacetList().should('have.length', 2);
      SearchCheckboxFacetSteps.getSelectedFacet(2).should('not.be.visible');

      SearchCheckboxFacetSteps.clickFacet(1);
      SearchCheckboxFacetSteps.clickFacet(0);
      SearchCheckboxFacetSteps.getSelectedFacetList().should('have.length', 0);
    });

    it('Should deselect all facets outside component', () => {
      SearchCheckboxFacetSteps.visit();
      SearchCheckboxFacetSteps.clickFacet(1);
      SearchCheckboxFacetSteps.clickFacet(2);
      SearchCheckboxFacetSteps.clickFacet(3);
      SearchCheckboxFacetSteps.clickFacet(4);
      SearchCheckboxFacetSteps.clickFacet(5);

      SearchCheckboxFacetSteps.getSelectedFacetList().should('have.length', 6);
      SearchCheckboxFacetSteps.getDeselectButton().click();
      SearchCheckboxFacetSteps.getSelectedFacetList().should('have.length', 0);
    });
  });
});
