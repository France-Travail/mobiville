import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import {
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_TAG_GREEN,
  COLOR_TAG_RED,
  COLOR_WHITE,
} from '../constants/colors'

const Container = styled.div`
  width: fit-content;
  padding: 4px 6px;
  border-radius: 8px;

  display: flex;
  gap: 8px;
  align-items: center;

  color: ${COLOR_PRIMARY};
  background: ${({ $green }) =>
    $green === null ? COLOR_GRAY : $green ? COLOR_TAG_GREEN : COLOR_TAG_RED};

  vertical-align: bottom;
  font-size: 12px;
  font-weight: ${({ $bold }) => ($bold ? 'bold' : '500')};

  ${({ $size }) => $size === 'small' && css`
    background-color: ${ COLOR_WHITE };
    border-radius: 1000px;
    font-size: 16px;
    font-weight: 700;
  `}

  ${({ $size }) => $size === 'tall' && css`
    font-size: 16px;
    font-weight: bold;
  `}
`

const Tag = ({
  green = null,
  size = 'normal',
  bold = false,
  children
}) => (
  <Container $green={green} $size={size} $bold={bold}>
    {children}
  </Container>
)

Tag.propTypes = {
  green: PropTypes.bool,
  size: PropTypes.oneOf([ 'small', 'normal', 'tall' ]),
  bold: PropTypes.bool,
  children: PropTypes.oneOfType([
    // PropTypes.string,
    PropTypes.arrayOf(PropTypes.node).isRequired,
    PropTypes.node,
  ]).isRequired
}

export default Tag
