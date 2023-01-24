import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useCities } from '../../../common/contexts/citiesContext'
import { Accordion, Button, FiltersButton, LittleSelect, Modale, Pane, RadioGroup, ResetButton } from '../../../components'
import { useWindowSize } from '../../../common/hooks/window-size'
import { isMobileView } from '../../../constants/mobile'
import { isDirty } from '../../../utils/utils'

const Container = styled.div`
  max-width: 1040px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  .MuiFormControl-root {
    margin: 20px 0;
  }
`

const ButtonsContainer = styled.div`
  padding: 34px 50px;
`

const CustomButton = styled(Button)`
  height: 50px;
`

const CitiesFilters = ({ filters, onFiltersChange, onReset, params = [] }) => {
  const isMobile = isMobileView(useWindowSize())
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const { environmentCriterions, cityCriterions } = useCities()

  const opportunities = {
    1: "Opportunités d'emploi",
    2: "Peu d'opportunités d'emploi",
  }

  const showReset = useMemo(
    () => isDirty(filters),
    [filters]
  )

  const numbersOfSelectedFilters = useMemo(() => {
    return Object.values(filters).reduce((prev, currFilter) => {
      if (typeof currFilter === 'string' && currFilter !== '') return prev + 1
      if (Array.isArray(currFilter) && currFilter?.length > 0)
        return prev + currFilter.length
      return prev
    }, 0)
  }, [filters])

  useEffect(() => {
    if (!!params.codeCity && params.codeCity !== filters.citySize) {
      onFiltersChange({
        citySize: params.codeCity
      })
    }
    if (
      !!params.codeEnvironment &&
      params.codeEnvironment !== filters.environment
    ) {
      onFiltersChange({
        environment: params.environment
      })
    }
    if (
      !!params.opportunity &&
      params.opportunity !== filters.opportunity
    ) {
      onFiltersChange({
        opportunity: params.opportunity
      })
    }
  }, [params])

  const environmentValues = useMemo(() => Object.assign(
    {},
    ...environmentCriterions.map((criterion) => ({
      [criterion.key]: criterion.label,
    }))
  ), [environmentCriterions])

  const citySizeValues = useMemo(() => Object.assign(
    {},
    ...cityCriterions.map((criterion) => ({
      [criterion.key]: criterion.label,
    }))
  ), [cityCriterions])

  const citySizeValuesTips = [
    '-20 000 habitants',
    '-50 000 habitants',
    '-200 000 habitants',
    '+200 000 habitants',
  ]

  const handleFiltersChange = (name, key) => {
    onFiltersChange({
      [name]: key
    })
  }

  const sendTag = (name) => {
    const tagsNames = {
      environment: 'cadre_de_vie',
      citySize: 'taille_de_ville',
      opportunity: 'opportunites',
    } 
    if (!!tagsNames[name]) {
      (window.smartTagPiano ? window.smartTagPiano : window.smartTag )({
        name: tagsNames[name],
        type: 'action',
        chapters: ['cities', 'recherche', 'filtres'],
      })
    }
  }

  if (isMobile) {
      return (
        <>
          <FiltersButton
            libelle={`Filtrer par critères ${
              numbersOfSelectedFilters > 0 ? `(${numbersOfSelectedFilters})` : ''
            }`}
            onClick={() => setShowMobileFilters(true)}
            style={{ margin: 'auto' }}
          />

          <Modale
            title="Filtrer"
            show={showMobileFilters}
            onClose={() => setShowMobileFilters(false)}
          >
            <Accordion>
              <Pane title={`Cadre de vie ${filters?.environment !== '' ? '(1)' : ''}`}>
                <RadioGroup
                  name="environment"
                  values={environmentValues}
                  selectedButton={filters.environment}
                  onChange={handleFiltersChange}
                  onClick={sendTag}
                />
              </Pane>
              <Pane title={`Taille de la ville ${filters?.citySize !== '' ? '(1)' : ''}`}>
                <RadioGroup
                  name="citySize"
                  values={citySizeValues}
                  valuesTips={citySizeValuesTips}
                  selectedButton={filters.citySize}
                  onChange={handleFiltersChange}
                  onClick={sendTag}
                />
              </Pane>
              <Pane title={`Opportunités ${filters?.opportunity !== '' ? '(1)' : ''}`}>
                <RadioGroup
                  name="opportunity"
                  values={opportunities}
                  selectedButton={filters.opportunity}
                  onChange={handleFiltersChange}
                  onClick={sendTag}
                />
              </Pane>
            </Accordion>

            <ButtonsContainer>
              <CustomButton fullWidth onClick={() => setShowMobileFilters(false)}>
                Valider
              </CustomButton>
              <ResetButton show={showReset} style={{ margin: 'auto' }} onClick={onReset} />
            </ButtonsContainer>
          </Modale>
        </>
      )
  }

  return (<Container>
    <SearchBar>
      <LittleSelect
        label="Cadre de vie"
        values={environmentValues}
        selectedValue={filters.environment}
        onChange={(value) => {
          onFiltersChange({
            environment: value
          })
          sendTag('environment')
        }}
      />

      <LittleSelect
        label="Taille de ville"
        values={citySizeValues}
        selectedValue={filters.citySize}
        onChange={(value) => {
          onFiltersChange({
            citySize: value
          })
          sendTag('citySize')
        }}
      />

      <LittleSelect
        label="Opportunités"
        values={opportunities}
        selectedValue={filters.opportunity}
        onChange={(value) => {
          onFiltersChange({
            opportunity: value
          })
          sendTag('opportunity')
        }}
      />

      <ResetButton show={showReset} onClick={onReset} />
    </SearchBar>
  </Container>)
}

CitiesFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onFiltersChange: PropTypes.func,
  onReset: PropTypes.func,
  params: PropTypes.object
}

export default CitiesFilters
