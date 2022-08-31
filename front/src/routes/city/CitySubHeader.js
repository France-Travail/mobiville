import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import {
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
  COLOR_WHITE
} from '../../constants/colors'

const PADDING = 16

const HeaderContainer = styled.div`
  height: 60px;
  left: 0;
  right: 0;

  background-color: ${ COLOR_WHITE };
  width: 100%;
  display: flex;
  align-items: center;
  width: 100%;
  z-index: 10;
`

const HeaderSubContainer = styled.div`
  display: flex;
  flex-direction: ${({isMobile}) => (isMobile ? 'column' : 'row')};
  align-items: ${({isMobile}) => (isMobile ? 'flex-start' : 'center')};
  justify-content: flex-start;
  font-weight: bold;
  font-size: 18px;
  max-width: 1100px;
  width: 100%;
  margin: auto;
  padding: ${PADDING}px;
  padding-bottom: ${PADDING - 10}px;
`

const HeaderArrowLink = styled(Link)`
  margin-top: 5px;
  margin-left: ${PADDING}px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 32px;
  border-radius: 100px;
  background: ${ COLOR_GRAY };
  background: #F6F7FB;
  margin-right: 40px;

  &,
  &:hover {
    color: ${ COLOR_TEXT_PRIMARY };
  }
`

const BackText = styled.p`
  padding: 4px 12px 4px 4px;
  
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: ${ COLOR_PRIMARY };
`

const CitySubHeader = ({
  backLink,
  desktopTitleWidth,
  isMobile
}) => (
  <HeaderContainer isMobile={isMobile}>
    <HeaderSubContainer
      isMobile={isMobile}
      style={{
        maxWidth: desktopTitleWidth
          ? `calc(${desktopTitleWidth}px + ${PADDING}px * 2)`
          : null,
      }}
    >
      <HeaderArrowLink to={backLink} title="Retour">
        <ArrowBackIcon color="primary" fontSize="large"/>
        <BackText>Retour aux résultats</BackText>
      </HeaderArrowLink>
    </HeaderSubContainer>
  </HeaderContainer>
)

CitySubHeader.props = {
    backLink: PropTypes.string,
    desktopTitleWidth: PropTypes.number,
    isMobile: PropTypes.bool,
}

export default CitySubHeader
