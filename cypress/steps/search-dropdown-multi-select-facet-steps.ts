export class SearchDropdownMultiSelectFacetSteps {
  static visit() {
    cy.visit('/search-dropdown-multi-select-facet');
  }

  public static getDropdownFacet() {
    return cy.get('[appCypressData="dropdown-multi-select"]');
  }

  public static getSelectedFacets() {
    return cy.get('[appCypressData="selected-facets"]');
  }

  public static openDropdown() {
    return cy.get('mat-select').click();
  }

  public static clickOptionByName(option: string) {
    return cy.get('mat-option').contains(option).click();
  }

  public static type(text: string) {
    return cy.get('[appCypressData="mat-select-search-input"]').type(text);
  }

  public static notFound() {
    return cy.get('[appCypressData="mat-select-search-no-found"]');
  }
}
