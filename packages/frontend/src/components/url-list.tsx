import { AlertColor, Grid } from '@mui/material'
import { IUrl } from '../lib/hooks/useUrl'
import { UrlCard } from './url-card'

interface IProps {
    itens: IUrl[]
    handleDeleteUrl: (id: string) => Promise<void>
    notify?: (message: string, severity: AlertColor) => void
    copyToClipboard: (value: string) => void
}

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3000'

export const UrlList = ({
    itens,
    handleDeleteUrl,
    notify,
    copyToClipboard
}: IProps) => {
    return (
        <Grid item xs>
            {itens.map(element => (
                <UrlCard
                    key={element.id}
                    id={element.id}
                    notify={notify}
                    copyToClipboard={copyToClipboard}
                    shortUrl={`${ENDPOINT}/${element.key}`}
                    originalUrl={element.url}
                    handleDeleteUrl={handleDeleteUrl}
                />
            ))}
        </Grid>
    )
}
