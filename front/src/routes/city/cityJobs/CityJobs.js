import { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Helmet } from 'react-helmet-async'
import moment from 'moment'

import {
  COLOR_GRAY,
  COLOR_PRIMARY,
} from '../../../constants/colors'
import { capitalize, distance, formatDate } from '../../../utils/utils'
import { useWindowSize } from '../../../common/hooks/window-size'
import { isMobileView } from '../../../constants/mobile'
import { useCities } from '../../../common/contexts/citiesContext'
import { useProfessions } from '../../../common/contexts/professionsContext'

import JobDetail from './components/JobDetail'
import JobsList from './components/JobsList'
import JobsFilters from './components/JobsFilters'
import { useSearchParams } from 'react-router-dom'

const Title = styled.h1`
  width: ${({ $isMobile }) => ($isMobile ? 'auto' : '100%')};
  max-width: 1040px;
  margin: ${({ $isMobile }) => ($isMobile ? '22px 16px' : '22px auto')};

  color: ${COLOR_PRIMARY};
  font-weight: 900;
  font-size: ${({ $isMobile }) => ($isMobile ? '24px' : '36px')};
  line-height: ${({ $isMobile }) => ($isMobile ? '36px' : '42px')};
`

const JobLoading = styled.div`
  margin: auto;
  padding-top: 8px;

  grid-area: header;
`

