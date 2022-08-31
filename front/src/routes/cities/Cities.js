import { useEffect, useRef, useState, memo, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import queryString from 'query-string'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'

import { useCities } from '../../common/contexts/citiesContext'
import { MainLayout } from '../../components'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import { COLOR_BUTTON_HOVER, COLOR_PRIMARY } from '../../constants/colors'

import CityItem from './components/CityItem'
import MobileCriterionsPanel from './components/MobileCriterionsPanel'
import DesktopCriterionsPanel from './components/DesktopCriterionsPanel'
import MobileCriterionsSelection from './components/MobileCriterionsSelection'

import noResultsPic from '../../assets/images/no_results.svg'
import blueMarker from '../../assets/images/marker-blue.svg'
import hoverMarker from '../../assets/images/marker-hover.svg'
import selectedMarker from '../../assets/images/marker-selected.svg'
import { formatNumber } from '../../utils/utils'

import Pagination from '@mui/material/Pagination'
import { useProfessions } from '../../common/contexts/professionsContext'

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding-top: 5rem;
  font-size: 1.5rem;
  line-height: 1.5;
  color: #657078;
`

const DesktopContainer = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1040px;
`

const CitiesList = styled.div`
  max-width: ${({ isMobile }) => (isMobile ? 'auto' : '620px')};
  padding: ${({ isMobile }) => (isMobile ? '0 16px' : '0 8px 0 8px')};

  a {
    margin: 8px -4px;
    ${({ $isMobile }) => ($isMobile ? 'width: 612px;' : '')}
  }
`

const StyledMapContainer = styled(MapContainer)`
  height: 424px;
  width: 424px;
  max-width: 100%;
  margin-left: 8px;
  margin-right: 8px;
  border-radius: 16px;
`

const PaginationContainer = styled.div`
  margin-top: 40px;

  nav ul {
    padding: 0px;
    max-width: 370px;
    margin: auto;
  }

  nav ul li button {
    padding: 0px;
    width: 24px;
    min-width: 24px;
    height: 32px;
  }

  nav ul li button.Mui-selected {
    background-color: ${COLOR_PRIMARY};
    border-radius: 32px;
    color: #fff;
  }

  nav ul li:first-child button,
  nav ul li:last-child button {
    padding: 0px;
    width: 32px;
    min-width: 32px;
    height: 32px;
    background-color: #fff;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12),
      0px 1px 3px rgba(0, 0, 0, 0.2);
  }

  nav ul li:first-child button:hover,
  nav ul li:last-child button:hover {
    background-color: ${COLOR_BUTTON_HOVER};
    color: #fff;
  }
`
const TitleContainer = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  color: #191970;
  width: 600px;
  margin: 8px;
`

const Title = styled.h1`
  font-weight: 900;
  font-size: 24px;
  line-height: 28px;
`

const SubTitle = styled.h2`
  font-weight: 400;
  font-size: 22px;
  line-height: 27px;
`

const PopupLink = styled(Link)`
  color: #191970 !important;

  &:hover {
    color: #4e4ec9 !important;
  }
`

const Cities = () => {
  const isMobile = isMobileView(useWindowSize())
  const location = useLocation()
  const navigate = useNavigate()

  const [params, setParams] = useState(queryString.parse(location.search))
  const [showMobilePanel, setShowMobileCriterionsSelection] = useState(false)

  const {
    isLoading: isLoadingProfessions,
    professionsCountList,
    onSearchCountList,
  } = useProfessions()

  // cities
  const {
    cities,
    isLoading,
    onSearch,
    totalCities,
    criterions,
    sortCriterions,
  } = useCities()
  const [hoveredCityId, setHoveredCityId] = useState(null)
  const [selectedCityId, setSelectedCityId] = useState(null)
  const citiesListRef = useRef(null)
  const citiesItemsRef = useRef([])

  const [formattedCities, setFormattedCities] = useState([])

  // pagination
  const itemsPerPage = 10
  const [page, setPage] = useState(1)
  const [noOfPages, setNoOfPages] = useState(0)

  const [regionLabel, setRegionLabel] = useState('')
  const [metierLabel, setMetierLabel] = useState('')

  useEffect(() => {
    if (!!params?.codeRegion) {
      const region = criterions.regions.find(
        (region) => params.codeRegion === region.id
      )
      setRegionLabel(region.label)
    }
    if (!!params?.codeRome) {
      const metier = criterions.codeRomes.find(
        (codeRome) => params.codeRome === codeRome.key
      )
      setMetierLabel(metier.label)
    }
  }, [params, criterions])

  useEffect(() => {
    setFormattedCities(cities)
  }, [cities])

  useEffect(() => {
    if (!professionsCountList) return
    let newFormattedCities = formattedCities
    professionsCountList.forEach((professionsCount) => {
      newFormattedCities = newFormattedCities.map((city) => {
        if (city.insee_com === professionsCount.insee[0].toString()) {
          return {
            ...city,
            totalOffres: professionsCount.total,
          }
        }
        return city
      })
    })

    setFormattedCities(newFormattedCities)
  }, [professionsCountList])

  useEffect(() => {
    citiesItemsRef.current = citiesItemsRef.current.slice(0, cities.length)
  }, [cities])

  useEffect(() => {
    if (location.search) {
      localStorage.setItem('lastSearch', location.search)
      setParams(queryString.parse(location.search))
    }
  }, [location])

  useEffect(() => {
    onSearch(
      {
        ...params,
        sortBy: sortCriterions,
        onlySearchInTension: true,
      },
      (!!page ? page - 1 : 0) * 10,
      cities ?? []
    )
  }, [params, sortCriterions, page])

  useEffect(() => {
    if (cities.length > 0) {
      let listCitiesInsee = []
      cities.map((city) => {
        return listCitiesInsee.push([city.insee_com])
      })
      onSearchCountList({
        codeRome: [params.codeRome],
        inseeList: listCitiesInsee,
      })
    }
  }, [params, sortCriterions, cities])

  const getCityUrl = (city) => {
    let url = `/city/${city.insee_com}-${city.nom_comm}`

    if (params && params.codeRome) {
      url += `?codeRome=${params.codeRome}`
    }

    return url
  }

  const onSubmit = ({ city, environment, region }) => {
    const data = {
      codeRome: [params.codeRome || params.codeRomes[0].key],
      codeRegion: [region],
      codeCity: city,
      codeEnvironment: environment,
    }

    navigate({
      pathname: '/cities',
      search: queryString.stringify(data),
    })
  }

  const showMobileCriterionsSelection = (bool) =>
    setShowMobileCriterionsSelection(bool)

  useEffect(() => {
    setNoOfPages(Math.ceil(totalCities / itemsPerPage))
  }, [totalCities])

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const getLeafletIcon = (requiredFile) =>
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

  if (showMobilePanel) {
    return (
      <MainLayout menu={{ visible: !showMobileCriterionsSelection }}>
        <MobileCriterionsSelection
          paramsUrl={params}
          onSubmit={onSubmit}
          showMobileCriterionsSelection={showMobileCriterionsSelection}
          total={totalCities}
        />
      </MainLayout>
    )
  }

  const citiesList = (
    <CitiesList isMobile={isMobile} ref={citiesListRef}>
      <TitleContainer>
        <Title>
          {totalCities} {!!metierLabel ? `villes pour ${metierLabel}` : ''}{' '}
          {!!regionLabel ? `en ${regionLabel}` : ''}
        </Title>
        <SubTitle>Classement des villes par opportunités d'emploi</SubTitle>
      </TitleContainer>
      {formattedCities.map((city, key) => (
        <CityItem
          city={city}
          selected={selectedCityId === city.id}
          sortCriterions={sortCriterions}
          key={city.id}
          to={getCityUrl(city)}
          onMouseOver={() => setHoveredCityId(city.id)}
          onMouseLeave={() => setHoveredCityId(null)}
          itemRef={(el) => (citiesItemsRef.current[key] = el)}
          isLoadingProfessions={isLoadingProfessions}
        />
      ))}
      {!isLoading && cities.length === 0 && (
        <NotFoundContainer>
          <img alt="" src={noResultsPic} style={{ marginBottom: '2rem' }} />
          Aucune ville correspondante
          <br />
          Modifiez vos critères
        </NotFoundContainer>
      )}
      <PaginationContainer>
        <Pagination
          count={noOfPages}
          defaultPage={0}
          page={page}
          siblingCount={2}
          boundaryCount={0}
          onChange={handlePageChange}
        />
      </PaginationContainer>
    </CitiesList>
  )

  let firstCityCoordinates
  let mapBounds
  if (cities.length > 0) {
    firstCityCoordinates = [cities[0].geo_point_2d_x, cities[0].geo_point_2d_y]
    mapBounds = cities.reduce(
      (prev, city) => ({
        minX: prev.minX > city.geo_point_2d_x ? city.geo_point_2d_x : prev.minX,
        maxX: prev.maxX < city.geo_point_2d_x ? city.geo_point_2d_x : prev.maxX,
        minY: prev.minY > city.geo_point_2d_y ? city.geo_point_2d_y : prev.minY,
        maxY: prev.maxY < city.geo_point_2d_y ? city.geo_point_2d_y : prev.maxY,
      }),
      {
        minX: Number.POSITIVE_INFINITY,
        maxX: Number.NEGATIVE_INFINITY,
        minY: Number.POSITIVE_INFINITY,
        maxY: Number.NEGATIVE_INFINITY,
      }
    )
  }

  const computedHelmet = useCallback(() => {
    if (!!params?.codeRegion && !!cities && !!cities[0] && !!cities[0]['newRegion.name']) {
      return (
        <Helmet>
          <title>Où travailler en { cities[0]['newRegion.name'] } | Mobiville</title>
          <meta
            name="description"
            content={`Découvrez les villes qui vous correspondent le mieux à votre recherche d'emploi dans la région ${cities[0]['newRegion.name']} avec la liste des villes les plus attractives pour votre métier.`}
          />
        </Helmet>
      )
    }
    return (
      <Helmet>
        <title>Où travailler en France | Mobiville</title>
        <meta
          name="description"
          content={`Trouver la ville qui correspond le mieux à votre recherche d'emploi avec la liste des villes les plus attractives pour votre métier.`}
        />
      </Helmet>
    )
  }, [ cities, params ])

  return (
    <>
      { computedHelmet() }
      
      <MainLayout
        style={{
          overflow: isMobile ? 'inherit' : '',
          minHeight: isMobile ? undefined : '',
        }}
      >
        {isMobile ? (
          <MobileCriterionsPanel
            criterions={params}
            showMobileCriterionsSelection={showMobileCriterionsSelection}
            total={totalCities}
          />
        ) : (
          <DesktopCriterionsPanel
            paramsUrl={params}
            total={totalCities}
            onSubmit={onSubmit}
          />
        )}

        {isMobile ? (
          citiesList
        ) : (
          <DesktopContainer>
            {citiesList}

          {!isLoading && cities.length ? (
            <StyledMapContainer
              center={cities.length > 1 ? null : firstCityCoordinates}
              zoom={cities.length > 1 ? null : 6}
              bounds={
                cities.length > 1
                  ? [
                      [mapBounds.minX, mapBounds.minY],
                      [mapBounds.maxX, mapBounds.maxY],
                    ]
                  : null
              }
              scrollWheelZoom
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {cities.map((city, key) => (
                <Marker
                  key={city.id}
                  position={[city.geo_point_2d_x, city.geo_point_2d_y]}
                  icon={getLeafletIcon(
                    city.id === selectedCityId
                      ? selectedMarker
                      : city.id === hoveredCityId
                      ? hoverMarker
                      : blueMarker
                  )}
                  eventHandlers={{
                    popupopen: () => {
                      setSelectedCityId(city.id)
                    },
                    popupclose: () => setSelectedCityId(null),
                  }}
                >
                  <Popup>
                    <PopupLink to={getCityUrl(city)}>
                      <b>{city.nom_comm}</b> (
                      {formatNumber(city.population * 1000)} habitants)
                    </PopupLink>
                  </Popup>
                </Marker>
              ))}
            </StyledMapContainer>
          ) : (
            <div style={{ width: 424 }} />
          )}
        </DesktopContainer>
      )}
    </MainLayout>
  </>
  )
}

Cities.propTypes = {}

export default memo(Cities)
