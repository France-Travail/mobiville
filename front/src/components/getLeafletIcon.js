import L from 'leaflet'

const getLeafletIcon = (requiredFile) =>
  new L.Icon({
    iconUrl: requiredFile,
    iconRetinaUrl: requiredFile,
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    className: 'leaflet-marker-icon',
  })

export default getLeafletIcon
