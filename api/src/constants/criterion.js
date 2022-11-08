export const CRIT_MOUNTAIN = 'mountain'
export const CRIT_SMALL_CITY = 'small-city'
export const CRIT_MEDIUM_CITY = 'medium-city'
export const CRIT_LARGE_CITY = 'big-city'
export const CRIT_EXTRA_LARGE_CITY = 'extra-big-city'
export const CRIT_SIDE_SEA = 'side-sea'
export const CRIT_SUN = 'need-sun'
export const CRIT_CAMPAGNE = 'campagne'
export const IS_SMALL_CITY = 20 // / 1000
export const IS_MEDIUM_CITY = 50 // / 1000
export const IS_LARGE_CITY = 200 // / 1000
export const ALT_IS_MOUNTAIN = 600
export const SIDE_SEA = 30 // in km
export const IS_SUNNY = 15 // in degres
export const CAREGIVER_ROME_CODE = 'J1501'
export const COMPUTER_MAINTENANCE_TECHNICIAN_ROME_CODE = 'I1401'
export const WEIGHT_REGION = 6
export const IndiceTension = { 
   HighOpportunity: 1, 
   LowOpportunity:  2 
  }
export const CRITERIONS = [
  {
    label: 'Mer',
    tag: 'environment',
    icon: 'waves',
    weight: 4,
    key: CRIT_SIDE_SEA,
  },
  {
    label: 'Montagne',
    tag: 'environment',
    icon: 'terrain',
    weight: 4,
    key: CRIT_MOUNTAIN,
  },
  {
    label: 'Campagne',
    tag: 'environment',
    icon: 'nature',
    weight: 4,
    key: CRIT_CAMPAGNE,
  },
  {
    label: 'Petite ville',
    tag: 'city',
    icon: 'person',
    weight: 5,
    subLabel: `moins de ${IS_SMALL_CITY} 000 habitants`,
    key: CRIT_SMALL_CITY,
  },
  {
    label: 'Ville moyenne',
    tag: 'city',
    icon: 'people_alt',
    weight: 5,
    subLabel: `entre ${IS_SMALL_CITY} 000 habitants et ${IS_MEDIUM_CITY} 000 habitants`,
    key: CRIT_MEDIUM_CITY,
  },
  {
    label: 'Grande ville',
    tag: 'city',
    icon: 'groups',
    weight: 5,
    subLabel: `entre ${IS_MEDIUM_CITY} 000 habitants et ${IS_LARGE_CITY} 000 habitants`,
    key: CRIT_LARGE_CITY,
  },
  {
    label: 'Métropole',
    tag: 'city',
    icon: 'apartment',
    weight: 5,
    subLabel: `plus de ${IS_LARGE_CITY} 000 habitants`,
    key: CRIT_EXTRA_LARGE_CITY,
  },
]
