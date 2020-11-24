import SearchRangeFacetSteps from "../steps/search-range-facet-steps";

describe('Search Range facet', () => {
  context('Range facet', () => {
    beforeEach(() => {
      SearchRangeFacetSteps.visit();
    });

    it('Should show range facet', () => {
      SearchRangeFacetSteps.getRangeFacet().should('be.visible');
    });

    it('Should load facet data', () => {
      SearchRangeFacetSteps.getRangeSum().should('have.text', 'Selected: 919');
      SearchRangeFacetSteps.getRangeMin().should('have.text', 'Selected min: 0');
      SearchRangeFacetSteps.getRangeMax().should('have.text', 'Selected max: 1000');
      SearchRangeFacetSteps.getSelectedRangeFacetCount().should('have.text', '93')
    });

    it('Should set min value to max value and load data', () => {
      SearchRangeFacetSteps.setMinRangeValue(999);

      SearchRangeFacetSteps.getRangeSum().should('have.text', 'Selected: 55');
      SearchRangeFacetSteps.getRangeMin().should('have.text', 'Selected min: 999');
      SearchRangeFacetSteps.getRangeMax().should('have.text', 'Selected max: 1000');

    });

    it('Should set max value to min value and load data', () => {
      SearchRangeFacetSteps.setMaxRangeValue(1);
      SearchRangeFacetSteps.getRangeSum().should('have.text', 'Selected: 41');
      SearchRangeFacetSteps.getRangeMin().should('have.text', 'Selected min: 0');
      SearchRangeFacetSteps.getRangeMax().should('have.text', 'Selected max: 1');

    });
  });
})
;
