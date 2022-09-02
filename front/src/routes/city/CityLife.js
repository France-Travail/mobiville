import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Helmet } from 'react-helmet-async'
import _ from "lodash"

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackwardIcon from '@mui/icons-material/ArrowBack'
import { IconButton, Tooltip } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import {
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_BACKGROUND,
  COLOR_GRAY,
} from '../../constants/colors'

import {
  CULTURE_CRITERION,
  TRANSPORT_CRITERION,
  HEALTH_CRITERION,
  SERVICES_CRITERION,
  SERVICES_EDUCATION,
  SERVICES_ENVIRONMENT,
} from '../../constants/lifeCriterions'

import SubHeader from '../../components/SubHeader'
import MainLayout from '../../components/MainLayout'

const MAX_DESCRIPTION_LENGTH = 700

const Container = styled.div`
  width: 100%;
  max-width: 688px;
  margin: 0 auto;
`

const DesktopElementsLayout = styled.div`
  display: flex;
`

const CityPic = styled.img`
  object-fit: cover;
  height: 229px;
  width: 100%;
  border-radius: 8px 8px 0 0;
  margin: 0 8px -8px;
`

const ItemLayout = styled.div`
  background: #ffffff;
  border: 1px solid #e4e9ed;
  width: 100%;
  padding: 16px;
  max-width: ${({ isMobile }) => (isMobile ? '100%' : '336px')};
  margin: ${({ isMobile }) => (isMobile ? '0 0 8px' : '0 8px 16px')};
`

const ItemContentLayout = styled.div``

const ItemTitleLayout = styled.div`
  font-weight: bold;
  font-size: 14px;
  padding-bottom: 16px;
`

const IconImg = styled.img`
  width: 24px;
  height: 24px;
`

const ElementObject = styled.div`
  width: 25%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 92px;

  .material-icons {
    color: ${COLOR_SECONDARY};
    margin-bottom: 6px;
  }

  .title {
    font-size: 12px;
    margin-bottom: 4px;
    margin-top: 0;
    text-align: center;
  }

  .sub-title {
    font-size: 10px;
    margin-top: 0;
    margin-bottom: 0;
  }

  .details {
    font-size: 14px;
    font-weight: 700;
    margin-top: 0;
  }
`

const ElementLine = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${COLOR_BACKGROUND};
  border-radius: 4px;

  & img {
    margin-right: 8px;
  }

  .material-icons {
    color: ${COLOR_SECONDARY};
    margin-right: 8px;
    background-color: ${COLOR_GRAY};
    border-radius: 4px;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
  }

  .title {
    font-weight: 500;
    font-size: 12px;
    flex: 1;
  }

  .details {
    font-size: 14px;
    font-weight: 700;
  }
`

const ViewMore = styled.button.attrs({
  type: 'button',
})`
  font-weight: 500;
  color: ${COLOR_PRIMARY};
  margin-top: 12px;
  display: flex;
  align-items: center;
  border: none;
  background: white;
  cursor: pointer;
`

const ElectedOfficialsBlock = styled.p`
  text-align: center;
  padding-left: 16px;
  padding-right: 16px;
