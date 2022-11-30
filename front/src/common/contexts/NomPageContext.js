import React, { useState } from 'react'

const NomPageContext = React.createContext()

/** dico de traduction entre url des pages et nom de page présenté dans le plan de marquage
 */
const planMarquageDictionnaire = {
  '': 'accueil',
  aides: 'aides',
  city: 'city',
  // ...
}

/** Contexte pour accéder nom de la page tel que défini dans le plan de taggage fait par le studio
 *  cf netxcloud
 * @param {*} props
 * @returns
 */
export function NomPageProvider(props) {
  const [nomPage, _setNomPage] = useState('')

  const setNomPage = (val) => {
    _setNomPage(
      val in planMarquageDictionnaire ? planMarquageDictionnaire[val] : val
    )
  }
  return (
    <NomPageContext.Provider
      {...props}
      value={{
        nomPage,
        // function
        setNomPage,
      }}
    />
  )
}

export const useNomPage = () => {
  const context = React.useContext(NomPageContext)
  if (!context) throw new Error('useNomPage must be used in NomPageContext')

  return context
}
