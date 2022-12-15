import CssBaseline from '@mui/material/CssBaseline'
import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MobivilleRoutes } from './routes/Routes'
import TC_Wrapper from "react-tag-commander"

function App() {
  // import tag commander
  const wrapper = TC_Wrapper.getInstance()
  if (window.location.host === 'mobiville.pole-emploi.fr') {
    wrapper.addContainer('tc', 'https://cdn.tagcommander.com/5595/tc_Mobiville_31.js', 'body')
  } else {
    wrapper.addContainer('tc', 'https://cdn.tagcommander.com/5595/uat/tc_Mobiville_31.js', 'body')
  }

  return (
    <>
      <CssBaseline />

      <Suspense fallback={<p>Chargement...</p>}>
        <BrowserRouter>
          <MobivilleRoutes />
        </BrowserRouter>
      </Suspense>
    </>
  )
}

export default App
