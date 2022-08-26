import { useCallback, useState } from 'react'
import { useHistory } from "react-router-dom"

import {
    ActionButton,
    ButtonGroup,
    ProjectsSelect, 
    JobSituationSelect,
    AgeSituationSelect,
    CityForm
} from '../../../components'

import { ReactComponent as HouseOutlineIcon } from '../../../assets/images/icons/house-outline.svg'
import { ReactComponent as FinancialHelpIcon } from '../../../assets/images/icons/financial-help.svg'
import {
    AGE_SITUATIONS,
    JOB_SITUATIONS,
    PROJECTS,
} from '../../../constants/search'
import { isMobileView } from '../../../constants/mobile'
import { useWindowSize } from '../../../common/hooks/window-size'
import styled from 'styled-components'
import { COLOR_PRIMARY } from '../../../constants/colors'

// === SEARCH BLOCK ===

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: ${({ $isMobile }) => ($isMobile ? '' : '-96px')};
`

const InputGroup = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  gap: 8px;

  margin-top: 24px;

  display: ${ ({ $hidden }) => ($hidden ? 'none' : 'visible') };
`

const ButtonGroupLabel = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin: 8px 0;
`

const WelcomeSearchForm = () => {
    const HELPS_BUTTON_ID = 'helps'
    const CITIES_BUTTON_ID = 'cities'

    const isMobile = isMobileView(useWindowSize())
    const history = useHistory()

    const [ selectedSearchMode, setSelectedSearchMode ] = useState('city')

    const [ projectsSelected, setProjectsSelected ] = useState([])
    const [ jobSituationSelected, setJobSituationSelected ] = useState(null)
    const [ ageSituationSelected, setAgeSituationSelected ] = useState(null)
    
    
  const isSelected = useCallback((id) => {
    return id === selectedSearchMode
  }, [selectedSearchMode])

  const handleClick = (buttonId) => {
    // redirect to modale on mobile
    if (isMobile) {
        if (buttonId === HELPS_BUTTON_ID) {
            history.push('/aides-search')
        } else if (buttonId === CITIES_BUTTON_ID) {
            history.push('/city-search')
        }
    }
  }

  const handleChange = (buttonId) => {
    setSelectedSearchMode(buttonId)
  }

  // === HELP SEARCH ===

  const handleProjectsChange = (projects) => {
    setProjectsSelected(projects)
  }

  const handleJobSituationChange = (jobSituation) => {
    setJobSituationSelected(jobSituation)
  }

  const handleAgeSituationChange = (age) => {
    setAgeSituationSelected(age)
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

        if (!!ageSituationSelected) {
            ageURLFormatted = `situation=${AGE_SITUATIONS.find(a => a.option === ageSituationSelected)?.key}`
        }

        const paramsURLFormatted = [
            projectsURLFormatted,
            jobSituationURLFormatted,
            ageURLFormatted
        ]
            .filter(item => item != null)
            .join('&')

        return `/aides?${paramsURLFormatted}`
    }, [ projectsSelected, jobSituationSelected, ageSituationSelected ])

    return (
        <SearchContainer $isMobile={isMobile}>
            <div>
                <ButtonGroupLabel>Que recherchez-vous ?</ButtonGroupLabel>
                <ButtonGroup
                    onChange={handleChange}
                    onClick={handleClick}
                >
                    <button
                        type="button"
                        id={CITIES_BUTTON_ID}
                    >
                        <HouseOutlineIcon />
                        <p>Une ville</p>
                    </button>

                    <button
                        type="button"
                        id={HELPS_BUTTON_ID}
                        style={{
                            border: (isMobile ? `1px solid ${ COLOR_PRIMARY }` : 'none')
                        }}
                    >
                        <FinancialHelpIcon />
                        <p>Une aide</p>
                    </button>
                </ButtonGroup>
            </div>

            { !isMobile &&
                <>
                    <CityForm
                        hidden={!isSelected(CITIES_BUTTON_ID)}
                    ></CityForm>

                    {/* HELP */}
                    <InputGroup
                        $hidden={!isSelected(HELPS_BUTTON_ID)}
                    >

                        <ProjectsSelect
                            style={{ flex: 5 }}
                            onChange={handleProjectsChange}
                            value={projectsSelected}
                        ></ProjectsSelect>

                        <JobSituationSelect
                            style={{ flex: 3 }}
                            onChange={handleJobSituationChange}
                            value={jobSituationSelected}
                        ></JobSituationSelect>

                        <AgeSituationSelect
                            style={{ flex: 3 }}
                            onChange={handleAgeSituationChange}
                            value={ageSituationSelected}
                        ></AgeSituationSelect>

                        <ActionButton
                            style={{
                                height: '73px',
                                boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',
                                width: '184px',
                            }}
                            path={computeHelpsSearchPath()}
                            isBlue
                        ></ActionButton>

                    </InputGroup>
                </>
            }
      </SearchContainer>
    )
}

export default WelcomeSearchForm