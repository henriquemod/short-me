import { AlertColor, Grid } from '@mui/material'
import { IUrl } from '../lib/hooks/useUrl'
import { UrlCard } from './url-card'

interface IProps {
    itens: IUrl[]
    handleDeleteUrl: (id: string) => Promise<void>
    notify?: (message: string, severity: AlertColor) => void
}

const copyToClipboard = (value: string) => navigator.clipboard.writeText(value)

export const UrlList = ({ itens, handleDeleteUrl, notify }: IProps) => {
    return (
        <Grid item xs>
            {itens.map(element => (
                <UrlCard
                    key={element.id}
                    id={element.id}
                    notify={notify}
                    copyToClipboard={copyToClipboard}
                    shortUrl={`${process.env.ENDPOINT}/${element.key}`}
                    originalUrl={element.url}
                    handleDeleteUrl={handleDeleteUrl}
                />
            ))}
        </Grid>
    )
}
