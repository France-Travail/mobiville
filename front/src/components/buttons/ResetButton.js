import styled from 'styled-components'
import PropTypes from 'prop-types'

import Button from './Button'
import { ReactComponent as ResetIcon } from '../../assets/images/icons/reset.svg'

const StyledResetIcon = styled(ResetIcon)`
  vertical-align: text-top;
`

const ResetButton = ({ libelle = 'Réinitialiser', show = true, ...props }) => {
  if (!show) return

  return (
    <Button light primary={false} {...props}>
      <StyledResetIcon />
      {libelle}
    </Button>
  )
}

ResetButton.props = {
  libelle: PropTypes.string,
  show: PropTypes.bool,
}

export default ResetButton
