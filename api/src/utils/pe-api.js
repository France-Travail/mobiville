import config from 'config'
import axios from 'axios'
import { stringify } from 'querystring'
import HttpsProxyAgent from 'https-proxy-agent';

export function getAccessToken() {
  return axios
    .post(
      `${config.ENTERPRISE_URL}/connexion/oauth2/access_token?realm=%2Fpartenaire`,
      stringify({
        grant_type: 'client_credentials',
        client_id: config.EMPLOI_STORE_ID,
        client_secret: config.EMPLOI_STORE_SECRET,
        scope: `api_infotravailv1 api_offresdemploiv2 api_romev1 nomenclatureRome application_${config.EMPLOI_STORE_ID} o2dsoffre api_explorateurmetiersv1 explojob`,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        // proxy PE + bug d'axios voir: https://github.com/axios/axios/issues/2072#issuecomment-609650888
        ...(config.PE_ENV && {proxy: false}),
        ...(config.PE_ENV && {httpsAgent: new HttpsProxyAgent('http://host.docker.internal:9000')} ),
      }
    )
    .then((result) => result.data)
    .then((data) => data.access_token || null)
}

export async function searchJob({ codeRome = [], insee = [], distance = 10 }) {
  const token = await getAccessToken()
  return axios
    .get(
      'https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres/search',
      {
        params: {
          codeROME: codeRome.join(','),
          commune: insee.join(','),
          distance,
        },
        headers: { Authorization: `Bearer ${token}` },
        ...(config.PE_ENV && {proxy: false}),
        ...(config.PE_ENV && {httpsAgent: new HttpsProxyAgent('http://host.docker.internal:9000')} ),
      }
    )
    .then((result) => result.data)
}

export async function infosTravail({ codeProfession, codeDept }) {
  const token = await getAccessToken()
  // CONVERTIR CODE ROME EN PCS_PROFESSION_CODE
  return axios
    .get(
      `https://api.emploi-store.fr/partenaire/infotravail/v1/datastore_search_sql?sql=SELECT * FROM "d9090eaf-65cd-41cb-816f-7249897a3e51" WHERE "AREA_CODE" = '${codeDept}' AND "AREA_TYPE_CODE" = 'D' AND "PCS_PROFESSION_CODE" = '${codeProfession}'`,
      {
        headers: { Authorization: `Bearer ${token}` },
        ...(config.PE_ENV && {proxy: false}),
        ...(config.PE_ENV && {httpsAgent: new HttpsProxyAgent('http://host.docker.internal:9000')} ),
      }
    )
    .then((result) => result.data)
}

export async function infosTensionTravail({ codeRome, codeDept, bassinId }) {
  const token = await getAccessToken()
  return Promise.all([
    axios.get(
      `https://api.emploi-store.fr/partenaire/infotravail/v1/datastore_search_sql?sql=SELECT * FROM "266f691f-bce8-4443-808e-8e5aa125cf17" WHERE "ROME_PROFESSION_CARD_CODE" LIKE '${codeRome}' AND "AREA_TYPE_CODE" = 'B' AND "AREA_CODE" = '${bassinId}'`,
      {
        headers: { Authorization: `Bearer ${token}` },
        ...(config.PE_ENV && {proxy: false}),
        ...(config.PE_ENV && {httpsAgent: new HttpsProxyAgent('http://host.docker.internal:9000')} ),
      }
    ),
    axios.get(
      `https://api.emploi-store.fr/partenaire/infotravail/v1/datastore_search_sql?sql=SELECT * FROM "266f691f-bce8-4443-808e-8e5aa125cf17" WHERE "ROME_PROFESSION_CARD_CODE" LIKE '${codeRome}' AND "AREA_TYPE_CODE" = 'D' AND "AREA_CODE" = '${codeDept}'`,
      {
        headers: { Authorization: `Bearer ${token}` },
        ...(config.PE_ENV && {proxy: false}),
        ...(config.PE_ENV && {httpsAgent: new HttpsProxyAgent('http://host.docker.internal:9000')} ),
      }
    ),
  ]).then(([bassinResult, deptResult]) => ({
    bassin: bassinResult.data,
    dept: deptResult.data,
  }))
}

export async function getOgrFromRome(codeRome) {
  const token = await getAccessToken()
  return axios
    .get(
      `https://api.emploi-store.fr/partenaire/rome/v1/metier/${codeRome}/appellation`,
      {
        headers: { Authorization: `Bearer ${token}` },
        ...(config.PE_ENV && {proxy: false}),
        ...(config.PE_ENV && {httpsAgent: new HttpsProxyAgent('http://host.docker.internal:9000')} ),
      }
    )
    .then((result) => result.data)
}

export async function getSkillFromLabel(label) {
  const token = await getAccessToken()
  return axios
    .get(
      `https://api.emploi-store.fr/partenaire/explorateurmetiers/v1/explorateurmetiers?libelle=${label}&nombre=20&type=metier`,
      {
        headers: { Authorization: `Bearer ${token}` },
        ...(config.PE_ENV && {proxy: false}),
        ...(config.PE_ENV && {httpsAgent: new HttpsProxyAgent('http://host.docker.internal:9000')} ),
      }
    )
    .then((result) => result.data)
}

export async function getSkillFromRome(codeRome) {
  const token = await getAccessToken()
  return axios
    .get(
      `https://api.emploi-store.fr/partenaire/rome/v1/metier/${codeRome}/competence`,
      {
        headers: { Authorization: `Bearer ${token}` },
        ...(config.PE_ENV && {proxy: false}),
        ...(config.PE_ENV && {httpsAgent: new HttpsProxyAgent('http://host.docker.internal:9000')} ),
      }
    )
    .then((result) => result.data)
}
