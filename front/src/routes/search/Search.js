import React, { lazy, memo, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import queryString from 'query-string'

import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useCities } from '../../common/contexts/citiesContext'
import MainLayout from '../../components/MainLayout'
import { COLOR_OTHER_GREEN, COLOR_PRIMARY } from '../../constants/colors'
import { isMobileView } from '../../constants/mobile'
import { useWindowSize } from '../../common/hooks/window-size'
import ErrorPage from '../error/ErrorPage'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const StepBlock = styled(Typography)`
  && {
    margin: ${({ isMobile }) => (isMobile ? '0px' : '28px 0 48px 0')};
    font-size: ${({ isMobile }) => (isMobile ? '24px' : '36px')};
    font-weight: 900;
    color: ${COLOR_PRIMARY};
    text-align: ${({ isMobile }) => (isMobile ? 'start' : 'center')};
    display: ${(display) => display || 'initial'};
  }
`

const LimitedWrapper = styled.div`
  max-width: ${(props) => (props.isMobile ? 'auto' : '1040px')};
  width: ${(props) => (props.isMobile ? 'auto' : '100%')};
  margin-left: ${(props) => (props.isMobile ? '16px' : 'auto')};
  margin-right: ${(props) => (props.isMobile ? '16px' : 'auto')};
`

const ProgressBar = styled.div`
  background-color: ${COLOR_PRIMARY};
  position: absolute;
  height: 4px;
  left: 0;
`

const HeaderLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ isMobile }) => (isMobile ? '30px' : '48px')};
  height: 48px;
  border-radius: 50%;
  display: ${(props) => props.display || 'flex'};

  & > svg {
    color: ${({ isMobile }) => (isMobile ? '#23333C' : null)};
  }
  background: ${({ isMobile }) => (isMobile ? 'unset' : COLOR_OTHER_GREEN)};
  margin: ${({ isMobile }) =>
    isMobile ? '10px 10px 0px 0px' : '0px 15px 0px 0px'};
  cursor: pointer;
`
const Fil = styled.p`
  margin: 20px 0px;
  font-weight: 400;
  font-size: 16px;
  .accueil {
    color: #666666;
  }
  .current-page {
    color: #161616;
  }
  svg {
    /* icon chevron */
    vertical-align: text-top;
  }
`
const SearchCorpus = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  max-width: 605px;
  margin: 0px auto;
`

const ALL_STEPS = [
  {
    key: 'rome',
    components: lazy(() => import('./SearchRome')),
  },
  {
    key: 'region',
    components: lazy(() => import('./SearchCity')),
  },
]

const Search = () => {
  const { criterions, criterionsError } = useCities()
  const { stepName } = useParams()
  const history = useHistory()
  const location = useLocation()
  const size = useWindowSize()
  const isMobile = isMobileView(size)

  const [ index, setIndex ] = useState(-1)
  const [ isSearchFocused, setIsSearchFocused ] = useState(false)
  const [ CurrentStepComponent, setCurrentStepComponent ] = useState(lazy(() => import('./SearchRome')))
  const [ values, setValues ] = useState('')

  useEffect(() => {
    setValues(queryString.parse(location.search))
  }, [location])

  useEffect(() => {
    setIndex(ALL_STEPS.findIndex((f) => f.key === stepName))
  }, [stepName])

  useEffect(() => {
    if (index > -1) {
      setCurrentStepComponent(ALL_STEPS[index].components)
    }
  }, [index])

  if (criterionsError) {
    return <ErrorPage />
  }

  if (!criterions) {
    return <p>Chargement...</p>
  }

  const onNavigate = (increase, search = '') => {
    const newIndex = index + increase
    setIndex(newIndex)

    if (newIndex === -1) {
      history.push('/')
    } else if (newIndex >= ALL_STEPS.length) {
      history.push({ pathname: '/cities', search })
    } else {
      history.push({ pathname: `/rechercher/${ALL_STEPS[newIndex].key}`, search })
    }
  }

  const onNextStep = (newValues = {}, increase = 1) => {
    let val = {}

    if (newValues.rome) {
      val = { ...values, codeRome: [newValues.rome] }
    } else if (newValues.regions) {
      val = { ...values, codeRegion: newValues.regions }
    } else if (newValues.from) {
      val = { ...values, from: [newValues.from.id] }
    } else if (newValues.city) {
      // TODO rm tout l'histoire de localstorage, mettre en commun les chemins retour ...
      localStorage.setItem(
        'lastSearch',
        `?codeRegion=${newValues.regions ? newValues.regions : ''}&codeRome=${
          values.codeRome
        }`
      )
      return history.push(
        `/city/${newValues.city}-${newValues.cityName}?codeRome=${values.codeRome}`
      )
      // val = { ...values, codeCity: [newValues.city] }
    } else if (newValues.environment) {
      val = { ...values, codeEnvironment: [newValues.environment] }
    } else {
      val = { ...values, ...newValues }
    }

    const params = {}
    Object.entries(val).forEach(([key, value]) => {
      if (isEmpty(value)) return
      params[key] = value
    })
    onNavigate(increase, `?${queryString.stringify(params)}`)
  }

  if (index === -1) {
    return <div />
  }

  return (
    <MainLayout style={{ marginBottom: isMobile ? 120 : 250 }} menu={{ visible: !isMobile }}>
      <ProgressBar
        style={{ width: `${((index + 1) * 100) / ALL_STEPS.length}%` }}
      />
      <LimitedWrapper isMobile={isMobile}>
        {isMobile && (
          <HeaderLink
            display={isMobile && isSearchFocused ? 'none' : undefined}
            onClick={() => onNextStep({}, -1)}
            isMobile={isMobile}
          >
            <ArrowBackIcon color="primary" fontSize="large" />
          </HeaderLink>
        )}
        {!isMobile && (
          <Fil>
            <a href="/" className="accueil">
              Accueil
              <ChevronRightIcon />
            </a>
            <span className="current-page">
              {index === 0
                ? 'Rechercher un métier'
                : 'Rechercher une ville ou une région'}
            </span>
          </Fil>
        )}
        <StepBlock
          isMobile={isMobile}
          display={isMobile && isSearchFocused ? 'none' : undefined}
        >
          Etape {index + 1} sur {ALL_STEPS.length}
        </StepBlock>
        <SearchCorpus>
          {!isMobile && (
            <HeaderLink
              display={isMobile && isSearchFocused ? 'none' : undefined}
              onClick={() => onNextStep({}, -1)}
              isMobile={isMobile}
            >
              <ArrowBackIcon color="primary" fontSize="large" />
            </HeaderLink>
          )}
          <CurrentStepComponent
            onNext={onNextStep}
            values={values}
            isSearchFocused={(b) => setIsSearchFocused(b)}
          ></CurrentStepComponent>
        </SearchCorpus>
      </LimitedWrapper>
    </MainLayout>
  )
}

export default memo(Search)
