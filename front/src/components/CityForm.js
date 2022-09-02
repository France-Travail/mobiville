import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useWindowSize } from '../common/hooks/window-size'
import { isMobileView } from '../constants/mobile'
import { CITY_TYPE, REGION_TYPE } from '../constants/search'

import { CitySelect, JobSelect, ActionButton } from './'

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: ${ ({ $isMobile }) => ($isMobile ? `column` : `row`) };
  justify-items: ${ ({ $isMobile }) => ($isMobile ? `start` : `center`) };
  gap: 8px;

  display: ${ ({ $hidden }) => ($hidden ? 'none' : 'visible') };
`

const CityForm = ({
    hidden = false
}) => {

    const isMobile = isMobileView(useWindowSize())

    const [ jobSelected, setJobSelected ] = useState('')
    const [ citySelected, setCitySelected ] = useState('')

    const computeSearchPath = useCallback(() => {
        if (!!jobSelected) {
            if (!!citySelected) {
                if (citySelected.type === CITY_TYPE) {
                return `/city/${citySelected.id}-${citySelected.cityName}?codeRome=${jobSelected.key}`
                } else if (citySelected.type === REGION_TYPE) {
                return `/cities?codeRegion=${citySelected.id}&codeRome=${jobSelected.key}`
                }
            }
            return `/cities?codeRome=${jobSelected.key}`
        }
        return ''
    }, [jobSelected, citySelected])

    const onJobSelect = (job) => {
        setJobSelected(job)
    }

    const onCitySelect = (city) => {
        setCitySelected(city)
    }

    return (
        <Container
            $hidden={hidden}
            $isMobile={isMobile}
        >
            
            <JobSelect
                onSelect={(job) => onJobSelect(job)}
            ></JobSelect>

            <CitySelect
                onSelect={(city) => onCitySelect(city)}
                codeRome={!!jobSelected ? jobSelected.key : null}
            ></CitySelect>

            <ActionButton
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
}

export default CityForm