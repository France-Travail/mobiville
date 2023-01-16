import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { HelpsStandOut } from '../../../components'
import { COLOR_PRIMARY, COLOR_WHITE } from '../../../constants/colors'

const Container = styled.div`
    color: ${COLOR_PRIMARY};'
`

const Title = styled.h2`
  margin: 32px 16px 0 16px;

  text-align: center;
  font-size: 24px;
  font-weight: 900;
`

const SubTitle = styled.p`
  margin: 0 16px 16px 16px;

  text-align: center;
  font-size: 18px;
`

const HelpTypesContainer = styled.div`
  max-width: 1072px; // 1040px + 2*16px
  width: 100%;
  margin: 16px auto;
  padding: 0 16px;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: auto;
  gap: 8px;

  align-items: stretch;
`

const HelpTypesSubContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: auto;
  gap: 8px;

  align-items: stretch;
`

const HelpType = styled(Link)`
  display: grid;
  place-content: center;

  max-width: 100vw;
  padding: 18px;
  border-radius: 4px;

  background: ${COLOR_WHITE};
  font-size: 16px;
  font-weight: 700;
  text-align: center;

  &&:hover {
    background: ${COLOR_PRIMARY};
    color: ${COLOR_WHITE};
  }
`

const HelpCardsContainer = styled.div``

const HelpCardsTitle = styled.p`
  margin: 32px 0 16px 0;

  text-align: center;
  font-size: 18px;
  font-weight: bold;
`

const HomeHelpsBanner = () => (
  <Container>
    <Title>Besoin d’aide pour votre projet de mobilité ?</Title>
    <SubTitle>
      Découvrez les aides à la mobilité professionnelle et résidentielle pour
      accélérer votre projet
    </SubTitle>
    <HelpTypesContainer>
      <HelpTypesSubContainer>
        <HelpType to="/aides#financiere">Les aides financières</HelpType>
        <HelpType to="/aides#logement">Les aides logement</HelpType>
      </HelpTypesSubContainer>
      <HelpTypesSubContainer>
        <HelpType to="/aides#accompagnement">
          Les aides d'accompagnement
        </HelpType>
        <HelpType to="/aides#transport">Les aides transports</HelpType>
      </HelpTypesSubContainer>
    </HelpTypesContainer>

    <HelpCardsContainer>
      <HelpCardsTitle>Les plus demandées</HelpCardsTitle>
      <HelpsStandOut buttonLibelle='Toutes les aides à la mobilité' />
    </HelpCardsContainer>
  </Container>
)

export default HomeHelpsBanner
