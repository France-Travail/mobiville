import _ from 'lodash'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

import {
  Autocomplete,
  Box,
  CircularProgress,
  Popper,
  TextField,
} from '@mui/material'

import { useWindowSize } from '../../common/hooks/window-size'
import {
  COLOR_LIGHT_GREY,
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
  COLOR_TEXT_SECONDARY,
  COLOR_WHITE,
} from '../../constants/colors'
import { isMobileView } from '../../constants/mobile'

const AppAutocomplete = styled(Autocomplete)`
  flex: 1;
  background: ${COLOR_WHITE};
  border-radius: 20px;
  padding: 7px 0 0 5px;
  border: 1px solid ${COLOR_LIGHT_GREY} !important;

  & div.MuiInputBase-root {
    height: 66px;
    border-radius: inherit;
    background: none;

    ${({ $isPlaceholderSelected }) =>
      !$isPlaceholderSelected &&
      css`
        & input.MuiInputBase-input {
          color: ${COLOR_PRIMARY} !important;
          font-weight: 700 !important;
        }
      `}
  }

  & label {
    font-size: 20px;
    font-weight: 700;

    color: ${({ disabled }) =>
      disabled
        ? `${COLOR_TEXT_SECONDARY}`
        : `${COLOR_TEXT_PRIMARY}`} !important;
  }

  & input.MuiInputBase-input {
    color: ${COLOR_TEXT_PRIMARY} !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    font-size: ${({ $isMobile }) => ($isMobile ? '16px' : '14px')};
    font-weight: 400;
  }

  & ::placeholder {
    opacity: 1 !important;
  }
`

const CustomBox = styled(Box)`
  ${({ $primary }) =>
    $primary &&
    css`
      color: ${COLOR_PRIMARY};
      font-weight: 700;
    `}
`

const CustomPopper = styled(Popper)`
  // groupLabel styling
  & .MuiAutocomplete-listbox > li.MuiBox-root:not(.MuiAutocomplete-option) {
    padding: 6px 16px;
  }
`

const TextSearchInput = ({
  options,
  onChange,
  label = '',
  placeholder = '',
  value,
  noOptionsText = 'Aucun résultat trouvé...',
  groupLabel = null,
  loading = false,
  disabled = false,
  onInputChange = () => {},
  isOptionEqualToValue = (option, value) => option.label === value.label,
  defaultValue,
  openThreshold = -1,
  showEndAdornment = true,
  onClickTag = () => {},
}) => {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const isMobile = isMobileView(useWindowSize())

  const handleInputChange = (event, value) => {
    onInputChange(event, value)
    setInputValue(value)
  }

  const handleChange = (event, value) => {
    onChange(event, value)
  }

  const handleOpen = (isOpen) => {
    if (inputValue.length >= openThreshold) {
      setOpen(isOpen)
    }
  }

  useEffect(() => {
    if (openThreshold > 0 && inputValue.length <= openThreshold) {
      setOpen(false)
    }
  }, [inputValue, openThreshold])

  const isPlaceholderSelected = useCallback(() => {
    return !inputValue
  }, [inputValue])

  return (
    <AppAutocomplete
      $isMobile={isMobile}
      // states and basics
      id={`autocomplete-${_.kebabCase(label)}`}
      disablePortal
      disabled={disabled}
      options={options}
      loading={loading}
      defaultValue={defaultValue}
      value={value}
      noOptionsText={noOptionsText}
      // interactions logic
      filterOptions={(input) => input}
      open={open}
      onOpen={() => {
        handleOpen(true)
        onClickTag()
      }}
      onClose={() => {
        setOpen(false)
      }}
      openOnFocus
      onInputChange={handleInputChange}
      onChange={handleChange}
      // rendering
      $isPlaceholderSelected={isPlaceholderSelected()}
      isOptionEqualToValue={isOptionEqualToValue}
      // - grouping
      groupBy={(option) => !!option}
      renderGroup={(params) => (
        <>
          {/* render group label if exists */}
          {groupLabel ? (
            <CustomBox key={groupLabel} $primary component="li">
              {groupLabel}
            </CustomBox>
          ) : null}
          {/* render options */}
          {params.children.map((child) => (
            <CustomBox key={child.key} component="li" {...child.props}>
              {child.props.children}
            </CustomBox>
          ))}
        </>
      )}
      // - options
      getOptionLabel={(option) => option?.label ?? ''}
      renderOption={(props, option) => (
        <CustomBox
          key={props.id ?? props.label}
          $primary={option.style === 'primary'}
          component="li"
          {...props}
        >
          {option.label}
        </CustomBox>
      )}
      // - input
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          variant="filled"
          InputLabelProps={{
            shrink: true,
            required: true,
          }}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {showEndAdornment ? params.InputProps.endAdornment : null}
              </>
            ),
          }}
        />
      )}
      // - popper
      PopperComponent={CustomPopper}
    />
  )
}

TextSearchInput.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  noOptionsText: PropTypes.string,
  groupLabel: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  isOptionEqualToValue: PropTypes.func,
  defaultValue: PropTypes.any,
  openThreshold: PropTypes.number,
  onClickTag: PropTypes.func,
}

export default TextSearchInput
