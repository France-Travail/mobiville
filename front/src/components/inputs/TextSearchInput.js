import { useState } from 'react'
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import styled from 'styled-components';
import { COLOR_PRIMARY, COLOR_WHITE } from '../../constants/colors';


const AppAutocomplete = styled(Autocomplete)`
    flex: 1;
    background: ${ COLOR_WHITE };
    color: ${ COLOR_PRIMARY };
    border-radius: 20px;
    padding: 7px 0 0 5px;

    & div.MuiInputBase-root {
        height: 66px;
        border-radius: inherit;
        background: none;
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
        openThreshold = -1
    }) => {

    const [ open, setOpen ] = useState(false)
    const [ inputValue, setInputValue ] = useState('')

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
    
    return (
        <AppAutocomplete
            disablePortal
            disabled={disabled}
            id={`autocomplete-${label}`}
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
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
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