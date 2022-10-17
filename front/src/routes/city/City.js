import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import _ from 'lodash'
import queryString from 'query-string'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { CircularProgress } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DescriptionIcon from '@mui/icons-material/Description'

import { ActionButton, KeyFigures, MainLayout } from '../../components'
import CityHeader from './CityHeader'
import CityJobs from './CityJobs'
import CityHousing from './CityHousing'
import CityHousingSimulator from './CityHousingSimulator'
import CityServices from './cityServices/CityServices'

import { useCities } from '../../common/contexts/citiesContext'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import { useProfessions } from '../../common/contexts/professionsContext'
import {
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_TAG_GREEN,
  COLOR_TAG_RED,
  COLOR_TEXT_PRIMARY,
  COLOR_VERT_MOBIVILLE
} from '../../constants/colors'

import pastille from '../../assets/images/icons/pastille.svg'

import { ReactComponent as MaletteIcon } from '../../assets/images/icons/malette.svg'
import { ReactComponent as ProfilEntrepriseIcon } from '../../assets/images/icons/profil_entreprise.svg'
// import { ReactComponent as HandshakeIcon } from '../../assets/images/icons/handshake.svg'

import { formatCityTension, getXDaysAgo } from "../../utils/utils"

const ElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  max-width: 1040px;
  margin: ${({ isMobile }) => (isMobile ? '5px auto' : '60px auto')};
  align-items: center;
  font-size: 16px;
  line-height: 24px;
`

const BlockContainerOffers = styled.div`
  display: flex;
  flex-direction: column;
  ${({ isMobile }) => (isMobile ? '' : 'width: 100%;')}
  max-width: 1040px;
  margin: ${({ isMobile }) => (isMobile ? '0 21px' : '0 auto')};
  ${({ isMobile }) => (isMobile ? 'overflow-x: scroll' : '')};
`

const BlockContentOffers = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
`

const BlockCardOffer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #fff;
  border-radius: 8px;
  width: ${({ isMobile }) => (isMobile ? '279px' : '336px')};
  height: 170px;
  padding: 16px;
  margin-right: 16px;
`

const BlockContainerProximity = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  justify-content: ${({ isMobile }) => (isMobile ? 'space-around' : 'space-between')};;
  ${({ isMobile }) => (isMobile ? '' : 'width: 100%;')}
  max-width: 1040px;
  margin: ${({ isMobile }) => (isMobile ? '0 0 24px 0' : '0 auto')};
`

const BlockTitle = styled.div`
  margin: ${({ isMobile }) => (isMobile ? '24px auto 16px auto' : '48px auto 16px auto')};
  width: 100%;
  max-width: 1040px;
`

const BlockTitleText = styled.div`
  ${({ isMobile }) => (isMobile ? 'margin: 0 21px;' : '')}
`

const BlockTitleH2 = styled.h2`
  margin: 8px 0px;
  font-weight: 900;
  font-size: 24px;
  line-height: 28px;
  color: ${COLOR_PRIMARY};
`
const BlockTitleP = styled.p`
  margin: 8px 0px;
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
  padding: 16px;
  padding-bottom: 0;
  border-radius: 4px;
  font-size: 16px;
  line-height: 24px;
  
  div {
    margin:auto;
    min-width: 232px;
    ${({ isMobile }) => (isMobile ? 'max-width: 306px' : '')};
    height: 50px;
  }
`

const TitlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  padding: ${({ isMobile }) => (isMobile ? '0 14px' : '0')};
  width: ${({ isMobile }) => (isMobile ? '100%' : '1040px')};
  color: ${COLOR_TEXT_PRIMARY};
`

const CityName = styled.h1`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-size: 36px;
  line-height: 42px;
  margin-top: 8px;
  margin-bottom: 34px;
  color: ${COLOR_PRIMARY};
`

const RegionName = styled.div`
  margin: 0;
  padding: 0;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${COLOR_PRIMARY};

  img {
    margin: 2px 4px;
  }
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: auto;
  margin-top: 28px;
`

const Tag = styled.div`
  padding: 4px 6px;
  border-radius: 8px;

  font-size: 16px;
  font-weight: bold;
  color: ${COLOR_PRIMARY};
  background: white;
  background: ${({ $color }) => ($color ? $color : COLOR_GRAY)};
