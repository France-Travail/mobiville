const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor')
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "./common/common";
import { champSaisieMetier, champSaisieEndroit, boutoncritere1, boutoncritere2, boutoncritere3 } from './home-page';

const lienRechercherAide = 'header > div > a[href$=aides]';
const lienRechercherEndroit = 'header > div > a[href$=rechercher]';

function selecteurLienRecherche(lienEndroitAide) {
  switch (lienEndroitAide) {
    case 'Rechercher des aides':
      return lienRechercherAide;
    case 'Rechercher une ville':
      return lienRechercherEndroit;
  }
}

And("je clique sur {string} dans le header", function (lienEndroitAide) {
    cy.get(selecteurLienRecherche(lienEndroitAide), { timeout: MIDDLE_WAIT_TIME }).click();
    cy.wait(1000);
})

Then("j'affiche la page de recherche de ville avec le moteur de recherche", function () {
    cy.contains("Recherchez le métier et l'endroit qui vous correspond !", { imeout: MIDDLE_WAIT_TIME }).should('exist')
    cy.get(champSaisieMetier, { timeout: SHORT_WAIT_TIME }).should('exist')
    cy.get(champSaisieEndroit, { timeout: SHORT_WAIT_TIME }).should('exist')
  }
)

Then("j'affiche la page avec toutes les aides avec le moteur de recherche", function () {
    cy.contains('Toutes les aides à la mobilité professionnelle et résidentielle', { timeout: MIDDLE_WAIT_TIME }).should('exist')
    cy.get(boutoncritere1, { timeout: SHORT_WAIT_TIME }).should('exist')
    cy.get(boutoncritere2, { timeout: SHORT_WAIT_TIME }).should('exist')
    cy.get(boutoncritere3, { timeout: SHORT_WAIT_TIME }).should('exist')
  }
)
