import styled from 'styled-components'
import { Button } from '../../components/button'
import { InsertUrlInput } from '../../components/insert-url-input'

const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Home = () => {
    const renderButton = () => {
        return (
            <Button
                label='Short me!'
                onClick={() => console.log('Ola Mundo')}
            />
        )
    }

    return (
        <Container>
            <InsertUrlInput button={renderButton} />
        </Container>
    )
}
