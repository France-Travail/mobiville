import axios from 'axios'

export const searchProfessions = (body) =>
  axios
    .post('/api/professions/search', body)
    .then((response) => response.data || [])

export const searchInfosTravail = (body) =>
  axios
    .post('/api/professions/infos-travail', body)
    .then((response) => response.data || [])

export const searchProfessionsCountList = (body) =>
    axios
        .post('/api/professions/searchCountList', body)
        .then((response) => response.data || [])
