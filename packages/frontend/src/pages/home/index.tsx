import styled from 'styled-components'
import { InsertUrlInput } from '../../components/insert-url-input'
import { Colors } from '../../lib/colors'
import ValidatePassword from '../../lib/password-validator'

const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.primary.light};
`

export const Home = () => {
    const handleCreateShortUrl = (url: string) => {
        return Promise.resolve('test')
    }
    return (
        <Container>
            <InsertUrlInput
                validateUrl={ValidatePassword}
                handleCreateShortUrl={handleCreateShortUrl}
            />
        </Container>
    )
}
