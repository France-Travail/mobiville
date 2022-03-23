import React, { lazy, memo } from 'react'
import styled from 'styled-components'
import { Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import queryString from 'query-string'

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useCities } from '../../common/contexts/citiesContext'
import MainLayout from '../../components/MainLayout'
import { COLOR_PRIMARY } from '../../constants/colors'
import { isMobileView } from '../../constants/mobile'
import { useWindowSize } from '../../common/hooks/window-size'
import ErrorPage from '../error/ErrorPage'

const StepBlock = styled(Typography)`
  && {
    margin: 28px 0 48px 0;
    font-size: 12px;
    font-weight: bold;
  }
`

const LimitedWrapper = styled.div`
  max-width: ${(props) => (props.isMobile ? 'auto' : '336px')};
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

const BackWrapper = styled.div`
  margin-top: ${(props) => (props.isMobile ? '24px' : '68px')};
`

const ALL_STEPS = [
  {
    key: 'rome',
    components: lazy(() => import('./SearchRome')),
  },
  {
    key: 'region',
    components: lazy(() => import('./SearchRegionOrCity')),
  },
]

const Search = () => {
  const { criterions, criterionsError } = useCities()
  const size = useWindowSize()
  const { stepName } = useParams()
  const index = ALL_STEPS.findIndex((f) => f.key === stepName)
  const history = useHistory()
  const location = useLocation()
  const values = queryString.parse(location.search)
  const isMobile = isMobileView(size)

  if (criterionsError) {
    return <ErrorPage />
  }

  if (!criterions) {
    return <p>Chargement...</p>
  }

  const onNavigate = (increase, search = '') => {
    const x = index + increase

    if (x === -1) {
      history.push('/')
    } else if (x >= ALL_STEPS.length) {
      history.push({ pathname: '/cities', search })
    } else {
      history.push({ pathname: `/rechercher/${ALL_STEPS[x].key}`, search })
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
      val = { ...values, codeCity: [newValues.city] }
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

  const Component = ALL_STEPS[index].components

  return (
    <MainLayout style={{ marginBottom: isMobile ? 120 : 250 }}>
      <ProgressBar
        style={{ width: `${((index + 1) * 100) / ALL_STEPS.length}%` }}
      />
      <LimitedWrapper isMobile={isMobile}>
        <BackWrapper isMobile={isMobile}>
          <ArrowBackOutlinedIcon
            style={{ cursor: 'pointer' }}
            onClick={() => onNextStep({}, -1)}
          />
        </BackWrapper>
        <StepBlock>
          Etape {index + 1}/{ALL_STEPS.length}
        </StepBlock>
        <Component onNext={onNextStep} values={values} />
      </LimitedWrapper>
    </MainLayout>
  )
}

export default memo(Search)
