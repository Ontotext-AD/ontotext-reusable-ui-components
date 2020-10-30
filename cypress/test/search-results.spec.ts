import SearchResultsSteps from '../steps/search-results-steps';

describe('Onto Search Results Component', () => {
  it('Should find the component', () => {
    SearchResultsSteps.visit();
    SearchResultsSteps.getOntoSearchResultsComponent().should('be.visible');
  });

  it('Should have data loaded', () => {
    SearchResultsSteps.visit();

    SearchResultsSteps.getDataRows().should('have.length', '2');
    SearchResultsSteps.getFooterRow().should('have.length', '1');

    SearchResultsSteps.getTableComponent().should('have.class', 'table-class');

    SearchResultsSteps.getHeaderRow().should('have.length', '1').find('[appCypressData="onto-table-header-cell"]')
        .first().should('contain', 'User Name');

    SearchResultsSteps.getDataRows().find('.onto-table-column-column4 div')
        .should('have.class', 'template-class');

    SearchResultsSteps.getTableHeaderCells().should('have.length', '4');
    SearchResultsSteps.getTableFooterCells().should('have.length', '4');

    SearchResultsSteps.getTableColumnByName('username')
        .should('have.length', '4')
        .and('have.css', 'background-color', 'rgb(76, 174, 76)');

    SearchResultsSteps.getTableColumnByName('username')
        .filter('.onto-table-cell').should('have.length', '2')
        .first().should('contain', 'Username: user1');
  });
});
