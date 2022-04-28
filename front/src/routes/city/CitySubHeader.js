import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { COLOR_GRAY, COLOR_TEXT_PRIMARY } from '../../constants/colors'

const HEIGHT = 125
const PADDING = 16

const HeaderContainer = styled.div`
  //position: static;
  left: 0;
  right: 0;
  background-color: white;
  //top: 76;
  width: 100%;
  display: flex;
  align-items: center;
  width: 100%;
  z-index: 10;
`

const HeaderSubContainer = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  align-items: ${({ isMobile }) => (isMobile ? 'flex-start' : 'center')};
  justify-content: flex-start;
  font-weight: bold;
  font-size: 18px;
  max-width: 1100px;
  width: 100%;
  margin: auto;
  padding: ${PADDING}px;
  padding-bottom: ${PADDING -10 }px;
`

const HeaderArrowLink = styled(Link)`
  margin-top: 90px;
  margin-left: ${PADDING}px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 32px;
  border-radius: 100px;
  background: ${COLOR_GRAY};
  background: #F6F7FB;
  margin-right: 40px;

  &,
  &:hover {
    color: ${COLOR_TEXT_PRIMARY};
  }
`

const H1 = styled.h1`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #191970;
  padding: 4px 12px 4px 4px;
`

const CitySubHeader = ({ backLink, desktopTitleWidth, isMobile}) => (
  <>
    <HeaderContainer isMobile={isMobile} style={{ height: HEIGHT }}>
      <HeaderSubContainer
        isMobile={isMobile}
        style={{
          maxWidth: desktopTitleWidth
            ? `calc(${desktopTitleWidth}px + ${PADDING}px * 2)`
            : null,
        }}
      >
        <HeaderArrowLink to={backLink} title="Retour">
          <ArrowBackIcon color="primary" fontSize="large" />
           <H1>Retour aux résultats</H1>
        </HeaderArrowLink>
      </HeaderSubContainer>
    </HeaderContainer>
  </>
)

CitySubHeader.props = {
  backLink: PropTypes.string,
  desktopTitleWidth: PropTypes.number,
  isMobile: PropTypes.bool,
}

export default CitySubHeader
