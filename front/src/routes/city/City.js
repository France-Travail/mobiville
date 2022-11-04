import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import _ from 'lodash'
import queryString from 'query-string'
import { Helmet } from 'react-helmet-async'
import { CircularProgress } from '@mui/material'

import { MainLayout } from '../../components'
import CityJobs from './CityJobs'
import CityServices from './cityServices/CityServices'

import { useCities } from '../../common/contexts/citiesContext'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import { useProfessions } from '../../common/contexts/professionsContext'

import CityCloseCities from './cityCloseCities/CityCloseCities'
import CityHome from './CityHome'
import CityMenuBack from './components/CityMenuBack'
import { COLOR_WHITE } from '../../constants/colors'

const JOB = 'job'
const LIFE = 'life'
const CLOSE_CITIES = 'villes-proches'

const CityPage = () => {
  const {
    onLoadCity,
    isLoadingCity,
    city,
    criterions,
    unloadCity,
  } = useCities()

  const {
    isLoading: isLoadingProfessions,
    onSearch: onSearchProfessions,
  } = useProfessions()

  const navigate = useNavigate()
  const location = useLocation()
  const { insee, section } = useParams()
  const [inseeCode] = insee.split('-')
  const isMobile = isMobileView(useWindowSize())

  const params = queryString.parse(location.search)

  const [jobSearchValue, setJobSearchValue] = useState(
    decodeURIComponent(params.jobSearch || '')
  )
  const codeRome = params?.codeRome || ''

  useEffect(() => {
    onLoadCity(inseeCode)

    return () => {
      unloadCity()
    }
  }, [inseeCode])

  useEffect(() => {
    if (!jobSearchValue) return
    if (jobSearchValue === decodeURIComponent(params.jobSearch)) return

    navigate(
      {
        pathname: location.pathname,
        search: queryString.stringify({ ...params, jobSearch: jobSearchValue }),
      },
      { replace: true }
    )
  }, [navigate, jobSearchValue, params, location.pathname])

  useEffect(() => {
    if (!city?.insee_com || !codeRome) return

    onSearchProfessions({ codeRome: [codeRome], insee: [city.insee_com] })
    onSearchProfessions({
      codeRome: [codeRome],
      insee: [city.insee_com],
      offresManqueCandidats: true,
    })
  }, [city?.insee_com, codeRome])

  let romeLabel = ''

  if (criterions?.codeRomes && codeRome) {
    const foundLabel =
      criterions.codeRomes.find((c) => c.key === codeRome)?.label || ''
    romeLabel = foundLabel.toLowerCase()
  }
  
  const lastSearch = localStorage.getItem('lastSearch')

  const childrenComponentsBacklink = `/city/${insee}?codeRome=${codeRome}`
  const backLink = `/cities${lastSearch || `?codeRome=${codeRome}`}`

  const currentSection = useMemo(() => {
    if (!city) return
    if (JOB === section) {
      return (
        <CityJobs
          isLoading={isLoadingProfessions}
          romeLabel={romeLabel}
          searchValue={jobSearchValue}
          setSearchValue={setJobSearchValue}
          backLink={childrenComponentsBacklink}
        />
      )
    } else if (CLOSE_CITIES === section) {
      return <CityCloseCities
        backLink={backLink}
        codeRome={codeRome}
      />
    } else if (LIFE === section) {
      return <CityServices />
    }
    return <CityHome
      romeLabel={romeLabel}
      codeRome={codeRome}
      insee={insee}
    />
  }, [
    section,
    romeLabel,
    backLink,
    childrenComponentsBacklink,
    isLoadingProfessions,
    jobSearchValue,
    insee,
  ])

  if (isLoadingCity) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  if (!city) return null

  return (
    <MainLayout menu={{ visible: !isMobile }}>
      <Helmet>
        <title>
          {_.upperFirst(romeLabel)} à {_.capitalize(city.nom_comm)} | Mobiville
        </title>
        <meta
          name="description"
          content={`Explorez le marché de l'emploi de ${_.capitalize(
            city.nom_comm
          )} pour le métier de ${romeLabel} ainsi que les informations sur l’immobilier, les services et les équipements.`}
        />
      </Helmet>

      <CityMenuBack
        backLink={backLink}
        isMobile={isMobile}
        background={(section === CLOSE_CITIES && !isMobile) ? 'none' : COLOR_WHITE}
      />

      {currentSection}

    </MainLayout>
  )
}

CityPage.propTypes = {}

export default CityPage
