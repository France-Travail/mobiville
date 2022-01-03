import axios from 'axios'

export const apiLoadHelpPreviews = () =>
  axios.get('/api/helps/get-previews').then((response) => response.data || [])

export const apiLoadHelpPreview = (slug) =>
  axios
    .get(`/api/helps/get-previews/${slug}`)
    .then((response) => response.data || null)
