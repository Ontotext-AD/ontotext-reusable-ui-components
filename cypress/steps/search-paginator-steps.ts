export default class SearchPaginatorSteps {
  static getPaginatorComponent() {
    return cy.get('[appCypressData="paginator-component"]');
  }
  static getPageSizeDropdown() {
    return SearchPaginatorSteps.getPaginatorComponent().get('.mat-paginator-page-size-select');
  }
  static getPaginatorPageSizeOptions() {
    return cy.get('.mat-option');
  }
  static getPaginatorRange() {
    return cy.get('.mat-paginator-range-label');
  }
  static getPaginatorTotal() {

  }
  static getPreviousPageButton() {
    return cy.get('.mat-paginator-navigation-previous');
  }
  static getNextPageButton() {
    return cy.get('.mat-paginator-navigation-next');
  }
}
