import PropTypes from 'prop-types'
import { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";


import { useWindowSize } from '../common/hooks/window-size'
import { isMobileView } from '../constants/mobile'
import { CITY_TYPE, REGION_TYPE } from '../constants/search'

import { CitySelect, JobSelect, ActionButton } from './'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? `column` : `row`)};
  justify-items: ${({ $isMobile }) => ($isMobile ? `start` : `center`)};
  gap: 8px;
  display: ${({ $hidden }) => ($hidden ? 'none' : 'visible')};
`
const CityForm = ({
  hidden = false,
  filters = { citySizeSelected: '', environmentSelected: '' },
  handleChangeEnv
}) => {
  const isMobile = isMobileView(useWindowSize())
  
  const [jobSelected, setJobSelected] = useState('')
  const [citySelected, setCitySelected] = useState('')
  let navigate = useNavigate();
  /** TODO Refacto pour avoir un seul lieu qui met a jour la recherche
   * Voir onSubmit() Cities.js:287
   */

  const computeSearchPath = useCallback(() => {
    if (!!jobSelected && !!citySelected && citySelected.type === CITY_TYPE) {
      // on va directement sur la page de la ville choisi
      return `/city/${citySelected.id}-${citySelected.cityName}?codeRome=${jobSelected.key}`
    }

    let url = '/cities'

    if (!!jobSelected) {
      url += `?codeRome=${jobSelected.key}`
    }
    if (!!citySelected && citySelected.type === REGION_TYPE) {
      url += `&codeRegion=${citySelected.id}`
    }
    if (!!filters && !!filters.citySizeSelected) {
      url += `&codeCity=${filters.citySizeSelected}`
    }
    if (!!filters && !!filters.environmentSelected) {
      url += `&codeEnvironment=${filters.environmentSelected}`
    }
    return url
  }, [jobSelected, citySelected, filters])

  const onJobSelect = (job) => {
    setJobSelected(job)
  }

  const onCitySelect = (city) => {
    setCitySelected(city)
  }

  return (
    <Container $hidden={hidden} $isMobile={isMobile}>
      <JobSelect onSelect={(job) => onJobSelect(job)}></JobSelect>

      <CitySelect
        onSelect={(city) => onCitySelect(city)}
        codeRome={!!jobSelected ? jobSelected.key : null}
      ></CitySelect>

      <ActionButton
        isMainSearch={true}
        style={{
          minHeight: 73,
          boxShadow: isMobile ? 'none' : '0px 5px 10px rgba(0, 0, 0, 0.3)',
          width: isMobile ? '100%' : 184,
        }}
        path={computeSearchPath()}
        isBlue
      ></ActionButton>
    </Container>
  )
}

CityForm.propTypes = {
  hidden: PropTypes.bool,
  job: PropTypes.object,
  filters: PropTypes.object,
}

export default CityForm
