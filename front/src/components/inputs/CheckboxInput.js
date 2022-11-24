import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Checkbox } from '@mui/material'

import {
  COLOR_PRIMARY,
} from '../../constants/colors'

const Container = styled.div`
  color: ${COLOR_PRIMARY};
  padding: 1px 0;

  display: flex;
  align-items: center;
`

const Label = styled.label`
  display: inline-block;
  position: relative;

  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
`

const CheckboxInput = ({ value, name, onClick, checked, ...props }) => {
  return (
    <Container>
      <Checkbox
        value={value}
        name={name}
        onClick={onClick}
        id={value}
        checked={checked}
        {...props}
      />
      <Label htmlFor={value} $checked={checked}>
        {value}
      </Label>
    </Container>
  )
}

CheckboxInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  checked: PropTypes.bool,
}

export default CheckboxInput
