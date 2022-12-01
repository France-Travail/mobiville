const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "./common/common";
import { METIER, ENDROIT } from './home-page';

const filtreDistance = "main[id=main] * > div";
const filtreDatePublication = "main[id=main] * > div";
const filtreTypeContrat = "main[id=main] * > div";
const filtreExperience = "main[id=main] * > div";
const filtreDureeHebdomadaire = "main[id=main] * > div";
const filtreOffresOpportunites = "main[id=main] * > div";
const rappelCritereOffres = "main[id=main] > div[tag-page$=city-offres] > h1";
const selectionCritere = "div[id=menu-] * > ul[role=listbox] > li[role=option] > span";
const critereTypeDureeOffre = "main[id=main] > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div";
const criterePublicationOffre = "main[id=main] > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div > p";
const offre2 = "main[id=main] > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)";
const descriptifOffreSelectionnee = "main[id=main] > div:nth-child(2) > div:nth-child(3) > div:nth-child(3) > p";

let CRITERE = "";
let DESCRIPTIF = "";

function boutonSelectionFiltreOffre(critere){
  switch (critere) {
    case "Distance" :
      return filtreDistance;
    case "Date de publication" :
      return filtreDatePublication;
    case "Type de contrat" :
      return filtreTypeContrat;
    case "Expérience" :
      return filtreExperience;
    case "Durée hebdomadaire" :
      return filtreDureeHebdomadaire;
    case "Offres avec plus d'opportunités" :
      return filtreOffresOpportunites;
  }
}

function combienJours(critere){
  switch (critere) {
    case "Un jour" :
      return 1;
    case "un jour" :
      return "1 jour";
    case "Trois jours" :
      return 3;
    case "Une semaine" :
      return 7;
    case "Deux semaines" :
      return 14;
    case "Un mois" :
      return 31;
    case "un mois" :
      return "31 jours";
    default :
      return critere;
  }
}

Then("j'affiche les offres d'emploi de la ville pour le métier", function () {
  cy.url().should('include', 'job');

  cy.contains(filtreDistance, "Distance",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(filtreDatePublication, "Date de publication",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(filtreTypeContrat, "Type de contrat",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(filtreExperience, "Expérience",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(filtreDureeHebdomadaire, "Durée hebdomadaire",  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(filtreOffresOpportunites, "Offres avec plus d'opportunités",  {timeout: SHORT_WAIT_TIME}).should('exist');

  let villeSansCP = ENDROIT.split(' (')[0];
  let metierCourt = METIER.split(' (')[0].toLowerCase();
  cy.contains(rappelCritereOffres, villeSansCP,  {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(rappelCritereOffres, "pour le métier " + metierCourt,  {timeout: SHORT_WAIT_TIME}).should('exist');
})

When("je clique sur le filtre offre {string} et je sélectionne {string}", function (filtre, selection) {
  CRITERE = selection;
  cy.contains(boutonSelectionFiltreOffre(filtre), filtre, {timeout: SHORT_WAIT_TIME}).click();
  cy.contains(selectionCritere, selection, {timeout: SHORT_WAIT_TIME}).click();
  cy.wait(2000);
})

Then("j'affiche les offres qui correspondent aux critères", function () {
  cy.get(critereTypeDureeOffre, {timeout: SHORT_WAIT_TIME}).each((offre) => {
    expect(offre.text()).to.include(CRITERE);
  });
})

Then("j'affiche les offres pour lesquelles la date est inférieure au critère", function () {
  cy.get(criterePublicationOffre, {timeout: SHORT_WAIT_TIME}).each((publication) => {
    let text = publication.text();
    if (text.includes('il y a') && (text.includes('jour') || text.includes('mois'))) {
      text = text.replace('Publié ', '').replace('il y a ', '');
      text = combienJours(text).split(' jour')[0];
      const number = parseInt(text);
      assert.isAtMost(number, combienJours(CRITERE));
    }
  });
})

When("je sélectionne une offre", function () {
  cy.get(offre2, {timeout: SHORT_WAIT_TIME}).click();
})

Then("le détail de l'offre s'affiche", function () {
  cy.get(descriptifOffreSelectionnee, {timeout: SHORT_WAIT_TIME}).then((desc) => {
    expect(desc.text()).to.exist;
  });
})