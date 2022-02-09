export const CULTURE_CRITERION = [
  {
    label: 'Cinéma',
    code: 'F303',
    icon: 'cinema.svg',
  },
  {
    label: 'Théatres',
    code: 'F306',
    icon: 'theatre.svg',
  },
  {
    label: 'Musées',
    code: 'F304',
    icon: 'musee.svg',
  },
  {
    label: 'Restaurants',
    code: 'A504',
    icon: 'restaurant.svg',
  },
  {
    label: 'Gymnases',
    code: 'F121',
    icon: 'gymnase.svg',
  },
  {
    label: 'Terrains multisports',
    code: 'F113',
    icon: 'multisports.svg',
  },
  {
    label: 'Athlétisme',
    code: 'F107',
    icon: 'athletisme.svg',
  },
  {
    label: 'Piscines',
    code: 'F201',
    icon: 'piscine.svg',
  },
]

export const TRANSPORT_CRITERION = [
  {
    label: 'Aéroport',
    code: 'E102',
    icon: 'aeroport.svg',
  },
  {
    label: 'Gare',
    code: ['E107', 'E108', 'E109'],
    icon: 'gare.svg',
  },
]

export const HEALTH_CRITERION = [
  {
    label: 'Médecins',
    code: 'D201',
    icon: 'medecin.svg',
  },
  {
    label: 'Hopitaux',
    code: ['D101', 'D102', 'D103'],
    icon: 'hospital.svg',
  },
  {
    label: 'Pharmacies',
    code: 'D301',
    icon: 'pharmacie.svg',
  },
  {
    label: 'Centres de santé',
    code: 'D108',
    icon: 'centre-de-sante.svg',
  },
  {
    label: 'Urgences',
    code: 'D106',
    icon: 'urgences.svg',
  },
]

export const SERVICES_CRITERION = [
  {
    label: 'Poste',
    code: 'A206',
    icon: 'poste.svg',
  },
  {
    label: 'Commissariat',
    code: 'A101',
    icon: 'commissariat.svg',
  },
  {
    label: 'Pôle emploi',
    code: ['A122'],
    icon: 'pole-emploi.svg',
  },
  {
    label: 'Grandes surfaces',
    code: ['B101', 'B102'],
    icon: 'grandes-surfaces.svg',
  },
  {
    label: 'Epiceries',
    code: 'B202',
    icon: 'epiceries.svg',
  },
  {
    label: 'Boulangerie',
    code: 'B203',
    icon: 'boulangerie.svg',
  },
]

export const SERVICES_EDUCATION = [
  {
    label: 'Crèches',
    code: 'D502',
    icon: 'crayon.svg',
  },
  {
    label: 'Écoles maternelles',
    code: 'C101',
    icon: 'playground.svg',
  },
  {
    label: 'Écoles primaires',
    code: 'C104',
    icon: 'kindergarten.svg',
  },
  {
    label: 'Collèges',
    code: 'C201',
    icon: 'school.svg',
  },
  {
    label: 'Lycées gen & techno',
    code: 'C301',
    icon: 'science.svg',
  },
  {
    label: 'Lycées pro',
    code: 'C302',
    icon: 'manual.svg',
  },
  {
    label: 'Universités',
    code: 'C501',
    icon: 'education.svg',
  },
]

export const SERVICES_ENVIRONMENT = [
  {
    label: 'Jardins remarquables',
    code: 'F310',
    icon: 'jardins-remarquables.svg',
  },
]

export const ALL_LIFE_CRITERIONS_LIST = [
  { key: 'culture', tab: CULTURE_CRITERION },
  { key: 'transport', tab: TRANSPORT_CRITERION },
  { key: 'health', tab: HEALTH_CRITERION },
  { key: 'services', tab: SERVICES_CRITERION },
  { key: 'education', tab: SERVICES_EDUCATION },
  { key: 'environment', tab: SERVICES_ENVIRONMENT },
]
