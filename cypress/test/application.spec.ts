import ApplicationSteps from '../../cypress/steps/application-steps';

describe('Homepage', () => {
  it('Should load home page', () => {
    ApplicationSteps.visit();
  });
});
