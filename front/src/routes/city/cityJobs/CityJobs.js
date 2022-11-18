import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Helmet } from 'react-helmet-async'
import moment from 'moment'

import {
  COLOR_GRAY,
  COLOR_PRIMARY,
} from '../../../constants/colors'
import { capitalize, formatDate } from '../../../utils/utils'
import { useWindowSize } from '../../../common/hooks/window-size'
import { isMobileView } from '../../../constants/mobile'
import { useCities } from '../../../common/contexts/citiesContext'
import { useProfessions } from '../../../common/contexts/professionsContext'

import JobDetail from './components/JobDetail'
import JobsList from './components/JobsList'
import JobsFilters from './components/JobsFilters'

const Title = styled.h1`
  width: 100%;
  max-width: 1040px;
  margin: 22px auto;

  color: ${COLOR_PRIMARY};
  font-weight: 900;
  font-size: ${({ $isMobile }) => ($isMobile ? '24px' : '36px')};
  line-height: ${({ $isMobile }) => ($isMobile ? '36px' : '42px')};
`

const JobLoading = styled.div`
  margin: auto;
  padding-top: 8px;
`

const BoardContainer = styled.div`
  max-width: 1040px;
  width: 100%;
  margin: auto;

  display: grid;
  grid-template-rows: auto;
  gap: 8px;

  background: ${COLOR_GRAY};

  ${({ $isMobile }) => $isMobile
    ? css`
      padding: 16px;
      grid-template-columns: 1fr;
      grid-template-areas:
        "header"
        "jobsList";
    `
    : css`
      grid-template-columns: 400fr 600fr;
      grid-template-areas:
        "header   header"
        "jobsList jobDetail";
    `}
`

const BoardHeader = styled.p`
  grid-area: header;
  margin: 4px 0;

  color: ${ COLOR_PRIMARY };
  font-size: 18px;
  font-weight: 700;
`

