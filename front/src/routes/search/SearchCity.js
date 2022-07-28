import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useCities } from '../../common/contexts/citiesContext'
import { useWindowSize } from '../../common/hooks/window-size'
import { SearchInput, SearchOptions } from '../../components/SearchComponents'
import { COLOR_PRIMARY, COLOR_TEXT_PRIMARY } from '../../constants/colors'
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

const SearchResult = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`

const ButtonContainer = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  margin: 32px auto;
  width: 270px;
  height: 50px;
`

const SearchButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 24px;
  cursor: pointer;
  background: ${COLOR_PRIMARY};
  color: white;
  border-radius: 20px;
  padding: 12px 0px;
  margin: auto;
  @media (hover) {
    &:hover {
      color: white;
      opacity: 0.8;
    }
  }
`

const SearchCity = ({ onNext, isSearchFocused }) => {
  const ALL_REGIONS_LABEL = 'Toutes les régions'
  const REGION_TYPE = 'Régions'
  const CITY_TYPE = 'Villes'

  const size = useWindowSize()
  const isMobile = isMobileView(size)

  const [searchFocused, setSearchFocused] = useState(false)
  const [searchedValue, setSearchedValue] = useState('')
  const [selectedItem, setSelectedItem] = useState('')

  const { autocompletedCities, onAutocomplete } = useCities()

  // refresh list autocompletion based on searched input update
  useEffect(
    () => {
      onAutocomplete(searchedValue.trim())
    },
    [searchedValue]
  )

  // on select list item
  const onSelection = (selectedItem) => {
    setSelectedItem(selectedItem)
    setSearchedValue(selectedItem.label)
    window.scrollTo(0, 0)
  }

  // format autocompleted cities list item. Append default "Toutes les régions"
  const autocompleteList = autocompletedCities
    .reduce((results, city) => {
      if (!!searchedValue && searchedValue !== '') {
        results.push({
          id: city.insee_com,
          label: `${ucFirstOnly(city.nom_comm)} (${city.postal_code})`,
          cityName: city.nom_comm,
          type: CITY_TYPE,
        });
      }
      return results;
    }, [])
    .concat([{ label: ALL_REGIONS_LABEL, type: REGION_TYPE }])

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
        label="Saisir ou sélectionner une ville, région"
        searchKeyword={(k) => setSearchedValue(k)}
        selectedValue={searchedValue}
        removeValue={() => setSelectedItem('')}
        isAutocompleteFocused={(isFocused) => {
          setSearchFocused(isFocused)
          isSearchFocused(isFocused)
        }}
      />
      <SearchResult isVisible={!selectedItem}>
        <SearchOptions
          isMobile={isMobile}
          isSearchFocused={searchFocused}
          optionsList={autocompleteList}
          onSelect={onSelection}
        />
      </SearchResult>
      <ButtonContainer isVisible={selectedItem}>
        <SearchButton
          onClick={() =>
            onNext(
              selectedItem.id?.length > 3
                ? { city: selectedItem.id, cityName: selectedItem.cityName }
                : { regions: selectedItem.id }
            )
          }
        >
          Lancer la recherche
        </SearchButton>
      </ButtonContainer>
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
