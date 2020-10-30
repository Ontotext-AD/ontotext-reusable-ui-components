export default class SearchResultsSteps {
  static visit() {
    cy.visit('/search-results');
  }

  static getOntoSearchResultsComponent() {
    return cy.get('[appCypressData="onto-search-results"]');
  }

  static getHeaderRow() {
    return cy.get('[appCypressData="onto-table-header-row"]');
  }

  static getDataRows() {
    return cy.get('[appCypressData="onto-table-row"]');
  }

  static getFooterRow() {
    return cy.get('[appCypressData="onto-table-footer-row"]');
  }

  static getTableComponent() {
    return cy.get('[appCypressData="table-component"');
  }

  static getTableHeaderCells() {
    return cy.get('[appCypressData="onto-table-header-cell"]');
  }

  static getTableFooterCells() {
    return cy.get('[appCypressData="onto-table-footer-cell"]');
  }

  static getTableColumnByName(name: string) {
    return cy.get(`.onto-table-column-${name}`);
  }
}
