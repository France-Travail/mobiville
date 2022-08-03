import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { COLOR_PRIMARY } from '../constants/colors'
import TextField from '@mui/material/TextField'
import {
  Popper,
  Paper,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ClickAwayListener,
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
  const [isAutocompleteFocused, setIsAutocompleteFocused] = useState(false)
  const inputRef = useRef(null)

  const handleValueChange = (value) => {
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
      props.removeValue()
    }
    setIsAutocompleteFocused(!isAutocompleteFocused)
    props.isAutocompleteFocused(!isAutocompleteFocused)
  }

  return (
    <div id="SearchInputWrapper">
      <TextFieldMobiville
        label={props.label}
        variant="outlined"
        value={props.selectedValue}
        onChange={(event) => handleValueChange(event.target.value)}
        isMobile={isMobile}
        InputProps={{
          inputProps: {
            ref: inputRef,
            onFocus: () => onFocusChange(true),
            onClick: () => onFocusChange(true),
            onBlur: () => onFocusChange(false),
          },
          endAdornment: (
            <InputAdornment position="end" onClick={clickAdornement}>
              <IconButton edge="end" color="primary">
                {!!isAutocompleteFocused ? (
                  <CloseIcon />
                ) : !isMobile ? (
                  <ArrowDropDownIcon />
                ) : undefined}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
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

  const isMobile = isMobileView(useWindowSize())

  const [basDeListeRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  })

  const [totalItemLoaded, setTotalItemLoaded] = useState(10)
  useEffect(() => {
    const handler = setTimeout(() => {
      if (isVisible && totalItemLoaded < props.optionsList.length) {
        setTotalItemLoaded(totalItemLoaded + 5)
      }
    }, 100)
    return () => clearTimeout(handler)
  }, [isVisible, totalItemLoaded])

  return isMobile ? (
    <List>
      {props.optionsList.length === 0 ? (
        <NoSearchResult />
      ) : (
        props.optionsList.slice(0, totalItemLoaded).map((option, i) => (
          <ListItem key={option.label}>
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
  ) : (
    <DropdownOptions
      isSearchFocused={props.isSearchFocused}
      optionsList={props.optionsList}
      onSelect={props.onSelect}
      isMobile={isMobile}
    />
  )
}
SearchOptions.defaultProps = { optionsList: [], onSelect: () => {} }

const DropdownOptions = (props) => {
  const anchorEl = document.querySelector('#SearchInputWrapper')
  const [isOpen, setIsOpen] = useState(false)
  const textFieldWidth = !!anchorEl
    ? window.getComputedStyle(anchorEl).width
    : '100px'

  useEffect(() => {
    if (props.isSearchFocused) {
      setIsOpen(true)
    }
  }, [props.isSearchFocused])

  const handleClickAway = (evt) => {
    // les inputs adornement (svg/path) semblent sortir du dom avant le if
    const isAdornement = ['svg', 'path'].includes(evt.target.nodeName)
    if (
      (!document.querySelector('#SearchInputWrapper').contains(evt.target) &&
        !isAdornement) ||
      (isAdornement && !props.isSearchFocused)
    ) {
      setIsOpen(false)
    }
  }

  const onSelect = (option) => {
    props.onSelect(option)
    setIsOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Popper
        open={isOpen}
        anchorEl={anchorEl}
        placement={'bottom-start'}
        sx={{ maxHeight: '300px', width: textFieldWidth }}
      >
        <Paper
          sx={{
            maxHeight: '300px',
            width: textFieldWidth,
            overflowY: 'scroll',
          }}
        >
          <List>
            {props.optionsList.length === 0 ? (
              <p style={{ margin: 'unset', textAlign: 'center' }}>
                Aucun Résultat
              </p>
            ) : (
              props.optionsList.map((option, i) => (
                <ListItem key={option.label}>
                  <ListItemButton
                    onClick={() => onSelect(option)}
                    // disableGutters
                  >
                    <ListItemText primary={option.label} />
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </List>
        </Paper>
      </Popper>
    </ClickAwayListener>
  )
}
DropdownOptions.defaultProps = { optionsList: [], onSelect: () => {} }

export { SearchInput, SearchOptions }
