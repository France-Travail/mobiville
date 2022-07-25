import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormControl, MenuItem, InputLabel, Select } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useCities } from '../../common/contexts/citiesContext'
import { COLOR_PRIMARY } from '../../constants/colors'

const SearchPanel = styled.div`
  margin-bottom: 36px;
  background-color: white;
  padding: 32px 0;
`

const SearchBar = styled.div`
  height: 64px;
  border-radius: 4px;
  display: flex;
  align-items: center;

  > *:not(input) {
    flex: 1;
  }
`

const SearchFormControl = styled(FormControl)`
  margin-right: 16px !important;
`

const SubmitButton = styled.input`
  height: 100%;
  background-color: ${COLOR_PRIMARY};
  color: white;
  padding: 0 34px;
  line-height: 64px;
  border: none;
  font-weight: 500;
  font-size: 18px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  cursor: pointer;
`

const DesktopCriterionsPanel = ({ paramsUrl, total, onSubmit }) => {
  const {
    criterions,
    environmentCriterions,
    cityCriterions,
    regionCriterions,
  } = useCities()
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      rome: '',
      region: '',
      environment: '',
      city: '',
    },
  })

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SearchPanel>
        <SearchBar className="wrapper">
          <SearchFormControl variant="filled">
            <InputLabel htmlFor="panel-select-environment" shrink>
              Environnement
            </InputLabel>
            <Controller
              control={control}
              name="environment"
              defaultValue=""
              render={({ field: { name, value, onChange } }) => (
                <Select
                  displayEmpty
                  name={name}
                  value={value}
                  onChange={onChange}
                  inputProps={{
                    id: 'panel-select-environment',
                  }}
                >
                  <MenuItem value="">Peu importe</MenuItem>
                  {environmentCriterions.map((rome) => (
                    <MenuItem key={rome.key} value={rome.key}>
                      {rome.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </SearchFormControl>

          <SearchFormControl variant="filled">
            <InputLabel htmlFor="panel-select-city-size" shrink>
              Taille de ville
            </InputLabel>
            <Controller
              control={control}
              name="city"
              defaultValue=""
              render={({ field: { name, value, onChange } }) => (
                <Select
                  name={name}
                  value={value}
                  onChange={onChange}
                  displayEmpty
                  inputProps={{
                    id: 'panel-select-city-size',
                  }}
                >
                  <MenuItem selected value="">
                    Peu importe
                  </MenuItem>
                  {cityCriterions.map((rome) => (
                    <MenuItem key={rome.key} value={rome.key}>
                      {rome.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </SearchFormControl>

          <SearchFormControl variant="filled">
            <InputLabel htmlFor="panel-select-region" shrink>
              Région
            </InputLabel>
            <Controller
              control={control}
              name="region"
              defaultValue=""
              render={({ field: { name, value, onChange } }) => (
                <Select
                  displayEmpty
                  inputProps={{
                    id: 'panel-select-city-size',
                  }}
                  name={name}
                  value={value}
                  onChange={onChange}
                >
                  <MenuItem selected value="">
                    Toutes les regions
                  </MenuItem>
                  {regionCriterions.map((rome) => (
                    <MenuItem key={rome.key} value={rome.key}>
                      {rome.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </SearchFormControl>
          <SubmitButton type="submit" value="Rechercher" />
        </SearchBar>
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
