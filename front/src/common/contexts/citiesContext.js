import React, { useState, useCallback, useEffect } from 'react'
import { isEqual } from 'lodash'
import {
  getCriterions,
  loadCity,
  searchCities as apiSearchCities,
  searchCloseCities,
  searchSimilarCities,
  searchCityByName,
  getCityTenement,
  getCityEquipments,
  searchJobLabels,
  fetchAutocompleteCities,
} from '../../api/cities.api'

const EMPTY_CITY = { id: null, nom_comm: 'Non trouvée', description: '' }

const CitiesContext = React.createContext()

let lastSearchParams = {}

export function CitiesProvider(props) {
  const [cities, _setCities] = useState([])
  const [totalCities, _setTotalCities] = useState(0)
  const [searchCities, _setSearchCities] = useState([])
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
  const [isLoadingTenement, _setIsLoadingTenement] = useState(false)
  const [isLoadingEquipments, _setIsLoadingEquipments] = useState(false)
  const [isLoadingSimilarCities, _setIsLoadingSimilarCities] = useState(false)
  const [isLoadingJobsMatchingCriterion, setIsLoadingJobsMatchingCriterion] =
    useState(false)
  const [sortCriterions, setSortCriterions] = useState('')
  const [cityTenement, _setCityTenement] = useState(null)
  const [cityEquipments, _setCityEquipments] = useState(null)
  const [environmentCriterions, _setEnvironmentCriterions] = useState([])
  const [cityCriterions, _setCityCriterions] = useState([])
  const [regionCriterions, _setRegionCriterions] = useState([])
  const [autocompletedCities, setAutocompletedCities] = useState([])
  const [isLoadingAutocomplete, setIsLoadingAutocomplete] = useState(false)

  const onSearch = (params, index = 0, oldCities = []) => {
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

        if (index === 0) {
          _setCities(c.list)
        } else {
          _setCities(oldCities.concat(c.list))
        }
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

  const onSearchByName = useCallback(({ id, name }) => {
    _setIsLoadingLocation(true)
    searchCityByName({ id, name })
      .then((c) => {
        if (c.length === 0) {
          _setSearchCities([EMPTY_CITY])
        } else {
          _setSearchCities(c)
        }

        return c
      })
      .then(() => _setIsLoadingLocation(false))
      .catch(() => {
        _setSearchCities([EMPTY_CITY])
        _setIsLoadingLocation(false)
      })
  })

  const onSearchById = useCallback((id) =>
    searchCityByName({ id }).then((c) => {
      if (c.length === 0) {
        return EMPTY_CITY
      }
      return c[0]
    })
  )

  const onGetCityTenement = useCallback((id) => {
    _setIsLoadingTenement(true)
    getCityTenement(id)
      .then(_setCityTenement)
      .then(() => _setIsLoadingTenement(false))
  })

  const onGetCityEquipments = useCallback((id) => {
    _setIsLoadingEquipments(true)
    getCityEquipments(id)
      .then(_setCityEquipments)
      .then(() => _setIsLoadingEquipments(false))
  })

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
        searchCities,
        city,
        criterions,
        criterionsError,
        isLoading,
        isLoadingCity,
        isLoadingCloseCities,
        isLoadingJobsMatchingCriterion,
        isLoadingSimilarCities,
        sortCriterions,
        isLoadingTenement,
        cityTenement,
        isLoadingEquipments,
        cityEquipments,
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
        onSearchByName,
        onSearchById,
        setSortCriterions,
        onGetCityTenement,
        onGetCityEquipments,
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
