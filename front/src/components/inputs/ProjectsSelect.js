import PropTypes from 'prop-types'
import { Select } from '..'
import { PROJECTS } from '../../constants/search'

const ProjectsSelect = ({
  onChange,
  value,
  label = "Quel est votre projet ?",
  placeholder = "Recherche d'emploi, logement, déménagement",
  style = {}
}) => {

  const renderValues = (projects) => {
    const LOOKING_FOR_TERM = "je recherche"

    // placeholder
    if (projects.length === 0) {
      return placeholder
    }

    const filteredByTerm = (term) => projects.filter(project => project.includes(term))

    const lookingForProjects = filteredByTerm(LOOKING_FOR_TERM)
    const otherProjects = projects.filter(project => !lookingForProjects.includes(project))

    const lookingForProjectsText = [
      LOOKING_FOR_TERM,
      lookingForProjects.map(project => project.replace(`${LOOKING_FOR_TERM} `, "")).join(", ")
    ].join(" ")
    
    const renderedText = [
      ...otherProjects,
      (lookingForProjects.length > 0) ? lookingForProjectsText : null
    ]
      .filter(item => item != null)
      .join(", ")

    return _.capitalize(renderedText)
  }

  const handleChange = (projects) => {
    onChange(projects)
  }

  return (
    <Select
      multiple
      value={value}
      style={{ ...style }}
      label={label}
      placeholder={placeholder}
      options={PROJECTS}
      renderValue={renderValues}
      onChange={handleChange}
    ></Select>
  )
}

ProjectsSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.object,
}

export default ProjectsSelect