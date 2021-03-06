export default class SearchCheckboxFacetSteps {
  static visit() {
    cy.visit('/search-checkbox-facet');
  }

  static getFacets() {
    return cy.get('[appCypressData="checkbox-facet-list"]').find('mat-checkbox');
  }

  static getFacet(index: number) {
    return cy.get(`[appCypressData="checkbox-facet-${index}"]`);
  }

  static clickFacet(index: number) {
    return this.getFacet(index).click();
  }

  static getSelectedFacetList() {
    return cy.get(`[appCypressData="facet-list"]`).find('div');
  }

  static getSelectedFacet(index: number) {
    return cy.get(`[appCypressData="facet-selection-${index}"]`);
  }

  static getFacetsTitle() {
    return cy.get('[appCypressData="checkbox-facet-title"');
  }

  static getDeselectButton() {
    return cy.get('[appCypressData="deselect-button"');
  }
}
