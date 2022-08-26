const { Given, When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import {SHORT_WAIT_TIME,MIDDLE_WAIT_TIME,LONG_WAIT_TIME} from "../../e2e/accueil/common/common";

const boutonUneVille = "button[type=button][id=city]";

When("Je/je suis sur (l'accueil) mobiville/Mobiville", () => {
  cy.visit('/', { timeout: 15000 })
  acceptRgpd()
})

Given("je suis sur la Homepage de Mobiville", () => {
  cy.visit('/', {timeout: SHORT_WAIT_TIME});
  acceptRgpd();
})

Given("je suis dans le moteur de recherche Ville", () => {
  cy.visit('/', {timeout: SHORT_WAIT_TIME});
  acceptRgpd();
  cy.get(boutonUneVille, {timeout: SHORT_WAIT_TIME}).click();
})

function acceptRgpd() {
  // La popup rgpd atinternet s'attache au window parent
  //  que cypress utilise pour son UI
  cy.get(window.top.window.document.body).within(($popup) => {
    cy.get('#footer_tc_privacy_button_2', { timeout: 5000 }).click()
  })
}