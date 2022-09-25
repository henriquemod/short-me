import { When } from '@badeball/cypress-cucumber-preprocessor'

When(`I type {string} in input id {string}`, (text: string, id: string) => {
    cy.get(`input[id=${id}`).type(text)
})

When('I click on {string}', (element: string) => {
    cy.get(`button[id=${element}]`).realClick()
})

When('I click on {string} but it fails', (element: string) => {
    cy.intercept('POST', `${Cypress.env('ENDPOINT')}/api/url`, {
        statusCode: 404
    })

    cy.get(`button[id=${element}]`).realClick()
})
