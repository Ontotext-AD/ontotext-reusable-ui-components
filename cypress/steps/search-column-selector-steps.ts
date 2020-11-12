
export class SearchColumnSelectorSteps {
  static visit() {
    cy.visit('/search-column-select');
  }

  static visitWithDefaultOptions() {
    cy.visit('/search-column-select?defaultOptions=true');
  }

  static getOntoColumnSelectorComponent() {
    return cy.get('[appCypressData="onto-column-selector-component"]');
  }

  static getColumnResetButton() {
    return cy.get('[appCypressData="column-reset-button"]');
  }

  static getColumnSelectDropdown() {
    return cy.get('[appCypressData="column-selection-dropdown"]');
  }

  static getSelectedOptions() {
    return cy.get('mat-option').filter('.mat-selected');
  }

  static getColumnGroups() {
    return cy.get('mat-optgroup');
  }

  static getColumnGroupByIndex(index: number) {
    return this.getColumnGroups().filter(`[appCypressData=column-group-${index}]`);
  }

  static getColumnOptions() {
    return cy.get('mat-option');
  }

  static getSelectedColumns() {
    return cy.get('[appCypressData="selected-columns"]');
  }

  static getChangeSelectionButton() {
    return cy.get('[appCypressData="change-selection-button"]');
  }
}
