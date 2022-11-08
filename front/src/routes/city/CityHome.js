import { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import _ from 'lodash'

import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DescriptionIcon from '@mui/icons-material/Description'

import { ActionButton, KeyFigures, Tag } from '../../components'

import { ReactComponent as MaletteIcon } from '../../assets/images/icons/malette.svg'
import { ReactComponent as ProfilEntrepriseIcon } from '../../assets/images/icons/profil_entreprise.svg'
// import { ReactComponent as HandshakeIcon } from '../../assets/images/icons/handshake.svg'
import cityServicesStandOut from '../../assets/images/cityServicesStandOut.png'

import { capitalize, formatCityTension, getXDaysAgo } from '../../utils/utils'
import {
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
  COLOR_VERT_MOBIVILLE,
  COLOR_WHITE,
} from '../../constants/colors'
import CityHeader from './CityHeader'
import { useProfessions } from '../../common/contexts/professionsContext'
import { useCities } from '../../common/contexts/citiesContext'
import CityHousingSimulator from './CityHousingSimulator'
import { isMobileView } from '../../constants/mobile'
import { useWindowSize } from '../../common/hooks/window-size'

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
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`

const BlockContentOffers = styled.div`
  width: fit-content;
  ${({ isMobile }) => (isMobile ? 'padding: 0 16px;' : '')}
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
  margin: ${({ isMobile }) => (isMobile ? '20px auto 0 auto' : 'auto')};
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
  font-size: ${({ isMobile }) => (isMobile ? '24px' : '36px')};
  line-height: ${({ isMobile }) => (isMobile ? '36px' : '42px')};
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

const CityHome = ({ romeLabel, insee, codeRome }) => {
  const isMobile = isMobileView(useWindowSize())

  const { companiesCount, closeCompanies, onSearchCloseCompanies, city } = useCities()
  const { professionsCandidatsManquants, totalOffres, bassinTensionIndT, onSearchInfosTravail } =
    useProfessions()
  
  useEffect(() => {
    if (!city?.insee_com || !codeRome) return

    onSearchCloseCompanies({
      codeRome,
      insee: city.insee_com,
      sort: 'distance',
    })
    onSearchInfosTravail({
      codeRome: codeRome,
      insee: city.insee_com
    })
  }, [city?.insee_com, codeRome])

  return (
    <>
      <CityHeader isMobile={isMobile}>
        <TitlesContainer isMobile={isMobile}>
          <RegionName isMobile={isMobile}>
            {capitalize(city.nom_region)}
            <RoundSeparator> • </RoundSeparator>
            {capitalize(city.nom_dept)}
          </RegionName>
          <CityName isMobile={isMobile}>
            {capitalize(city.nom_comm)}
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
      <ActionButton
        path={`/city/${insee}/job?codeRome=${codeRome}`}
        libelle={`Voir toutes les offres d’emploi`}
        isMobile={isMobile}
        isBlue={true}
        centered
      />

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
                {_.startCase(company.name.toLowerCase())}
              </BlockCompanyName>{' '}
              <BlockCompanyCity>{capitalize(company.city)}</BlockCompanyCity>
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
            path={`/city/${insee}/life?codeRome=${codeRome}`}
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

      <ActionButton
        path={'/mobility-guide'}
        libelle={`Consultez nos conseils pour votre projet`}
        isMobile={isMobile}
        isBlue={false}
        isWhite={true}
        centered
      />
    </>
  )
}

CityHome.propTypes = {
  romeLabel: PropTypes.string,
  insee: PropTypes.string,
  codeRome: PropTypes.string
}

export default CityHome
