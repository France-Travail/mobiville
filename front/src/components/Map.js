import { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

import defaultMarker from '../assets/images/marker-blue.svg'
import selectedMarker from '../assets/images/marker-selected.svg'

import { Link } from 'react-router-dom'
import { formatNumber } from '../utils/utils'
import { COLOR_BUTTON_HOVER, COLOR_PRIMARY } from '../constants/colors'

const StyledMapContainer = styled(MapContainer)`
  margin: 0 8px;
  width: 100%;
`

const PopupLink = styled(Link)`
  color: ${COLOR_PRIMARY} !important;

  &:hover {
    color: ${COLOR_BUTTON_HOVER} !important;
  }
`

const BoundsControler = ({ bounds, center, zoom }) => {
  const map = useMap()

  useEffect(() => {
    if (!map || !bounds || bounds.length < 1) return

    map.flyToBounds(bounds, {
      duration: 0.75,
    })
  }, [bounds])

  useEffect(() => {
    if (!map || !center || center.length < 1) return

    map.flyTo(center, zoom)
  }, [center, zoom])
}

const Map = ({
  cities,
  style,
  zoom = 7,
  popupopen = () => {},
  popupclose = () => {},
  showPopUp = false,
  selectedCityId = null,
  hoveredCityId = null,
}) => {
  const [mapBounds, setMapBounds] = useState([
    [51.180623, -5.528866],
    [41.361852, 9.676212],
  ])

  useEffect(() => {
    if (cities.length > 1) {
      const computedBounds = cities.reduce(
        (prev, city) => ({
          minX:
            prev.minX > city.geo_point_2d_x ? city.geo_point_2d_x : prev.minX,
          maxX:
            prev.maxX < city.geo_point_2d_x ? city.geo_point_2d_x : prev.maxX,
          minY:
            prev.minY > city.geo_point_2d_y ? city.geo_point_2d_y : prev.minY,
          maxY:
            prev.maxY < city.geo_point_2d_y ? city.geo_point_2d_y : prev.maxY,
        }),
        {
          minX: Number.POSITIVE_INFINITY,
          maxX: Number.NEGATIVE_INFINITY,
          minY: Number.POSITIVE_INFINITY,
          maxY: Number.NEGATIVE_INFINITY,
        }
      )
      setMapBounds([
        [computedBounds.minX, computedBounds.minY],
        [computedBounds.maxX, computedBounds.maxY],
      ])
    }
  }, [cities])

  return (
    <StyledMapContainer
      center={cities.length === 1 ? [cities[0].x, cities[0].y] : null}
      zoom={cities.length === 1 ? zoom : null}
      bounds={cities.length === 1 ? null : mapBounds}
      scrollWheelZoom
      style={style}
    >
      <BoundsControler
        bounds={cities.length === 1 ? null : mapBounds}
        center={cities.length === 1 ? [cities[0].x, cities[0].y] : null}
        zoom={cities.length === 1 ? zoom : null}
      />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cities.map((city, key) => (
        <Marker
          key={key}
          position={[city.x, city.y]}
          icon={
            new L.Icon({
              iconUrl:
                selectedCityId === city.id || hoveredCityId === city.id
                  ? selectedMarker
                  : defaultMarker,
              iconRetinaUrl:
                selectedCityId === city.id || hoveredCityId === city.id
                  ? selectedMarker
                  : defaultMarker,
              iconAnchor: [12, 41],
              popupAnchor: [0, -41],
              shadowUrl: null,
              shadowSize: null,
              shadowAnchor: null,
              className: 'leaflet-marker-icon',
            })
          }
          eventHandlers={{
            popupopen: () => popupopen(city),
            popupclose: () => popupclose(city),
          }}
        >
          {showPopUp ? (
            <Popup>
              <PopupLink to={city.url ? city.url : ''}>
                <b>{city.nom_comm}</b> ({formatNumber(city.population * 1000)}{' '}
                habitants)
              </PopupLink>
            </Popup>
          ) : null}
        </Marker>
      ))}
    </StyledMapContainer>
  )
}

Map.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.object).isRequired,
  style: PropTypes.any,
  zoom: PropTypes.number,
  popupopen: PropTypes.func,
  popupclose: PropTypes.func,
  showPopUp: PropTypes.bool,
  selectedCityId: PropTypes.number,
  hoveredCityId: PropTypes.number,
}

export default Map
