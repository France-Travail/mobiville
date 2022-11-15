import styled from "styled-components"
import PropTypes from 'prop-types'

import JobCard from "./JobCard"

const JobsListContainer = styled.div`
  grid-area: jobsList;

  display: flex;
  flex-direction: column;
  gap: 8px;
`

const JobsList = ({ jobs, selectedJob, onJobClick }) => (
  <JobsListContainer>
    {jobs.map((job) => (
      <JobCard
        key={job.id}
        job={job}
        onClick={(job) => onJobClick(job)}
        isSelected={selectedJob?.id === job.id}
      />
    ))}
  </JobsListContainer>
)

JobsList.propTypes = {
  jobs: PropTypes.array.isRequired,
  selectedJob: PropTypes.object,
  onJobClick: PropTypes.func
}

export default JobsList