import {SearchColumnSelectorSteps as step} from '../steps/search-column-selector-steps';

describe('Onto Search Column Selector Component', () => {
  beforeEach(() => {
    step.visit();
  });

  it('Should find the component', () => {
    // Column selector should be visible
    step.getOntoColumnSelectorComponent().should('be.visible');
  });

  it('Should test column selector functionality', () => {
    // When I visit the page with column selector
    step.visitWithDefaultOptions();
    // I should see the selector
    step.getColumnSelectDropdown().should('be.visible');
    // When I press the select
    step.getColumnSelectDropdown().click();
    // I should see column groups
    step.getColumnGroups().should('be.visible');
    // And they should contain 'Default Columns' and 'Other Columns'
    step.getColumnGroups().should('contain', 'Default Columns').and('contain', 'Another Group Of Columns');
    // When I look at 'Default Columns Group' I should see columns 'Username' and 'Name'
    step.getColumnGroupByIndex(1).find('mat-option').should('contain', 'Username').and('contain', 'Name');
    // And 'Username' should be selected
    step.getColumnGroupByIndex(1)
        .find('mat-option').filter('[appCypressData=column-option-0]').should('have.class', 'mat-selected');
    // When I select column 'Name'
    step.getColumnGroupByIndex(1)
        .find('mat-option').filter('[appCypressData=column-option-1]').click();
    // And close the selector dropdown
    step.closeColumnSelectDropdown();
    // I selected columns should contain 'Username' and 'Name'
    step.getSelectedColumns().should('contain', 'Username').and('contain', 'Name');
    // When I press reset button
    step.getColumnResetButton().click();
    // Selected columns should reset to default - ('Username')
    step.getSelectedColumns().should('contain', 'Username').and('not.contain', 'Name');
    // And only 'Username' dropdown should be selected
    step.getColumnSelectDropdown().click();
    step.getSelectedOptions().should('have.length', 1).and('contain', 'Username');
  });

  it('Should test column selector functionality with columns passed from outside', () => {
    // When I open column selector
    step.getColumnSelectDropdown().click();
    // Only 'Name' dropdown option should be selected
    step.getSelectedOptions().should('have.length', 1).and('contain', 'Name');
    step.closeColumnSelectDropdown();
    // And the selected columns should be the one passed to component ('Name')
    step.getSelectedColumns().should('contain', 'Name');
  });
});
