import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { useCities } from '../../common/contexts/citiesContext'
import {COLOR_GRAY, COLOR_WHITE} from '../../constants/colors'

const Container = styled.div`
  background-color: ${COLOR_WHITE};
  z-index: 1;
  border-bottom: 1px ${COLOR_GRAY} solid;

  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ isMobile }) => !isMobile && css`
    padding: 0 16px 45px 16px;
  `};
`

const ContainerInfoStats = styled.div`
  max-width: 1040px;
  width: 100%;
  margin-top: 21px;

  display: flex;
`

const ContainerInfo = styled.div`
  ${({ isMobile }) => !isMobile && css`
    max-width: 1040px;
    border-radius: 8px;
  `};
`

const PicAndMapContainer = styled.div`
  display: flex;
  ${({ isMobile }) => !isMobile && css`
      max-width: 1040px;
      width: 100%;
    `};
  margin: ${({ isMobile }) => (isMobile ? '16px' : '0px')};
`

const CityPic = styled.img.attrs({ alt: '' })`
  width: ${({ isMobile }) => (isMobile ? '100%' : '1040px')};
  border-radius: 8px;
  object-fit: cover;

  ${({ isMobile }) => !isMobile && css`
    height: 224px;
  `};
`

const CityHeader = ({ isMobile, children }) => {
  const { city } = useCities()

  return (
    <Container isMobile={isMobile}>
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
  isMobile: PropTypes.bool.isRequired,
  children: PropTypes.element,
}

export default CityHeader
