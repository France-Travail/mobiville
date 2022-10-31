import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import _ from 'lodash'
import queryString from 'query-string'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { CircularProgress } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DescriptionIcon from '@mui/icons-material/Description'

import { ActionButton, KeyFigures, MainLayout, Tag } from '../../components'
import CityHeader from './CityHeader'
import CityJobs from './CityJobs'
import CityHousingSimulator from './CityHousingSimulator'
import CityServices from './cityServices/CityServices'

import { useCities } from '../../common/contexts/citiesContext'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import { useProfessions } from '../../common/contexts/professionsContext'
import {
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
  COLOR_VERT_MOBIVILLE,
  COLOR_WHITE,
} from '../../constants/colors'

import { ReactComponent as MaletteIcon } from '../../assets/images/icons/malette.svg'
import { ReactComponent as ProfilEntrepriseIcon } from '../../assets/images/icons/profil_entreprise.svg'
// import { ReactComponent as HandshakeIcon } from '../../assets/images/icons/handshake.svg'
import cityServicesStandOut from '../../assets/images/cityServicesStandOut.png'

import { formatCityTension, getXDaysAgo } from '../../utils/utils'

const ElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  max-width: 1040px;
  margin: ${({ isMobile }) => (isMobile ? '5px auto' : '60px auto 20px auto')};
  align-items: center;
  font-size: 16px;
  line-height: 24px;
`

const BlockContainerOffers = styled.div`
  max-width: 1040px;
  margin: ${({ isMobile }) => (isMobile ? '16px 0' : '16px auto')};

  display: flex;
  flex-direction: column;

  ${({ isMobile }) => (isMobile ? 'overflow-x: scroll' : '')};
  
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`

const BlockContentOffers = styled.div`
  width: fit-content;
  ${({ isMobile }) => isMobile ? 'padding: 0 16px;' : ''}
  margin: auto;

  display: flex;
  flex-direction: row;
  gap: 16px;
`

const BlockCardOffer = styled.div`
  width: ${({ isMobile }) => (isMobile ? '279px' : '336px')};
  height: 170px;
  padding: 16px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  background-color: #fff;
`

const BlockContainerProximity = styled.div`
  max-width: 1040px;
  ${({ isMobile }) => (isMobile ? '' : 'width: 100%;')}
  margin: ${({ isMobile }) => (isMobile ? '0 0 24px 0' : '0 auto')};

  display: flex;
  flex-direction: row;
  justify-content: center;
`

const BlockTitle = styled.div`
  margin: ${({ isMobile }) => isMobile ? '20px auto 0 auto' : 'auto'};
  width: 100%;
  max-width: 1040px;
`

const BlockTitleText = styled.div`
  margin: ${({ isMobile }) => (isMobile ? '0 21px' : '48px 0 0 0')};
`

const BlockTitleH2 = styled.h2`
  margin: 8px 0px;
  font-weight: 900;
  font-size: 24px;
  line-height: 28px;
  color: ${COLOR_PRIMARY};
`
const BlockTitleP = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 24px;
  color: ${COLOR_PRIMARY};
`

const BlockOfferLabel = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: ${COLOR_PRIMARY};
`

const BlockOfferCompany = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: ${COLOR_PRIMARY};
`

const BlockOfferCity = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${COLOR_TEXT_PRIMARY};
`

const BlockOfferContract = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: ${COLOR_PRIMARY};
  display: flex;
  align-items: center;
`

const BlockOfferDate = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: ${COLOR_PRIMARY};
  display: flex;
  align-items: center;
`

const BlockContentProximity = styled.div`
  width: ${({ isMobile }) => (isMobile ? '342px' : '500px')};
  padding: 24px 16px;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;

  background-color: #fff;

  ${({ isMobile }) => (isMobile ? 'margin: 0 21px;' : '')};
`

const BlockCompanyName = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${COLOR_PRIMARY};
  
  &:hover {
    text-decoration-line: underline;
  }
`

const BlockCompanyCity = styled.span`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: ${COLOR_PRIMARY};
`

const BlockCompanyDataFrom = styled.span`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: ${COLOR_VERT_MOBIVILLE};

  > a {
    color: ${COLOR_VERT_MOBIVILLE};
    text-decoration: underline;
  }
`

const BlockLinkDiv = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  font-size: 16px;
  line-height: 24px;

  div {
    margin: auto;
    min-width: 232px;
    ${({ isMobile }) => (isMobile ? 'max-width: 306px' : '')};
    height: 50px;
  }
`

const TitlesContainer = styled.div`
  width: 100%;
  padding: ${({ isMobile }) => (isMobile ? '0 14px' : '0')};

  display: flex;
  flex-direction: column;
  text-align: start;

  color: ${COLOR_TEXT_PRIMARY};
`

const CityName = styled.h1`
  margin: 8px 0 22px 0;

  font-weight: 900;
  font-size: ${({ isMobile }) => isMobile ? '24px' : '36px'};
  line-height: ${({ isMobile }) => isMobile ? '36px' : '42px'};
  color: ${COLOR_PRIMARY};
