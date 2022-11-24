import { useEffect, useState, memo, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import queryString from 'query-string'

import { useCities } from '../../common/contexts/citiesContext'
import { MainLayout, Map } from '../../components'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'

import MobileCriterionsPanel from './components/MobileCriterionsPanel'
import DesktopCriterionsPanel from './components/DesktopCriterionsPanel'
import MobileCriterionsSelection from './components/MobileCriterionsSelection'

import { useProfessions } from '../../common/contexts/professionsContext'
import CitiesList from './components/CitiesList'
import { formatCityUrl } from '../../utils/utils'

const Container = styled.div`
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;

  display: flex;
`

const Cities = () => {
  const isMobile = isMobileView(useWindowSize())
  const location = useLocation()
  const navigate = useNavigate()

  const [params, setParams] = useState(queryString.parse(location.search))
  const [showMobilePanel, setShowMobileCriterionsSelection] = useState(false)

  const {
    onSearchCountList,
  } = useProfessions()

  // cities
  const {
    cities,
    isLoading,
    totalCities,
    sortCriterions,
  } = useCities()
  const [hoveredCityId, setHoveredCityId] = useState(null)
  const [selectedCityId, setSelectedCityId] = useState(null)

  const computedHelmet = useCallback(() => {
    if (
      !!params?.codeRegion &&
      !!cities &&
      !!cities[0] &&
      !!cities[0]['newRegion.name']
    ) {
      return (
        <Helmet>
          <title>
            Où travailler en {cities[0]['newRegion.name']} | Mobiville
          </title>
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

  return (
    <>
      {computedHelmet()}

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
          <DesktopCriterionsPanel paramsUrl={params} />
        )}

        <Container>
          <CitiesList
            cities={cities}
            params={params}
            selectedCityId={selectedCityId}
            setHoveredCityId={setHoveredCityId}
          />
          {!isMobile && !isLoading && cities.length && (
            <div style={{ height: 424, width: 424 }}>
              <Map
                cities={cities.map((city) => ({
                  ...city,
                  x: city.geo_point_2d_x ?? 0,
                  y: city.geo_point_2d_y ?? 0,
                  url: formatCityUrl(city, params.codeRome),
                }))}
                style={{ height: '100%', width: '100%', margin: 0 }}
                zoom={7}
                popupopen={(city) => setSelectedCityId(city.id)}
                popupclose={() => setSelectedCityId(null)}
                showPopUp
                selectedCityId={selectedCityId}
                hoveredCityId={hoveredCityId}
              />
            </div>
          )}
        </Container>
      </MainLayout>
    </>
  )
}

Cities.propTypes = {}

export default memo(Cities)
