import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import {
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY
} from '../../../constants/colors'

const BackContainer = styled.div`
  width: 100%;
  max-width: 1040px;
  max-height: 60px;
  padding: 16px 0 0 0;
  margin: 0 0 0 -4px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const HeaderArrowLink = styled(Link)`
  padding: ${({$isMobile}) => ($isMobile ? '14px' : '6px 0 2px 0')};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  
  &,
  &:hover {
    color: ${COLOR_TEXT_PRIMARY};
  }
`

const BackText = styled.p`
  font-weight: ${({ $isMobile }) => ($isMobile ? '400' : '500')};
  font-size: ${({ $isMobile }) => ($isMobile ? '16px' : '12px')};
  line-height: ${({ $isMobile }) => ($isMobile ? '24px' : '14px')};
  color: ${ COLOR_PRIMARY };
  padding-top: 2px;
`

const BackResultsButton = ({
  backLink,
  isMobile
}) => (
    <BackContainer>
        <HeaderArrowLink to={backLink} title="Retour" $isMobile={isMobile}>
            <ArrowBackIcon color="primary" />
            <BackText $isMobile={isMobile}>{isMobile ? "Retour" : "Retour aux résultats"}</BackText>
        </HeaderArrowLink>
    </BackContainer>
)

BackResultsButton.props = {
    backLink: PropTypes.string,
    desktopTitleWidth: PropTypes.number,
    isMobile: PropTypes.bool,
}

export default BackResultsButton
