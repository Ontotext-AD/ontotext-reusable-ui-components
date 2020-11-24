import {SearchToggleFacetSteps} from '../steps/search-toggle-facet-steps';

describe('Search Togle facet', () => {
  context('Toggle facet', () => {
    beforeEach(() => {
      SearchToggleFacetSteps.visit();
    });

    it('Should show toggle facet', () => {
      SearchToggleFacetSteps.getDualValueFacet().should('be.visible');
      SearchToggleFacetSteps.getSingleValueFacet().should('be.visible');
    });

    it('Should check functionality of dual value facet', () => {
      // When data is loaded in facet passed template should be visible
      SearchToggleFacetSteps.getDualValueFacet().find('[appCypressData="template-title"]')
          .should('be.visible');
      // And dual value facet should include 'false - 343987'
      SearchToggleFacetSteps.getDataTemplateOfDualValueFacet()
          .should('contain', 'false - 343987');
      // And single value facet should include 'Should I filter? - 666'
      SearchToggleFacetSteps.getDataTemplateOfSingleValueFacet()
          .should('contain', 'Should I filter? - 666');
      // When I toggle dual value facet
      SearchToggleFacetSteps.toggleDualValueFacet();
      // Dual value facet should include 'true - 616'
      SearchToggleFacetSteps.getDataTemplateOfDualValueFacet()
          .should('contain', 'true - 616');
      // And slider should be slided
      SearchToggleFacetSteps.getDualValueFacet().find('input')
          .should('have.attr', 'aria-checked', 'true');
      // And selection should include 'true - 616'
      SearchToggleFacetSteps.getSelection()
          .should('contain', 'true - 616');
      // When I toggle dual value again
      SearchToggleFacetSteps.toggleDualValueFacet();
      // And dual value facet should include 'false - 343987'
      SearchToggleFacetSteps.getDataTemplateOfDualValueFacet()
          .should('contain', 'false - 343987');
      // And slider should be unslided
      SearchToggleFacetSteps.getDualValueFacet().find('input')
          .should('have.attr', 'aria-checked', 'false');
      // And selection should include 'false - 343987'
      SearchToggleFacetSteps.getSelection()
          .should('contain', 'false - 343987');
    });

    it('Should check functionality of single value facet', () => {
      // When data is loaded in facet passed template should be visible
      SearchToggleFacetSteps.getSingleValueFacet().find('[appCypressData="template-title"]')
          .should('be.visible');
      // And single value facet should include 'Should I filter? - 666'
      SearchToggleFacetSteps.getDataTemplateOfSingleValueFacet()
          .should('contain', 'Should I filter? - 666');

      // When I toggle single value facet
      SearchToggleFacetSteps.toggleSingleValueFacet();
      // Single value facet should include 'Should I filter? - 666'
      SearchToggleFacetSteps.getDataTemplateOfSingleValueFacet()
          .should('contain', 'Should I filter? - 666');
      // And slider should be slided
      SearchToggleFacetSteps.getSingleValueFacet().find('input')
          .should('have.attr', 'aria-checked', 'true');
      // And selection should include 'Should I filter? - 666'
      SearchToggleFacetSteps.getSelection()
          .should('contain', 'Should I filter? - 666');
      // And selection value should contain true
      SearchToggleFacetSteps.getSelectionValue()
          .should('contain', 'true');

      // When I toggle dual value again
      SearchToggleFacetSteps.toggleSingleValueFacet();
      // And single value facet should include 'Should I filter? - 666'
      SearchToggleFacetSteps.getDataTemplateOfSingleValueFacet()
          .should('contain', 'Should I filter? - 666');
      // And slider should be unslided
      SearchToggleFacetSteps.getSingleValueFacet().find('input')
          .should('have.attr', 'aria-checked', 'false');
      // And selection should include 'Should I filter? - 666'
      SearchToggleFacetSteps.getSelection()
          .should('contain', 'Should I filter? - 666');
      // And selection value should contain false
      SearchToggleFacetSteps.getSelectionValue()
          .should('contain', 'false');
    });

    it('Should load facet data and preselect value', () => {
      // When I load toggle facet with preselected value
      SearchToggleFacetSteps.visitWithPreselectedFilterValue();
      // Single value facet should include 'Should I filter? - 666'
      SearchToggleFacetSteps.getDataTemplateOfSingleValueFacet()
          .should('contain', 'Should I filter? - 666');
      // And slider should be slided
      SearchToggleFacetSteps.getSingleValueFacet().find('input')
          .should('have.attr', 'aria-checked', 'true');
    });
  });
});
