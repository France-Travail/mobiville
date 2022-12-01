const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "./common/common";

const footer = "div[class=footer] > div > p";
const lienACliquer = "div[class=footer] * > a";

Then("je vois le footer sur la page", function () {
  cy.contains(footer, "Mobiville est un service vous permettant de trouver la ville qui correspond à votre besoin ainsi que les aides financières à la mobilité.", {timeout: SHORT_WAIT_TIME}).should('exist');
})

When("je clique sur {string} dans le footer", function (lien) {
  cy.contains(lienACliquer, lien, {timeout: SHORT_WAIT_TIME}).click();
  cy.wait(500);
})

Then("j'affiche la page {string}", function (url) {
  cy.url().should('equal', url);
})