`

const CityLife = ({ backLink, city, cityEquipments }) => {
  const size = useWindowSize()
  const isMobile = isMobileView(size)

  const [showFullDescription, setShowFullDescription] = useState(false)

  const equipementsFormater = {
    transports: { data: [], reference: TRANSPORT_CRITERION },
    culture: { data: [], reference: CULTURE_CRITERION },
    health: { data: [], reference: HEALTH_CRITERION },
    services: { data: [], reference: SERVICES_CRITERION },
    education: { data: [], reference: SERVICES_EDUCATION },
    environment: { data: [], reference: SERVICES_ENVIRONMENT },
  }

  if (cityEquipments) {
    Object.entries(equipementsFormater).forEach(([key, value]) => {
      value.data = cityEquipments.reduce((prev, equipmentData) => {
        const criterionData = value.reference.find(({ code }) =>
          Array.isArray(code)
            ? code.includes(equipmentData.typequ)
            : code === equipmentData.typequ
        )
        if (!criterionData) return prev
        if (prev.map((o) => o.label).includes(criterionData.label)) return prev // on évite de doublonné
        return prev.concat({
          ...criterionData,
          total: equipmentData.total,
        })
      }, [])
    })
  }

  const description = (city.description || '').replace('Écouter', '')

  // We truncate too long descriptions
  const displayedDescription =
    description.length > MAX_DESCRIPTION_LENGTH && !showFullDescription
      ? description
          .slice(0, MAX_DESCRIPTION_LENGTH)
          .concat(description.slice(MAX_DESCRIPTION_LENGTH).split(' ')[0])
          .concat('…')
      : description

  const mainCityElement = (
    <>
      <CityPic
        src={city.photo || `/regions/region-${city.newRegion.code}.jpg`}
        alt=""
      />
      <ItemLayout isMobile={isMobile} style={{ maxWidth: '100%' }}>
        <ItemTitleLayout>Description de la ville</ItemTitleLayout>
        <ItemContentLayout>
          {displayedDescription}
          {description.length > MAX_DESCRIPTION_LENGTH && (
            <div>
              <ViewMore
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? 'Lire moins' : 'En savoir plus'}
                {showFullDescription ? (
                  <ArrowBackwardIcon
                    fontSize="small"
                    style={{ marginLeft: 8 }}
                  />
                ) : (
                  <ArrowForwardIcon
                    fontSize="small"
                    style={{ marginLeft: 8 }}
                  />
                )}
              </ViewMore>
            </div>
          )}
        </ItemContentLayout>
      </ItemLayout>
    </>
  )

  const cultureElement = equipementsFormater.culture.data.length > 0 && (
    <ItemLayout isMobile={isMobile}>
      <ItemTitleLayout>Culture & Loisirs</ItemTitleLayout>
      <ItemContentLayout>
        {equipementsFormater.culture.data.map((t) => (
          <ElementObject key={t.label}>
            <IconImg src={`/icons/${t.icon} `} alt="" />
            <p className="title">{t.label}</p>
            <p className="details">{t.total}</p>
          </ElementObject>
        ))}
      </ItemContentLayout>
    </ItemLayout>
  )

  const remarkableGardens = equipementsFormater.environment.data.find(
    ({ code }) => code === 'F310'
  )

  const environmentElement = (
    <ItemLayout isMobile={isMobile}>
      <ItemTitleLayout>Environnement</ItemTitleLayout>
      <ItemContentLayout>
        <ElementLine>
          <i className="material-icons">domain</i>
          <p className="title">Qualité de l'air moyenne</p>
          <p className="details">A venir</p>
        </ElementLine>
        {remarkableGardens && (
          <ElementLine>
            <IconImg src={`/icons/${remarkableGardens.icon}`} alt="" />
            <p className="title">
              <span>Jardins remarquables</span>
              <Tooltip title="Ce label désigne les parcs et jardins d'exceptions">
                <IconButton size="large">
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </p>
            <p className="details">{remarkableGardens.total}</p>
          </ElementLine>
        )}
      </ItemContentLayout>
    </ItemLayout>
  )

  const transportElement = equipementsFormater.transports.data.length > 0 && (
    <ItemLayout isMobile={isMobile}>
      <ItemTitleLayout>Transports à proximité</ItemTitleLayout>
      <ItemContentLayout>
        {equipementsFormater.transports.data.map((t) => (
          <ElementLine key={t.label}>
            <IconImg src={`/icons/${t.icon}`} alt="" />
            <p className="title">
              {t.label} de {_.capitalize(city.nom_comm)}
            </p>
            <p className="details">{t.total}</p>
          </ElementLine>
        ))}
      </ItemContentLayout>
    </ItemLayout>
  )

  const servicesElement = equipementsFormater.services.data.length > 0 && (
    <ItemLayout isMobile={isMobile}>
      <ItemTitleLayout>Services</ItemTitleLayout>
      <ItemContentLayout>
        {equipementsFormater.services.data.map((t) => (
          <ElementObject key={t.label}>
            <IconImg src={`/icons/${t.icon}`} alt="" />
            <p className="title">{t.label}</p>
            <p className="details">{t.total}</p>
          </ElementObject>
        ))}
      </ItemContentLayout>
    </ItemLayout>
  )

  const healthElement = equipementsFormater.health.data.length > 0 && (
    <ItemLayout isMobile={isMobile}>
      <ItemTitleLayout>Santé</ItemTitleLayout>
      <ItemContentLayout>
        {equipementsFormater.health.data.map((t) => (
          <ElementObject key={t.label}>
            <IconImg src={`/icons/${t.icon}`} alt="" />
            <p className="title">{t.label}</p>
            <p className="details">{t.total}</p>
          </ElementObject>
        ))}
      </ItemContentLayout>
    </ItemLayout>
  )

  const educationElement = (
    <ItemLayout isMobile={isMobile}>
      <ItemTitleLayout>Education</ItemTitleLayout>
      <ItemContentLayout>
        {equipementsFormater.education.data.map((t) => (
          <ElementObject key={t.label}>
            <IconImg src={`/icons/${t.icon}`} alt="" />
            <p className="title">{t.label}</p>
            <p className="details">{t.total}</p>
          </ElementObject>
        ))}
        {equipementsFormater.education.data.length === 0 && <b>À venir</b>}
      </ItemContentLayout>
    </ItemLayout>
  )

  const mobileElements = (
    <>
      {mainCityElement}
      {cultureElement}
      {transportElement}
      {environmentElement}
      {healthElement}
      {servicesElement}
      {educationElement}
    </>
  )

  const desktopElement = (
    <Container>
      {mainCityElement}
      <DesktopElementsLayout>
        <div>
          {transportElement}
          {healthElement}
          {educationElement}
        </div>

        <div>
          {cultureElement}
          {environmentElement}
          {servicesElement}
        </div>
      </DesktopElementsLayout>
    </Container>
  )

  return (
    <MainLayout isMobile={isMobile}>
      <Helmet>
        <title>
          Services et équipements : {_.capitalize(city.nom_comm)} ({city.code_dept}) | Mobiville
        </title>
        <meta
          name="description"
          content={`Découvrez les services et équipements disponibles à ${_.capitalize(city.nom_comm)} : transports, santé, culture et loisirs, éducation, environnement`}
        />
      </Helmet>
      <SubHeader
        backLink={backLink}
        isMobile={isMobile}
        notFixed={!isMobile}
        title={` Information sur le cadre de vie à ${_.capitalize(
          city.nom_comm
        )}`}
      />
      {isMobile ? mobileElements : desktopElement}
      <ElectedOfficialsBlock>
        Elus, élues locaux : vous souhaitez nous signaler une information
        erronée, enrichir les données de votre ville ? <br />
        Merci de nous écrire à{' '}
        <a href="mailto:contact@mobiville.pole-emploi.fr">
          contact@mobiville.pole-emploi.fr
        </a>
      </ElectedOfficialsBlock>
    </MainLayout>
  )
}

CityLife.propTypes = {
  city: PropTypes.object.isRequired,
}

CityLife.defaultProps = {}

export default CityLife
