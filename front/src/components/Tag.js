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

  color: ${COLOR_PRIMARY};
  background: ${({ $green }) =>
    $green === null ? COLOR_GRAY : $green ? COLOR_TAG_GREEN : COLOR_TAG_RED};

  font-size: ${({ $tall }) => ($tall ? '16px' : '12px')};
  font-weight: ${({ $tall }) => ($tall ? 'bold' : '500')};
`

const Tag = ({ green = null, tall = false, children }) => (
  <Container $green={green} $tall={tall}>
    {children}
  </Container>
)

Tag.propTypes = {
  green: PropTypes.bool,
}

export default Tag
