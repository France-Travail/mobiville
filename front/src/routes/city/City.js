import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import queryString from 'query-string'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { CircularProgress } from '@mui/material'

import { useCities } from '../../common/contexts/citiesContext'
import MainLayout from '../../components/MainLayout'
import CityHeader from './CityHeader'
import CityJobs from './CityJobs'
import CityLife from './CityLife'
import CityHousing from './CityHousing'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import { ucFirstOnly } from '../../utils/utils'
import { useProfessions } from '../../common/contexts/professionsContext'
import {
  COLOR_BACKGROUND,
  COLOR_GRAY,
  COLOR_TEXT_SECONDARY,
} from '../../constants/colors'

import balance from '../../assets/images/icons/balance.svg'
import bread from '../../assets/images/icons/bread.svg'
import briefcase from '../../assets/images/icons/briefcase.svg'
import building from '../../assets/images/icons/building.svg'
import doctors from '../../assets/images/icons/doctors.svg'
import euro from '../../assets/images/icons/euro.svg'
import house from '../../assets/images/icons/house.svg'
import medalBronze from '../../assets/images/icons/medal_bronze.svg'
import medalGold from '../../assets/images/icons/medal_gold.svg'
import medalSilver from '../../assets/images/icons/medal_silver.svg'
import redEllipse from '../../assets/images/icons/red_ellipse.svg'
import greenEllipse from '../../assets/images/icons/green_ellipse.svg'
import restaurantsIcon from '../../assets/images/icons/restaurants.svg'
import CitySubHeader from './CitySubHeader'

const BlockContainer = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  justify-content: space-around;
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
`
const Block = styled.div`
  width: 100%;
  padding: 16px;
  background-color: #fff;
  border: 1px ${COLOR_GRAY} solid;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: ${({ isMobile }) => (isMobile ? 0 : '32px')};

  &:not(:first-of-type) {
    margin-left: ${({ isMobile }) => (isMobile ? 0 : '16px')};
  }
`

const BlockHeader = styled.div``
const BlockHeaderText = styled.div``
const BlockHeaderRating = styled.div``
const BlockHeaderH2 = styled.h2`
  margin: 0;
  font-size: 18px;
  line-height: 18px;
`
const BlockContent = styled.div``
const BlockContentUl = styled.ul`
  list-style: none;
  list-style-type: none;
  padding-left: 0;
`
const BlockLink = styled(Link)`
  display: block;
  text-align: end;
  font-weight: 500;
`
const BlockContentLi = styled.li`
  display: flex;
  align-items: center;
  background-color: ${COLOR_BACKGROUND};
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
`
const BlockContentLiImg = styled.img.attrs({ alt: '' })``
const BlockContentLiDesc = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  flex: 1;
`
const BlockContentLiValue = styled.div`
  font-weight: 500;
  justify-self: flex-end;
`

const TitlesContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  text-align: ${({ isMobile }) => (isMobile ? 'center' : 'start')};
  padding: ${({ isMobile }) => (isMobile ? '8px 0' : '0')};
`

const CityName = styled.h1`
  font-weight: 500;
  font-size: ${({ isMobile }) => (isMobile ? '18px' : '24px')};
  margin-top: 0;
  margin-bottom: 0;
`

const RegionName = styled.h2`
  font-size: ${({ isMobile }) => (isMobile ? '14px' : '12px')};
  font-weight: normal;
  margin: 0;
  padding: 0;