`

const RegionName = styled.div`
  margin: 0;
  padding: 0;

  color: ${COLOR_PRIMARY};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`

const RoundSeparator = styled.span`
  font-size: 24px;
  vertical-align: bottom;
`

const TagsContainer = styled.div`
  margin: 28px auto 0 auto;

  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

const ServicesStandOut = styled.div`
  width: ${({ $isMobile }) => ($isMobile ? 'auto' : '100%')};
  max-width: 1040px;
  padding: 32px;
  margin: ${({ $isMobile }) => ($isMobile ? '21px' : '32px auto')};
  border-radius: 4px;

  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  justify-content: stretch;
  gap: ${({ $isMobile }) => ($isMobile ? '0' : '125px')};

  color: ${COLOR_PRIMARY};
  background: ${COLOR_WHITE};
`

const ServicesStandOutTitle = styled.p`
  margin: 0;
  font-size: 24px;
  font-weight: 900;
`

const ServicesStandOutDescription = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: 400;
`

const ServicesStandOutContent = styled.div`
  flex: 1;
`

const ServicesStandOutImageContainer = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;
`

const JOB = 'job'
const LIFE = 'life'

const CityPage = () => {
  const {
    onLoadCity,
    isLoadingCity,
    city,
    criterions,
    unloadCity,
    onSearchCloseCities,
    onSearchSimilarCities,
    onSearchCloseCompanies,
    companiesCount,
    closeCompanies,
  } = useCities()

  const {
    isLoading: isLoadingProfessions,
    onSearch: onSearchProfessions,
    onSearchInfosTravail,
    professions,
    professionsCandidatsManquants,
    totalOffres,
    bassinTensionIndT,
  } = useProfessions()

  const { insee, section } = useParams()
  const [inseeCode] = insee.split('-')
  const size = useWindowSize()
  const navigate = useNavigate()

  const location = useLocation()
  const params = queryString.parse(location.search)

  const [jobSearchValue, setJobSearchValue] = useState(
    decodeURIComponent(params.jobSearch || '')
  )
  const codeRome = params?.codeRome || ''

  useEffect(() => {
    onLoadCity(inseeCode)

    return () => {
      unloadCity()
    }
  }, [inseeCode])

  useEffect(() => {
    if (!jobSearchValue) return
    if (jobSearchValue === decodeURIComponent(params.jobSearch)) return

    navigate(
      {
        pathname: location.pathname,
        search: queryString.stringify({ ...params, jobSearch: jobSearchValue }),
      },
      { replace: true }
    )
  }, [navigate, jobSearchValue, params, location.pathname])

  useEffect(() => {
    if (city && codeRome) {
      onSearchProfessions({ codeRome: [codeRome], insee: [city.insee_com] })
      onSearchProfessions({
        codeRome: [codeRome],
        insee: [city.insee_com],
        offresManqueCandidats: true,
      })
      onSearchInfosTravail({ codeRome: codeRome, insee: city.insee_com })
      onSearchSimilarCities({
        codeRome,
        city,
      })
      onSearchCloseCities({
        latitude: city.geo_point_2d_x,
        longitude: city.geo_point_2d_y,
        codeRome,
        inseeCode: city.insee_com,
      })
      onSearchCloseCompanies({
        codeRome,
        insee: city.insee_com,
        sort: 'distance',
      })
    }
  }, [city, codeRome])

  let romeLabel = ''

  if (criterions?.codeRomes && codeRome) {
    const foundLabel =
      criterions.codeRomes.find((c) => c.key === codeRome)?.label || ''
    romeLabel = foundLabel.toLowerCase()
  }

  if (isLoadingCity) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  if (!city) return null

  const lastSearch = localStorage.getItem('lastSearch')

  const childrenComponentsBacklink = `/city/${insee}?codeRome=${codeRome}`
  const backLink = `/cities${lastSearch || `?codeRome=${codeRome}`}`

  if (section === JOB)
    return (
      <CityJobs
        jobs={professions}
        isLoading={isLoadingProfessions}
        romeLabel={romeLabel}
        city={city}
        searchValue={jobSearchValue}
        setSearchValue={setJobSearchValue}
        backLink={childrenComponentsBacklink}
      />
    )

  if (section === LIFE)
    return <CityServices city={city} backLink={backLink} />

  const isMobile = isMobileView(size)

  return (
    <MainLayout menu={{ visible: !isMobile }}>
      <Helmet>
        <title>
          {_.upperFirst(romeLabel)} à {_.capitalize(city.nom_comm)} | Mobiville
        </title>
        <meta
          name="description"
          content={`Explorez le marché de l'emploi de ${_.capitalize(
            city.nom_comm
          )} pour le métier de ${romeLabel} ainsi que les informations sur l’immobilier, les services et les équipements.`}
        />
      </Helmet>

      <CityHeader
        backLink={backLink}
        isMobile={isMobile}
      >
        <TitlesContainer isMobile={isMobile}>
          <RegionName isMobile={isMobile}>
            {_.capitalize(city.nom_region)}
            <RoundSeparator> • </RoundSeparator>
            {_.capitalize(city.nom_dept)}
          </RegionName>
          <CityName isMobile={isMobile}>
            {_.capitalize(city.nom_comm)}
            {isMobile ? <br /> : ' '}pour le métier {romeLabel}
          </CityName>
        </TitlesContainer>
      </CityHeader>

      <TagsContainer>
        <Tag green={bassinTensionIndT < 4} tall>
          {formatCityTension(bassinTensionIndT)}
        </Tag>
      </TagsContainer>

      <KeyFigures
        figures={[
          {
            label: "Offres d'emploi",
            data: totalOffres,
            icon: <MaletteIcon />,
          },
          {
            label: 'Entreprises',
            data: companiesCount,
            icon: <ProfilEntrepriseIcon />,
          },
          // { label: "Taux d'embauche", data: totalOffres, icon: <BlockJobInfosImg src={handshake} /> },
        ]}
      />

      <BlockTitle isMobile={isMobile}>
        <BlockTitleText isMobile={isMobile}>
          <BlockTitleH2>
            Les offres d'emploi avec plus d'opportunités
          </BlockTitleH2>
          <BlockTitleP>
            Offres de plus de 15 jours, comptant moins de 4 candidatures
          </BlockTitleP>
        </BlockTitleText>
      </BlockTitle>

      <BlockContainerOffers isMobile={isMobile}>
        <BlockContentOffers isMobile={isMobile}>
          {professionsCandidatsManquants
            ?.slice(0, 3)
            .map((profession, index) => (
              <BlockCardOffer isMobile={isMobile} key={index}>
                <BlockOfferLabel>
                  {profession.appellationlibelle}
                </BlockOfferLabel>
                <BlockOfferCompany>
                  {profession.entreprise.nom}
                </BlockOfferCompany>
                <BlockOfferCity>
                  {profession.lieuTravail.libelle}
                </BlockOfferCity>
                <BlockOfferContract>
                  <DescriptionIcon />
                  {profession.typeContrat}{' '}
                  {profession.dureeTravailLibelleConverti
                    ? ' \u2022 ' + profession.dureeTravailLibelleConverti
                    : ''}
                </BlockOfferContract>
                <BlockOfferDate>
                  <AccessTimeIcon />
                  Publié il y a {getXDaysAgo(profession.dateActualisation)}
                </BlockOfferDate>
              </BlockCardOffer>
            ))}
        </BlockContentOffers>
      </BlockContainerOffers>
      <BlockLinkDiv>
        <ActionButton 
          path={`/city/${insee}/${JOB}?codeRome=${codeRome}`}
          libelle={`Voir toutes les offres d’emploi`}
          isMobile={isMobile}
          isBlue={true}
        />
      </BlockLinkDiv>

      <BlockTitle isMobile={isMobile}>
        <BlockTitleText isMobile={isMobile}>
          <BlockTitleH2>Les entreprises qui recrutent à proximité</BlockTitleH2>
        </BlockTitleText>
      </BlockTitle>
      <BlockContainerProximity isMobile={isMobile}>
        <BlockContentProximity isMobile={isMobile}>
          {closeCompanies?.slice(0, 5).map((company, index) => (
            <a key={index} href={company.url} target="_blank">
              <BlockCompanyName>
                {_.startCase(_.toLower(company.name))}
              </BlockCompanyName>{' '}
              <BlockCompanyCity>{_.capitalize(company.city)}</BlockCompanyCity>
            </a>
          ))}
          <BlockCompanyDataFrom>
            (Données issues de{' '}
            <a target="_blank" href="https://labonneboite.pole-emploi.fr/">
              La Bonne Boite
            </a>
            )
          </BlockCompanyDataFrom>
        </BlockContentProximity>
      </BlockContainerProximity>

      <ElementContainer isMobile={isMobile}>
        <CityHousingSimulator city={city}></CityHousingSimulator>
      </ElementContainer>

      <ServicesStandOut $isMobile={isMobile}>
        <ServicesStandOutContent>
          <ServicesStandOutTitle>
            Découvrez les services de la ville
          </ServicesStandOutTitle>
          <ServicesStandOutDescription>
            Tout savoir sur les transports, la santé, l’éducation, la culture et
            les loisirs
          </ServicesStandOutDescription>
          <ActionButton
            style={{ marginTop: 16, width: 'fit-content' }}
            path={`/city/${insee}/${LIFE}?codeRome=${codeRome}`}
            libelle={`Voir tous les services`}
            isMobile={isMobile}
            isBlue={false}
            isWhite={true}
          />
        </ServicesStandOutContent>
        <ServicesStandOutImageContainer>
          <img src={cityServicesStandOut} alt="" />
        </ServicesStandOutImageContainer>
      </ServicesStandOut>

      <BlockLinkDiv isMobile={isMobile}>
        <ActionButton
          path={'/mobility-guide'}
          libelle={`Consultez nos conseils pour votre projet`}
          isMobile={isMobile}
          isBlue={false}
          isWhite={true}
        />
      </BlockLinkDiv>
    </MainLayout>
  )
}

CityPage.propTypes = {}

export default CityPage
