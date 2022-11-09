import React from 'react'
import PropTypes from 'prop-types'
import styled from "styled-components"
import {COLOR_WHITE} from "../../../constants/colors"
import { BackButton, MenuNavigation } from '../../../components'

const MenuBackContainer = styled.div`
  background: ${({ background }) => background};
  width: 100%;
`

const CityMenuBack = ({
  backLink,
  isMobile,
  background = COLOR_WHITE
}) => (
    <MenuBackContainer background={background}>
        <BackButton
            libelle={!isMobile ? "Retour aux résultats" : "Retour"}
            backLink={backLink}
        />
        {isMobile && (
            <MenuNavigation isMobile={isMobile}/>
        )}
    </MenuBackContainer>
)

CityMenuBack.props = {
    backLink: PropTypes.string,
    isMobile: PropTypes.bool,
    background: PropTypes.string
}

export default CityMenuBack
