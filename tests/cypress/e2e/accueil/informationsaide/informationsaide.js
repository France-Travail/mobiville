const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "../common/common";

const boutonDecouvrirAide = "main[id=main] > div > div > div > div:nth-child(1) > a > div > div";

When("je clique sur Découvrir l'aide", function () {
    cy.contains(boutonDecouvrirAide, "Découvrir l'aide ", {timeout: SHORT_WAIT_TIME}).click();
})