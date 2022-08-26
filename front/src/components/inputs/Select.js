import { useCallback } from 'react'
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
import { COLOR_LIGHT_GREY, COLOR_OTHER_GREEN, COLOR_PRIMARY, COLOR_TEXT_PRIMARY, COLOR_WHITE } from '../../constants/colors'

const AppFormControl = styled(FormControl)`
  width: 100%;
  background: ${ COLOR_WHITE };
  color: ${ COLOR_PRIMARY } !important;
  border-radius: 20px;
  border: 1px solid ${ COLOR_LIGHT_GREY } !important;
  margin: 0 !important;

  & div.MuiSelect-select {
    background: inherit !important;
    padding-top: 20px;
    padding-bottom: 13px;
    color: ${ COLOR_PRIMARY } !important;
    font-weight: 700 !important;
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

  & ul.MuiList-root {
    color: ${ COLOR_PRIMARY } !important;
    font-size: 16 !important;
    font-weight: 700 !important;
    margin-top: 9px !important;
  }
`

const CustomInputLabel = styled(InputLabel)`
  color: ${ COLOR_TEXT_PRIMARY } !important;
`

const Placeholder = styled(InputLabel)`
  margin-top: 33px !important;
  font-size: 18px !important;
  font-weight: 400 !important;
  color: ${ COLOR_TEXT_PRIMARY } !important; 
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
  value = "",
  label = "",
  placeholder = "",
  onChange = () => {},
  renderValue = (selected) => (_.capitalize(_.toLower(selected))),
  multiple = false,
  style = {}
}) => {

  const isPlaceholderHidden = useCallback(() => {
    if (!multiple) {
      return !!value
    }
    return !(value.length === 0)
  }, [value])

  const handleChange = (event, child) => {
    const {
      target: { value },
    } = event

    onChange(value)
  }

  return (
    <AppFormControl sx={{ m: 1, ...style }}>
      <CustomInputLabel
        id={`${_.kebabCase(label)}-label`}
        variant="filled"
        shrink={true}
      >{label}</CustomInputLabel>
      <Placeholder
        id={`${_.kebabCase(label)}-placeholder`}
        variant="filled"
        shrink={true}
        hidden={isPlaceholderHidden()}
      >{placeholder}</Placeholder>
      <Select
        labelId={`${_.kebabCase(label)}-label`}
        id={`${_.kebabCase(label)}`}
        multiple={multiple}
        value={(value ?? "")}
        onChange={handleChange}
        renderValue={renderValue}
      >
        {options.map((option) => (
          <AppMenuItem
            key={option.key}
            value={option.option}
          >
            { multiple
              ? <Checkbox checked={value.indexOf(option.option) > -1} />
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
  value: PropTypes.any,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  renderValue: PropTypes.func,
  multiple: PropTypes.bool,
  style: PropTypes.object,
}

export default AppSelect