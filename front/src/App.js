import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { Routes } from './routes/Routes'

function App() {
  // import tag commander
  const script = document.createElement('script')
  if (window.location.host === 'mobiville.pole-emploi.fr') {
    script.src = 'https://cdn.tagcommander.com/5595/tc_Mobiville_31.js'
  } else {
    script.src = 'https://cdn.tagcommander.com/5595/uat/tc_Mobiville_31.js'
  }
  script.async = true
  document.body.appendChild(script)

  return (
    <>
      <CssBaseline />
      <Routes />
    </>
  )
}

export default App
