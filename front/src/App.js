import { CircularProgress } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import React, { Suspense } from 'react'
import TC_Wrapper from 'react-tag-commander'
import { MobivilleRoutes } from './routes/Routes'
import { SuspenseRouter } from './utils/SuspenseRouter'

function App() {
  // import tag commander
  const wrapper = TC_Wrapper.getInstance()
  if (window.location.host === 'mobiville.pole-emploi.fr') {
    wrapper.addContainer('tc', 'https://cdn.tagcommander.com/5595/tc_Mobiville_31.js', 'body')
  } else {
    wrapper.addContainer('tc', 'https://cdn.tagcommander.com/5595/uat/tc_Mobiville_31.js', 'body')
  }

  const spinner = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      <CircularProgress />
      <p>Chargement...</p>
    </div>
  )

  return (
    <>
      <CssBaseline />
      <SuspenseRouter>
        <Suspense fallback={spinner}>
          <MobivilleRoutes />
        </Suspense>
      </SuspenseRouter>
    </>
  )
}

export default App
