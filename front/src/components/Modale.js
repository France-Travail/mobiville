import { Link } from "react-router-dom"
import styled from "styled-components"
import PropTypes from 'prop-types'

import CloseIcon from '@mui/icons-material/Close'

import {
    COLOR_OTHER_GREEN,
    COLOR_PRIMARY,
    COLOR_WHITE
} from "../constants/colors"

const Container = styled.div`
  height: 100vh;
  padding: 20px;

  background: ${ COLOR_WHITE };

  display: flex;
  flex-direction: column;
`

const CloseLink = styled(Link)`
  position: absolute;
  top: 20px;
  right: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;
  border-radius: 50%;

  background: ${ COLOR_OTHER_GREEN };
`

const Title = styled.h1`
  margin: 45px 0 32px 0;

  font-size: 36px;
  font-weight: 900;

  color: ${ COLOR_PRIMARY };
`

const Modale = ({
    children,
    closeLink,
    title = ''
}) => {

    return (
        <Container>

            <CloseLink to={closeLink} title="Fermer">
                <CloseIcon color="primary" fontSize="large" />
            </CloseLink>

            <Title>{ title }</Title>

            { children }

        </Container>
    )

}

Modale.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    closeLink: PropTypes.string.isRequired,
    title: PropTypes.string
}

export default Modale