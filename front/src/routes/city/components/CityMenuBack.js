import React from 'react'
import PropTypes from 'prop-types'
import MenuNavigation from "../../../components/MenuNavigation"
import BackResultsButton from "./BackResultsButton"
import styled from "styled-components"
import {COLOR_WHITE} from "../../../constants/colors"

const MenuBackContainer = styled.div`
  background-color: ${COLOR_WHITE};
  width: 100%;
  max-width: 1040px;
  margin: auto;
`

const CityMenuBack = ({
  backLink,
  isMobile
}) => (
    <MenuBackContainer>
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
    desktopTitleWidth: PropTypes.number,
    isMobile: PropTypes.bool,
}

export default CityMenuBack
