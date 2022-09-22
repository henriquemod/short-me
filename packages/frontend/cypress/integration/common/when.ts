import { When } from '@badeball/cypress-cucumber-preprocessor'

When(`I type {string} in input id {string}`, (text: string, id: string) => {
    cy.get(`input[id=${id}`).type(text)
})

When('I click on {string}', (element: string) => {
    cy.get(`button[id=${element}]`).realClick()
})
