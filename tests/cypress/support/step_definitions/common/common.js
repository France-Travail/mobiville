const LONG_WAIT_TIME = 30000;
const MIDDLE_WAIT_TIME = 15000;
const SHORT_WAIT_TIME = 5000;
export {SHORT_WAIT_TIME,MIDDLE_WAIT_TIME,LONG_WAIT_TIME};

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  });