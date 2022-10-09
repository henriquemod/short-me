import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    BrowserRouter,
    createRoutesFromChildren,
    matchRoutes,
    useLocation,
    useNavigationType
} from 'react-router-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'

Sentry.init({
    // eslint-disable-next-line max-len
    dsn: 'https://3fc66be0a830481482fffd338ed2f21b@o1410595.ingest.sentry.io/6748098',
    integrations: [
        new BrowserTracing({
            routingInstrumentation: Sentry.reactRouterV6Instrumentation(
                React.useEffect,
                useLocation,
                useNavigationType,
                createRoutesFromChildren,
                matchRoutes
            )
        })
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
