const { When, Then } = require('@badeball/cypress-cucumber-preprocessor')

When("Je/je suis sur (l'accueil) mobiville/Mobiville", () => {
  cy.visit('/', { timeout: 15000 })
  acceptRgpd()
})

function acceptRgpd() {
  // La popup rgpd atinternet s'attache au window parent
  //  que cypress utilise pour son UI
  cy.get(window.top.window.document.body).within(($popup) => {
    cy.get('#footer_tc_privacy_button_2', { timeout: 5000 }).click()
  })
}
