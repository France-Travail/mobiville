import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import {
  COLOR_PRIMARY,
  COLOR_WHITE,
} from '../../constants/colors'

const Container = styled.div`
  color: ${COLOR_PRIMARY};
  padding: 10px 0;
`

const Label = styled.label`
  display: inline-block;
  position: relative;

  margin: 5px 5px 5px 8px;
  padding-left: 25px;

  font-size: 16px;
  font-weight: 700;
  line-height: 20px;

  &&:before {
    display: block;
    position: absolute;
    left: 0;
    width: 18px;
    height: 18px;
    margin-top: 1px;
    border-radius: 4px;
    border: 2px solid ${COLOR_PRIMARY};

    color: ${COLOR_WHITE};
    text-align: center;
    line-height: 16px;

    ${({ $checked }) =>
      $checked
        ? css`
            content: '🗸';
            background-color: ${COLOR_PRIMARY};
          `
        : css`
            content: '';
            background-color: ${COLOR_WHITE};
            opacity: 0.55;
          `}
  }
`

const Checkbox = styled.input.attrs({
  type: 'checkbox',
})`
  display: none;
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
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  name: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  checked: PropTypes.bool,
}

export default CheckboxInput
