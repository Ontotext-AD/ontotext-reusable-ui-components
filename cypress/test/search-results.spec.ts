import SearchResultsSteps from '../steps/search-results-steps';

describe('Onto Search Results Component', () => {
  it('Should find the component', () => {
    SearchResultsSteps.visit();
    SearchResultsSteps.getOntoSearchResultsComponent().should('be.visible');
  });

  it('Should have data loaded', () => {
    SearchResultsSteps.visit();

    SearchResultsSteps.getDataRows().should('have.length', '10');
    SearchResultsSteps.getFooterRow().should('have.length', '1');

    SearchResultsSteps.getTableComponent().should('have.class', 'table-class');

    SearchResultsSteps.getHeaderRow().should('have.length', '1').find('[appCypressData="onto-table-header-cell"]')
        .first().should('contain', 'User Name');

    SearchResultsSteps.getDataRows().find('.onto-table-column-column4 div')
        .should('have.class', 'template-class');

    SearchResultsSteps.getTableHeaderCells().should('have.length', '5');
    SearchResultsSteps.getTableFooterCells().should('have.length', '5');

    SearchResultsSteps.getTableColumnByName('username')
        .should('have.length', '12')
        .and('have.css', 'background-color', 'rgb(76, 174, 76)');

    SearchResultsSteps.getTableColumnByName('username')
        .filter('.onto-table-cell').should('have.length', '10')
        .first().should('contain', 'Username: user0');
  });

  it('Should sort table correctly', () => {
    SearchResultsSteps.visit();
    // Should not be able to sort by column with enableSort: false;
    SearchResultsSteps.getDataRows().find('.onto-table-column-column3').should('contain', 0);
    SearchResultsSteps.getHeaderRow().find('.onto-table-column-column3').click();
    SearchResultsSteps.getDataRows().find('.onto-table-column-column3').should('contain', 10);

    // Should not be able to sort by column with enableSort not set;
    SearchResultsSteps.getDataRows().find('.onto-table-column-column4').should('contain', 'column 4-0');
    SearchResultsSteps.getHeaderRow().find('.onto-table-column-column4').click();
    SearchResultsSteps.getDataRows().find('.onto-table-column-column4').should('contain', 'column 4-0');

    // Before sorting
    SearchResultsSteps.getDataRows().find('.onto-table-column-name')
        .first().should('contain', 'Name: user 0');
    SearchResultsSteps.getHeaderRow().find('.onto-table-column-name').click().click();
    // After sorting
    SearchResultsSteps.getDataRows().find('.onto-table-column-name')
        .first().should('contain', 'Name: user 9');
  });
});
