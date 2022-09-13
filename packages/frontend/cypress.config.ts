import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        }
    },
    env: {
        ENDPOINT: 'http://localhost:8080',
        ENDPOINT_FRONTEND: 'http://localhost:3000'
    }
})
