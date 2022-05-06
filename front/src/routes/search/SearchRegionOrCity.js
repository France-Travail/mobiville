import { Autocomplete, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import { useCities } from '../../common/contexts/citiesContext'
import { ucFirstOnly } from '../../utils/utils'
import { useHistory } from 'react-router'

const ALL_REGIONS_LABEL = 'Toutes les régions'
const REGION_TYPE = 'Régions'
const CITY_TYPE = 'Villes'

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const H1 = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 8px 0;
`

const InfoText = styled(Typography)`
  padding: 8px 0 16px 0;
`

const SearchRegionOrCity = ({ onNext, values }) => {
  const {
    criterions,
    autocompletedCities,
    isLoadingAutocomplete,
    onAutocomplete,
  } = useCities()
  const [isAutocompleteFocused, setIsAutocompleteFocused] = useState(false)
  const [searchedValue, setSearchedValue] = useState('')
  const history = useHistory()
  const size = useWindowSize()

  useEffect(() => {
    const trimmedValue = searchedValue.trim()
    if (trimmedValue) onAutocomplete(trimmedValue)
  }, [searchedValue])

  const isMobile = isMobileView(size)
  if (!values.codeRome) return <div />

  const regionsList = criterions.regions.filter(
    (region) =>
      region?.criterions?.[values.codeRome] &&
      region.label.toLowerCase().match(searchedValue.trim().toLowerCase())
  )

  const autocompleteList = [{ label: ALL_REGIONS_LABEL, type: REGION_TYPE }]
    .concat(regionsList.map((region) => ({ ...region, type: REGION_TYPE })))
    .concat(
      autocompletedCities.map((city) => ({
        id: city.insee_com,
        label: `${ucFirstOnly(city.nom_comm)} (${city.postal_code})`,
        cityName: city.nom_comm,
        type: CITY_TYPE,
      }))
    )

  return (
    <Container>
      <H1>Quel endroit vous fait envie ?</H1>

      <InfoText>
        Choisissez une région pour découvrir une liste de villes favorables, ou
        entrez le nom d’une ville
      </InfoText>

      <Autocomplete
        onInputChange={(event, newValue) => {
          if (!event) return

          setSearchedValue(newValue)
        }}
        onChange={(event, value, reason) => {
          if (reason !== 'selectOption') return

          const { type, id } = value

          if (type === REGION_TYPE) {
            return onNext({ regions: id })
          }
          if (type === CITY_TYPE) {
            return history.push(
              `/city/${id}-${value.cityName}?codeRome=${values.codeRome}`
            )
          }
        }}
        inputValue={searchedValue}
        options={autocompleteList}
        renderInput={(inputParams) => (
          <TextField
            {...inputParams}
            label="Rechercher une région ou une ville"
            variant="filled"
            openOnFocus
          />
        )}
        groupBy={(option) => option.type}
        getOptionLabel={(region) => region.label}
        noOptionsText="Pas de résultat"
        loading={isLoadingAutocomplete}
        loadingText="Chargement…"
        filterOptions={(x) => x}
        style={{
          position: isMobile && isAutocompleteFocused ? 'fixed' : 'static',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 10,
          backgroundColor: '#f9f9f9',
        }}
        onFocus={() => setIsAutocompleteFocused(true)}
        onBlur={() => setIsAutocompleteFocused(false)}
      />
    </Container>
  )
}

SearchRegionOrCity.propTypes = {
  onNext: PropTypes.func,
  values: PropTypes.object,
}

SearchRegionOrCity.defaultProps = {
  onNext: () => {},
  values: {},
}

export default SearchRegionOrCity
