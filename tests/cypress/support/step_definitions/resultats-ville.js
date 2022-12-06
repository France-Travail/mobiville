const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "./common/common";
import { METIER, ENDROIT } from "./home-page";

const rappelCritereMetierRegion = "main[id=main] * > div > h1";
const resultatsRechercheVille = "main[id=main] * > div > h2";
const InfosPremiereVille = "a[data-automation-id^=cityItem-][href*=city]:nth-child(2) * > div";
const filtreCadreVie = "main[id=main] * > div";
const filtreTailleVille = "main[id=main] * > div";
const filtreOpportunites = "main[id=main] * > div";
const selectionCritere = "div[id=menu-] * > ul[role=listbox] > li[role=option] > span";
const listeVillesParPage = "div[data-automation-id=cities-list] > a[data-automation-id^=cityItem]";

let CRITERE = "";

function boutonSelectionFiltreVille(critere){
  switch (critere) {
    case "Cadre de vie" :
      return filtreCadreVie;
    case "Taille de ville" :
      return filtreTailleVille;
    case "Opportunités" :
      return filtreOpportunites;
  }
}

Then("j'affiche la page de résultats avec une à plusieurs villes correspondantes", function () {
  cy.contains(filtreCadreVie, "Cadre de vie",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(filtreTailleVille, "Taille de ville",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(filtreOpportunites, "Opportunités",  {timeout: SHORT_WAIT_TIME}).should('exist');

  let metierCourt = METIER.split(' (')[0];
  cy.wait(2000);
  cy.contains(rappelCritereMetierRegion, "pour " + metierCourt + " en " + ENDROIT,  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(resultatsRechercheVille, "Classement des villes par opportunités d'emploi",  {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche la page de résultats avec une à plusieurs villes similaires/proches", function () {
  let metierCourt = METIER.split(' (')[0];
  cy.contains(rappelCritereMetierRegion, "pour " + metierCourt,  {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche les informations sur le métier dans la page des villes correspondantes", function () {
  cy.contains(InfosPremiereVille, "Opportunités d'emploi",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(InfosPremiereVille, " habitants",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(InfosPremiereVille, " offres d'emploi",  {timeout: SHORT_WAIT_TIME}).should('exist');
})

When("je clique sur le filtre ville {string} et je sélectionne {string}", function (filtre, selection) {
  CRITERE = selection;
  cy.contains(boutonSelectionFiltreVille(filtre), filtre, {timeout: SHORT_WAIT_TIME}).click();
  cy.contains(selectionCritere, selection, {timeout: SHORT_WAIT_TIME}).click();
  cy.wait(2000);
})

Then("j'affiche les villes qui correspondent aux critères", function () {
  cy.get(listeVillesParPage, {timeout: SHORT_WAIT_TIME}).each((ville) => {
    expect(ville.text()).to.include(CRITERE);
  });
})