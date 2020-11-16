import SearchDateRangeFacetSteps from '../steps/search-date-range-facet-steps';

describe('Search Date Range facet', () => {
  context('Date range facet', () => {
    beforeEach(() => {
      SearchDateRangeFacetSteps.visit();
    });

    it('Should show date range facet', () => {
      SearchDateRangeFacetSteps.getDateRangeFacet().should('be.visible');
    });

    it('Should load facet data', () => {
      // When data is loaded in facet and I select open date range picker and show mutiyear view
      SearchDateRangeFacetSteps.getCalendarToggle().click();
      SearchDateRangeFacetSteps.getCalendarPeriodButton().click();
      // 2020 option should have tooltip containing '222'
      SearchDateRangeFacetSteps.getCalendarCellTooltipByAriaLabel('2020').should('contain', 730);
      // When I select 2020 option
      SearchDateRangeFacetSteps.getCalendarCellByAriaLabel('2020').click();
      // November option should have tooltip containig '222
      SearchDateRangeFacetSteps.getCalendarCellTooltipByAriaLabel('November 2020').should('contain', 450);
      // When I select November option
      SearchDateRangeFacetSteps.getCalendarCellByAriaLabel('November 2020').click();
      // Option 2 should have tooltip containing '111'
      SearchDateRangeFacetSteps.getCalendarCellTooltipByAriaLabel('November 2, 2020').should('contain', 155);
      // And option 22 should have tooltip containing '111
      SearchDateRangeFacetSteps.getCalendarCellTooltipByAriaLabel('November 25, 2020').should('contain', 140);
      // When I select start of range 1 Nov 2020 and end of range 25 Nov 2020
      SearchDateRangeFacetSteps.getCalendarCellByAriaLabel('November 1, 2020').click();
      SearchDateRangeFacetSteps.getCalendarCellByAriaLabel('November 25, 2020').click();
      // Selected range should contain 2020-11-1 and 2020-11-25
      SearchDateRangeFacetSteps.getSelectedRange().should('contain', 'Nov 01 2020')
          .and('contain', 'Nov 25 2020');
      // And selection count should be '22'
      SearchDateRangeFacetSteps.getSelectedCount().should('contain', '295');
      // When I click deselect button
      SearchDateRangeFacetSteps.clickDeselectButton();
      // Range should be nullified
      SearchDateRangeFacetSteps.getSelectedRange().should('not.contain', 'Nov 01 2020')
          .and('not.contain', 'Nov 25 2020');
      SearchDateRangeFacetSteps.getSelectedCount().should('not.contain', '295');
    });

    it('Should load facet data and  preselect range', () => {
      // When I load data range picker with preselected range
      SearchDateRangeFacetSteps.visitWithPreselectRange();
      // And template range should contain 11/1/2020 - 11/25/2020
      SearchDateRangeFacetSteps.getTemplateRange().should('contain', 'Nov 01 2020')
          .and('contain', 'Nov 27 2020');
      // and template count should contain '222'
      SearchDateRangeFacetSteps.getTemplateCount().should('contain', '295');
    });
  });
});
