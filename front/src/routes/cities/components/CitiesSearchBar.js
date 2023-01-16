import { memo, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { debounce } from 'lodash'

import { Button, CityForm, Modale, Tag } from '../../../components'
import CitiesFilters from './CitiesFilters'
import { COLOR_OTHER_GREEN, COLOR_PRIMARY } from '../../../constants/colors'
import { isMobileView } from '../../../constants/mobile'
import { useWindowSize } from '../../../common/hooks/window-size'
import { useCities } from '../../../common/contexts/citiesContext'

const Container = styled.div`
  grid-area: filters;
`

const CityFormContainer = styled.div`
  grid-area: cityForm;

  height: 118px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${COLOR_OTHER_GREEN};
`

const CityFormWrapper = styled.div`
  max-width: 1040px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
`

const TitleContainer = styled.div`
  color: ${COLOR_PRIMARY};
  padding: 0 16px;
`

const Title = styled.h1`
  margin-top: 0;
  font-weight: 900;
  font-size: 22px;
  line-height: 28px;
`

const SubTitle = styled.h2`
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
`

const MobileSearchInfos = styled.div`
  margin: 16px;

  font-size: 24px;
  font-weight: 900;
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`

const TagsTitle = styled.p`
  margin: 8px 0;
  color: ${COLOR_PRIMARY};
`

const CitiesSearchBar = ({
  params,
}) => {
  const navigate = useNavigate()
  const { search } = useLocation()

  const isMobile = isMobileView(useWindowSize())
  const { criterions, totalCities } = useCities()

  const DEFAULT_FILTERS = {
    environment: '',
    citySize: '',
    opportunity: ''
  }
  const [ filters, setFilters ] = useState(DEFAULT_FILTERS)
  const [ showMobileSearch, setShowMobileSearch ] = useState(false)

  const [regionLabel, setRegionLabel] = useState('')
  const [metierLabel, setMetierLabel] = useState('')

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(search)

    urlSearchParams.delete('codeCity')
    urlSearchParams.delete('codeEnvironment')
    urlSearchParams.delete('opportunity')

    if (!!filters?.citySize) urlSearchParams.set('codeCity', filters.citySize)
    if (!!filters?.environment) urlSearchParams.set('codeEnvironment', filters.environment)
    if (!!filters?.opportunity) urlSearchParams.set('opportunity', filters.opportunity)

    debounce(() => navigate(`/villes?${urlSearchParams.toString()}`), 50)()
  }, [filters])

  useEffect(() => {
    if (!!params?.codeRegion) {
      if (!!criterions?.regions) {
        const region = criterions.regions.find(
          (region) => params.codeRegion === region.id
        )
        setRegionLabel(region?.label ?? '')
      }
    } else {
      setRegionLabel('')
    }
    if (!!params?.codeRome && !!criterions?.codeRomes) {
      const metier = criterions.codeRomes.find(
        (codeRome) => params.codeRome === codeRome.key
      )
      setMetierLabel(metier.label)
    }
  }, [params, criterions])

  const updateFilters = (updatedFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...updatedFilters
    }))
  }

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS)
  }

  return (
    <>
      { isMobile
        ? (<Container>
          <MobileSearchInfos>
            <TagsTitle>Ma recherche</TagsTitle>
            <TagsContainer>
              <Tag size='small'>{ metierLabel }</Tag>
              <Tag size='small'>{ !!regionLabel ? regionLabel : 'Régions les plus attractives' }</Tag>
              {/* todo : refacto in <Button size='small'> */}
              <Button
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  padding: 6
                }}
                onClick={() => setShowMobileSearch(true)}
              >
                Modifier
              </Button>
            </TagsContainer>
          </MobileSearchInfos>

          <TitleContainer $isMobile>
            <Title>
              {totalCities}
              {!!metierLabel
                ? ` ville${totalCities > 1 ? 's' : ''} pour ${metierLabel}`
                : ''}{' '}
              {!!regionLabel ? `en ${regionLabel}` : ''}
            </Title>
            <SubTitle>Classement des villes par opportunités d'emploi</SubTitle>
          </TitleContainer>

          <CitiesFilters
            filters={filters}
            onFiltersChange={(filters) => updateFilters(filters)}
            onReset={resetFilters}
            params={params}
          />
        </Container>)
        : <CityFormContainer>
            <CityFormWrapper>
              <CityForm />
            </CityFormWrapper>
          </CityFormContainer>}

      {!isMobile && (
        <Container>
          <CitiesFilters
            filters={filters}
            onFiltersChange={(filters) => updateFilters(filters)}
            onReset={resetFilters}
            params={params}
          />

          <TitleContainer>
            <Title>
              {totalCities}
              {!!metierLabel
                ? ` ville${totalCities > 1 ? 's' : ''} pour ${metierLabel}`
                : ''}{' '}
              {!!regionLabel ? `en ${regionLabel}` : ''}
            </Title>
            <SubTitle>Classement des villes par opportunités d'emploi</SubTitle>
          </TitleContainer>
        </Container>)}
      
      <Modale
        title='Ma recherche'
        onClose={() => setShowMobileSearch(false)}
        show={showMobileSearch}
      >
        <CityForm onClick={() => setShowMobileSearch(false)} />
      </Modale>
    </>
  )
}

CitiesSearchBar.propTypes = {
  params: PropTypes.object,
}

export default memo(CitiesSearchBar)
