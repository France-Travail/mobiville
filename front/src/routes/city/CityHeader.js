import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { useCities } from '../../common/contexts/citiesContext'
import { COLOR_GRAY, COLOR_TEXT_PRIMARY } from '../../constants/colors'
import { formatNumber } from '../../utils/utils'

import compass from '../../assets/images/icons/compass.svg'
import crowd from '../../assets/images/icons/crowd.svg'
import weather from '../../assets/images/icons/weather.svg'

const Container = styled.div`
  background-color: #fff;
  z-index: 1;
  border-bottom: 1px ${COLOR_GRAY} solid;
  padding: ${({ isMobile }) => (isMobile ? 0 : 16)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

  position: absolute;
  left: 16px;
  top: 16px;
`

const PicAndMapContainer = styled.div`
  display: flex;
  max-width: 1040px;
  width: 100%;
`

const CityPic = styled.img.attrs({ alt: '' })`
  max-width: ${({ isMobile }) => (isMobile ? 'auto' : '336px')};
  width: 100%;
  height: 224px;
  border-radius: ${({ isMobile }) => (isMobile ? '0' : '8')}px;
  object-fit: cover;
`

const StyledMapContainer = styled(MapContainer)`
  height: 224px;
  max-width: 688px;
  width: 100%;
  margin-left: 16px;
  border-radius: 8px;
`

const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
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

const CityHeader = ({ backLink, isMobile, titlesNode }) => {
  const { city } = useCities()

  return (
    <Container isMobile={isMobile}>
      {isMobile && (
        <HeaderArrowLink to={backLink} title="Retour">
          <ArrowBackIcon color="primary" fontSize="large" />
        </HeaderArrowLink>
      )}
      <PicAndMapContainer>
        <CityPic
          isMobile={isMobile}
          src={city.photo || `/regions/region-${city['region.new_code']}.jpg`}
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

            <Marker position={[city.geo_point_2d_x, city.geo_point_2d_y]} />
          </StyledMapContainer>
        )}
      </PicAndMapContainer>

      {isMobile && titlesNode}

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

        <Stats>
          <img src={compass} alt="" />
          Démarrer mon projet
          <br />
          <Link
            to="/mobility-guide"
            style={{ fontWeight: 500, textDecoration: 'underline' }}
          >
            Accéder au guide
          </Link>
        </Stats>
      </StatsContainer>
    </Container>
  )
}

export default CityHeader

CityHeader.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}

CityHeader.defaultProps = {}
