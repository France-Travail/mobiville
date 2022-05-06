import CloseIcon from '@mui/icons-material/Close'
import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material'
import { throttle } from 'lodash'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useCities } from '../../common/contexts/citiesContext'
import { useWindowSize } from '../../common/hooks/window-size'
import { COLOR_TEXT_PRIMARY } from '../../constants/colors'
import { isMobileView } from '../../constants/mobile'

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
  }
`
const Subtitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  margin: 0px;
  color: ${COLOR_TEXT_PRIMARY};
`
const CitySearchInput = styled((props) => {
  const [searchKeyword, setSearchKeyword] = React.useState('') // inutile ?
  const [isAutocompleteFocused, setIsAutocompleteFocused] = useState(false)

  const isMobile = isMobileView(useWindowSize())
  const handleChange = (event) => {
    setSearchKeyword(event.target.value)
    props.searchKeyword(event.target.value)
  }
  const onFocusChange = (isFocus) => {
    setIsAutocompleteFocused(isFocus)
    props.isAutocompleteFocused(isFocus)
  }

  return (
    <TextField
      id="rome-search"
      label="Rechercher une région ou une ville"
      variant="outlined"
      value={searchKeyword}
      onChange={handleChange}
      // autoFocus
      onFocus={() => onFocusChange(true)}
      onBlur={() => onFocusChange(false)}
      style={{
        position: isMobile && isAutocompleteFocused ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        width: '100%',
        marginTop: isMobile && isAutocompleteFocused ? 10 : null,
        zIndex: isMobile && isAutocompleteFocused ? 10 : null,
        backgroundColor: 'white',
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment
            position="end"
            onClick={(e) => setSearchKeyword('')}
            onFocus={() => onFocusChange(true)}
            onBlur={() => onFocusChange(false)}
          >
            <IconButton edge="end" color="primary">
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
})``

const CitySearchOptions = styled((props) => {
  // tentative de virtualscroll
  // const romeObservers = props.romeListe.map(r => useElementOnScreen({
  //   root: null,
  //   rootMargin: '0px',
  //   threshold: 0,
  // }))

  return (
    <List>
      {props.romeListe.length === 0 ? (
        <p>Pas de résultats</p>
      ) : (
        props.romeListe.map((rome, i) => (
          <ListItem disablePadding>
            <ListItemButton onClick={(rome) => props.onSelect(rome)}>
              <ListItemText primary={rome.label} />
            </ListItemButton>
          </ListItem>
        ))
      )}
    </List>
  )
})``

const SearchRome = ({ onNext, isSearchFocused }) => {
  const size = useWindowSize()
  const {
    // isLoadingJobsMatchingCriterion,
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

  const isMobile = isMobileView(size)

  return (
    <Wrapper>
      {!searchFocused && (
        <Title isMobile={isMobile}>2.L’endroit qui vous fait envie :</Title>
      )}
      {!searchFocused && (
        <Subtitle>
          Choisissez une région pour découvrir une liste de villes favorables,
          ou entrez le nom d’une ville
        </Subtitle>
      )}

      <br />
      <CitySearchInput
        sx={{ backgroundColor: 'white' }}
        searchKeyword={(k) => setSearchedLabel(k)}
        isAutocompleteFocused={(isFocused) => {
          setSearchFocused(isFocused)
          isSearchFocused(isFocused)
        }}
      />
      <CitySearchOptions
        romeListe={jobsMatchingCriterions}
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
