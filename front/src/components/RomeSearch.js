import React, { useState } from 'react'
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

const RomeSearchInput = styled((props) => {
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
      label="Rechercher un métier"
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
})`
  fieldset {
    // TODO impossible d'acceder au fieldset
    color: red;
    background: red;
    border-color: ${COLOR_PRIMARY};
    border: 4px ${COLOR_PRIMARY} solid;
  }
`
const RomeSearchOptions = styled((props) => {
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
RomeSearchOptions.defaultProps = {
  romeListe: [],
}
export { RomeSearchInput, RomeSearchOptions }
