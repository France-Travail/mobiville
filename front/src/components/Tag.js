import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_TAG_GREEN,
  COLOR_TAG_RED,
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
  font-size: ${({ $tall }) => ($tall ? '16px' : '12px')};
  font-weight: ${({ $tall, $bold }) => (($tall || $bold) ? 'bold' : '500')};
`

const Tag = ({
  green = null,
  tall = false,
  bold = false,
  children
}) => (
  <Container $green={green} $tall={tall} $bold={bold}>
    {children}
  </Container>
)

Tag.propTypes = {
  green: PropTypes.bool,
  tall: PropTypes.bool,
  bold: PropTypes.bool,
  children: PropTypes.oneOfType([
    // PropTypes.string,
    PropTypes.arrayOf(PropTypes.node).isRequired,
    PropTypes.node,
  ]).isRequired
}

export default Tag
