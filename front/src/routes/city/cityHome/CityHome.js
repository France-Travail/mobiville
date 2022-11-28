import { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import CityHousingSimulator from './components/CityHousingSimulator'
import CloseCompanies from './components/CloseCompanies'
import HelpsStandOut from './components/HelpsStandOut'
import SectionHeader from '../components/SectionHeader'
import { ActionButton, HorizontalScrollableSection, KeyFigures, Tag } from '../../../components'

import { ReactComponent as MaletteIcon } from '../../../assets/images/icons/malette.svg'
import { ReactComponent as ProfilEntrepriseIcon } from '../../../assets/images/icons/profil_entreprise.svg'
// import { ReactComponent as HandshakeIcon } from '../../assets/images/icons/handshake.svg'
import cityServicesStandOut from '../../../assets/images/cityServicesStandOut.png'

import { capitalize, formatCityTension } from '../../../utils/utils'
import {
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
  COLOR_WHITE,
} from '../../../constants/colors'
import CityHeader from '../CityHeader'
import { useProfessions } from '../../../common/contexts/professionsContext'
import { useCities } from '../../../common/contexts/citiesContext'
import { isMobileView } from '../../../constants/mobile'
import { useWindowSize } from '../../../common/hooks/window-size'
import { Link } from 'react-router-dom'
import JobCard from '../cityJobs/components/JobCard'

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

const JobCardContainer = styled(Link)`
  width: ${({ $isMobile }) => ($isMobile ? '279px' : '336px')};
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

  const { companiesCount, onSearchCloseCompanies, city } = useCities()
  const {
    jobsMissingApplicant,
    totalOffres,
    bassinTensionIndT,
    onSearchInfosTravail,
    sortByDistanceFromCity
  } = useProfessions()
  
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

      <SectionHeader
        title="Les offres d'emploi avec plus d'opportunités"
        subTitle="Offres de plus de 15 jours, comptant moins de 4 candidatures"
      />

      <HorizontalScrollableSection>
        {jobsMissingApplicant
          ?.sort(sortByDistanceFromCity(city))
          .slice(0, 3)
          .map((job) => (
            <JobCardContainer
              key={job.id}
              to={{
                pathname: `/city/${insee}/job`,
                search: `?codeRome=${codeRome}&jobSelected=${job.id}`
              }}
            >
              <JobCard job={job} style={{ height: '100%' }} />
            </JobCardContainer>
          ))}
      </HorizontalScrollableSection>

      <ActionButton
        path={`/city/${insee}/job?codeRome=${codeRome}`}
        libelle={`Voir toutes les offres d’emploi`}
        isMobile={isMobile}
        isBlue={true}
        centered
      />

      <SectionHeader title="Les entreprises qui recrutent à proximité" />
      <CloseCompanies />

      <ElementContainer isMobile={isMobile}>
        <CityHousingSimulator city={city}></CityHousingSimulator>
      </ElementContainer>

      <SectionHeader title="Les aides pour vous accompagner dans votre projet" />
      <HelpsStandOut />

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
