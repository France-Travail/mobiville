/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react'

import EuroIcon from '@mui/icons-material/Euro'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import PeopleIcon from '@mui/icons-material/People'

import { apiLoadHelpPreviews, apiLoadHelpPreview } from '../../api/helps.api'

const HelpsContext = React.createContext()

export function HelpsProvider(props) {
  const [previews, _setPreviews] = useState([])
  const [help, _setHelp] = useState(null)
  const [isLoading, _setIsLoading] = useState(false)

  const onLoadPreviews = useCallback(() => {
    if (previews.length === 0) {
      _setIsLoading(true)
      apiLoadHelpPreviews()
        .then((fetchedPreviews) => {
          if(!!fetchedPreviews) {
            fetchedPreviews.map((preview) => {
              let type = (preview.type.includes(',')) ? preview.type.substring(0, preview.type.indexOf(',')) : preview.type
              if (
                type.toLowerCase().includes('aide administrative') ||
                type.toLowerCase().includes('accompagnement du projet')
              ) {
                type = 'Accompagnement'
              }

              return {
                ...preview,
                type: type,
                goal: preview.goal.includes('.') ? preview.goal.substring(0, preview.goal.indexOf('.') + 1) : preview.goal,
                icon : preview.type.includes('logement')
                  ? <HomeWorkIcon />
                  : preview.type.includes('financière')
                  ? <EuroIcon />
                  : preview.type.includes('transport')
                  ? <DirectionsCarIcon />
                  : <PeopleIcon />,
              }
            })
          }
          _setPreviews(fetchedPreviews)
        })
        .then(() => _setIsLoading(false))
    }
  }, [])

  const onLoadPreview = useCallback((slug) => {
    _setIsLoading(true)
    apiLoadHelpPreview(slug)
      .then(_setHelp)
      .then(() => _setIsLoading(false))
  }, [])

  return (
    <HelpsContext.Provider
      {...props}
      value={{
        previews,
        help,
        isLoading,
        // function
        onLoadPreviews,
        onLoadPreview,
      }}
    />
  )
}

export const useHelps = () => {
  const context = React.useContext(HelpsContext)
  if (!context) throw new Error('useHelps must be used in CitiesProvider')

  return context
}
