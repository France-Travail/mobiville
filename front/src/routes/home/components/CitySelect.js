import { useEffect, useState } from "react"
import PropTypes from 'prop-types'

import { useCities } from "../../../common/contexts/citiesContext"
import { TextSearchInput } from "../../../components"
import { ucFirstOnly } from "../../../utils/utils"

const CitySelect = ({ codeRome, onSelect, defaultValue }) => {
  const ALL_REGIONS_LABEL = 'Toutes les régions'
  const REGION_TYPE = 'Régions'
  const CITY_TYPE = 'Villes'

  const {
    criterions,
    autocompletedCities,
    onAutocomplete,
    isLoadingAutocomplete
  } = useCities()

  const [ options, setOptions ] = useState([])
  const [ inputValue, setInputValue ] = useState('')

  useEffect(() => {
    // find best regions based on rome selected
    let regionsForRome = []
    if (!!criterions) {
      regionsForRome = criterions.regions.filter(
        (region) =>
          region?.criterions?.[codeRome] &&
          region.label.toLowerCase().match(
            inputValue
              .trim()
              .toLowerCase()
              .replace(/[^a-z_-]/g, '')
          )
      )
    }

    // format autocompleted cities list item
    setOptions([{ label: ALL_REGIONS_LABEL, type: REGION_TYPE }]
      .concat(regionsForRome.map((region) => ({ ...region, type: REGION_TYPE })))
      .concat(
        !!inputValue &&
          autocompletedCities.map((city) => ({
            id: city.insee_com,
            label: `${ucFirstOnly(city.nom_comm)} (${city.postal_code})`,
            cityName: city.nom_comm,
            type: CITY_TYPE,
          }))
      )
      .filter(el => !!el))
  }, [autocompletedCities, criterions, codeRome])

  // trigger when text input has been updated
  const onInputChange = (_, value) => {
    setInputValue(value)
  }

  useEffect(() => {
    if (!!inputValue) {
      onAutocomplete(inputValue.trim())
    }
  }, [inputValue])

  // trigger when an option is selected
  const onChange = (_, value) => {
    onSelect(value)
  }

  return (
    <TextSearchInput
      label="L'endroit qui vous fait envie"
      placeholder="Choisissez une région ou indiquez une ville"
      options={options ?? []}
      loading={isLoadingAutocomplete}
      disabled={(!codeRome || codeRome === '')}
      onInputChange={onInputChange}
      onChange={onChange}
      defaultValue={defaultValue}
    ></TextSearchInput>
  )
}

CitySelect.propTypes = {
  codeRome: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  style: PropTypes.object,
}

export default CitySelect