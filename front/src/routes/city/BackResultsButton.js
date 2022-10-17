import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import {
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY
} from '../../constants/colors'

const BackContainer = styled.div`
  height: 60px;

  width: 100%;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
  
  max-width: 1100px;
  width: 100%;
  margin: auto;
  padding: 16px;
  padding-bottom: 0;
`

const HeaderArrowLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({isMobile}) => (isMobile ? '95px' : '160px')};
  height: 32px;
  margin-right: 40px;
  ${({isMobile}) => (isMobile ? '' : 'margin-top: 5px')};
  ${({isMobile}) => (isMobile ? '' : 'margin-left: 16px')};
  
  &,
  &:hover {
    color: ${COLOR_TEXT_PRIMARY};
  }

  position: absolute;
  ${({ isMobile }) => (isMobile ? 'left: 16px' : '')};
  ${({ isMobile }) => (isMobile ? 'top: 16px' : '')};
`

const BackText = styled.p`
  font-weight: ${({ isMobile }) => (isMobile ? '400' : '500')};
  font-size: ${({ isMobile }) => (isMobile ? '16px' : '12px')};
  line-height: ${({ isMobile }) => (isMobile ? '24px' : '14px')};
  color: ${ COLOR_PRIMARY };
  padding: 4px 12px 4px 4px;
`

const BackResultsButton = ({
  backLink,
  isMobile
}) => (
    <BackContainer>
        <HeaderArrowLink to={backLink} title="Retour" isMobile={isMobile}>
            <ArrowBackIcon color="primary" />
            <BackText isMobile={isMobile}>{isMobile ? "Retour" : "Retour aux résultats"}</BackText>
        </HeaderArrowLink>
    </BackContainer>
)

BackResultsButton.props = {
    backLink: PropTypes.string,
    desktopTitleWidth: PropTypes.number,
    isMobile: PropTypes.bool,
}

export default BackResultsButton