const BoardContainer = styled.div`
  max-width: 1040px;
  width: 100%;
  min-height: 40vh;
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
  const windowSize = useWindowSize()
  const isMobile = isMobileView(windowSize)

  const [searchParams] = useSearchParams()
  const [isQueryParamsUsed,  setIsQueryParamsUsed] = useState(false)
  const [topJobsMissingsApplicants, setTopJobsMissingsApplicants] = useState([])

  const { city } = useCities()
  const {
    professions: jobs,
    onSearch,
    isLoading,
    isMissingApplicants,
    sortByDistanceFromCity
  } = useProfessions()

  const [displayedJobs, setDisplayedJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)

  const DEFAULT_FILTERS = {
    distance: '',
    date: '',
    type: [],
    experience: [],
    duration: [],
    opportunity: ''
  }
  const [ filters, setFilters ] = useState(DEFAULT_FILTERS)

  const distanceFromCity = useCallback((job) => distance(
    city.geo_point_2d_x,
    city.geo_point_2d_y,
    job.lieuTravail.latitude,
    job.lieuTravail.longitude
  ), [ city ])
  
  useEffect(() => {
    if (isQueryParamsUsed || !displayedJobs || displayedJobs.length < 1 || !searchParams?.get('jobSelected')) return

    const selectedJob = displayedJobs.find(job => job.id === searchParams.get('jobSelected'))
    setSelectedJob(selectedJob)
    setIsQueryParamsUsed(true)
    setFilters((prev) => ({
      ...prev,
      opportunity: 'OPPORTUNITIES'
    }))
  }, [ searchParams, displayedJobs ])

  useEffect(() => {
    const isDateIncludedInFilter = (date, dateFilter) => {
      const creationMoment = moment(date)

      const durations = {
        ONE_DAY: moment.duration(1, "days"),
        THREE_DAY: moment.duration(3, "days"),
        ONE_WEEK: moment.duration(1, "weeks"),
        TWO_WEEKS: moment.duration(2, "weeks"),
        ONE_MONTH: moment.duration(1, "months"),
      }

      return !moment().isAfter(creationMoment.add(durations[dateFilter]).add(1, 'days'))
    }

    const filterDate = (job) => {
      if (!filters?.date || filters.date === '' || filters.date === 'ALL_TIME') return true

      return isDateIncludedInFilter(job?.dateCreation, filters.date)
    }

    const filterType = (job) => {
      if (!filters?.type || filters.type.length < 1) return true

      const isFilteredAsOthers = filters.type.includes('OTHERS') && job.typeContrat !== 'CDI' && job.typeContrat !== 'CDD'  && job.typeContrat !== 'MIS'

      return filters.type.includes(job.typeContrat) || isFilteredAsOthers
    }

    const filterDuration = (job) => {
      if (!filters?.duration || filters.duration.length < 1) return true

      const isFilteredAsFullTime = filters.duration.includes('FULL_TIME') && (job?.dureeTravailLibelleConverti === 'Temps plein')
      const isFilteredAsPartTime = filters.duration.includes('PART_TIME') && (job?.dureeTravailLibelleConverti === 'Temps partiel')
      const isFilteredAsNA = filters.duration.includes('N/A') && (!job?.dureeTravailLibelleConverti || job?.dureeTravailLibelleConverti !== 'Temps partiel' && job?.dureeTravailLibelleConverti !== 'Temps plein')

      return isFilteredAsFullTime || isFilteredAsPartTime || isFilteredAsNA
    }

    const ONE_YEAR = moment.duration(1, 'years')
    const THREE_YEAR = moment.duration(3, 'years')
    const filterExperience = (job) => {
      if (!filters?.experience || filters.experience.length < 1) return true

      const requiredExperience = (/\b((?:\d+\.)?\d+) *([a-zA-Z]+)/).exec(job.experienceLibelle)
      const durationNeeded = !!requiredExperience ? moment.duration(requiredExperience[1], requiredExperience[2].toLowerCase().includes('an') ? 'years' : 'months') : null  

      const isFilteredAsDebutant = filters.experience.includes('D') && (job.experienceExige === 'D' || (!!durationNeeded && durationNeeded < ONE_YEAR))
      const isFilteredAsOneToThreeYears = filters.experience.includes('1-3') && (!!durationNeeded && durationNeeded >= ONE_YEAR && durationNeeded < THREE_YEAR)
      const isFilteredAsThreeYears = filters.experience.includes('3+') && (!!durationNeeded && durationNeeded >= THREE_YEAR)
      const isFilteredAsNA = filters.experience === 'N/A' && (!job.experienceExige || (job.experienceExige !== 'D' && !durationNeeded))

      return isFilteredAsDebutant || isFilteredAsOneToThreeYears || isFilteredAsThreeYears || isFilteredAsNA
    }

    const filterDistance = (job) => {      
      if (!filters?.distance || filters.distance === '' || filters.distance === '30') return true
      return (distanceFromCity(job) <= filters.distance)
    }

    const filteredJobs = [
      ...(topJobsMissingsApplicants
        .filter(_ => (filters?.opportunity === 'OPPORTUNITIES'))
        .filter(filterType)
        .filter(filterExperience)
        .filter(filterDate)
        .filter(filterDuration)
        .filter(filterDistance)),
      ...(jobs
        .filter(job => (filters?.opportunity === 'OPPORTUNITIES' && !!topJobsMissingsApplicants && topJobsMissingsApplicants.length > 0) ? (!topJobsMissingsApplicants.find(j => j.id === job.id)) : true)
        .filter(filterType)
        .filter(filterExperience)
        .filter(filterDate)
        .filter(filterDuration)
        .filter(filterDistance)
        .sort(sortByDistanceFromCity(city)))
    ]

    setDisplayedJobs(filteredJobs)

    if ((isMobile || !windowSize.width || !windowSize.height) && !selectedJob) {
      setSelectedJob(null)
    } else if (!!filteredJobs
      && ((!!selectedJob && !filteredJobs?.find(job => job.id === selectedJob.id))
        || !selectedJob)) {
      setSelectedJob(filteredJobs[0] ?? null)
    }
    
  }, [jobs, filters])

  useEffect(() => {
    setTopJobsMissingsApplicants(jobs
      .filter(job => isMissingApplicants(job))
      .sort(sortByDistanceFromCity(city))
      .slice(0, 3))
  }, [ jobs ])

  useEffect(() => {
    if (!codeRome|| !city?.insee_com) return

    onSearch({
      codeRome: [codeRome],
      insee: [city.insee_com]
    })

  }, [city?.insee_com, codeRome])

  const updateFilters = (updatedFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...updatedFilters
    }))
  }

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS)
  }

  const handleJobClick = (job) => {
    setSelectedJob(job)
    if (isMobile) {
      window.scroll({ top: 0 })
    }
  }

  const handleJobDetailClose = () => {
    setSelectedJob(null)
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
      
      {(!isMobile || !selectedJob)
        ? (<>
          <Title $isMobile={isMobile}>
            {capitalize(city.nom_comm)}
            {isMobile ? <br /> : ' '}pour le métier {romeLabel}
          </Title>

          <JobsFilters
            filters={filters}
            onFiltersChange={(filters) => updateFilters(filters)}
            onReset={resetFilters}
          />

          <BoardContainer $isMobile={isMobile}>
            {isLoading ? (
              <JobLoading>Chargement des offres...</JobLoading>
            ) : (
              <>
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
                  onJobClick={handleJobClick} />

                <JobDetail job={selectedJob} />
                </>
              )}
            </BoardContainer>
          </>)
        : <JobDetail job={selectedJob} onClose={handleJobDetailClose} /> }
    </>
  )
}

CityJobs.propTypes = {
  codeRome: PropTypes.string.isRequired,
  romeLabel: PropTypes.string.isRequired,
}

export default CityJobs
