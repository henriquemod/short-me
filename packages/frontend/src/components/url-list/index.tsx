import { Grid } from '@mui/material'
import { IUrl } from '../../lib/hooks/useUrl'
import { UrlCard } from '../url-card'

interface IProps {
    itens: IUrl[]
}

export const UrlList = ({ itens }: IProps) => {
    return (
        <Grid item xs>
            {itens.map(element => (
                <UrlCard
                    key={element.id}
                    shortUrl={`http://asd.com/${element.key}`}
                    originalUrl={element.url}
                />
            ))}
        </Grid>
    )
}
