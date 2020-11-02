export default class ApplicationSteps {
  static visit() {
    cy.visit('/');
  }

  static getHomePage() {
    return cy.find('[appCypressData="home-page"]');
  }

}
