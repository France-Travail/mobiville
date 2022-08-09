import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'

import {
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText
} from '@mui/material'
import { COLOR_LIGHT_GREY, COLOR_OTHER_GREEN, COLOR_PRIMARY, COLOR_WHITE } from '../../constants/colors'

const AppFormControl = styled(FormControl)`
  width: 100%;
  background: ${ COLOR_WHITE };
  color: ${ COLOR_PRIMARY };
  border-radius: 20px;
  border: none !important;
  margin: 0 !important;

  & div.MuiSelect-select {
    background: inherit !important;
    padding-top: 20px;
    padding-bottom: 13px;
  }

  & fieldset.MuiOutlinedInput-notchedOutline {
    border: none;
  }

  & div.MuiInputBase-root {
    height: 73px;
    border-radius: inherit;
    background: white !important;
  }

  & div.MuiInputBase-input {
    border-radius: inherit;
    margin-top: 20px;
    font-size: 14px;
    font-weight: 400;
  }

  & label {
    font-size: 20px;
    font-weight: 700;
    margin-top: 7px;
    padding-left: 6px;
  }

  & div.MuiPaper-root {
    margin-top: 9px !important;
  }

  & ul.MuiList-root {
    color: ${ COLOR_PRIMARY } !important;
    font-size: 16 !important;
    font-weight: 700 !important;
    margin-top: 9px !important;
  }
`

const Placeholder = styled(InputLabel)`
  margin-top: 33px !important;
  font-size: 18px !important;
  font-weight: 400 !important;
  color: rgba(0, 0, 0, 0.4) !important; 
  visibility: ${({ hidden }) => (hidden ? 'hidden' : 'visible') };
`

const AppMenuItem = styled(MenuItem)`
  height: 54px;

  margin: 15px !important;
  border: 1px solid ${ COLOR_LIGHT_GREY } !important;
  color: ${ COLOR_PRIMARY } !important;
  border-radius: 8px !important;
  
  span {
    font-weight: 700 !important;
  }

  &:hover, &:checked, &.Mui-selected {
    background-color: ${ COLOR_OTHER_GREEN } !important;
  }
`

const AppSelect = ({
  options,
  label = "",
  placeholder = "",
  onChange = () => {},
  renderValue = (selected) => (_.capitalize(_.toLower(selected))),
  multiple = false,
  defaultValue = null,
  style = {}
}) => {
  // set default empty value depending on mode (multi)
  const [ selectedValue, setSelectedValue ] = useState(defaultValue ?? multiple ? [] : '')

  const isPlaceholderHidden = useCallback(() => {
    if (!multiple) {
      return !!selectedValue
    }
    return !(selectedValue.length === 0)
  }, [selectedValue])

  const handleChange = (event, child) => {
    const {
      target: { value },
    } = event

    setSelectedValue(value)
    onChange(value)
  }

  return (
    <AppFormControl sx={{ m: 1, ...style }}>
      <InputLabel
        id="demo-multiple-checkbox-label"
        variant="filled"
        shrink={true}
      >{label}</InputLabel>
      <Placeholder
        id="placeholder"
        variant="filled"
        shrink={true}
        hidden={isPlaceholderHidden()}
      >{placeholder}</Placeholder>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple={multiple}
        value={selectedValue}
        onChange={handleChange}
        renderValue={renderValue}
      >
        {options.map((option) => (
          <AppMenuItem
            key={option.key}
            value={option.option}
          >
            { multiple
              ? <Checkbox checked={selectedValue.indexOf(option.option) > -1} />
              : null
            }
            <ListItemText
              primary={_.capitalize(_.toLower(option.option))}
            />
          </AppMenuItem>
        ))}
      </Select>
    </AppFormControl>
  )
}

AppSelect.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  renderValue: PropTypes.func,
  multiple: PropTypes.bool,
  defaultValue: PropTypes.any,
  style: PropTypes.object,
}

export default AppSelect