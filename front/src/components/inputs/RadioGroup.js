import RadioInput from './RadioInput'
import PropTypes from 'prop-types'

const RadioGroup = ({
  name,
  values,
  valuesTips,
  selectedButton,
  onChange = () => {},
  onClick = () => {},
}) => {
  return (
    <>
      {Object.entries(values).map(([key, value], i) => (
        <RadioInput
          key={key}
          name={name}
          value={value}
          valueTips={!!valuesTips ? valuesTips[i] : null}
          onChange={() => onChange(name, key)}
          onClick={() => onClick(name, key)}
          checked={selectedButton === key}
        />
      ))}
    </>
  )
}

RadioGroup.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  values: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  valuesTips: PropTypes.arrayOf(PropTypes.string),
  selectedButton: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  onChange: PropTypes.func,
}

export default RadioGroup
