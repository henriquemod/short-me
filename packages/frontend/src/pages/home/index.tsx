import styled from 'styled-components'
import { Button } from '../../components/button'
import { InsertUrlInput } from '../../components/insert-url-input'
import { Colors } from '../../lib/colors'

const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.primary.light};
`

export const Home = () => {
    const renderButton = () => {
        return (
            <Button
                label='Short me!'
                // style={{ backgroundColor: `${Colors.secondary.dark}` }}
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
