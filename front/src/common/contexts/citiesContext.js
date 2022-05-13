import React, { useState, useCallback, useEffect } from 'react'
import { isEqual } from 'lodash'
import {
  getCriterions,
  loadCity,
  searchCities as apiSearchCities,
  searchCloseCities,
  searchSimilarCities,
  searchJobLabels,
  fetchAutocompleteCities,
} from '../../api/cities.api'

const CitiesContext = React.createContext()

let lastSearchParams = {}

export function CitiesProvider(props) {
  const [cities, _setCities] = useState([])
  const [totalCities, _setTotalCities] = useState(0)
  const [jobsMatchingCriterions, setJobsMatchingCriterions] = useState([])
  const [city, setCity] = useState(null)
  const [closeCities, _setCloseCities] = useState([])
  const [similarCities, _setSimilarCities] = useState([])
  const [
    similarCitiesCriterionsQueryString,
    _setSimilarCitiesCriterionsQueryString,
  ] = useState(null)
  const [criterions, _setCriterions] = useState(null)
  const [criterionsError, setCriterionError] = useState(null)
  const [isLoading, _setIsLoading] = useState(true)
  const [isLoadingCity, _setIsLoadingCity] = useState(false)
  const [isLoadingCloseCities, _setIsLoadingLocation] = useState(false)
  const [isLoadingSimilarCities, _setIsLoadingSimilarCities] = useState(false)
  const [isLoadingJobsMatchingCriterion, setIsLoadingJobsMatchingCriterion] =
    useState(false)
  const [sortCriterions, setSortCriterions] = useState('')
  const [environmentCriterions, _setEnvironmentCriterions] = useState([])
  const [cityCriterions, _setCityCriterions] = useState([])
  const [regionCriterions, _setRegionCriterions] = useState([])
  const [autocompletedCities, setAutocompletedCities] = useState([])
  const [isLoadingAutocomplete, setIsLoadingAutocomplete] = useState(false)

  const onSearch = (params, index = 0, oldCities = [], concateResults = true) => {
    if (isLoading && isEqual(lastSearchParams, params)) return

    _setIsLoading(true)
    lastSearchParams = { ...params }

    if (
      index === 0 ||
      lastSearchParams.onlySearchInTension !== params.onlySearchInTension
    ) {
      _setCities([])
    }

    apiSearchCities({ ...params, index })
      .then((c) => {
        if (!isEqual(params, lastSearchParams)) return

        if (index === 0 || !concateResults) {
          _setCities(c.list)
        } else {
          _setCities(oldCities.concat(c.list))
        }
          _setCities(c.list)
        _setTotalCities(c.total)
      })
      .then(() => {
        _setIsLoading(false)
      })
      .catch(() => {
        _setIsLoading(false)
      })
  }

  const onLoadCity = useCallback((id) => {
    _setIsLoadingCity(true)
    loadCity(id)
      .then(setCity)
      .then(() => _setIsLoadingCity(false))
  })

  const unloadCity = () => {
    setCity(null)
    _setSimilarCities([])
    _setCloseCities([])
  }

  const onSearchCloseCities = (params) => {
    _setIsLoadingLocation(true)
    searchCloseCities(params)
      .then(_setCloseCities)
      .then(() => _setIsLoadingLocation(false))
  }

  const onSearchSimilarCities = (params) => {
    _setIsLoadingSimilarCities(true)
    searchSimilarCities(params)
      .then((data) => {
        _setSimilarCities(data.result)

        const criterionsQueryString = data.criterions
          .map((criterion) => {
            if (criterion.includes('city'))
              return { key: 'codeCity', value: criterion }
            return { key: 'codeEnvironment', value: criterion }
          })
          .reduce((prev, curr) => prev.concat(`${curr.key}=${curr.value}&`), '')
        _setSimilarCitiesCriterionsQueryString(criterionsQueryString)
      })
      .then(() => _setIsLoadingSimilarCities(false))
  }

  const onSearchJobLabels = useCallback(
    (label) => {
      if (!label.trim()) {
        setJobsMatchingCriterions(criterions.codeRomes)
        return
      }

      setIsLoadingJobsMatchingCriterion(true)

      searchJobLabels({ label }).then((results) => {
        // augment rome labels with job title matches
        setJobsMatchingCriterions(
          results.reduce((prev, result) => {
            const { key: romeKey, label: romeLabel } =
              criterions.codeRomes.find(({ key }) => result.codeRome === key)

            return prev.concat({
              key: romeKey,
              label: romeLabel.concat(` (${result.label}, …)`),
            })
          }, [])
        )
        setIsLoadingJobsMatchingCriterion(false)
      })
    },
    [criterions]
  )

  const initializeJobsAutocomplete = () => setAutocompletedCities([])

  const onAutocomplete = useCallback((query) => {
    setIsLoadingAutocomplete(true)
    return fetchAutocompleteCities({ query })
      .then((result) => {
        setAutocompletedCities(result)
        setIsLoadingAutocomplete(false)
      })
      .catch((err) => setIsLoadingAutocomplete(false))
  })

  useEffect(() => {
    getCriterions()
      .then((results) => {
        _setCriterions(results)
        setJobsMatchingCriterions(results.codeRomes)

        _setEnvironmentCriterions(
          results.criterions
            .filter((c) => c.tag === 'environment')
            .map(({ key, label, icon }) => ({ key, label, icon }))
        )

        _setCityCriterions(
          results.criterions
            .filter((c) => c.tag === 'city')
            .map(({ key, label, subLabel, icon }) => ({
              key,
              label,
              subLabel,
              icon,
            }))
        )

        _setRegionCriterions(
          results.regions.map(({ id, label }) => ({ key: id, label }))
        )
      })
      .catch((err) => setCriterionError(err))
  }, [])

  return (
    <CitiesContext.Provider
      {...props}
      value={{
        cities,
        city,
        criterions,
        criterionsError,
        isLoading,
        isLoadingCity,
        isLoadingCloseCities,
        isLoadingJobsMatchingCriterion,
        isLoadingSimilarCities,
        sortCriterions,
        totalCities,
        closeCities,
        similarCities,
        similarCitiesCriterionsQueryString,
        jobsMatchingCriterions,
        environmentCriterions,
        cityCriterions,
        regionCriterions,
        autocompletedCities,
        isLoadingAutocomplete,
        // function
        setCity,
        onSearch,
        onLoadCity,
        unloadCity,
        onSearchCloseCities,
        onSearchSimilarCities,
        setSortCriterions,
        onSearchJobLabels,
        onAutocomplete,
        initializeJobsAutocomplete,
      }}
    />
  )
}

export const useCities = () => {
  const context = React.useContext(CitiesContext)
  if (!context) throw new Error('useCities must be used in CitiesProvider')

  return context
}
