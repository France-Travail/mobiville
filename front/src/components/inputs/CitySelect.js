import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import _ from "lodash"

import { useCities } from "../../common/contexts/citiesContext"
import { ALL_REGIONS_LABEL, ALL_REGION_TYPE, CITY_TYPE, REGION_TYPE } from "../../constants/search"
import TextSearchInput from "./TextSearchInput"
import { useLocation } from "react-router-dom"

const CitySelect = ({ codeRome, onSelect, defaultValue }) => {
  const {
    criterions,
    autocompletedCities,
    onAutocomplete,
    // isLoadingAutocomplete
  } = useCities()

  const { search } = useLocation()

  const [ options, setOptions ] = useState([])
  const [ inputValue, setInputValue ] = useState('')
  const [ value, setValue ] = useState(null)

  useEffect(() => {
    if (!!criterions && !!search) {
      if (!!search.includes('codeRegion')) {
        const entries = new URLSearchParams(search).entries()
        for (let entry of entries) {
            const [key, value] = entry
            if (key === 'codeRegion') {
                const foundRegion = criterions.regions.find(region => region.id === value)
                if (!!foundRegion) {
                  setValue(foundRegion)
                } else {
                  setValue({ label: ALL_REGIONS_LABEL, type: ALL_REGION_TYPE, style: 'primary' })
                }
            }
        }
      } else {
        setValue({ label: ALL_REGIONS_LABEL, type: ALL_REGION_TYPE, style: 'primary' })
      }
    }
  }, [search, criterions])

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
    setOptions([{ label: ALL_REGIONS_LABEL, type: ALL_REGION_TYPE, style: 'primary' }]
      .concat(regionsForRome.map((region) => ({ ...region, type: REGION_TYPE })))
      .concat(
        !!inputValue &&
          autocompletedCities.map((city) => ({
            id: city.insee_com,
            label: `${_.capitalize(city.nom_comm)} (${city.postal_code})`,
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

  useEffect(() => {
    onSelect(value)
  }, [ value ])

  // trigger when an option is selected
  const onChange = (_, value) => {
    setValue(value)
  }

  return (
    <TextSearchInput
      label="L'endroit qui vous fait envie"
      placeholder="Choisissez une région ou indiquez une ville"
      value={value}
      options={options ?? []}
      // loading={isLoadingAutocomplete}
      disabled={(!codeRome || codeRome === '')}
      onInputChange={onInputChange}
      onChange={onChange}
      defaultValue={defaultValue}
      showEndAdornment={false}
    ></TextSearchInput>
  )
}

CitySelect.propTypes = {
  codeRome: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  defaultValue: PropTypes.any,
  style: PropTypes.object
}

export default CitySelect