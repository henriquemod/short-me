import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then(`I see {string} in the title`, title => {
    cy.title().should('include', title)
})

Then(`I should see {string}`, (text: string) => {
    cy.waitUntil(() => cy.contains(text).should('exist'))
})

Then('The element {string} should be enabled', (id: string) => {
    cy.get(`button[id=${id}]`).should('be.enabled')
})

Then('The element {string} should be disabled', (id: string) => {
    cy.get(`button[id=${id}]`).should('be.disabled')
})

Then('I wait timer finishes', () => {
    cy.wrap([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]).each(el => {
        cy.waitUntil(() => cy.contains(el as unknown as number).should('exist'))
    })
})