`

const BAKERY_CODE = 'B203'
const DOCTORS_CODE = 'A504'
const RESTAURANTS_CODE = 'D201'

const JOB = 'job'
const LIFE = 'life'
const HOUSING = 'housing'

const CityPage = ({ location: { pathname, search } }) => {
  const {
    onLoadCity,
    isLoadingCity,
    city,
    criterions,
    unloadCity,
    closeCities,
    similarCities,
    similarCitiesCriterionsQueryString,
    onSearchCloseCities,
    onSearchSimilarCities,
  } = useCities()

  const {
    isLoading: isLoadingProfessions,
    onSearch: onSearchProfessions,
    onSearchInfosTravail,
    professions,
  } = useProfessions()

  const { insee, section } = useParams()
  const [inseeCode] = insee.split('-')
  const params = queryString.parse(search)
  const size = useWindowSize()
  const history = useHistory()
  const [infosTravail, setInfosTravail] = useState(null)

  const [jobSearchValue, setJobSearchValue] = useState(
    decodeURIComponent(params.jobSearch || '')
  )
  const codeRome = params?.codeRome || ''
  const bassinTension = infosTravail?.bassinTension
  const deptTension = infosTravail?.deptTension

  useEffect(() => {
    onLoadCity(inseeCode)

    return () => {
      unloadCity()
    }
  }, [inseeCode])

  useEffect(() => {
    if (!jobSearchValue) return
    if (jobSearchValue === decodeURIComponent(params.jobSearch)) return

    history.replace({
      pathname,
      search: queryString.stringify({ ...params, jobSearch: jobSearchValue }),
    })
  }, [history, jobSearchValue, params, pathname])

  useEffect(() => {
    if (city && codeRome) {
      onSearchProfessions({ codeRome: [codeRome], insee: [city.insee_com] })
      onSearchInfosTravail({ codeRome: codeRome, insee: city.insee_com }).then(
        setInfosTravail
      )
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
    }
  }, [city, codeRome])

  let bakeriesNumber
  let doctorsNumber
  let restaurantsNumber

  if (city?.equipments?.length) {
    bakeriesNumber =
      city.equipments.find(({ typequ }) => typequ === BAKERY_CODE)?.total || 0
    doctorsNumber =
      city.equipments.find(({ typequ }) => typequ === DOCTORS_CODE)?.total || 0
    restaurantsNumber =
      city.equipments.find(({ typequ }) => typequ === RESTAURANTS_CODE)
        ?.total || 0
  }

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
        nbSocialHousing={city.oldRegion?.socialhousing?.nb_2019}
        city={city}
        backLink={childrenComponentsBacklink}
      />
    )

  if (section === LIFE)
    return (
      <CityLife
        city={city}
        backLink={childrenComponentsBacklink}
        cityEquipments={city.equipments}
      />
    )

  const isMobile = isMobileView(size)

  const titlesNode = (
    <TitlesContainer isMobile={isMobile}>
      <CityName isMobile={isMobile}>{ucFirstOnly(city.nom_comm)}</CityName>
      <RegionName isMobile={isMobile}>
        {ucFirstOnly(city['oldRegion.new_name'])}
      </RegionName>
    </TitlesContainer>
  )

  return (
    <MainLayout isMobile={isMobile}>
      <Helmet>
        <title>Pourquoi vivre à {ucFirstOnly(city.nom_comm)} - Mobiville</title>
        <meta
          name="description"
          content={`Toutes les informations clés sur la ville de ${ucFirstOnly(
            city.nom_comm
          )} : Cadre de vie, emploi, logement et bien plus.`}
        />
      </Helmet>

      {!isMobile && (
        // A custom header is used for the mobile version in the CityHeader component
        <CitySubHeader backLink={backLink} node={titlesNode} isMobile={isMobile} />
      )}

      <CityHeader isMobile={isMobile} titlesNode={titlesNode} />

      <BlockContainer isMobile={isMobile}>
        <Block isMobile={isMobile}>
          <BlockHeader>
            <BlockHeaderText>
              <BlockHeaderH2>
                Emploi <br />
                <span
                  style={{
                    color: COLOR_TEXT_SECONDARY,
                    fontSize: 12,
                    fontWeight: 'normal',
                  }}
                >
                  Pour {romeLabel}
                </span>
              </BlockHeaderH2>
            </BlockHeaderText>
            <BlockHeaderRating></BlockHeaderRating>
          </BlockHeader>
          <BlockContent>
            <BlockContentUl>
              <BlockContentLi>
                <BlockContentLiImg src={balance} />
                <BlockContentLiDesc>
                  Offres pour 10 demandeurs
                </BlockContentLiDesc>
                <BlockContentLiValue>
                  {bassinTension || deptTension || 'À venir'}
                </BlockContentLiValue>
              </BlockContentLi>

              <BlockContentLi>
                <BlockContentLiImg src={euro} />
                <BlockContentLiDesc>Salaire brut</BlockContentLiDesc>
                <BlockContentLiValue>
                  {infosTravail?.min > 0
                    ? `${infosTravail.min}€ à ${infosTravail.max}€`
                    : `A venir`}
                </BlockContentLiValue>
              </BlockContentLi>

              <BlockContentLi>
                <BlockContentLiImg src={briefcase} />
                <BlockContentLiDesc>Offres d’emploi</BlockContentLiDesc>
                <BlockContentLiValue>{professions?.length}</BlockContentLiValue>
              </BlockContentLi>
            </BlockContentUl>
          </BlockContent>
          <BlockLink to={`/city/${insee}/job?codeRome=${codeRome}`}>
            Voir les offres d’emploi
          </BlockLink>
        </Block>

        <Block isMobile={isMobile}>
          <BlockHeader>
            <BlockHeaderText>
              <BlockHeaderH2>Logement</BlockHeaderH2>
            </BlockHeaderText>
            <BlockHeaderRating></BlockHeaderRating>
          </BlockHeader>
          <BlockContent>
            <BlockContentUl>
              <BlockContentLi>
                <BlockContentLiImg src={house} />
                <BlockContentLiDesc>Achat</BlockContentLiDesc>
                <BlockContentLiValue>
                  {city && city.average_houseselled
                    ? `${city.average_houseselled}€`
                    : 'A venir'}
                </BlockContentLiValue>
              </BlockContentLi>

              <BlockContentLi>
                <BlockContentLiImg src={building} />
                <BlockContentLiDesc>Location</BlockContentLiDesc>
                <BlockContentLiValue>
                  {city && city.average_houserent
                    ? `${city.average_houserent.toFixed(2)}€`
                    : 'A venir'}
                </BlockContentLiValue>
              </BlockContentLi>

              <BlockContentLi>
                <BlockContentLiImg
                  src={city?.city_house_tension ? redEllipse : greenEllipse}
                />
                <BlockContentLiDesc>Tension immobilière</BlockContentLiDesc>
                <BlockContentLiValue>
                  {city?.city_house_tension ? 'Oui' : 'Non'}
                </BlockContentLiValue>
              </BlockContentLi>
            </BlockContentUl>
          </BlockContent>
          <BlockLink to={`/city/${insee}/housing?codeRome=${codeRome}`}>
            En savoir plus
          </BlockLink>
        </Block>

        <Block isMobile={isMobile}>
          <BlockHeader>
            <BlockHeaderText>
              <BlockHeaderH2>Cadre de vie</BlockHeaderH2>
            </BlockHeaderText>
            <BlockHeaderRating></BlockHeaderRating>
          </BlockHeader>
          <BlockContent>
            <BlockContentUl>
              <BlockContentLi>
                <BlockContentLiImg src={bread} />
                <BlockContentLiDesc>Boulangeries</BlockContentLiDesc>
                <BlockContentLiValue>
                  {bakeriesNumber || 'À venir'}
                </BlockContentLiValue>
              </BlockContentLi>

              <BlockContentLi>
                <BlockContentLiImg src={doctors} />
                <BlockContentLiDesc>Médecins</BlockContentLiDesc>
                <BlockContentLiValue>
                  {doctorsNumber || 'À venir'}
                </BlockContentLiValue>
              </BlockContentLi>

              <BlockContentLi>
                <BlockContentLiImg src={restaurantsIcon} />
                <BlockContentLiDesc>Restaurants</BlockContentLiDesc>
                <BlockContentLiValue>
                  {restaurantsNumber || 'À venir'}
                </BlockContentLiValue>
              </BlockContentLi>
            </BlockContentUl>
            <BlockLink to={`/city/${insee}/life?codeRome=${codeRome}`}>
              Découvrir le cadre de vie
            </BlockLink>
          </BlockContent>
        </Block>
      </BlockContainer>
      <BlockContainer isMobile={isMobile}>
        {!!similarCities.length && (
          <Block isMobile={isMobile}>
            <BlockHeader>
              <BlockHeaderText>
                <BlockHeaderH2>
                  Villes similaires pour {romeLabel}
                </BlockHeaderH2>
              </BlockHeaderText>
              <BlockHeaderRating></BlockHeaderRating>
            </BlockHeader>
            <BlockContent>
              <BlockContentUl>
                {similarCities.map((similarCity, index) => (
                  <BlockContentLi key={similarCity.insee_com}>
                    <BlockContentLiImg
                      src={
                        index === 0
                          ? medalGold
                          : index === 1
                          ? medalSilver
                          : medalBronze
                      }
                    />
                    <BlockContentLiDesc>
                      <Link
                        to={`/city/${similarCity.insee_com}-${similarCity.nom_comm}?codeRome=${codeRome}`}
                        style={{ color: 'inherit' }}
                      >
                        <b>{ucFirstOnly(similarCity.nom_comm)}</b> (
                        {similarCity['newRegion.name']})
                      </Link>
                    </BlockContentLiDesc>
                  </BlockContentLi>
                ))}
              </BlockContentUl>
            </BlockContent>
            <BlockLink to={`/cities?${similarCitiesCriterionsQueryString}`}>
              Voir toutes les villes
            </BlockLink>
          </Block>
        )}

        {!!closeCities.length && (
          <Block isMobile={isMobile}>
            <BlockHeader>
              <BlockHeaderText>
                <BlockHeaderH2>Villes à proximité</BlockHeaderH2>
              </BlockHeaderText>
              <BlockHeaderRating></BlockHeaderRating>
            </BlockHeader>
            <BlockContent>
              <BlockContentUl>
                {closeCities.map((closeCity, index) => (
                  <BlockContentLi key={closeCity.insee_com}>
                    <BlockContentLiImg
                      src={
                        index === 0
                          ? medalGold
                          : index === 1
                          ? medalSilver
                          : medalBronze
                      }
                    />
                    <BlockContentLiDesc>
                      <Link
                        to={`/city/${closeCity.insee_com}-${closeCity.nom_comm}?codeRome=${codeRome}`}
                        style={{ color: 'inherit' }}
                      >
                        <b>{ucFirstOnly(closeCity.nom_comm)}</b> (
                        {closeCity['newRegion.name']})
                      </Link>
                    </BlockContentLiDesc>
                  </BlockContentLi>
                ))}
              </BlockContentUl>
            </BlockContent>
            <BlockLink
              to={`/cities?codeRegion=${city['oldRegion.new_code']}&codeRome=${codeRome}`}
            >
              Voir toutes les villes
            </BlockLink>
          </Block>
        )}
      </BlockContainer>
      <br />
    </MainLayout>
  )
}

CityPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
}

CityPage.defaultProps = {
  location: {
    search: '',
  },
}

export default CityPage
