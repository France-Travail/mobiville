import { useCallback, useState } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import { useWindowSize } from "../../../common/hooks/window-size"
import { isMobileView } from "../../../constants/mobile"
import { COLOR_PRIMARY } from '../../../constants/colors'
import { ActionButton, ButtonGroup, Section, ProjectsSelect, JobSituationSelect, AgeSituationSelect } from '../../../components'
import JobSelect from './JobSelect'
import CitySelect from './CitySelect'

import heroHomepagePic from '../../../assets/images/00-Hero-Homepage.png'
import { ReactComponent as HouseOutlineIcon } from '../../../assets/images/icons/house-outline.svg'
import { ReactComponent as FinancialHelpIcon } from '../../../assets/images/icons/financial-help.svg'
import { AGE_SITUATIONS, JOB_SITUATIONS, PROJECTS } from '../../../constants/search'

const Container = styled.section`
  background: linear-gradient(180deg, #ddddea 0%, #c3e9e9 100%);
  padding-bottom: 90px;
  border-radius: 0;
`

// === TITLE BLOCK ===

const TitleContainer = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row') };
  justify-content: center;
  align-items: center;

  margin-top: ${({ isMobile }) => (isMobile ? '102px' : '') };
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  font-size: 36px;
  margin: 0;
  font-weight: 900;
  color: ${COLOR_PRIMARY};
`

const SubTitle = styled.h2`
  font-weight: 400;
  line-height: 27px;
  font-size: ${({ isMobile }) => (isMobile ? '18px' : '22px')};
  margin: 0;
`

// === SEARCH BLOCK ===

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`

const InputGroup = styled.div`
  width: 100%;

  display: flex;
  flex-direction: ${({isMobile}) => (isMobile ? 'column' : 'row')};
  gap: 8px;

  margin-top: 24px;

  display: ${ ({ hidden }) => (hidden ? 'none' : 'visible') };
`

const ButtonGroupLabel = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin: 8px 0;
`

const Welcome = () => {
  const isMobile = isMobileView(useWindowSize())

  const [ selectedSearchMode, setSelectedSearchMode ] = useState('city')

  const [ jobSelected, setJobSelected ] = useState('')
  const [ citySelected, setCitySelected ] = useState('')

  const [ projectsSelected, setProjectsSelected ] = useState([])
  const [ jobSituationSelected, setJobSituationSelected ] = useState(null)
  const [ ageSelected, setAgeSelected ] = useState(null)

  const isSelected = useCallback((id) => {
    return id === selectedSearchMode
  }, [selectedSearchMode])

  const handleChange = (buttonId) => {
    setSelectedSearchMode(buttonId)
  }

  // === CITY SEARCH ===

  const computeSearchPath = useCallback(() => {
    if (!!jobSelected) {
      if (!!citySelected) {
        if (citySelected.type === CitySelect.CITY_TYPE) {
          return `/city/${citySelected.id}-${citySelected.cityName}?codeRome=${jobSelected.key}`
        } else if (citySelected.type === CitySelect.REGION_TYPE) {
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

  // === HELP SEARCH ===

  const handleProjectsChange = (projects) => {
    setProjectsSelected(projects)
  }

  const handleJobSituationChange = (jobSituation) => {
    setJobSituationSelected(jobSituation)
  }

  const handleAgeChange = (age) => {
    setAgeSelected(age)
  }

  const computeHelpsSearchPath = useCallback(() => {
    let projectsURLFormatted = null
    let jobSituationURLFormatted = null
    let ageURLFormatted = null

    if (!!projectsSelected && projectsSelected.length > 0) {
      projectsURLFormatted = projectsSelected.map(project => {
        return `project=${PROJECTS.find(p => p.option === project)?.key}`
      }).join('&')
    }

    if (!!jobSituationSelected) {
      jobSituationURLFormatted = `situation=${JOB_SITUATIONS.find(j => j.option === jobSituationSelected)?.key}`
    }

    if (!!ageSelected) {
      ageURLFormatted = `situation=${AGE_SITUATIONS.find(a => a.option === ageSelected)?.key}`
    }
    
    const paramsURLFormatted = [
      projectsURLFormatted,
      jobSituationURLFormatted,
      ageURLFormatted
    ]
      .filter(item => item != null)
      .join('&')

    return `/aides?${paramsURLFormatted}`
  }, [ projectsSelected, jobSituationSelected, ageSelected ])

  return (
    <Container isMobile={isMobile}>
      <Section>
        <TitleContainer isMobile={isMobile}>
          <TitleWrapper>
            <Title>Trouvez l’emploi et la ville qui va avec !</Title>
            <SubTitle>Décrochez l’emploi dans la ville qui vous correspond et identifiez les aides pour votre projet de mobilité</SubTitle>
          </TitleWrapper>

            <img className="hero" src={heroHomepagePic} alt="" />
        </TitleContainer>

        <SearchContainer>
          <ButtonGroupLabel>Que recherchez-vous ?</ButtonGroupLabel>
          <ButtonGroup
            onChange={(buttonId) => handleChange(buttonId)}
          >
            <button
              type="button"
              id="city"
            >
              <HouseOutlineIcon />
              <p>Une ville</p>
            </button>

            <button
              type="button"
              id="help"
            >
              <FinancialHelpIcon />
              <p>Une aide</p>
            </button>
          </ButtonGroup>

          {/* CITY */}
          <InputGroup
            isMobile={isMobile}
            hidden={!isSelected('city')}
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
                height: '73px',
                ...(isMobile ?
                  {} :
                  {
                    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',
                    width: '184px',
                  })
              }}
              path={computeSearchPath()}
              isBlue
            ></ActionButton>

          </InputGroup>

          {/* HELP */}
          <InputGroup
            isMobile={isMobile}
            hidden={!isSelected('help')}
          >

            <ProjectsSelect
              style={{ flex: 5 }}
              onChange={handleProjectsChange}
            ></ProjectsSelect>

            <JobSituationSelect
              style={{ flex: 3 }}
              onChange={handleJobSituationChange}
            ></JobSituationSelect>

            <AgeSituationSelect
              style={{ flex: 3 }}
              onChange={handleAgeChange}
            ></AgeSituationSelect>

            <ActionButton
              style={{
                height: '73px',
                ...(isMobile ?
                  {} :
                  {
                    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',
                    width: '184px',
                  })
                }}
                path={computeHelpsSearchPath()}
                isBlue
            ></ActionButton>

          </InputGroup>

        </SearchContainer>
      </Section>
    </Container>
  )
}

export default Welcome