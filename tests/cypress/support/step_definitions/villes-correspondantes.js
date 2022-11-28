const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "../../e2e/accueil/common/common";
import { METIER, ENDROIT } from "./formulaire-recherche";

const rappelCritereMetierRegion = "main[id=main] * > div > h1";
const resultatsRechercheVille = "main[id=main] * > div > h2";
const InfosPremiereVille = "a[data-automation-id^=cityItem-][href*=city]:nth-child(2) * > div";
const filtreCadreVie = "main[id=main] * > div > span";
const filtreTailleVille = "main[id=main] * > div > span";
const filtreOpportunites = "main[id=main] * > div > span";
const selectionCritere = "div[id=menu-] * > ul[role=listbox] > li[role=option] > span";
const listeVillesParPage = "a[data-automation-id^=cityItem-][href*=city]";

function boutonSelectionFiltre(critere){
  switch (critere) {
    case "Mer" :
      return filtreCadreVie;
    case "Montagne" :
      return filtreCadreVie;
    case "Campagne" :
      return filtreCadreVie;
    case "Petite ville" :
      return filtreTailleVille;
    case "Ville moyenne" :
      return filtreTailleVille;
    case "Grande ville" :
      return filtreTailleVille;
    case "Métropole" :
      return filtreTailleVille;
    case "Opportunités d'emploi" :
      return filtreOpportunites;
    case "Peu d'opportunités d'emploi" :
      return filtreOpportunites;
  }
}

Then("j'affiche la page de résultats avec une à plusieurs villes correspondantes", function () {
  cy.contains(filtreCadreVie, "Cadre de vie",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(filtreTailleVille, "Taille de ville",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(filtreOpportunites, "Opportunités",  {timeout: SHORT_WAIT_TIME}).should('exist');

  let metierCourt = METIER.split(' (')[0];
  cy.wait(1000);
  cy.contains(rappelCritereMetierRegion, "pour " + metierCourt + " en " + ENDROIT,  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(resultatsRechercheVille, "Classement des villes par opportunités d'emploi",  {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche les informations sur le métier dans la page des villes correspondantes", function () {
  cy.contains(InfosPremiereVille, "Opportunités d'emploi",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(InfosPremiereVille, " habitants",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(InfosPremiereVille, " offres d'emploi",  {timeout: SHORT_WAIT_TIME}).should('exist');
})

When("je clique sur le filtre {string} et je sélectionne {string}", function (filtre, selection) {
  cy.contains(boutonSelectionFiltre(filtre), filtre, {timeout: SHORT_WAIT_TIME}).click();
  cy.contains(selectionCritere, selection, {timeout: SHORT_WAIT_TIME}).click();
  cy.wait(1000);
})

Then("j'affiche les villes pour lesquelles il y a des opportunités d'emploi", function () {
  cy.get(listeVillesParPage).each((ville) => {
    expect(ville.text()).to.include("Opportunités d'emploi");
  });
})

Then("j'affiche les villes pour lesquelles il y a peu d'opportunités d'emploi", function () {
  cy.get(listeVillesParPage).each((ville) => {
    expect(ville.text()).to.include("Peu d'opportunités d'emploi");
  });
})