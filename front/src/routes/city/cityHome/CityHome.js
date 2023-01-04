import { useEffect, useRef, useState } from 'react'

import styled from 'styled-components'
import PropTypes from 'prop-types'

import CityHousingSimulator from './components/CityHousingSimulator'
import CloseCompanies from './components/CloseCompanies'
import SectionHeader from '../components/SectionHeader'
import {
  ActionButton,
  HelpsStandOut,
  HorizontalScrollableSection,
  KeyFigures,
  Tag,
} from '../../../components'

import { ReactComponent as MaletteIcon } from '../../../assets/images/icons/malette.svg'
import { ReactComponent as ProfilEntrepriseIcon } from '../../../assets/images/icons/profil_entreprise.svg'
import { ReactComponent as HandshakeIcon } from '../../../assets/images/icons/handshake.svg'
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
  margin: ${({ $isMobile }) =>
    $isMobile ? '5px auto' : '60px auto 20px auto'};
  align-items: center;
  font-size: 16px;
  line-height: 24px;
`

const JobCardContainer = styled(Link)`
  width: ${({ $isMobile }) => ($isMobile ? '279px' : '336px')};
`

const TitlesContainer = styled.div`
  width: 100%;
  padding: ${({ $isMobile }) => ($isMobile ? '0 14px' : '0')};

  display: flex;
  flex-direction: column;
  text-align: start;

  color: ${COLOR_TEXT_PRIMARY};
`

const CityName = styled.h1`
  margin: 8px 0 22px 0;

  font-weight: 900;
  font-size: ${({ $isMobile, title }) => {
    if ($isMobile && title <= 40) return '22px'
    else if ($isMobile && title > 40) return '18px'
    else return '36px'
  }};
  line-height: ${({ $isMobile }) => ($isMobile ? '36px' : '42px')};
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
  margin-top: 28px;

  display: grid;
  place-content: center;
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
  const inputRef = useRef('')
  const [titleLength, setTitleLength] = useState(0)

  const { companiesCount, onSearchCloseCompanies, city } = useCities()
  const {
    jobsMissingApplicant,
    isMissingApplicants,
    professions,
    totalOffres,
    infosTravail,
    onSearchInfosTravail,
    sortByDistanceFromCity,
  } = useProfessions()
  const isDerniereOffreDemploi = jobsMissingApplicant.length < 3
  const jobSelectedParam = (job) =>
    isMissingApplicants(job) ? `&jobSelected=${job.id}` : ''

  useEffect(() => {
    if (!city?.insee_com || !codeRome) return
    setTitleLength(inputRef.current?.innerHTML.length)
    onSearchCloseCompanies({
      codeRome,
      insee: city.insee_com,
      sort: 'distance',
    })
    onSearchInfosTravail({
      codeRome: codeRome,
      insee: city.insee_com,
    })
  }, [city?.insee_com, codeRome])

  return (
    <div tag-page="/city">
      <CityHeader isMobile={isMobile}>
        <TitlesContainer $isMobile={isMobile}>
          <RegionName isMobile={isMobile}>
            {capitalize(city.nom_region)}
            <RoundSeparator> • </RoundSeparator>
            {capitalize(city.nom_dept)}
          </RegionName>
          <CityName $isMobile={isMobile} title={titleLength} ref={inputRef}>
            {capitalize(city.nom_comm)}
            {isMobile ? <br /> : ' '}pour le métier {romeLabel}
          </CityName>
        </TitlesContainer>
      </CityHeader>

      <TagsContainer>
        <Tag green={infosTravail?.bassinTensionIndT < 4} size="tall">
          {formatCityTension(infosTravail?.bassinTensionIndT)}
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
          !infosTravail?.hiringRate
            ? null
            : {
                label: "Taux d'embauche",
                data:
                  infosTravail?.hiringRate > 100
                    ? '100%'
                    : `${infosTravail?.hiringRate}%`,
                icon: <HandshakeIcon />,
              },
        ]}
      />

      <SectionHeader
        title={
          isDerniereOffreDemploi
            ? "Les dernières offres d'emploi"
            : "Les offres d'emploi avec plus d'opportunités"
        }
        subTitle={
          !isDerniereOffreDemploi &&
          'Offres de plus de 15 jours, comptant moins de 4 candidatures'
        }
      />

      <HorizontalScrollableSection>
        {(isDerniereOffreDemploi ? professions : jobsMissingApplicant)
          ?.sort(sortByDistanceFromCity(city))
          .slice(0, 3)
          .map((job) => (
            <JobCardContainer
              $isMobile={isMobile}
              key={job.id}
              to={{
                pathname: `/ville/${insee}/metier`,
                search: `?codeRome=${codeRome}${jobSelectedParam(job)}`,
              }}
            >
              <JobCard job={job} style={{ height: '100%' }} />
            </JobCardContainer>
          ))}
      </HorizontalScrollableSection>

      <ActionButton
        path={`/ville/${insee}/metier?codeRome=${codeRome}`}
        libelle={`Voir toutes les offres d’emploi`}
        isMobile={isMobile}
        isBlue={true}
        centered
      />

      <SectionHeader title="Les entreprises qui recrutent à proximité" />
      <CloseCompanies />

      <ElementContainer $isMobile={isMobile}>
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
            path={`/ville/${insee}/services?codeRome=${codeRome}`}
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
        path={'/conseils-et-astuces'}
        libelle={`Consultez nos conseils pour votre projet`}
        isMobile={isMobile}
        isBlue={false}
        isWhite={true}
        centered
      />
    </div>
  )
}

CityHome.propTypes = {
  romeLabel: PropTypes.string,
  insee: PropTypes.string,
  codeRome: PropTypes.string,
}

export default CityHome
