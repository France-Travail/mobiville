import React from 'react'
import PropTypes from 'prop-types'
import MenuNavigation from "../../../components/MenuNavigation"
import BackResultsButton from "./BackResultsButton"
import styled from "styled-components"
import {COLOR_WHITE} from "../../../constants/colors"

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
        <BackResultsButton
            backLink={backLink}
            isMobile={isMobile}
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
