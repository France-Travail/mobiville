import { memo, useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useCities } from '../../../common/contexts/citiesContext'
import { COLOR_OTHER_GREEN } from '../../../constants/colors'
import { CityForm, LittleSelect, ResetButton } from '../../../components'

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  .MuiFormControl-root {
    margin: 20px 0;
  }
`

const Container = styled.div`
  max-width: 1040px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
`

const ContainerParent = styled.div`
  height: 118px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  background: ${COLOR_OTHER_GREEN};
`

const DesktopCriterionsPanel = ({ paramsUrl = [] }) => {
  const { environmentCriterions, cityCriterions } = useCities()

  const [environmentSelected, setEnvironmentSelected] = useState('')
  const [citySizeSelected, setCitySizeSelected] = useState('')
  const [opportunitySelected, setOpportunitySelected] = useState('')

  const opportunities = {
    1: "Opportunités d'emploi",
    2: "Peu d'opportunités d'emploi",
  }

  const showReset = useCallback(
    () => !!environmentSelected || !!citySizeSelected || !!opportunitySelected,
    [environmentSelected, citySizeSelected, opportunitySelected]
  )

  const resetFilter = () => {
    setEnvironmentSelected('')
    setCitySizeSelected('')
    setOpportunitySelected('')
  }

  const handleChangeEnv = (value) => {
    setEnvironmentSelected(value)
  }

  const handleChangeCity = (value) => {
    setCitySizeSelected(value)
  }

  const handleChangeOpportunity = (value) => {
    setOpportunitySelected(value)
  }

  useEffect(() => {
    if (!!paramsUrl.codeCity && paramsUrl.codeCity !== citySizeSelected) {
      setCitySizeSelected(paramsUrl.codeCity)
    }
    if (
      !!paramsUrl.codeEnvironment &&
      paramsUrl.codeEnvironment !== environmentSelected
    ) {
      setEnvironmentSelected(paramsUrl.codeEnvironment)
    }
    if (
      !!paramsUrl.opportunity &&
      paramsUrl.opportunity !== opportunitySelected
    ) {
      setOpportunitySelected(paramsUrl.opportunity)
    }
  }, [paramsUrl])

  return (
    <>
      <ContainerParent>
        <Container>
          <CityForm
            filters={{
              environmentSelected,
              citySizeSelected,
              opportunitySelected,
            }}
          />
        </Container>
      </ContainerParent>

      <Container>
        <SearchBar>
          <LittleSelect
            label="Cadre de vie"
            values={Object.assign(
              {},
              ...environmentCriterions.map((criterion) => ({
                [criterion.key]: criterion.label,
              }))
            )}
            selectedValue={environmentSelected}
            onChange={(v) => {
              handleChangeEnv(v)
              window.smartTag({
                name: 'cadre_de_vie',
                type: 'action',
                chapters: ['cities', 'recherche', 'filtres'],
              })
            }}
          />

          <LittleSelect
            label="Taille de ville"
            values={Object.assign(
              {},
              ...cityCriterions.map((criterion) => ({
                [criterion.key]: criterion.label,
              }))
            )}
            selectedValue={citySizeSelected}
            onChange={(val) => {
              handleChangeCity(val)
              window.smartTag({
                name: 'taille_de_ville',
                type: 'action',
                chapters: ['cities', 'recherche', 'filtres'],
              })
            }}
          />

          <LittleSelect
            label="Opportunités"
            values={opportunities}
            selectedValue={opportunitySelected}
            onChange={(v) => {
              handleChangeOpportunity(v)
              window.smartTag({
                name: 'opportunites',
                type: 'action',
                chapters: ['cities', 'recherche', 'filtres'],
              })
            }}
          />

          {showReset() ? <ResetButton onClick={resetFilter} /> : null}
        </SearchBar>
      </Container>
    </>
  )
}

DesktopCriterionsPanel.propTypes = {
  paramsUrl: PropTypes.object,
}

export default memo(DesktopCriterionsPanel)
