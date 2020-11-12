import SearchFacetSteps from "../steps/search-facet-steps";

describe('Search facet', () => {

  context('Checkbox facet', () => {
    beforeEach(() => {
      SearchFacetSteps.visit();
    });

    it('Should load checkbox facets', () => {
      SearchFacetSteps.getFacets().should('have.length', 14);
    });

    it('Should check preselected checkbox facets', () => {
      SearchFacetSteps.getFacet(0).should('contain', 'Recruiting(176)');
    });

    it('Should emit checked and unchecked facets', () => {
      SearchFacetSteps.getSelectedFacetList().should('have.length', 1);
      SearchFacetSteps.getSelectedFacet(0).should('contain', 'Recruiting');

      SearchFacetSteps.clickFacet(1);
      SearchFacetSteps.getSelectedFacetList().should('have.length', 2);
      SearchFacetSteps.getSelectedFacet(1).should('contain', 'Temporarily not available');

      SearchFacetSteps.clickFacet(2);
      SearchFacetSteps.getSelectedFacetList().should('have.length', 3);
      SearchFacetSteps.getSelectedFacet(2).should('contain', 'Enrolling by invitation');

      SearchFacetSteps.clickFacet(2);
      SearchFacetSteps.getSelectedFacetList().should('have.length', 2);
      SearchFacetSteps.getSelectedFacet(2).should('not.be.visible');

      SearchFacetSteps.clickFacet(1);
      SearchFacetSteps.clickFacet(0);
      SearchFacetSteps.getSelectedFacetList().should('have.length', 0);
    });

    it('Should use custom template if passed', () => {
      SearchFacetSteps.visitWithCustomTemplate();
      SearchFacetSteps.getFacetsTitle().should('contain', 'I am your father!');
      SearchFacetSteps.getFacet(0).should('contain', 'Darth Vader was here');
    });

    it('Should deselect all facets outside component', () => {
      SearchFacetSteps.visit();
      SearchFacetSteps.clickFacet(1);
      SearchFacetSteps.clickFacet(2);
      SearchFacetSteps.clickFacet(3);
      SearchFacetSteps.clickFacet(4);
      SearchFacetSteps.clickFacet(5);

      SearchFacetSteps.getSelectedFacetList().should('have.length', 6);
      SearchFacetSteps.getDeselectButton().click();
      SearchFacetSteps.getSelectedFacetList().should('have.length', 0);
    });
  })

});
