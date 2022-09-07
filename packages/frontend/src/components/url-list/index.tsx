import { List } from '@mui/material'
import { IUrl } from '../../lib/useUrl'
import { UrlCard } from '../url-card'

interface IProps {
    itens: IUrl[]
}

export const UrlList = ({ itens }: IProps) => {
    return (
        <List dense style={{ width: '100%' }}>
            {itens.map((element, i, a) => (
                <UrlCard
                    key={element.id}
                    shortUrl={`http://asd.com/${element.key}`}
                    originalUrl={element.url}
                />
            ))}
        </List>
    )
}
