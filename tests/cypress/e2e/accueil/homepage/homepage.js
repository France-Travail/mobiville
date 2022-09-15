const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor')
import {SHORT_WAIT_TIME,MIDDLE_WAIT_TIME,LONG_WAIT_TIME} from "../common/common";

const champSaisieMetier = "input[type=text][id=autocomplete-votre-metier]";
const listeMetiers = "ul[role=listbox][id=autocomplete-votre-metier-listbox] > li";
const champSaisieEndroit = "input[type=text][id=autocomplete-lendroit-qui-vous-fait-envie]";
const listeEndroits = "ul[role=listbox][id=autocomplete-lendroit-qui-vous-fait-envie-listbox] > li";

const rappelCritereMetierRegion = "main[id=main] * > div > h1";
const resultatsRechercheVille = "main[id=main] * > div > h2";
const PremiereVille = "main[id=main] * > a[href*=city]:nth-child(2) * > div"; 
const rappelCritereVille = "main[id=main] * > div > h1";
const rappelCritereMetier = "main[id=main] * > div > h1 > span";
const resultatVille = "main[id=main] * > ul > li > div";

const boutoncritere1 = "div[role=button][id=quel-est-votre-projet]";
const boutoncritere2 = "div[role=button][id=votre-situation]";
const boutoncritere3 = "div[role=button][id=votre-age]";
const selectionCritere = "div[id=menu-] * > ul[role=listbox] > li[role=option] * > span";

const resultatsRechercheAide = "main[id=main] > div > h1";

let METIER = "";
let ENDROIT = "";

When("je saisis {string} dans le métier", function (metier) {
  cy.get(champSaisieMetier, {timeout: SHORT_WAIT_TIME}).type(metier);
})

And("je choisis {string} dans la liste des métiers", function (propositionmetier) {
  METIER = propositionmetier;
  cy.contains(listeMetiers, propositionmetier, {timeout: SHORT_WAIT_TIME}).click();
})

And("je saisis {string} dans la région/ville", function (endroit) {
  cy.get(champSaisieEndroit, {timeout: SHORT_WAIT_TIME}).type(endroit);
})

And("je choisis {string} dans la liste des régions/villes", function (propositionendroit) {
  ENDROIT = propositionendroit;
  cy.get(champSaisieEndroit, {timeout: SHORT_WAIT_TIME}).click();
  cy.contains(listeEndroits, propositionendroit, {timeout: SHORT_WAIT_TIME}).click();
})

function boutonSelectionCritere(critere){
  switch (critere) {
    case "Je déménage prochainement" :
      return boutoncritere1;
    case "Je recherche un logement" :
      return boutoncritere1;
    case "Je recherche un emploi" :
      return boutoncritere1;
    case "Je suis demandeur d'emploi" :
      return boutoncritere2;
    case "Je suis salarié" :
      return boutoncritere2;
    case "Je suis alternant" :
      return boutoncritere2;
    case "J'ai moins de 26 ans" :
      return boutoncritere3;
    case "J'ai plus de 26 ans" :
      return boutoncritere3;
  }
}

And("je sélectionne {string} dans les liste de aides", function (critere) {
  if (critere !== "") {
    const boutonCritere = boutonSelectionCritere(critere);
    cy.get(boutonCritere, {timeout: SHORT_WAIT_TIME}).click({force: true});
    cy.contains(selectionCritere, critere, {timeout: SHORT_WAIT_TIME}).click();
    if (boutonCritere == boutoncritere1) {
      cy.get(boutonCritere, {timeout: SHORT_WAIT_TIME}).click({force: true});
    }
  }
})

Then("j'affiche les filtres aide", function () {
  cy.get(boutoncritere1, {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(boutoncritere2, {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(boutoncritere3, {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche les filtres métier endroit", function () {
  cy.get(champSaisieMetier, {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.get(champSaisieEndroit, {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche la page de résultats avec une à plusieurs villes correspondantes", function () {
  var metierCourt = METIER.split(' (')[0];
  cy.contains(rappelCritereMetierRegion, "villes pour " + metierCourt + " en " + ENDROIT,  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(resultatsRechercheVille, "Classement des villes par opportunités d'emploi",  {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche les informations sur le métier dans la page des villes correspondantes", function () {
  cy.contains(PremiereVille, "Opportunités d'emploi",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(PremiereVille, " habitants",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(PremiereVille, " offres d'emploi",  {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche la page de la ville pour le métier", function () {
  var villeSansCP = ENDROIT.split(' (')[0];
  var metierCourt = METIER.split(' (')[0].toLowerCase();
  cy.contains(rappelCritereVille, villeSansCP,  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(rappelCritereMetier, "pour le métier " + metierCourt,  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(resultatVille, "Offres d’emploi", {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche les aides correspondantes", function () {
  cy.contains(resultatsRechercheAide, "aides disponibles pour votre situation", {timeout: SHORT_WAIT_TIME}).should('exist');
})