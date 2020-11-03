import SearchResultsSteps from '../steps/search-results-steps';
import SearchPaginatorSteps from '../steps/search-paginator-steps';

describe('Onto Search Paginator Component', () => {
  it('Should find the component', () => {
    // When I visit the search results page
    SearchResultsSteps.visit();
    // The paginator should be visible
    SearchPaginatorSteps.getPaginatorComponent().should('be.visible');
    // When I expand dropdown
    SearchPaginatorSteps.getPageSizeDropdown().click();
    // And there should be a dropdown with 3 options 5, 10, 20
    SearchPaginatorSteps.getPaginatorPageSizeOptions().should('have.length', 3);
    // And pagesize dropdown should have 10 selected
    SearchPaginatorSteps.getPaginatorPageSizeOptions().filter('.mat-selected').should('contain', 10).click();
    // And table should show 10 items
    SearchResultsSteps.getDataRows().should('have.length', 10);
    // And first item should be user 0
    SearchResultsSteps.getDataRows().first().should('contain', 'user0');
    // And show previous button should be disabled
    SearchPaginatorSteps.getPreviousPageButton().should('be.disabled');
    // And paginator range label should contain 1 to 10
    SearchPaginatorSteps.getPaginatorRange().should('contain', '1 – 10');
    // And paginator range label should contain total of 50 items
    SearchPaginatorSteps.getPaginatorRange().should('contain', '50');
    // When I press next button
    SearchPaginatorSteps.getNextPageButton().click();
    // Table should show 10 items
    SearchResultsSteps.getDataRows().should('have.length', 10);
    // And first item should be user 10
    SearchResultsSteps.getDataRows().first().should('contain', 'user10');
    // When I press previous button
    SearchPaginatorSteps.getPreviousPageButton().click();
    // Table should show 10 items
    SearchResultsSteps.getDataRows().should('have.length', 10);
    // And first item should be user 0
    SearchResultsSteps.getDataRows().first().should('contain', 'user0');
    // When I go to last page after 4 clicks
    SearchPaginatorSteps.getNextPageButton().click().click().click().click();
    // Show next button should be disabled
    SearchPaginatorSteps.getNextPageButton().should('be.disabled');
    // And last item should be user 49
    SearchResultsSteps.getDataRows().find('.onto-table-column-username').last().should('contain', 'user49');
  });
});
