const VALID_URL = 'http://google.com.br'
const INVALID_URL = '1'
const ENDPOINT_FRONTEND = 'http://localhost:3000'

beforeEach(() => {
    cy.visit(ENDPOINT_FRONTEND)
})

describe('Home Tests', () => {
    it('I create a short url', () => {
        cy.get(`input[id=insert-url-2]`).type(VALID_URL)
        cy.get('button[id=insert-button]').click()
        cy.waitUntil(() =>
            cy.contains('Your url was successfully shortened.').should('exist')
        )
        cy.get('span[data-testid=original-url]').then(el => {
            expect(el.text()).to.equal(VALID_URL)
        })
    })

    it('I copy a short url', () => {
        cy.get(`input[id=insert-url-2]`).type(VALID_URL)
        cy.get('button[id=insert-button]').click()
        cy.get('span[data-testid=original-url]').then(el => {
            expect(el.text()).to.equal(VALID_URL)
        })
        cy.get('button[id=copy-button]').first().realClick()
        cy.waitUntil(() =>
            cy.contains('Url copied to your clipboard.').should('exist')
        )
    })

    it('I delete a short url', () => {
        cy.get(`input[id=insert-url-2]`).type(VALID_URL)
        cy.get('button[id=insert-button]').click()
        cy.get('span[data-testid=original-url]').then(el => {
            expect(el.text()).to.equal(VALID_URL)
        })
        cy.get('button[id=delete-button]').first().realClick()
        cy.waitUntil(() => cy.contains('Url has been deleted.').should('exist'))
    })

    it('I create a short url with invalid url', () => {
        cy.get(`input[id=insert-url-2]`).type(INVALID_URL)
        cy.get('button[id=insert-button]').click()
        cy.waitUntil(() =>
            cy
                .contains('An error ocurred, please try again later.')
                .should('exist')
        )
    })
})
