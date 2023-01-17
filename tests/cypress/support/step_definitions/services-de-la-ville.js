const { When, Then, And } = require('@badeball/cypress-cucumber-preprocessor');
import { SHORT_WAIT_TIME, MIDDLE_WAIT_TIME, LONG_WAIT_TIME } from "./common/common";
import { ENDROIT } from './home-page';

const rappelCritereServices = "div[tag-page$=city-services] > div > div > h1";
const infoHabitants = "div[tag-page$=city-services] > div > div > p";
const infoSuperficie = "div[tag-page$=city-services] > div > div > p";
const infoTemperature = "div[tag-page$=city-services] > div > div > p";
const infoServices = "div[tag-page$=city-services] > div > h2";
const infoTransport = "div[tag-page$=city-services] * > div > p";
const infoEducation = "div[tag-page$=city-services] * > div > p";
const infoSante = "div[tag-page$=city-services] * > div > p";
const infoCultureLoisirs = "div[tag-page$=city-services] * > div > p";
const infosElus = "div[tag-page$=city-services] * > div > p";
const boutonContacter = "div[tag-page$=city-services] > div > a[href*=mailto]";

Then("j'affiche les services de la ville", function () {
  cy.url().should('include', 'services');
  
  let villeSansCP = ENDROIT.split(' (')[0];
  cy.contains(rappelCritereServices, "Vivre à " + villeSansCP,  {timeout: SHORT_WAIT_TIME}).should('exist');
})

Then("j'affiche les informations correspondantes des services de la ville", function () {
  cy.contains(infoHabitants, "Habitants", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoSuperficie, "Superficie", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoTemperature, "Température moyenne", {timeout: SHORT_WAIT_TIME}).should('exist');

  cy.contains(infoServices, "Les services", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(infoTransport, "Transport", {timeout: SHORT_WAIT_TIME}).should('exist');  
  cy.contains(infoEducation, "Education", {timeout: SHORT_WAIT_TIME}).should('exist');  
  cy.contains(infoSante, "Santé", {timeout: SHORT_WAIT_TIME}).should('exist');  
  cy.contains(infoCultureLoisirs, "Culture & loisirs", {timeout: SHORT_WAIT_TIME}).should('exist');  
})

Then("j'affiche le message aux élus locaux", function () {
  cy.contains(infosElus, "Vous êtes élus, élues locaux ?", {timeout: SHORT_WAIT_TIME}).should('exist');
  cy.contains(boutonContacter, "Nous contacter", {timeout: SHORT_WAIT_TIME}).should('exist');
})