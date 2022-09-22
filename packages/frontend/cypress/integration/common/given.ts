import { Given } from '@badeball/cypress-cucumber-preprocessor'

Given('I go to home page', () => {
    cy.visit(Cypress.env('ENDPOINT_FRONTEND'))
})

Given('I go to {string}', (path: string) => {
    cy.visit(`${Cypress.env('ENDPOINT_FRONTEND')}${path}`)
})

Given('I go to my created short url', () => {
    const key = sessionStorage.getItem('key')

    cy.visit(`${Cypress.env('ENDPOINT_FRONTEND')}/${key}`)
})

Given('I have a short url', () => {
    cy.createUrl('https://google.com.br')
})
