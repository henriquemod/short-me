Cypress.Commands.add('createUrl', (url: string) => {
    cy.request('POST', `${Cypress.env('ENDPOINT')}/api/url`, {
        url
    }).then(response => {
        expect(response.status).to.eq(200)
        sessionStorage.setItem('key', response.body.key)
    })
})
