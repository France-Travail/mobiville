import { debounce } from 'lodash'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'

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
  filters = { citySizeSelected: '', environmentSelected: '', opportunitySelected: '' },
}) => {
  const isMobile = isMobileView(useWindowSize())
  const navigate = useNavigate()
  const { search } = useLocation()

  const [jobSelected, setJobSelected] = useState('')
  const [citySelected, setCitySelected] = useState('')

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
    if (!!filters && !!filters.opportunitySelected) {
      url += `&opportunity=${filters.opportunitySelected}`
    }

    return url
  }, [jobSelected, citySelected, filters])

  const redirect = () => {
    debounce(() => navigate(computeSearchPath()), 50)()
  }

  useEffect(() => {
    // dans le cas où la valeur est déjà dans l'url, on vérifie qu'on a bien une modification
    if (search.includes("codeCity") 
       || search.includes("codeEnvironment") 
       || search.includes("opportunity")) {
      const entries = new URLSearchParams(search).entries()
      for (let entry of entries) {
        const [key, value] = entry
        if (key === 'codeCity' && value !== filters.citySizeSelected 
            || key === 'codeEnvironment' && value !== filters.environmentSelected
            || key === 'opportunity' && value !== filters.opportunitySelected) {
          redirect()
        }
      }
    }
    
    // on vérifie que l'ajout de nouveaux filtres
    if (!!filters && ((!!filters.citySizeSelected && !search.includes("codeCity")) 
        || (!!filters.environmentSelected && !search.includes("codeEnvironment"))
        || (!!filters.opportunitySelected && !search.includes("opportunity")))) {
      redirect()
    }
  }, [filters])

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
