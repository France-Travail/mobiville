import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useCities } from '../../common/contexts/citiesContext'
import {COLOR_GRAY} from '../../constants/colors'
import BackResultsButton from "./components/BackResultsButton"

const Container = styled.div`
  background-color: #fff;
  z-index: 1;
  border-bottom: 1px ${COLOR_GRAY} solid;
  padding: ${({ isMobile }) => (isMobile ? 0 : '0 16px 45px 16px')};
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContainerInfoStats = styled.div`
  display: flex;
  max-width: 1040px;
  width: 100%;
  margin-top: 21px;
  margin-bottom: 0px;
`

const ContainerInfo = styled.div`
  max-width: ${({ isMobile }) => (isMobile ? 'auto' : '1040px')};
  border-radius: ${({ isMobile }) => (isMobile ? '0' : '8')}px;
`

const PicAndMapContainer = styled.div`
  display: flex;
  ${({ isMobile }) => (isMobile ? '' : 'max-width: 1040px;width: 100%;')}
  margin: ${({ isMobile }) => (isMobile ? '14px' : '0px')};
`

const CityPic = styled.img.attrs({ alt: '' })`
  width: ${({ isMobile }) => (isMobile ? '100%' : '1040px')};
  ${({ isMobile }) => (isMobile ? '' : 'height: 224px;')}
  border-radius: 8px;
  object-fit: cover;
`

const CityHeader = ({ backLink, isMobile, children }) => {
  const { city } = useCities()

  return (
    <Container isMobile={isMobile}>
      <BackResultsButton
          backLink={backLink}
          isMobile={isMobile}
      />

      {!isMobile && (
        <ContainerInfoStats>
          <ContainerInfo>{!isMobile && children}</ContainerInfo>
        </ContainerInfoStats>
      )}

      <PicAndMapContainer isMobile={isMobile}>
        <CityPic
          isMobile={isMobile}
          src={city.photo || `/regions/region-${city.newRegion.code}.jpg`}
        />
      </PicAndMapContainer>

      {isMobile && children}
    </Container>
  )
}

CityHeader.propTypes = {
  backLink: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
  children: PropTypes.element,
}

export default CityHeader
