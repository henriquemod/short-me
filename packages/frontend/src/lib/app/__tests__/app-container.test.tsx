import { render, screen } from '@testing-library/react'
import { AppContainer } from '../app-container'

describe('App context unit tests', () => {
    test('should render child', async () => {
        const child = (
            <div>
                <h1>Test</h1>
            </div>
        )

        render(<AppContainer>{child}</AppContainer>)

        const findChild = await screen.findByText('Test')

        expect(findChild).toBeInTheDocument()
    })
})
