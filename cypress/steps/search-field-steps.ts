export default class SearchFieldSteps {
  static visit() {
      cy.visit('/search-field');
  }

  static visitWithCustomTemplate() {
    cy.visit('/search-field?useCustomTemplate=true');
  }

  static visitWithInternalFiltering() {
    cy.visit('/search-field?internalFilter=true');
  }

  static visitWithCustomFunction() {
    cy.visit('/search-field?useCustomFunction=true');
  }

  static visitWithPreselectedList() {
    cy.visit('/search-field?useSelectedList=true');
  }

  static getSearchFieldComponent() {
    return cy.get('[appCypressData="search-field-component"]');
  }

  static getSearchInputField() {
    return this.getSearchFieldComponent().find('[appCypressData="search-field-input"]');
  }

  static typeSearchPhrase(value: string) {
    return this.getSearchInputField().type(value);
  }

  static completeSearchPhrase(value: string) {
    return this.typeSearchPhrase(value).type('{enter}', {
      parseSpecialCharSequences: true
    });
  }

  static getAutocompleteLabel(index: number) {
    return cy.get(`[appCypressData="state-label-${index}"]`);
  }

  static getAutocompleteType(index: number) {
    return cy.get(`[appCypressData="state-type-${index}"]`);
  }

  static getAutocompleteLabels(index: number) {
    return cy.get(`[appCypressData="state-labels-${index}"]`);
  }

  static getStateSelection(index: number) {
    return cy.get(`[appCypressData="state-selection-${index}"]`);
  }

  static deleteStateSelection(index: number) {
    return cy.get(`[appCypressData="state-cancel-${index}"]`).click();
  }

  static getCustomAutocompleteLabel(index: number) {
    return cy.get(`[appCypressData="custom-state-label-${index}"]`);
  }

  static getCustomAutocompleteType(index: number) {
    return cy.get(`[appCypressData="custom-state-type-${index}"]`);
  }

  static getCustomAutocompleteLabels(index: number) {
    return cy.get(`[appCypressData="custom-state-labels-${index}"]`);
  }

  static getKeypress() {
    return cy.get(`[appCypressData="keypress"]`);
  }

  static getPhrase(index: number) {
    return cy.get(`[appCypressData="phrase-${index}"]`);
  }

  static selectOption(index: number) {
    return this.getAutocompleteLabel(index).click();
  }

  static clickSearchButton() {
    cy.get('[appCypressData="search-field-button"]').click();
  }

  static getSelectedPhrases() {
    return cy.get('[appCypressData="search-field-selection"]').find('mat-chip');
  }

  static getMappedSearchPhrase(index: number) {
    return cy.get(`[appCypressData="custom-function-item-${index}"]`);
  }

}
