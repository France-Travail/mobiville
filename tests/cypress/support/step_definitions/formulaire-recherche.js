const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "../../e2e/accueil/common/common";

const boutonRechercherEndroit = 'a[data-automation-id=search-action][href*=cit]';
const boutonRechercherAide = 'a[data-automation-id=search-action][href*=aides]';
const boutonEndroit = 'button[type=button][data-automation-id=search-ville][id=cities]';
const boutonAide = 'button[type=button][data-automation-id=search-aide][id=helps]';
const champSaisieMetier = "input[type=text][id=autocomplete-votre-metier]";
const listeMetiers = "ul[role=listbox][id=autocomplete-votre-metier-listbox] > li";
const champSaisieEndroit = "input[type=text][id=autocomplete-lendroit-qui-vous-fait-envie]";
const listeEndroits = "ul[role=listbox][id=autocomplete-lendroit-qui-vous-fait-envie-listbox] > li";
const boutoncritere1 = "div[role=button][id=quel-est-votre-projet]";
const boutoncritere2 = "div[role=button][id=votre-situation]";
const boutoncritere3 = "div[role=button][id=votre-age]";
const selectionCritere = "div[id=menu-] * > ul[role=listbox] > li[role=option] * > span";
export { champSaisieMetier, champSaisieEndroit, boutoncritere1, boutoncritere2, boutoncritere3 };

let TYPE_RECHERCHE = "Ville";
let METIER = "";
let ENDROIT = "";
export { METIER, ENDROIT };

function boutonSelectionEndroitAide(boutonEndroitAide) {
  switch (boutonEndroitAide) {
    case 'Aide':
      return boutonAide;
    case 'Ville':
      return boutonEndroit;
  }
}

When("je clique sur le bouton {string} sous le texte \"que recherchez vous\"", function (boutonEndroitAide) {
    TYPE_RECHERCHE = boutonEndroitAide
    cy.get(boutonSelectionEndroitAide(boutonEndroitAide), {timeout: SHORT_WAIT_TIME,}).click();
  }
)

function selecteurBoutonRecherche() {
  switch (TYPE_RECHERCHE) {
    case 'Aide':
      return boutonRechercherAide;
    case 'Ville':
      return boutonRechercherEndroit;
  }
}

And('je clique sur rechercher', function () {
  cy.get(selecteurBoutonRecherche(), { timeout: SHORT_WAIT_TIME }).click({force: true});
})

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