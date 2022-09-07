const {
  Given,
  When,
  Then,
  And,
} = require('@badeball/cypress-cucumber-preprocessor')
import {
  SHORT_WAIT_TIME,
  MIDDLE_WAIT_TIME,
  LONG_WAIT_TIME,
} from '../../e2e/accueil/common/common'

const boutonRechercherEndroit = 'main[id=main] * > a[href*=cit]'
const boutonRechercherAide = 'main[id=main] * > a[href*=aides]'
const boutonEndroit = 'button[type=button][id=cities]'
const boutonAide = 'button[type=button][id=helps]'
let TYPE_RECHERCHE = "Ville";

When(
  'je clique sur le bouton {string} sous le texte "que recherchez vous"',
  function (boutonEndroitAide) {
    TYPE_RECHERCHE = boutonEndroitAide
    cy.get(boutonSelectionEndroitAide(boutonEndroitAide), {
      timeout: SHORT_WAIT_TIME,
    }).click()
  }
)

function boutonSelectionEndroitAide(boutonEndroitAide) {
  switch (boutonEndroitAide) {
    case 'Aide':
      return boutonAide
    case 'Ville':
      return boutonEndroit
  }
}

function selecteurBoutonRecherche() {
  switch (TYPE_RECHERCHE) {
    case 'Aide':
      return boutonRechercherAide
    case 'Ville':
      return boutonRechercherEndroit
  }
}
And('je clique sur rechercher', function () {
  cy.get(selecteurBoutonRecherche(), { timeout: SHORT_WAIT_TIME }).click({
    force: true,
  })
})
