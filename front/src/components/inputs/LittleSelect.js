import { FormControl, MenuItem, Select, Checkbox } from '@mui/material'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  COLOR_OTHER_GREEN,
  COLOR_PRIMARY,
  COLOR_WHITE,
} from '../../constants/colors'

const SelectBlock = styled(Select)`
  && {
    &.css-nhoni8-MuiInputBase-root-MuiFilledInput-root:before,
    &.css-nhoni8-MuiInputBase-root-MuiFilledInput-root:active::before {
      border-bottom: none !important;
    }

    &.MuiFilledInput-root {
      position: inherit;
    }

    .MuiSelect-select {
      background-color: transparent !important;
    }

    fieldset {
      border: 1px solid ${COLOR_PRIMARY};
    }

    svg {
      color: inherit;
    }

    max-width: 273px;
    height: 40px;
    padding: 8px;
    gap: 8px;
    border-radius: 20px !important;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    background: ${({ value }) =>
      !value || value?.length <= 0 ? COLOR_WHITE : COLOR_PRIMARY};
    color: ${({ value }) =>
      !value || value?.length <= 0 ? COLOR_PRIMARY : COLOR_WHITE};
    font-weight: 700;
  }
`

const CustomMenuItem = styled(MenuItem)`
  height: 54px;
  min-width: 155px;
  margin: 10px 10px 0 10px !important;
  border-radius: 8px;
  order: 0;

  display: flex;
  justify-content: center !important;
  align-items: center !important;

  background-color: ${({ $isSelected }) =>
    $isSelected ? COLOR_OTHER_GREEN : 'transparent'} !important;
  color: ${({ value }) =>
    !!value ? COLOR_WHITE : `${COLOR_PRIMARY} !important`};

  &:hover {
    background: ${COLOR_OTHER_GREEN} !important;
  }
`

const Option = styled.span`
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
  margin: auto !important;
`

const LittleSelect = ({
  multiple = false,
  label,
  values,
  selectedValue,
  onChange,
}) => (
  <FormControl sx={{ m: 1 }}>
    <SelectBlock
      multiple={multiple}
      displayEmpty
      onChange={(event) => onChange(event.target.value)}
      value={selectedValue}
      renderValue={(selected) => {
        if (!selected || selected?.length <= 0) return label
        return !!multiple
          ? selected.map((v) => values[v]).join(', ')
          : values[selected]
      }}
    >
      {Object.entries(values).map(([key, label]) => (
        <CustomMenuItem
          key={key}
          value={key}
          $isSelected={selectedValue?.indexOf(key) > -1}
        >
          {!!multiple ? (
            <Checkbox checked={selectedValue?.indexOf(key) > -1} />
          ) : null}
          <Option>{label}</Option>
        </CustomMenuItem>
      ))}
    </SelectBlock>
  </FormControl>
)

LittleSelect.propTypes = {
  multiple: PropTypes.bool,
  label: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  onChange: PropTypes.func,
}

export default LittleSelect
