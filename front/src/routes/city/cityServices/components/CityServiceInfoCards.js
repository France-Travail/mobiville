import { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes, { object } from 'prop-types'
import styled from 'styled-components'

import { ReactComponent as BusIcon } from '../../../../assets/images/icons/bus.svg'
import { ReactComponent as PencilIcon } from '../../../../assets/images/icons/pencil.svg'
import { ReactComponent as HeartIcon } from '../../../../assets/images/icons/heart.svg'
import { ReactComponent as BookIcon } from '../../../../assets/images/icons/book.svg'
import { ReactComponent as EarthIcon } from '../../../../assets/images/icons/earth.svg'

import {
  COLOR_PRIMARY,
  COLOR_PURPLE,
  COLOR_WHITE,
} from '../../../../constants/colors'
import { isMobileView } from '../../../../constants/mobile'
import { useWindowSize } from '../../../../common/hooks/window-size'

import {
  TRANSPORT_SERVICES,
  EDUCATION_SERVICES,
  HEALTH_SERVICES,
  CULTURE_SERVICES,
  ENVIRONMENT_SERVICES,
} from '../../../../constants/services'

const Container = styled.div`
  max-width: 1036px;
  width: 100vw;
  margin: auto;
`

const CardsSectionTitle = styled.h2`
  width: fit-content;
  margin: ${({ $isMobile }) => ($isMobile ? '16px auto 16px auto' : '0 0 16px 0')};

  color: ${COLOR_PRIMARY};
  font-size: 24px;
  font-weight: 900;
`

const CardsContainer = styled.div`
  max-width: 1034px;
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fill, 334px);
  justify-content: center;
  grid-gap: 16px;

  color: ${COLOR_PRIMARY};
`

const CardContainer = styled.div`
  padding: 20px;
  border-radius: 8px;

  background: ${COLOR_WHITE};
`

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`

const CardTitle = styled.p`
  font-size: 24px;
  font-weight: 900;
`

const CardIconContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 4px;

  display: grid;
  place-items: center;

  background: ${COLOR_PURPLE};
`

const CardItemsContainer = styled.div`
  margin-top: 16px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`

const CardItem = styled.div`
  display: flex;
  align-items: center;
`

const CardItemData = styled.p`
  min-width: 42px;
  margin: 0;
  margin-right: 8px;
  
  text-align: center;
  font-size: 24px;
  font-weight: 900;
`

const CardItemLabel = styled.p`
  margin: 0;

  font-size: 20px;
  font-weight: 400;
`

const CityServiceInfoCards = ({ cityEquipments }) => {
  const isMobile = isMobileView(useWindowSize())

  const [ transportEquipements, setTransportEquipements ] = useState([])
  const [ educationEquipements, setEducationEquipements ] = useState([])
  const [ healthEquipements, setHealthEquipements ] = useState([])
  const [ cultureEquipements, setCultureEquipements ] = useState([])
  const [ environmentEquipements, setEnvironmentEquipements ] = useState([])

  const computeServiceEquipements = useCallback((services) => (
    services
      .map(ref => ({
        label: ref.label,
        total: cityEquipments
            .filter((equipement) => equipement.typequ === ref.code || ref.code.includes(equipement.typequ))
            .reduce((acc, curr) => acc + curr.total, 0)
      }))
      .filter(equipement => equipement.total > 0)
  ), [ cityEquipments ])

  useEffect(() => {
    setTransportEquipements(computeServiceEquipements(TRANSPORT_SERVICES))
    setEducationEquipements(computeServiceEquipements(EDUCATION_SERVICES))
    setHealthEquipements(computeServiceEquipements(HEALTH_SERVICES))
    setCultureEquipements(computeServiceEquipements(CULTURE_SERVICES))
    setEnvironmentEquipements(computeServiceEquipements(ENVIRONMENT_SERVICES))
  }, [ cityEquipments ])

  const Card = ({ icon, title, equipements }) => {
    if (!!equipements && equipements.length > 0) {
      return (
        <CardContainer>
          <CardHeader>
            <CardIconContainer>
              { icon }
            </CardIconContainer>
            <CardTitle>{ title }</CardTitle>
          </CardHeader>
          <CardItemsContainer>
            {equipements
              .map((equipement => (
                <CardItem key={ equipement.label }>
                  <CardItemData>{ equipement.total }</CardItemData>
                  <CardItemLabel>{ equipement.label }</CardItemLabel>
                </CardItem>
            )))}
          </CardItemsContainer>
        </CardContainer>
      )
    }

    return null
  }

  const tranportCard = useMemo(() => (
    <Card
      icon={<BusIcon />}
      title="Transport"
      equipements={transportEquipements} />
  ), [transportEquipements])

  const educationCard = useMemo(() => (
    <Card
      icon={<PencilIcon />}
      title="Education"
      equipements={educationEquipements} />
  ), [educationEquipements])

  const healthCard = useMemo(() => (
    <Card
      icon={<HeartIcon />}
      title="Santé"
      equipements={healthEquipements} />
  ), [healthEquipements])

  const cultureCard = useMemo(() => (
    <Card
      icon={<BookIcon />}
      title="Culture & loisirs"
      equipements={cultureEquipements} />
  ), [cultureEquipements])

  const environmentCard = useMemo(() => (
    <Card
      icon={<EarthIcon />}
      title="Environnement"
      equipements={environmentEquipements} />
  ), [environmentEquipements])

  if ((!transportEquipements || transportEquipements.length <= 0)
      && (!educationEquipements || educationEquipements.length <= 0)
      && (!healthEquipements || healthEquipements.length <= 0)
      && (!cultureEquipements || cultureEquipements.length <= 0)
      && (!environmentEquipements || environmentEquipements.length <= 0)) {
    return null
  }

  return (
    <Container>
      <CardsSectionTitle $isMobile={isMobile}>Les services</CardsSectionTitle>
      <CardsContainer>
        { tranportCard }
        { educationCard }
        { healthCard }
        { cultureCard }
        { environmentCard }
      </CardsContainer>
    </Container>
  )
}

CityServiceInfoCards.propTypes = {
  cityEquipments: PropTypes.arrayOf(object).isRequired
}

export default CityServiceInfoCards
