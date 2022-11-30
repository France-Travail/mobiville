import { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { ProjectsSelect, ResetButton, JobSituationSelect, AgeSituationSelect, ActionButton } from '.'
import { AGE_SITUATIONS, JOB_SITUATIONS, PROJECTS } from '../constants/search'
import { isMobileView } from '../constants/mobile'
import { useWindowSize } from '../common/hooks/window-size'
import { useNomPage } from '../common/contexts/NomPageContext'

const Container = styled.div`
    max-width: 1036px;
    width: 100%;
    margin: 0 auto;

    display: flex;
    flex-direction: ${ ({ $isMobile }) => ($isMobile ? `column` : `row`) };
    justify-items: ${ ({ $isMobile }) => ($isMobile ? `start` : `center`) };
    gap: 8px;

    display: ${ ({ $hidden }) => ($hidden ? 'none' : 'visible') };
`

const HelpForm = ({
    hidden = false
}) => {

    const isMobile = isMobileView(useWindowSize())
    const { search } = useLocation()
    const { nomPage } = useNomPage()
    const [ projectsSelected, setProjectsSelected ] = useState([])
    const [ jobSituationSelected, setJobSituationSelected ] = useState('')
    const [ ageSelected, setAgeSituationSelected ] = useState('')

    useEffect(() => {
        const entries = new URLSearchParams(search).entries()
        
        for (let entry of entries) {
            const value = entry[1]

            const projectFound = PROJECTS.find(project => project.key === value)
            const ageSituationFound = AGE_SITUATIONS.find(ageSituation => ageSituation.key === value)
            const jobSituationFound = JOB_SITUATIONS.find(jobSituation => jobSituation.key === value)

            if (!!projectFound) {
                // append to existing project, removing duplicated values with Set's constructor
                setProjectsSelected(projectsSelected => [...new Set([
                    ...projectsSelected,
                    projectFound.option
                ])])
            } else if (!!ageSituationFound) {
                setAgeSituationSelected(ageSituationFound.option)
            } else if (!!jobSituationFound) {
                setJobSituationSelected(jobSituationFound.option)
            }
        }
    }, [search])

    const computeSearchPath = useCallback(() => {
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
    
    const isDirty = useCallback(() => {
        return projectsSelected?.length > 0
            || !!jobSituationSelected
            || !!ageSelected
    }, [ projectsSelected, jobSituationSelected, ageSelected ])

    const resetInputs = () => {
        setProjectsSelected([])
        setJobSituationSelected('')
        setAgeSituationSelected('')
    }

    const tagSearchAction = () => {
      if (nomPage === 'accueil') {
        window.smartTag({
          name: 'rechercher_aide',
          type: 'action',
          chapters: ['accueil'],
        })
      }
      if (projectsSelected?.length > 0) {
        window.smartTag({
          name: 'projet',
          type: 'action',
          chapters: ['aides', 'critere_recherche'],
        })
      }
      if (!!jobSituationSelected) {
        window.smartTag({
          name: 'situation',
          type: 'action',
          chapters: ['aides', 'critere_recherche'],
        })
      }
      if (!!ageSelected) {
        window.smartTag({
          name: 'age',
          type: 'action',
          chapters: ['aides', 'critere_recherche'],
        })
      }
    }

    return (
        <Container $isMobile={isMobile} $hidden={hidden}>
            <ProjectsSelect
                style={{ flex: 3 }}
                value={projectsSelected}
                onChange={(projects) => setProjectsSelected(projects)}
            ></ProjectsSelect>

            <JobSituationSelect
                style={{ flex: 2 }}
                value={jobSituationSelected}
                onChange={(jobSituation) => setJobSituationSelected(jobSituation)}
            ></JobSituationSelect>

            <AgeSituationSelect
                style={{ flex: 2 }}
                value={ageSelected}
                onChange={(ageSituation) => setAgeSituationSelected(ageSituation)}
            ></AgeSituationSelect>

            <ActionButton
                isWelcomeHelpSearch={true}
                buttonProps={{ onClick: tagSearchAction }}
                style={{
                    flex: 2,
                    boxShadow: isMobile ? 'none' : '0px 5px 10px rgba(0, 0, 0, 0.3)',
                    minHeight: 73
                }}
                path={computeSearchPath()}
                isBlue
            ></ActionButton>

            {(isMobile && isDirty())
                ? (<ResetButton style={{ margin: 'auto' }} onClick={resetInputs} />)
                : null}
        </Container>
    )
}

HelpForm.propTypes = {
    hidden: PropTypes.bool
}

export default HelpForm
