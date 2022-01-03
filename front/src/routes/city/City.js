import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import queryString from 'query-string'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { useCities } from '../../common/contexts/citiesContext'
import MainLayout from '../../components/MainLayout'
import CityHeader from './CityHeader'
import PanelCityJobs from './PanelCityJobs'
import PanelCityLife from './PanelCityLife'
import PanelCityHousing from './PanelCityHousing'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import { ucFirstOnly } from '../../utils/utils'

const ContentBlock = styled.div`
  margin: ${(props) => (props.isMobile ? '0' : '32px 0')};
  padding-bottom: 64px;
`

const HelpButton = styled.button`
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px !important;
  cursor: pointer;
  width: ${(props) => (props.isMobile ? 'calc(100% - 32px)' : '')};
  padding: ${(props) => (props.isMobile ? '0 12px' : '0 48px')};
  border: none;
  font-size: 14px;
  margin: 0;
  border-radius: 32px;
  background-color: #191970;
  color: white;
`

const CityPage = ({ location: { pathname, search } }) => {
  const tabList = [
    { key: 'job', label: 'Emploi' },
    { key: 'life', label: 'Cadre de vie' },
    { key: 'tenement', label: 'Logement' },
  ]
  const { onLoadCity, isLoadingCity, city, criterions, unloadCity } =
    useCities()
  const { insee, place } = useParams()
  const params = queryString.parse(search)
  const size = useWindowSize()
  const history = useHistory()

  const [jobSearchValue, setJobSearchValue] = useState(
    decodeURIComponent(params.jobSearch || '')
  )

  useEffect(() => {
    const [inseeCode] = insee.split('-')
    onLoadCity(inseeCode)

    return () => {
      unloadCity()
    }
  }, [])

  useEffect(() => {
    if (!jobSearchValue) return
    if (jobSearchValue === decodeURIComponent(params.jobSearch)) return

    history.replace({
      pathname,
      search: queryString.stringify({ ...params, jobSearch: jobSearchValue }),
    })
  }, [history, jobSearchValue, params, pathname])

  const setTagSelected = (tagIndex) => {
    const tag = tabList[tagIndex].key
    const tagPath = tag !== 'job' ? `/${tag}` : ''

    history.push({ pathname: `/city/${insee}${tagPath}`, search })
  }

  const tabKey = place || 'job'

  const codeRome = params?.codeRome || ''
  let romeLabel = ''

  if (criterions?.codeRomes && codeRome) {
    const foundLabel =
      criterions.codeRomes.find((c) => c.key === codeRome)?.label || ''
    romeLabel = foundLabel.toLowerCase()
  }

  return (
    <MainLayout menu={{ visible: !isMobileView(size) }}>
      {isLoadingCity && <p>Loading...</p>}
      {!isLoadingCity && !city && <p>Non trouvée</p>}
      {!isLoadingCity && city && (
        <>
          <Helmet>
            <title>
              {tabKey === 'job'
                ? `
                  Travailler dans ${romeLabel} à ${ucFirstOnly(city.nom_comm)} -
                  Mobiville`
                : `Pourquoi vivre à ${ucFirstOnly(city.nom_comm)} - Mobiville`}
            </title>
            <meta
              name="description"
              content={
                tabKey === 'job'
                  ? `Explorez le marché de l'emploi de ${ucFirstOnly(
                      city.nom_comm
                    )} pour le métier de ${{
                      romeLabel,
                    }}. Offres disponibles, salaires, …`
                  : `Toutes les informations clés sur la ville de ${ucFirstOnly(
                      city.nom_comm
                    )} : Cadre de vie, emploi, logement et bien plus.`
              }
            />
          </Helmet>
          <CityHeader
            tabList={tabList}
            tabSelected={tabKey}
            onSelectTab={setTagSelected}
          />
          <ContentBlock isMobile={isMobileView(size)}>
            {tabKey === 'job' && codeRome && (
              <PanelCityJobs
                city={city}
                codeRome={codeRome}
                romeLabel={romeLabel}
                searchValue={jobSearchValue}
                setSearchValue={setJobSearchValue}
              />
            )}
            {tabKey === 'life' && <PanelCityLife city={city} />}
            {tabKey === 'tenement' && <PanelCityHousing city={city} />}
            <Link to="/mobility-guide" style={{ cursor: 'pointer' }}>
              <HelpButton
                type="button"
                isMobile={isMobileView(size)}
              >
                Choisir cette ville
              </HelpButton>
            </Link>
          </ContentBlock>
        </>
      )}
    </MainLayout>
  )
}

CityPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
}

CityPage.defaultProps = {
  location: {
    search: '',
  },
}

export default CityPage
