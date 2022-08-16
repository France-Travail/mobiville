import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import _ from 'lodash'

import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'

import { COLOR_LIGHT_GREY, COLOR_PRIMARY, COLOR_WHITE } from '../../constants/colors'

const AppAutocomplete = styled(Autocomplete)`
    flex: 1;
    background: ${ COLOR_WHITE };
    color: ${ COLOR_PRIMARY };
    border-radius: 20px;
    padding: 7px 0 0 5px;
    border: 1px solid ${ COLOR_LIGHT_GREY } !important;

    & div.MuiInputBase-root {
        height: 66px;
        border-radius: inherit;
        background: none;

        ${({ $isPlaceholderSelected }) => (!$isPlaceholderSelected) && css`
            & input.MuiInputBase-input {
                color: ${ COLOR_PRIMARY } !important;
                font-weight: 700 !important;
            }
        `}
    }

    & label {
        font-size: 20px;
        font-weight: 700;
    }

    & input.MuiFilledInput-input {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        font-size: 14px;
        font-weight: 400;
    }
`

const TextSearchInput = ({
        options,
        onChange,
        label = "",
        placeholder = "",
        loading = false,
        disabled = false,
        onInputChange = () => {},
        isOptionEqualToValue = (option, value) => option.label === value.label,
        defaultValue,
        openThreshold = -1,
        showEndAdornment = true
    }) => {

    const [ open, setOpen ] = useState(false)
    const [ inputValue, setInputValue ] = useState('')

    const handleInputChange = (event, value) => {
        onInputChange(event, value)
        setInputValue(value)
        handleOpen(true)
    }

    const handleChange = (event, value) => {
        onChange(event, value)
    }

    const handleOpen = (isOpen) => {
        if (inputValue.length >= openThreshold) {
            setOpen(isOpen)
        }
    }

    const isPlaceholderSelected = useCallback(() => {
        return (!inputValue)
    }, [inputValue])
    
    return (
        <AppAutocomplete
            $isPlaceholderSelected={isPlaceholderSelected()}
            disablePortal
            disabled={disabled}
            id={`autocomplete-${_.kebabCase(label)}`}
            options={options}
            loading={loading}
            open={open}
            onOpen={() => {
                handleOpen(true)
            }}
            onClose={() => {
                setOpen(false)
            }}
            openOnFocus
            isOptionEqualToValue={isOptionEqualToValue}
            getOptionLabel={(option) => option?.label ?? ''}
            defaultValue={defaultValue}
            onInputChange={handleInputChange}
            onChange={handleChange}
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
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {showEndAdornment ? params.InputProps.endAdornment : null}
                            </>
                        ),
                    }}
                />
            )}
        />
    )
}

TextSearchInput.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    onInputChange: PropTypes.func,
    isOptionEqualToValue: PropTypes.func,
    defaultValue: PropTypes.any,
    openThreshold: PropTypes.number,
}

export default TextSearchInput