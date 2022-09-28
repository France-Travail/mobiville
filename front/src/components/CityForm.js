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
    hidden = false, job, region, useSession = false
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
        sessionStorage.setItem("selectedJob", JSON.stringify(job))
    }

    const onCitySelect = (city) => {
        setCitySelected(city)
        sessionStorage.setItem("selectedCity", JSON.stringify(city))
    }

    return (
        <Container
            $hidden={hidden}
            $isMobile={isMobile}
        >
            
            <JobSelect
                onSelect={(job) => onJobSelect(job)}
                job={job}
                useSession={useSession}
            ></JobSelect>

            <CitySelect
                onSelect={(city) => onCitySelect(city)}
                codeRome={!!jobSelected ? jobSelected.key : null}
                region={region}
                useSession={useSession}
            ></CitySelect>

            {useSession ? <button type="submit" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '24px',
                    gap: '8px',
                    minHeight: '73px',
                    boxShadow: 'rgb(0 0 0 / 30%) 0px 5px 10px',
                    width: '184px',
                    backgroundColor: '#191970',
                    borderRadius: '20px',
                    color: 'white',
                    left: '856px',
                    fontSize: '18px',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer'
                }}>Rechercher</button>
              : <ActionButton
                isMainSearch={true}
                style={{
                    minHeight: 73,
                    boxShadow: isMobile ? 'none' : '0px 5px 10px rgba(0, 0, 0, 0.3)',
                    width: isMobile ? '100%' : 184,
                }}
                path={computeSearchPath()}
                isBlue
            ></ActionButton>
        }
        </Container>
    )
}

CityForm.propTypes = {
    hidden: PropTypes.bool,
    job:PropTypes.object, 
    region: PropTypes.object, 
    useSession: PropTypes.bool 
}

export default CityForm