`

const JOB = 'job'
const LIFE = 'life'
const HOUSING = 'housing'

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
    closeCompanies
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
      onSearchProfessions({ codeRome: [codeRome], insee: [city.insee_com], offresManqueCandidats: true })
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
        sort: 'distance'
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

  if (section === HOUSING)
    return (
      <CityHousing
        nbSocialHousing={city.total_social_housing}
        city={city}
        backLink={childrenComponentsBacklink}
      />
    )

  if (section === LIFE)
    return (
      <CityServices
        city={city}
        backLink={childrenComponentsBacklink}
      />
    )

  const isMobile = isMobileView(size)

  const titlesNode = (
    <TitlesContainer isMobile={isMobile}>
      <RegionName isMobile={isMobile}>
        {_.capitalize(city.nom_region)} <img src={pastille} alt="" />{' '}
        {_.capitalize(city.nom_dept)}
      </RegionName>
      <CityName isMobile={isMobile}>
        {_.capitalize(city.nom_comm)}{isMobile ? <br /> : ' '}pour le métier {romeLabel}
      </CityName>
    </TitlesContainer>
  )

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
        titlesNode={titlesNode}
      />

      <TagsContainer>
        <Tag
            $color={
              bassinTensionIndT < 4
                  ? COLOR_TAG_GREEN
                  : COLOR_TAG_RED
            }
        >
          {formatCityTension(bassinTensionIndT)}
        </Tag>
      </TagsContainer>

      <KeyFigures figures={[
        { label: "Offres d'emploi", data: totalOffres, icon: <MaletteIcon /> },
        { label: "Entreprises", data: companiesCount, icon: <ProfilEntrepriseIcon /> },
        // { label: "Taux d'embauche", data: totalOffres, icon: <BlockJobInfosImg src={handshake} /> },
      ]} />


      <BlockTitle isMobile={isMobile}>
        <BlockTitleText isMobile={isMobile}>
          <BlockTitleH2>Les offres d'emploi avec plus d'opportunités</BlockTitleH2>
          <BlockTitleP>
            Offres de plus de 15 jours, comptant moins de 4 candidatures
          </BlockTitleP>
        </BlockTitleText>
      </BlockTitle>
      <BlockContainerOffers isMobile={isMobile}>
        <BlockContentOffers isMobile={isMobile}>
          {professionsCandidatsManquants?.slice(0,3).map((profession, index) => (
            <BlockCardOffer isMobile={isMobile} key={index}>
              <BlockOfferLabel>{profession.appellationlibelle}</BlockOfferLabel>
              <BlockOfferCompany>{profession.entreprise.nom}</BlockOfferCompany>
              <BlockOfferCity>{profession.lieuTravail.libelle}</BlockOfferCity>
              <BlockOfferContract><DescriptionIcon/>{profession.typeContrat} {profession.dureeTravailLibelleConverti ? ' \u2022 ' + profession.dureeTravailLibelleConverti : ''}
              </BlockOfferContract>
              <BlockOfferDate><AccessTimeIcon/>Publié il y a {getXDaysAgo(profession.dateActualisation)}</BlockOfferDate>
            </BlockCardOffer>
          ))}
        </BlockContentOffers>
      </BlockContainerOffers>
      <BlockLinkDiv>
        <ActionButton
            path={`/city/${insee}/job?codeRome=${codeRome}`}
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
          {closeCompanies?.slice(0,5).map((company, index) => (
              <a key={index} href={company.url} target="_blank">
                <BlockCompanyName>{_.startCase(_.toLower(company.name))}</BlockCompanyName>{' '}
                <BlockCompanyCity>{_.capitalize(company.city)}</BlockCompanyCity>
              </a>
          ))}
          <BlockCompanyDataFrom>(Données issues de <a target="_blank" href="https://labonneboite.pole-emploi.fr/">La Bonne Boite</a>)</BlockCompanyDataFrom>
        </BlockContentProximity>
      </BlockContainerProximity>

      <ElementContainer isMobile={isMobile}>
        <CityHousingSimulator city={city}>
          
        </CityHousingSimulator>
      </ElementContainer>

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
