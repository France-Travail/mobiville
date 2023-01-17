import styled from 'styled-components'
import PropTypes from 'prop-types'
import { COLOR_PRIMARY, COLOR_WHITE } from '../constants/colors'
import { useEffect } from 'react'
import { useScroll } from '../common/hooks/use-scroll'
import CloseButton from './buttons/CloseButton'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;

  padding: 20px;

  overflow-y: scroll;

  background: ${COLOR_WHITE};
  color: ${COLOR_PRIMARY};
`

const Title = styled.p`
  margin: 36px 0;

  font-size: 36px;
  font-weight: 900;
`

const Modale = ({ title = '', show = false, onClose, children }) => {
  const { toggleBodyScroll } = useScroll()

  useEffect(() => {
    toggleBodyScroll(!show)
  }, [show])

  const handleCloseButtonClick = () => {
    toggleBodyScroll(true)
    onClose()
  }

  useEffect(() => {
    return () => {
      toggleBodyScroll(true)
    }
  }, [])

  if (!show) return

  return (
    <Container>
      <CloseButton onClick={handleCloseButtonClick} />
      <Title>{title}</Title>
      {children}
    </Container>
  )
}

Modale.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
}

export default Modale
