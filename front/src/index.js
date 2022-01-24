import React from 'react'
import ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider, createTheme } from '@mui/material'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import App from './App'
import reportWebVitals from './reportWebVitals'
import Providers from './common/contexts'

import './assets/styles/main.scss'
import 'react-toastify/dist/ReactToastify.css'

import { COLOR_PRIMARY, COLOR_SECONDARY } from './constants/colors'

Sentry.init({
  // Exposing this URL in the code is not ideal and it should be put in an env
  // variable *but* it is a publicly visible URL called on the front-end anyway.
  // (and at the time of writing, the setup of this project makes setting it up
  // as an env variable a bit of a headache)
  dsn: 'https://3f96b9a63f114a8c80c86321ab7bd474@o1070672.ingest.sentry.io/6164584',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  environment:
    window.location.hostname === 'mobiville.pole-emploi.fr'
      ? 'production'
      : window.location.hostname === 'mobiville.beta.pole-emploi.fr'
      ? 'staging'
      : 'development',
})

const theme = createTheme({
  palette: {
    primary: {
      main: COLOR_PRIMARY,
    },
    secondary: {
      main: COLOR_SECONDARY,
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Providers>
        <App />
        <ToastContainer />
      </Providers>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
