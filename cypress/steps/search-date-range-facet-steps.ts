export default class SearchDateRangeFacetSteps {
  static visit() {
    cy.visit('/search-date-range-facet');
  }

  static visitWithPreselectRange() {
    cy.visit('/search-date-range-facet?usePreselectedRange=true');
  }

  static getDateRangeFacet() {
    return cy.get('[appCypressData="onto-date-range-facet"]');
  }

  static getCalendarToggle() {
    return cy.get('[appCypressData="onto-date-range-picker-toggle"]');
  }

  static getCalendarPeriodButton() {
    return cy.get('.mat-calendar-period-button');
  }

  static getCalendarCellByAriaLabel(label: string) {
    return cy.get(`[aria-label="${label}"]`);
  }

  static getCalendarCellTooltipByAriaLabel(label: string) {
    return this.getCalendarCellByAriaLabel(label).find('.onto-date-range-facet-tooltiptext');
  }

  static getSelectedRange() {
    return cy.get('[appCypressData="selected-range"]');
  }

  static getSelectedCount() {
    return cy.get('[appCypressData="selected-count"]');
  }

  static getTemplateRange() {
    return cy.get('[appCypressData="template-range"]');
  }

  static getTemplateCount() {
    return cy.get('[appCypressData="template-count"]');
  }

  static clickDeselectButton() {
    cy.get('[appCypressData="deselect-button"]').click();
  }
}
