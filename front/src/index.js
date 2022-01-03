import React from 'react'
import ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify'
import './assets/styles/main.scss'
import { ThemeProvider, createTheme } from '@mui/material'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Providers from './common/contexts'
import 'react-toastify/dist/ReactToastify.css'

import { COLOR_PRIMARY, COLOR_SECONDARY } from './constants/colors'

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
