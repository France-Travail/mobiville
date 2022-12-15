import React from 'react'
import { CitiesProvider } from './citiesContext'
import { NomPageProvider } from './NomPageContext'
import { HelpsProvider } from './helpsContext'
import { ProfessionsProvider } from './professionsContext'

export default function Providers(props) {
  return (
    <NomPageProvider>
      <HelpsProvider>
        <ProfessionsProvider>
          <CitiesProvider {...props} />
        </ProfessionsProvider>
      </HelpsProvider>
    </NomPageProvider>
  )
}
