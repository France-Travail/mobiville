import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import L from 'leaflet'

import { useCities } from '../../common/contexts/citiesContext'
import { COLOR_GRAY, COLOR_TEXT_PRIMARY } from '../../constants/colors'
import { formatNumber } from '../../utils/utils'
import crowd from '../../assets/images/icons/crowd.svg'
import weather from '../../assets/images/icons/weather.svg'
import blueMarker from "../../assets/images/marker-blue.svg"

const Container = styled.div`
  background-color: #fff;
  z-index: 1;
  border-bottom: 1px ${COLOR_GRAY} solid;
  padding: ${({ isMobile }) => (isMobile ? 0 : 16)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContainerInfoStats = styled.div`
  display: flex;
  max-width: 1040px;
  width: 100%;
  margin-top: ${({ isMobile }) => (isMobile ? '0px' : '20px')};
  margin-bottom: 0px;
`

const ContainerInfo = styled.div`
  max-width: ${({ isMobile }) => (isMobile ? 'auto' : '336px')};
  border-radius: ${({ isMobile }) => (isMobile ? '0' : '8')}px;
`

const HeaderArrowLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95px;
  height: 32px;
  border-radius: 100px;
  background: ${COLOR_GRAY};
  margin-right: 40px;

  &,
  &:hover {
    color: ${COLOR_TEXT_PRIMARY};
  }

  position: absolute;
  left: 16px;
  top: 16px;
`

const PicAndMapContainer = styled.div`
  display: flex;
  ${({ isMobile }) => (isMobile ? '' : 'max-width: 1040px;width: 100%;')}
  margin-bottom: ${({ isMobile }) => (isMobile ? '10px' : '0px')};
`

const CityPic = styled.img.attrs({ alt: '' })`
  width: ${({ isMobile }) => (isMobile ? '100%' : '688px')};
  ${({ isMobile }) => (isMobile ? '' : 'height: 224px;')}
  border-radius: ${({ isMobile }) => (isMobile ? '0' : '8')}px;
  object-fit: cover;
`

const StyledMapContainer = styled(MapContainer)`
  height: 224px;
  width: 336px;
  margin-left: 16px;
  border-radius: 8px;
`

const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ isMobile }) => (isMobile ? 'center' : 'right')};
  padding-top: 8px;
  padding-bottom: ${({ isMobile }) => (isMobile ? '8px' : 0)};
  max-width: 1040px;
  width: 100%;
`

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  font-size: 10px;
  flex: 1 0 auto;
  max-width: 100px;
  &:not(:first-of-type) {
    margin-left: 16px;
  }
`

const H1 = styled.h1`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #191970;
  padding: 4px 12px 4px 4px;
`

const CityHeader = ({ backLink, isMobile, titlesNode }) => {
  const { city } = useCities()

  const getLeafletIcon = (requiredFile) => (
      new L.Icon({
        iconUrl: requiredFile,
        iconRetinaUrl: requiredFile,
        iconAnchor: [12, 41],
        popupAnchor: [0, -41],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        className: 'leaflet-marker-icon',
      })
  )

  return (
    <Container isMobile={isMobile}>
      {isMobile && (
        <HeaderArrowLink to={backLink} title="Retour">
          <ArrowBackIcon color="primary" />
          <H1>Retour</H1>
        </HeaderArrowLink>
      )}
      <PicAndMapContainer isMobile={isMobile}>
        <CityPic
          isMobile={isMobile}
          src={city.photo || `/regions/region-${city.newRegion.code}.jpg`}
        />
        {!isMobile && city && (
          <StyledMapContainer
            center={[city.geo_point_2d_x, city.geo_point_2d_y]}
            zoom={8}
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[city.geo_point_2d_x, city.geo_point_2d_y]} icon={getLeafletIcon(blueMarker)} />

          </StyledMapContainer>
        )}
      </PicAndMapContainer>

      {isMobile && titlesNode}

      <ContainerInfoStats isMobile={isMobile}>
        <ContainerInfo>{!isMobile && titlesNode}</ContainerInfo>
        <StatsContainer isMobile={isMobile}>
          <Stats>
            <img src={crowd} alt="" />
            Habitants <br />
            <b>{formatNumber(city.population * 1000)}</b>
          </Stats>

          <Stats>
            <img src={weather} alt="" />
            Température
            <br />
            <b>{Math.floor(city.average_temperature)}°</b>
          </Stats>
        </StatsContainer>
      </ContainerInfoStats>
    </Container>
  )
}

export default CityHeader

CityHeader.propTypes = {
  backLink: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
  titlesNodes: PropTypes.string,
}

CityHeader.defaultProps = {}
