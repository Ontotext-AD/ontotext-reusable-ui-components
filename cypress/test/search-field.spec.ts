import SearchFieldSteps from "../../cypress/steps/search-field-steps";

describe('Onto Search Field Component', () => {
  it('Should find the component', () => {
    SearchFieldSteps.visit();
    SearchFieldSteps.getSearchFieldComponent().should('be.visible');
  });

  it('Should autocomplete', () => {
    SearchFieldSteps.visit();
    SearchFieldSteps.typeSearchPhrase('D');
    SearchFieldSteps.getAutocompleteLabel(0).should('be.visible').and('contain', 'Dehydroepiandrosterone');
    SearchFieldSteps.getAutocompleteType(0).should('be.visible').and('contain', 'small molecule');
    SearchFieldSteps.getAutocompleteLabels(0).should('be.visible').and('contain', 'Prasterone,5-Dehydroepiandrosterone,DHEA,5-DHEA,3-beta-Hydroxy-5-androsten-17-one,DHA');
  });

  it('Should make visual difference when free text or autocomplete is selected', () => {
    SearchFieldSteps.visit();
    SearchFieldSteps.typeSearchPhrase('D');
    SearchFieldSteps.getAutocompleteLabel(0).click();
    SearchFieldSteps.completeSearchPhrase('free text');

    SearchFieldSteps.getStateSelection(0).should('be.visible')
      .should('contain', 'Dehydroepiandrosterone')
      .and('have.class', 'state-suggestion');

    SearchFieldSteps.getStateSelection(1).should('be.visible')
      .should('contain', 'free text')
      .and('have.class', 'state-free-text');
  });

  it('Should delete selected', () => {
    SearchFieldSteps.visit();
    SearchFieldSteps.typeSearchPhrase('D');
    SearchFieldSteps.getAutocompleteLabel(0).click();
    SearchFieldSteps.completeSearchPhrase('free text');
    SearchFieldSteps.deleteStateSelection(0);

    SearchFieldSteps.getStateSelection(0).should('be.visible')
      .should('contain', 'free text');

    SearchFieldSteps.getStateSelection(1).should('not.be.visible');
  });

  it('Should not duplicate selected', () => {
    SearchFieldSteps.visit();
    SearchFieldSteps.typeSearchPhrase('D');
    SearchFieldSteps.getAutocompleteLabel(0).should('contain', 'Dehydroepiandrosterone').click();

    SearchFieldSteps.getStateSelection(0).should('be.visible').and('contain', 'Dehydroepiandrosterone');

    SearchFieldSteps.typeSearchPhrase('D');
    SearchFieldSteps.getAutocompleteLabel(0).should('contain', 'Dehydroepiandrosterone').click();
    SearchFieldSteps.getStateSelection(0).should('be.visible').and('contain', 'Dehydroepiandrosterone');

    SearchFieldSteps.getSelectedPhrases().should('have.length', 1);
  });

  it('Should use custom template if passed', () => {
    SearchFieldSteps.visitWithCustomTemplate();
    SearchFieldSteps.typeSearchPhrase('D');

    SearchFieldSteps.getCustomAutocompleteLabel(0).should('contain', 'Dehydroepiandrosterone');
    SearchFieldSteps.getCustomAutocompleteType(0).should('contain', 'small molecule');
    SearchFieldSteps.getCustomAutocompleteLabels(0).should('contain', 'Prasterone,5-Dehydroepiandrosterone,DHEA,5-DHEA,3-beta-Hydroxy-5-androsten-17-one,DHA');
  });

  it('Should emit keypress and search events', () => {
    SearchFieldSteps.visit();
    SearchFieldSteps.typeSearchPhrase('Dop');

    SearchFieldSteps.getKeypress().should('contain', 'Dop');
    SearchFieldSteps.selectOption(0);

    SearchFieldSteps.typeSearchPhrase('Dep');
    SearchFieldSteps.getKeypress().should('contain', 'Dep');
    SearchFieldSteps.selectOption(1);

    SearchFieldSteps.clickSearchButton();
    SearchFieldSteps.getPhrase(0).should('contain', 'Dehydroepiandrosterone');
    SearchFieldSteps.getPhrase(1).should('contain', 'Dihydrotestosterone');
  });

  it('Should filter internally', () => {
    SearchFieldSteps.visitWithInternalFiltering();
    SearchFieldSteps.typeSearchPhrase('Do').then(()=>{
      SearchFieldSteps.getAutocompleteLabel(0).should('contain', 'Dopamine');
    });

    SearchFieldSteps.typeSearchPhrase('x').then(()=>{
      SearchFieldSteps.getAutocompleteLabel(0).should('contain', 'Doxycycline');
    })
  });
});
