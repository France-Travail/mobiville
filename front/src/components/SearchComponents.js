import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { COLOR_PRIMARY } from '../constants/colors'
import TextField from '@mui/material/TextField'
import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { isMobileView } from '../constants/mobile'
import { useWindowSize } from '../common/hooks/window-size'
import CloseIcon from '@mui/icons-material/Close'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useElementOnScreen } from '../utils/utils'
import noResultsPic from '../assets/images/no_results.svg'

const TextFieldMobiville = styled(TextField)`
  & {
    background-color: white;
    top: 0;
    left: 0;
    width: 100%;
    position: ${(isMobile) => (isMobile ? 'fixed' : 'relative')};
    fieldset {
      border: 1px ${COLOR_PRIMARY} solid;
    }
  }
  &:focus {
    margin-top: ${(isMobile) => (isMobile ? '10px' : null)};
    z-index: 10;
  }
  & div:hover {
    fieldset {
      border: 2px ${COLOR_PRIMARY} solid !important;
    }
  }
`
const SearchInput = (props) => {
  const isMobile = isMobileView(useWindowSize())
  const [searchKeyword, setSearchKeyword] = useState('') // inutile ?
  const [isAutocompleteFocused, setIsAutocompleteFocused] = useState(false)
  const inputRef = useRef(null)

  const handleValueChange = (value) => {
    setSearchKeyword(value)
    props.searchKeyword(value)
  }
  const onFocusChange = (isFocus) => {
    setTimeout(() => {
      setIsAutocompleteFocused(isFocus)
      props.isAutocompleteFocused(isFocus)
      // si on n'attend pas un peu l'input bouge avant la fin du click...
    }, 100)
  }
  const clickAdornement = (evt) => {
    if (!isAutocompleteFocused && inputRef.current) {
      inputRef.current.focus()
    } else {
      handleValueChange('')
    }
    setIsAutocompleteFocused(!isAutocompleteFocused)
    props.isAutocompleteFocused(!isAutocompleteFocused) // pour masquer les titres
  }

  return (
    <TextFieldMobiville
      label={props.label}
      variant="outlined"
      value={searchKeyword}
      onChange={(event) => handleValueChange(event.target.value)}
      isMobile={isMobile}
      InputProps={{
        inputProps: {
          ref: inputRef,
          onFocus: () => onFocusChange(true),
          onBlur: () => onFocusChange(false),
        },
        endAdornment: (
          <InputAdornment position="end" onClick={clickAdornement}>
            <IconButton edge="end" color="primary">
              {isAutocompleteFocused ? <CloseIcon /> : <ArrowDropDownIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}
SearchInput.defaultProps = {}

const NoSearchResult = () => (
  <>
    <img
      alt=""
      src={noResultsPic}
      style={{ margin: '2em auto', display: 'block' }}
    />
    <p style={{ margin: 'unset', textAlign: 'center' }}>Aucun Résultat</p>
  </>
)
const SearchOptions = (props) => {
  const [basDeListeRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  })

  const [totalItemLoaded, setTotalItemLoaded] = useState(15)
  useEffect(() => {
    const handler = setTimeout(() => {
      if (isVisible && totalItemLoaded < props.optionsList.length) {
        setTotalItemLoaded(totalItemLoaded + 5)
      }
    }, 100)
    return () => clearTimeout(handler)
  }, [isVisible, totalItemLoaded])

  return (
    <List>
      {props.optionsList.length === 0 ? (
        <NoSearchResult />
      ) : (
        props.optionsList.slice(0, totalItemLoaded).map((option, i) => (
          <ListItem key={option.label} disablePadding>
            <ListItemButton
              onClick={() => props.onSelect(option)}
              // disableGutters
              style={{ flexGrow: 0 }}
            >
              <ListItemText primary={option.label} />
            </ListItemButton>
          </ListItem>
        ))
      )}
      <ListItem ref={basDeListeRef} />
    </List>
  )
}
SearchOptions.defaultProps = { optionsList: [], onSelect: () => {} }

export { SearchInput, SearchOptions }
