export class SearchToggleFacetSteps {
  static visit() {
    cy.visit('/search-toggle-facet');
  }

  static visitWithPreselectedFilterValue() {
    cy.visit('/search-toggle-facet?preselectedFilterValue=true');
  }

  static getDualValueFacet() {
    return cy.get('[appCypressData="dualValueToggleFacet"]').find('[appCypressData="toggle-facet"]');
  }

  static getSingleValueFacet() {
    return cy.get('[appCypressData="singleValueToggleFacet"]').find('[appCypressData="toggle-facet"]');
  }

  static getDataTemplateOfDualValueFacet() {
    return this.getDualValueFacet().find('[appCypressData="template-data"]');
  }

  static getDataTemplateOfSingleValueFacet() {
    return this.getSingleValueFacet().find('[appCypressData="template-data"]');
  }

  static toggleDualValueFacet() {
    this.getDualValueFacet().find('mat-slide-toggle').click();
  }

  static toggleSingleValueFacet() {
    this.getSingleValueFacet().find('mat-slide-toggle').click();
  }

  static getSelection() {
    return cy.get('[appCypressData="toggle-facet-selection"]');
  }

  static getSelectionValue() {
    return cy.get('[appCypressData="toggle-facet-selection-value"]');
  }
}
