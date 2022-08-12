import PropTypes from 'prop-types'
import { Select } from '..'
import { AGE_SITUATIONS } from '../../constants/search'

const AgeSituationSelect = ({
  onChange,
  label = "Votre âge",
  placeholder = "Moins de 26 ans, plus de 26 ans",
  style = {}
}) => {

  const handleChange = (ageSituation) => {
    onChange(ageSituation)
  }

  return (
    <Select
      style={{ ...style }}
      label={label}
      placeholder={placeholder}
      options={AGE_SITUATIONS}
      onChange={handleChange}
    ></Select>
  )
}

AgeSituationSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.object,
}

export default AgeSituationSelect