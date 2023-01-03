import { createBrowserHistory } from 'history'
import React, { useLayoutEffect, useRef, useState, useTransition } from 'react'
import { Router } from 'react-router-dom'

/** Router react-router-dom avec useTransition de React 18
 *
 * le fallback du suspense est affiché moins vite pour éviter le "flickering" a chaque changement de route
 *
 * https://17.reactjs.org/docs/concurrent-mode-patterns.html#transitions
 * @param {*} BrowserRouterProps
 */
export function SuspenseRouter({ basename, children, window }) {
  let historyRef = useRef()
  const [, startTransition] = useTransition()

  if (historyRef.current == null) {
    // const history = createBrowserHistory(startTransition, { window });
    historyRef.current = createBrowserHistory(startTransition, { window })
  }

  let history = historyRef.current
  let [state, setState] = useState({
    action: history.action,
    location: history.location,
  })

  function setStateAsync(update) {
    startTransition(() => {
      setState(update)
    })
  }

  useLayoutEffect(() => history.listen(setStateAsync), [history])

  return (
    <Router
      basename={basename}
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  )
}
