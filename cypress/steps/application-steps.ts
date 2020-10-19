export default class ApplicationSteps {
  static visit(waitLoader: boolean = true) {
    cy.visit('/');
  }

  static getHomePage() {
    return cy.find('[appCypressData="home-page"]');
  }

}
