import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { throttle } from 'lodash'

import { SearchInput, SearchOptions } from '../../components/SearchComponents'
import { useCities } from '../../common/contexts/citiesContext'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import { COLOR_TEXT_PRIMARY } from '../../constants/colors'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 540px;
  justify-self: end;
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

const AllJobListLink = styled(Link)`
  font-weight: 400;
  font-size: 16px;
  text-decoration: underline;
`

const SearchRome = ({ onNext, isSearchFocused }) => {
  const size = useWindowSize()
  const isMobile = isMobileView(size)
  const {
    initializeJobsAutocomplete,
    jobsMatchingCriterions,
    onSearchJobLabels,
  } = useCities()

  const [searchFocused, setSearchFocused] = useState(false)
  const [searchedLabel, setSearchedLabel] = useState('')

  const throttledOnSearchJobLabels = useMemo(
    () => throttle((search) => onSearchJobLabels(search), 200),
    []
  )

  useEffect(() => {
    initializeJobsAutocomplete()
  }, [])

  useEffect(() => {
    throttledOnSearchJobLabels(searchedLabel)
  }, [searchedLabel])

  return (
    <Wrapper>
      <Title
        display={searchFocused && isMobile ? 'none' : undefined}
        isMobile={isMobile}
      >
        1.Quel métier recherchez-vous ?
      </Title>
      <Subtitle display={searchFocused && isMobile ? 'none' : undefined}>
        Mobiville est disponible uniquement pour les métiers <br />
        dans lesquels le retour à l'emploi est le plus favorable.
      </Subtitle>

      {!isMobile && (
        <AllJobListLink to="/rome-list" title="Accéder à la liste des métiers">
          Voir la liste des métiers disponibles sur Mobiville
        </AllJobListLink>
      )}
      <br />
      <SearchInput
        label="Rechercher un type de métier"
        searchKeyword={(k) => setSearchedLabel(k)}
        isAutocompleteFocused={(isFocused) => {
          setSearchFocused(isFocused)
          isSearchFocused(isFocused)
        }}
      />
      <SearchOptions
        optionsList={jobsMatchingCriterions}
        onSelect={(rome) => onNext({ rome: rome.key })}
      />
    </Wrapper>
  )
}

SearchRome.propTypes = {
  onNext: PropTypes.func,
  values: PropTypes.object,
  isSearchFocused: PropTypes.func,
}

SearchRome.defaultProps = {
  onNext: () => {},
  values: {},
}

export default SearchRome
