import loadable from '@loadable/component'
import queryString from 'query-string'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { useCities } from '../../common/contexts/citiesContext'
import { MainLayout } from '../../components'

import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'

import { useProfessions } from '../../common/contexts/professionsContext'
import { formatCityUrl } from '../../utils/utils'

const CitiesSearchBar = loadable(() => import('./components/CitiesSearchBar'))
const CitiesList = loadable(() => import('./components/CitiesList'))
const Map = loadable(() => import('../../components/Map'))

const Container = styled.div`
  width: 100%;

  display: grid;
  grid-template-rows: auto auto 1fr;

  ${({ $isMobile }) =>
    $isMobile
      ? css`
          grid-template-areas:
            'cityForm'
            'filters'
            'citiesList';
          grid-template-columns: auto;
        `
      : css`
          grid-template-areas:
            'cityForm cityForm cityForm cityForm'
            '. filters map map'
            '. citiesList map map';
          grid-template-columns: 1fr 600px minmax(0, 440px) 1fr;
        `}
`

const MapContainer = styled.div`
  grid-area: map;
  position: sticky;
  top: 0;
  max-height: 100vh;
  height: 880px;
`

const Cities = () => {
  const isMobile = isMobileView(useWindowSize())
  const location = useLocation()

  const { onSearchCountList } = useProfessions()

  const { cities, sortCriterions, onSearch } = useCities()

  const [params, setParams] = useState(queryString.parse(location.search))
  const [page, setPage] = useState(1)
  const [hoveredCityId, setHoveredCityId] = useState(null)
  const [selectedCityId, setSelectedCityId] = useState(null)

  const search = useCallback(() => {
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
    search()
    setPage(1)
  }, [params, sortCriterions])

  useEffect(() => {
    search()
  }, [page])

  const computedHelmet = useCallback(() => {
    if (
      !!params?.codeRegion &&
      !!cities &&
      !!cities[0] &&
      !!cities[0]['newRegion.name']
    ) {
      return (
        <Helmet>
          <title>Où travailler en {cities[0]['region.name']} | Mobiville</title>
          <meta
            name="description"
            content={`Découvrez les villes qui correspondent le mieux à votre recherche d'emploi dans la région ${cities[0]['newRegion.name']} et la liste des villes les plus attractives pour votre métier`}
          />
        </Helmet>
      )
    }
    return (
      <Helmet>
        <title>Où travailler en France | Mobiville</title>
        <meta
          name="description"
          content={`Découvrez les villes qui correspondent le mieux à votre recherche d'emploi et la liste des villes les plus attractives pour votre métier`}
        />
      </Helmet>
    )
  }, [cities, params])

  useEffect(() => {
    if (location.search) {
      setParams(queryString.parse(location.search))
    }
  }, [location])

  useEffect(() => {
    if (cities.length > 0) {
      let listCitiesInsee = cities.map((city) => [city.insee_com])
      onSearchCountList({
        codeRome: [params.codeRome],
        inseeList: listCitiesInsee,
      })
    }
  }, [params, sortCriterions, cities])

  const formattedCities = useMemo(() => {
    if (!cities || !cities.length) return []

    return cities.map((city) => ({
      ...city,
      x: city.geo_point_2d_x ?? 0,
      y: city.geo_point_2d_y ?? 0,
      url: formatCityUrl(city, params.codeRome),
    }))
  }, [cities])

  return (
    <>
      {computedHelmet()}

      <MainLayout
        style={{
          overflow: isMobile ? 'inherit' : '',
          minHeight: isMobile ? undefined : '',
        }}
        topMobileMenu
      >
        <Container $isMobile={isMobile}>
          <CitiesSearchBar params={params} />

          <CitiesList
            cities={cities}
            codeRome={params?.codeRome}
            selectedCityId={selectedCityId}
            setHoveredCityId={setHoveredCityId}
            page={page}
            onPageChange={setPage}
          />
          {!isMobile && (
            <MapContainer>
              <Map
                cities={formattedCities}
                style={{ height: '100%', width: '100%', margin: 0 }}
                popupopen={(city) => setSelectedCityId(city.id)}
                popupclose={() => setSelectedCityId(null)}
                showPopUp
                selectedCityId={selectedCityId}
                hoveredCityId={hoveredCityId}
              />
            </MapContainer>
          )}
        </Container>
      </MainLayout>
    </>
  )
}

Cities.propTypes = {}

export default memo(Cities)
