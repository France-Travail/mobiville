import PropTypes from 'prop-types'
import { Select } from '..'
import { JOB_SITUATIONS } from '../../constants/search'

const JobSituationSelect = ({
  onChange,
  label = "Votre situation",
  placeholder = "Demandeur d'emploi, salarié",
  style = {}
}) => {

  const handleChange = (jobSituation) => {
    onChange(jobSituation)
  }

  return (
    <Select
      style={{ ...style }}
      label={label}
      placeholder={placeholder}
      options={JOB_SITUATIONS}
      onChange={handleChange}
    ></Select>
  )
}

JobSituationSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.object,
}

export default JobSituationSelect