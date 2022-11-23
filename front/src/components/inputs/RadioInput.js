import styled from 'styled-components'
import PropTypes from 'prop-types'

import { COLOR_PRIMARY } from '../../constants/colors'

const Container = styled.div`
  color: ${COLOR_PRIMARY};
  padding: 1px 0;

  display: flex;
  align-items: center;
`

const Label = styled.label`
  margin-left: 8px;
  font-size: 16px;
  font-weight: 700;
`

const Radio = styled.input.attrs({
  type: 'radio',
})`
  border: 10px solid ${COLOR_PRIMARY};
  width: 18px;
  height: 18px;
  margin: 9px;

  appearance: none;
  -webkit-appearance: none;
  -mozilla-appearance: none;
  vertical-align: text-bottom;

  border-radius: 100%;
  opacity: 0.55;

  &&:before {
    display: block;
    content: '';

    height: 15px;
    width: 15px;
    border-radius: 100%;
    transform: translate(-50%, -50%);
    border: 3px solid white;
    background-color: white;
  }

  &&:checked {
    border-color: ${COLOR_PRIMARY};
    opacity: 1;

    &&:before {
      background-color: ${COLOR_PRIMARY};
    }
  }
`

const RadioInput = ({ value, name, onClick, checked, ...props }) => {
  return (
    <Container>
      <Radio
        value={value}
        name={name}
        onClick={onClick}
        id={value}
        checked={checked}
        {...props}
      />
      <Label htmlFor={value}>{value}</Label>
    </Container>
  )
}

RadioInput.propTypes = {
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  name: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  checked: PropTypes.bool,
}

export default RadioInput
