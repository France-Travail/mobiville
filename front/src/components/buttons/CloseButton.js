import styled from 'styled-components'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'

import { COLOR_OTHER_GREEN } from '../../constants/colors'

const Container = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;

  width: 36px;
  height: 36px;
  float: right;
  border-radius: 50%;
  border: none;

  display: grid;
  place-content: center;

  background: ${COLOR_OTHER_GREEN};

  cursor: pointer;
`

const CloseButton = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <CloseIcon color="primary" fontSize="large" />
    </Container>
  )
}

CloseButton.propTypes = {
  onClick: PropTypes.func
}

export default CloseButton
