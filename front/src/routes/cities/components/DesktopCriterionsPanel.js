import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { FormControl, MenuItem, Select, Button } from '@mui/material'

import { useCities } from '../../../common/contexts/citiesContext'
import {
  COLOR_WHITE,
  COLOR_PRIMARY,
  COLOR_OTHER_GREEN,
} from '../../../constants/colors'
import CityForm from '../../../components/CityForm'
import { ReactComponent as ResetFilterIcon } from '../../../assets/images/icons/reset.svg'

const SearchPanel = styled.div`
  background-color: ${COLOR_WHITE};
`
const SearchBar = styled.div`
  > *:not(input) {
    flex: 1;
  }

  .MuiFormControl-root {
    width: 150px;
  }

  .gEkiVf {
    padding: 0px;
    border: 1px solid #f6f7fb;
  }

  position: relative;
`

const SearchFormControl = styled(FormControl)`
  margin-right: 16px !important;
`

const CustomMenuItem = styled(MenuItem)`
  padding: 12px !important;
  height: 54px;
  width: 155px;
  color: ${COLOR_PRIMARY};
  display: flex;
  justify-content: center !important;
  align-items: center !important;
  order: 0;
  flex-grow: 0;
  background-color: transparent !important;
  margin: auto !important;
  &:hover {
    padding: 12px !important;
    background: #c7c7f3 !important;
    border-radius: 8px;
  }
`
const ItemLabel = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
  color: ${COLOR_PRIMARY};
  margin: auto !important;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  align-items: stretch;
  max-width: 1040px;
  margin: 8px auto 0 auto;
  padding: 0 20px;
  width: 100%;
`

const ContainerParent = styled.div`
  height: 118px;
  gap: 8px;
  background: ${COLOR_OTHER_GREEN};
  display: flex;
  justify-content: center;
  align-items: center;
`

const SelectBlock = styled(Select)`
  && {
    &.css-nhoni8-MuiInputBase-root-MuiFilledInput-root:before,
    &.css-nhoni8-MuiInputBase-root-MuiFilledInput-root:active::before {
      border-bottom: none !important;
    }

    &.MuiFilledInput-root {
      position: inherit;
    }

    .MuiSelect-select {
      background-color: transparent !important;
      padding-right: 0 !important;
    }

    fieldset {
      border: 1px solid ${COLOR_PRIMARY};
    }

    svg {
      color: ${COLOR_PRIMARY};
    }

    width: 151px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px;
    gap: 8px;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
    background: ${COLOR_WHITE};
    border-radius: 20px !important;
  }
`
const ResetFilterLabel = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: ${COLOR_PRIMARY};
  margin-left: 8px;
`
const DesktopCriterionsPanel = ({ paramsUrl, total, onSubmit }) => {
  const { criterions, environmentCriterions, cityCriterions } = useCities()
  // TODO a quoi sert le formulaire si la recherche se lance via cityForm ?
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      rome: '',
      region: '',
      environment: '',
      city: '',
    },
  })
  const [displayReset, setdisplayReset] = useState(false)
  const [environmentSelected, setEnvironmentSelected] = useState('')
  const [citySizeSelected, setCitySizeSelected] = useState('')

  useEffect(() => {
    if (!criterions?.criterions || !paramsUrl) {
      return
    }

    const rome = paramsUrl.codeRome || ''
    const region = paramsUrl.codeRegion || ''

    const values = []
    values.push({ name: 'rome', value: rome })
    values.push({ name: 'region', value: region })

    if (paramsUrl.codeEnvironment) {
      const environmentFound = environmentCriterions.find(
        (c) => paramsUrl.codeEnvironment === c.key
      )

      if (environmentFound) {
        values.push({ name: 'environment', value: environmentFound.key })
      }
    }

    if (paramsUrl.codeCity) {
      const cityFound = cityCriterions.find((c) => paramsUrl.codeCity === c.key)

      if (cityFound) {
        values.push({ name: 'city', value: cityFound.key })
      }
    }

    values.forEach(({ name, value }) =>
      setValue(name, value, { shouldDirty: true })
    )
  }, [paramsUrl, criterions, environmentCriterions, cityCriterions])

  const resetFilter = () => {
    setValue('environment', '')
    setEnvironmentSelected('')
    setCitySizeSelected('')
    setValue('city', '')
    setdisplayReset(false)
  }

  const handleChangeEnv = (event) => {
    setValue('environment', event.target.value)
    setEnvironmentSelected(event.target.value)
    setdisplayReset(true)
  }

  const handleChangeCity = (event) => {
    setValue('city', event.target.value)
    setCitySizeSelected(event.target.value)
    setdisplayReset(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SearchPanel>
        <ContainerParent>
          <Container>
            <CityForm filters={{ environmentSelected, citySizeSelected }} />
          </Container>
        </ContainerParent>
        <Container>
          <SearchBar className="wrapper">
            <SearchFormControl sx={{ m: 1, width: 300 }}>
              <Controller
                control={control}
                name="environment"
                defaultValue=""
                render={({ field: { name, value } }) => (
                  <SelectBlock
                    displayEmpty
                    name={name}
                    value={value}
                    onChange={handleChangeEnv}
                  >
                    <CustomMenuItem value="" style={{ display: 'none' }}>
                      <ItemLabel>Cadre de vie</ItemLabel>
                    </CustomMenuItem>
                    {environmentCriterions.map((rome) => (
                      <CustomMenuItem key={rome.key} value={rome.key}>
                        <ItemLabel>{rome.label}</ItemLabel>
                      </CustomMenuItem>
                    ))}
                  </SelectBlock>
                )}
              />
            </SearchFormControl>

            <SearchFormControl sx={{ m: 1, width: 300 }}>
              <Controller
                control={control}
                name="city"
                defaultValue=""
                render={({ field: { name, value } }) => (
                  <SelectBlock
                    name={name}
                    value={value}
                    onChange={handleChangeCity}
                    displayEmpty
                  >
                    <CustomMenuItem
                      selected
                      value=""
                      style={{ display: 'none' }}
                    >
                      <ItemLabel>Taille de ville</ItemLabel>
                    </CustomMenuItem>
                    {cityCriterions.map((rome) => (
                      <CustomMenuItem key={rome.key} value={rome.key}>
                        <ItemLabel>{rome.label}</ItemLabel>
                      </CustomMenuItem>
                    ))}
                  </SelectBlock>
                )}
              />
            </SearchFormControl>
            {displayReset ? (
              <Button
                onClick={resetFilter}
                style={{
                  margin: 0,
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                <ResetFilterIcon />
                <ResetFilterLabel>Réinitialiser</ResetFilterLabel>
              </Button>
            ) : null}
          </SearchBar>
        </Container>
      </SearchPanel>
    </form>
  )
}

DesktopCriterionsPanel.propTypes = {
  paramsUrl: PropTypes.object,
  total: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
}

DesktopCriterionsPanel.defaultProps = {
  paramsUrl: [],
  total: 0,
}

export default React.memo(DesktopCriterionsPanel)
