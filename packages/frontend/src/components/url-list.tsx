import { Grid } from '@mui/material'
import { IUrl } from '../lib/hooks/useUrl'
import { UrlCard } from './url-card'

interface IProps {
    itens: IUrl[]
    handleDeleteUrl: (id: string) => Promise<void>
}

export const UrlList = ({ itens, handleDeleteUrl }: IProps) => {
    return (
        <Grid item xs>
            {itens.map(element => (
                <UrlCard
                    key={element.id}
                    id={element.id}
                    shortUrl={`http://asd.com/${element.key}`}
                    originalUrl={element.url}
                    handleDeleteUrl={handleDeleteUrl}
                />
            ))}
        </Grid>
    )
}
