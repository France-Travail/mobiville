import PropTypes from 'prop-types'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useCities } from '../../common/contexts/citiesContext'
import { useWindowSize } from '../../common/hooks/window-size'
import { SearchInput, SearchOptions } from '../../components/SearchComponents'
import { COLOR_TEXT_PRIMARY } from '../../constants/colors'
import { isMobileView } from '../../constants/mobile'
import { ucFirstOnly } from '../../utils/utils'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  && {
    font-size: 24px;
    font-weight: 900;
    margin: ${(isMobile) => (isMobile ? '0px' : '0 0 32px 0')};
    color: ${COLOR_TEXT_PRIMARY};
    display: ${(props) => props.display || 'initial'};
  }
`
const Subtitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  margin: 0px;
  color: ${COLOR_TEXT_PRIMARY};
  display: ${(props) => props.display || 'initial'};
`

const SearchCity = ({ onNext, isSearchFocused }) => {
  const ALL_REGIONS_LABEL = 'Toutes les régions'
  const REGION_TYPE = 'Régions'
  const CITY_TYPE = 'Villes'

  const size = useWindowSize()
  const isMobile = isMobileView(size)

  const [searchFocused, setSearchFocused] = useState(false)
  const [searchedValue, setSearchedValue] = useState('')

  const location = useLocation()
  const [codeRome] = useState(queryString.parse(location.search)?.codeRome)
  useEffect(() => onAutocomplete(searchedValue.trim()), [searchedValue])

  const { criterions, autocompletedCities, onAutocomplete } = useCities()

  const regionsList = criterions.regions.filter(
    (region) =>
      region?.criterions?.[codeRome] &&
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
    <Wrapper>
      <Title
        display={searchFocused && isMobile ? 'none' : undefined}
        isMobile={isMobile}
      >
        2.L’endroit qui vous fait envie :
      </Title>

      <Subtitle display={searchFocused && isMobile ? 'none' : undefined}>
        Choisissez une région pour découvrir une liste de villes favorables, ou
        entrez le nom d’une ville
      </Subtitle>

      <br />
      <SearchInput
        label="Rechercher une région ou une ville"
        searchKeyword={(k) => setSearchedValue(k)}
        isAutocompleteFocused={(isFocused) => {
          setSearchFocused(isFocused)
          isSearchFocused(isFocused)
        }}
      />
      <SearchOptions
        optionsList={autocompleteList}
        onSelect={(where) =>
          onNext(
            where.id.length > 3
              ? { city: where.id, cityName: where.cityName }
              : { regions: where.id }
          )
        }
      />
    </Wrapper>
  )
}

SearchCity.propTypes = {
  onNext: PropTypes.func,
  isSearchFocused: PropTypes.func,
}

SearchCity.defaultProps = {
  onNext: () => {},
  isSearchFocused: () => {},
}

export default SearchCity
