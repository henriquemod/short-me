import './url'

declare global {
    namespace Cypress {
        interface Chainable {
            createUrl(url: string): Chainable<unknown>
        }
    }
}
