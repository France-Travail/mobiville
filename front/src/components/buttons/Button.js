import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  COLOR_LIGHT_GREY,
  COLOR_PRIMARY,
  COLOR_WHITE,
} from '../../constants/colors'

const CustomButton = styled.button`
  width: ${({ $fullWidth }) => $fullWidth ? '100%':  'fit-content' };
  padding: 24px;

  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;

  background-color: ${({ $primary }) =>
    $primary ? COLOR_PRIMARY : 'inherit'};
  color: ${({ $primary }) => ($primary ? COLOR_WHITE : COLOR_PRIMARY)};
  border: ${({ $light }) =>
    $light ? `none` : `1px solid ${COLOR_LIGHT_GREY}`};
  border-radius: 20px;

  font-weight: 700;
  font-size: ${({ $primary }) => ($primary ? '18px' : '16px')};

  cursor: pointer;
`

const Button = ({
  primary = true,
  light = false,
  fullWidth = false,
  onClick,
  children,
  ...props
}) => {
  return (
    <CustomButton
      type="button"
      onClick={onClick}
      $primary={primary}
      $light={light}
      $fullWidth={fullWidth}
      {...props}
    >
      {children}
    </CustomButton>
  )
}

Button.props = {
  primary: PropTypes.bool,
  light: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ])
}

export default Button
