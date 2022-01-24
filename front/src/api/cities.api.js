import axios from 'axios'

export const searchCities = (body) =>
  axios
    .post('/api/cities/search', body)
    .then((response) => response.data || null)

export const fetchAutocompleteCities = (body) =>
  axios
    .post('/api/cities/autocomplete', body)
    .then((response) => response.data || null)

export const getCriterions = () =>
  axios.get('/api/cities/criterions').then((response) => response.data || null)

export const loadCity = (insee) =>
  axios
    .get(`/api/cities/load/${insee}`)
    .then((response) => response.data || null)

export const searchCloseCities = (body) =>
  axios
    .post('/api/cities/search-close-cities', body)
    .then((response) => response.data || null)

export const searchSimilarCities = (body) =>
  axios
    .post('/api/cities/search-similar-cities', body)
    .then((response) => response.data || null)

export const searchCityByName = (body) =>
  axios
    .post('/api/cities/search-by-name', body)
    .then((response) => response.data || [])

export const getCityTenement = (insee) =>
  axios
    .get(`/api/cities/tenement/${insee}`)
    .then((response) => response.data || null)

export const getCityEquipments = (insee) =>
  axios
    .get(`/api/cities/equipments/${insee}`)
    .then((response) => response.data || null)

export const searchJobLabels = (body) =>
  axios
    .post('/api/cities/search-by-skill', body)
    .then((response) => response.data || [])