const CityJobs = ({ romeLabel, codeRome }) => {
  const isMobile = isMobileView(useWindowSize())

  const { city } = useCities()
  const {
    professions: jobs,
    onSearch,
    isLoading
  } = useProfessions()

  const [displayedJobs, setDisplayedJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)

  const [ filters, setFilters ] = useState({
    distance: '',
    date: '',
    type: [],
    experience: [],
    duration: []
  })

  useEffect(() => {
    const isDateIncludedInFilter = (date, dateFilter) => {
      const currentMoment = moment()
      const creationMoment = moment(date)

      return (
        dateFilter === 'ONE_DAY' && !currentMoment.isAfter(creationMoment.add(1 + 1, 'days'))
        || dateFilter === 'THREE_DAY' && !currentMoment.isAfter(creationMoment.add(3 + 1, 'days'))
        || dateFilter === 'ONE_WEEK' && !currentMoment.isAfter(creationMoment.add(7 + 1, 'days'))
        || dateFilter === 'TWO_WEEKS' && !currentMoment.isAfter(creationMoment.add(14 + 1, 'days'))
        || dateFilter === 'ONE_MONTH' && !currentMoment.isAfter(creationMoment.add(1, 'month').add(1, 'days'))
      )
    }

    const filterDate = (job) => {
      if (!filters?.date || filters.date === '' || filters.date === 'ALL_TIME') return true
      return isDateIncludedInFilter(job?.dateCreation, filters.date)
    }

    const filterType = (job) => {
      if (!filters?.type || filters.type.length < 1) return true
      if (filters.type.includes(job.typeContrat)) return true
      if (filters.type.includes('OTHERS') && job.typeContrat !== 'CDI' && job.typeContrat !== 'CDD'  && job.typeContrat !== 'MIS') return true
      return false
    }

    const filterDuration = (job) => {
      if (!filters?.duration || filters.duration.length < 1) return true
      if (filters.duration.includes('FULL_TIME') && (job?.dureeTravailLibelleConverti === 'Temps plein')) return true
      if (filters.duration.includes('PART_TIME') && (job?.dureeTravailLibelleConverti === 'Temps partiel')) return true
      if (filters.duration.includes('N/A') && (!job?.dureeTravailLibelleConverti || job?.dureeTravailLibelleConverti !== 'Temps partiel' && job?.dureeTravailLibelleConverti !== 'Temps plein')) return true
      return false
    }

    const ONE_YEAR = moment.duration(1, 'years')
    const THREE_YEAR = moment.duration(3, 'years')
    const filterExperience = (job) => {
      const requiredExperience = (/\b((?:\d+\.)?\d+) *([a-zA-Z]+)/).exec(job.experienceLibelle)
      const durationNeeded = !!requiredExperience ? moment.duration(requiredExperience[1], requiredExperience[2].toLowerCase().includes('an') ? 'years' : 'months') : null  

      if (!filters?.experience || filters.experience.length < 1) return true
      if (filters.experience.includes('D')
          && (job.experienceExige === 'D' || (!!durationNeeded && durationNeeded < ONE_YEAR))) return true
      if (filters.experience.includes('1-3')
          && (!!durationNeeded && durationNeeded >= ONE_YEAR && durationNeeded < THREE_YEAR)) return true
      if (filters.experience.includes('3+')
          && (!!durationNeeded && durationNeeded >= THREE_YEAR)) return true
      if (filters.experience === 'N/A'
          && (!job.experienceExige || (job.experienceExige !== 'D' && !durationNeeded))) return true
      return false
    }

    const filteredJobs = jobs
      .filter(filterDate)
      .filter(filterType)
      .filter(filterDuration)
      .filter(filterExperience)

    setDisplayedJobs(filteredJobs)

    if (!!filteredJobs
      && ((!!selectedJob && !filteredJobs?.find(job => job.id === selectedJob.id))
        || !selectedJob)) {
      setSelectedJob(filteredJobs[0] ?? null)
    }
  }, [jobs, filters])

  useEffect(() => {
    if ((!filters?.distance || filters.distance === '')
        || !codeRome
        || !city?.insee_com) return

    onSearch({
      codeRome: [codeRome],
      insee: [city.insee_com],
      distance: filters?.distance ?? null
    })

  }, [filters?.distance, city?.insee_com, codeRome])

  const updateFilters = (updatedFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...updatedFilters
    }))
  }

  const resetFilters = () => {
    setFilters({
      distance: '',
      date: '',
      type: [],
      experience: [],
      duration: []
    })
  }

  return (
    <>
      <Helmet>
        <title>
          Emplois : {capitalize(city.nom_comm)} ({city.code_dept}) -{' '}
          {formatDate(new Date())} | Mobiville
        </title>
        <meta
          name="description"
          content={`Accédez à l’ensemble des offres d’emploi de ${capitalize(
            city.nom_comm
          )} (${city.code_dept}) pour le métier de ${romeLabel}`}
        />
      </Helmet>

      <Title $isMobile={isMobile}>
        {capitalize(city.nom_comm)}
        {isMobile ? <br /> : ' '}pour le métier {romeLabel}
      </Title>

      <JobsFilters
        filters={filters}
        onFiltersChange={(filters) => updateFilters(filters)}
        onReset={resetFilters}
      />

      {isLoading ? (
        <JobLoading>Chargement des offres...</JobLoading>
      ) : (
        <BoardContainer $isMobile={isMobile}>
          <BoardHeader>
            { displayedJobs.length < 150
              ? (<>
                  {displayedJobs.length} offre
                  {displayedJobs.length > 1 ? 's' : ''}
                  {` d'emploi dans un rayon de ${filters?.distance !== '' ? filters.distance : '30'} km de `}
                  {capitalize(city.nom_comm)}
                </>)
              : <>{`Les 150 offres les plus récentes pour le métier ${romeLabel}`}</>}
          </BoardHeader>

          <JobsList
            jobs={displayedJobs}
            selectedJob={selectedJob}
            onJobClick={(job) => setSelectedJob(job)} />

          {isMobile
            ? null
            : <JobDetail job={selectedJob} />}
        </BoardContainer>
      )}
    </>
  )
}

CityJobs.propTypes = {
  codeRome: PropTypes.string.isRequired,
  romeLabel: PropTypes.string.isRequired,
}

export default CityJobs
