import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import {
    COLOR_PRIMARY,
    COLOR_TEXT_PRIMARY
} from '../constants/colors'
import { isMobileView } from '../constants/mobile'
import { useWindowSize } from '../common/hooks/window-size'

const BackContainer = styled.div`
  width: 100%;
  max-width: 1040px;
  max-height: 60px;
  padding: 16px 0 0 0;
  margin: auto;

  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const HeaderArrowLink = styled(Link)`
  padding: ${({$isMobile}) => ($isMobile ? '14px' : '6px 0 2px 0')};
  margin-left: -4px;

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

const BackButton = ({
  libelle = "Retour",
  backLink = '/'
}) => {
  const isMobile = isMobileView(useWindowSize())

  return (
    <BackContainer>
        <HeaderArrowLink to={backLink} title="Retour" $isMobile={isMobile}>
            <ArrowBackIcon color="primary" />
            <BackText $isMobile={isMobile}>{libelle}</BackText>
        </HeaderArrowLink>
    </BackContainer>
  )
}

BackButton.props = {
  libelle: PropTypes.string,
  backLink: PropTypes.string
}

export default BackButton
