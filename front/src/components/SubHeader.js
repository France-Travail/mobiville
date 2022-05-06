import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { COLOR_GRAY, COLOR_TEXT_PRIMARY } from '../constants/colors'

const HEIGHT = 112
const PADDING = 16

const HeaderContainer = styled.div`
  position: ${({ isMobile }) => (isMobile ? 'static' : 'static')};
  left: 0;
  right: 0;
  background-color: white;
  top: 76;
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
`

const HeaderArrowLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${COLOR_GRAY};
  margin-right: 40px;

  &,
  &:hover {
    color: ${COLOR_TEXT_PRIMARY};
  }
`

const H1 = styled.h1`
  font-size: 18px;
  font-weight: 700;
`

const SubHeader = ({ backLink, desktopTitleWidth, isMobile, node, title }) => (
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
        </HeaderArrowLink>
        {node ? node : <H1>{title}</H1>}
      </HeaderSubContainer>
    </HeaderContainer>
    {!isMobile && <div style={{ marginBottom: PADDING }} />}
  </>
)

SubHeader.props = {
  backLink: PropTypes.string,
  desktopTitleWidth: PropTypes.number,
  isMobile: PropTypes.bool,
  notFixed: PropTypes.bool,
  node: PropTypes.node,
  title: PropTypes.string,
}

export default SubHeader
