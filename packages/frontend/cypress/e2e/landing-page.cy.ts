describe('Landing Page Tests', () => {
    it('Should wait timer finish in order to enable button', () => {
        cy.createUrl('https://google.com.br').then(() => {
            const key = sessionStorage.getItem('key')

            cy.visit(`${Cypress.env('ENDPOINT_FRONTEND')}/${key}`)

            cy.get('button[id=url-button]').should('be.disabled')
            cy.wrap([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]).each(el => {
                cy.waitUntil(() =>
                    cy.contains(el as unknown as number).should('exist')
                )
            })
            cy.get('button[id=url-button]').should('be.enabled')
        })
    })

    it('Should show message when no key is finded', () => {
        cy.visit(`${Cypress.env('ENDPOINT_FRONTEND')}/invalid_key`)
        cy.waitUntil(() =>
            cy
                .contains(
                    'The URL you tried either is wrong or no longer exists'
                )
                .should('exist')
        )
    })
})
