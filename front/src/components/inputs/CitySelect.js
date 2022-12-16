import _ from 'lodash'
import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'

import { useLocation } from 'react-router-dom'
import { useCities } from '../../common/contexts/citiesContext'
import {
  ALL_REGIONS_LABEL,
  ALL_REGION_TYPE,
  CITY_TYPE,
  REGION_TYPE,
} from '../../constants/search'
import { alphabetOrder } from '../../utils/utils'
import TextSearchInput from './TextSearchInput'

const CitySelect = ({ value, codeRome, onSelect }) => {
  const MIN_REGIONS_SHOWED = 2
  const {
    criterions,
    autocompletedCities,
    onAutocomplete,
    // isLoadingAutocomplete
  } = useCities()

  const { search, pathname } = useLocation()
  const isCitiesPage = pathname === '/villes'

  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (!!criterions && !!search) {
      if (!!search.includes('codeRegion')) {
        const entries = new URLSearchParams(search).entries()
        for (let entry of entries) {
          const [key, value] = entry
          if (key === 'codeRegion') {
            const foundRegion = criterions.regions.find(
              (region) => region.id === value
            )
            if (!!foundRegion) {
              onSelect({ ...foundRegion, type: REGION_TYPE })
            } else {
              onSelect({
                label: ALL_REGIONS_LABEL,
                type: ALL_REGION_TYPE,
                style: 'primary',
              })
            }
          }
        }
      } else {
        onSelect({
          label: ALL_REGIONS_LABEL,
          type: ALL_REGION_TYPE,
          style: 'primary',
        })
      }
    }
  }, [search, criterions])

  const isRegionWithOpportunityRate = (rate) => {
    return (r) => r.romes?.[codeRome]?.opportunite >= rate
  }
  const regionWithPositiveOpportunityRate = (r) =>
    r.romes?.[codeRome]?.opportunite > 0

  const regionSortByOpportunity = (a, b) =>
    a.romes?.[codeRome]?.opportunite > b.romes?.[codeRome]?.opportunite ? -1 : 1

  useEffect(() => {
    const regionsProposee = [
      ...(!!criterions
        ? codeRome
          ? autocompleteRegionWithRome()
          : criterions.regions.filter(regionFilterByInput)
        : []),
    ]
    // format autocompleted cities list item
    setOptions(
      [{ label: ALL_REGIONS_LABEL, type: ALL_REGION_TYPE, style: 'primary' }]
        .concat(
          regionsProposee.map((region) => ({ ...region, type: REGION_TYPE }))
        )
        .concat(
          !!inputValue &&
            autocompletedCities.map((city) => ({
              id: city.insee_com,
              label: `${_.capitalize(city.nom_comm)} (${city.postal_code})`,
              cityName: city.nom_comm,
              type: CITY_TYPE,
            }))
        )
        .filter((el) => !!el)
    )
  }, [autocompletedCities, criterions, codeRome, inputValue, value])

  const autocompleteRegionWithRome = () => {
    const sortedRegions = criterions.regions
      .filter(regionFilterByRome)
      .filter(regionFilterByInput)
      .sort(regionSortByOpportunity)
    const bestRegion = sortedRegions.filter(isRegionWithOpportunityRate(0.15))
    const lesserRegions =
      bestRegion.length < MIN_REGIONS_SHOWED
        ? sortedRegions
            .filter((v) => !bestRegion.includes(v))
            .filter(regionWithPositiveOpportunityRate)
            .slice(0, MIN_REGIONS_SHOWED - bestRegion.length)
        : []

    // 2 régions minimum : toutes les regions avec > 40% de tension
    // complété avec les 2 régions avec le plus d'opportunités
    return [...bestRegion, ...lesserRegions].sort(alphabetOrder('label'))
  }

  const regionFilterByRome = (region) =>
    (!value || inputValue !== value?.label) && region?.romes?.[codeRome]

  const regionFilterByInput = (region) =>
    region.label.toLowerCase().match(
      inputValue
        .trim()
        .toLowerCase()
        .replace(/[^a-z_-]/g, '')
    )

  // trigger when text input has been updated
  const onInputChange = (_, inputValue) => {
    setInputValue(inputValue)
  }

  const debounceOnSearchCityLabels = useMemo(
    () => _.debounce((inputValue) => onAutocomplete(inputValue), 250),
    []
  )

  useEffect(() => {
    if (!!inputValue) {
      debounceOnSearchCityLabels(inputValue)
    }
  }, [inputValue])

  // trigger when an option is selected
  const onChange = (_, value) => {
    onSelect(value)
  }

  const onClickTag = () => {
    window.smartTag({
      name: 'modification_ville',
      type: 'action',
      chapters: ['cities', 'recherche'],
    })
  }

  return (
    <TextSearchInput
      label="L'endroit qui vous fait envie"
      placeholder="Choisissez une région ou indiquez une ville"
      value={value}
      options={options ?? []}
      required
      onClickTag={isCitiesPage ? onClickTag : undefined}
      // loading={isLoadingAutocomplete}
      onInputChange={onInputChange}
      onChange={onChange}
      showEndAdornment={false}
    ></TextSearchInput>
  )
}

CitySelect.propTypes = {
  value: PropTypes.any,
  codeRome: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  style: PropTypes.object,
}

export default CitySelect
