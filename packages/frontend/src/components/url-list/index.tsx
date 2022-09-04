import { Divider, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { IUrl } from '../../lib/useUrl'

interface IProps {
    itens: IUrl[]
}

export const UrlList = ({ itens }: IProps) => {
    return (
        <List dense>
            {itens.map((element, i, a) => (
                <>
                    <ListItem>
                        <ListItemText
                            primary={`http://asd.com/${element.key}`}
                            secondary={element.url}
                        />
                    </ListItem>
                    {a.length !== i + 1 && <Divider />}
                </>
            ))}
        </List>
    )
}
