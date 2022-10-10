const { Given, When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "../../e2e/accueil/common/common";

const boutonToutAccepter = "button[type=button][id=footer_tc_privacy_button_2]";

Given("Je/je suis sur (l'accueil) mobiville/Mobiville", () => {
  cy.visit('/', {timeout: MIDDLE_WAIT_TIME});
})

And("j'accepte tous les cookies", () => {
    acceptRgpd();
    cy.wait(500);
})

function acceptRgpd() {
  // La popup rgpd atinternet s'attache au window parent
  //  que cypress utilise pour son UI
  cy.get(window.top.window.document.body).within(($popup) => {
      cy.get(boutonToutAccepter, {timeout: MIDDLE_WAIT_TIME}).click();
  })
}