import { Given } from '@badeball/cypress-cucumber-preprocessor'

const ENDPOINT = Cypress.env('ENDPOINT_FRONTEND')

Given('I go to home page', () => {
    cy.visit(ENDPOINT)
})

Given('I go to {string}', (path: string) => {
    cy.visit(`${ENDPOINT}${path}`)
})

Given('I go to my created short url', () => {
    const key = sessionStorage.getItem('key')

    cy.visit(`${ENDPOINT}/${key}`)
})

Given('I have a short url', () => {
    cy.createUrl('https://google.com.br')
})
