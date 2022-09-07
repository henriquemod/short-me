import { Fade, Grid } from '@mui/material'
import { InsertUrlInput } from '../../components/insert-url-input'
import { UrlList } from '../../components/url-list'
import UrlValidator from '../../lib/url-validator'
import { useUrl } from '../../lib/useUrl'

const GRID_PROPS = {
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    alignItems: 'end'
}

export const Home = () => {
    const { create, urlList, loading } = useUrl()
    return (
        <>
            <Grid {...GRID_PROPS}>
                <InsertUrlInput
                    validateUrl={UrlValidator}
                    handleCreateShortUrl={create}
                    loading={loading}
                />
                <Fade in={urlList.length > 0}>
                    <Grid container justifyContent='center'>
                        <UrlList itens={urlList} />
                    </Grid>
                </Fade>
            </Grid>
        </>
    )
}
