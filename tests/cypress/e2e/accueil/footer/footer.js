// import processParams from '../../../../../support/processor'
const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor')
import {SHORT_WAIT_TIME,MIDDLE_WAIT_TIME,LONG_WAIT_TIME} from "../common/common";

var TYPE_RECHERCHE = "Ville";
var METIER = "";
var ENDROIT = "";
export {TYPE_RECHERCHE, METIER, ENDROIT};

const footer = "div[class=footer] > div > p";
const lienACliquer = "div[class=footer] * > a";

const boutonEndroit = "button[type=button][id=cities]";
const boutonRechercherEndroit = "main[id=main] * > a[href*=cit]";
const boutonAide = "button[type=button][id=helps]";
const boutonRechercherAide = "main[id=main] * > a[href*=aides]";

function boutonSelectionEndroitAide(boutonEndroitAide){
  switch (boutonEndroitAide) {
    case "Aide" :
      return boutonAide;
    case "Ville" :
      return boutonEndroit;
  }
}

When("je clique sur le bouton {string} sous le texte \"que recherchez vous\"", function (boutonEndroitAide) {
  TYPE_RECHERCHE = boutonEndroitAide;
  cy.get(boutonSelectionEndroitAide(boutonEndroitAide), {timeout: SHORT_WAIT_TIME}).click();
})

function boutonRechercheEndroitAide(){
  switch (TYPE_RECHERCHE) {
    case "Aide" :
      return boutonRechercherAide;
    case "Ville" :
      return boutonRechercherEndroit;
  }
}

And("je clique sur rechercher", function () {
  cy.get(boutonRechercheEndroitAide(), {timeout: SHORT_WAIT_TIME}).click({force: true});
})

Then("je vois le footer sur la page", function () {
  cy.contains(footer, "Mobiville est un service vous permettant de trouver la ville qui correspond à votre besoin ainsi que les aides financières à la mobilité.", {timeout: SHORT_WAIT_TIME}).should('exist');
})

When("je clique sur {string}", function (lien) {
  cy.contains(lienACliquer, lien, {timeout: SHORT_WAIT_TIME}).click();
})

Then("j'affiche la page {string}", function (url) {
  cy.url().should('equal', url);
})
