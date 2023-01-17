import styled from 'styled-components'

import { useWindowSize } from "../../../common/hooks/window-size"
import { isMobileView } from "../../../constants/mobile"

import { Section, SectionTitle } from '../../../components'
import { COLOR_PRIMARY, COLOR_VERT_MOBIVILLE } from '../../../constants/colors'

import { ReactComponent as MapPointerIcon } from '../../../assets/images/icons/map-pointer.svg'
import { ReactComponent as HouseOutlineIcon } from '../../../assets/images/icons/house-outline.svg'
import { ReactComponent as FinancialHelpIcon } from '../../../assets/images/icons/financial-help.svg'

const Container = styled.div`
  display: flex;
  margin: 0 auto 22px;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  gap: 16px;
`

const Advantage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: ${({ isMobile }) => (isMobile ? 'initial' : '336px')};

  border-radius: 8px;

  text-align: center;
  width: 100%;
  overflow: hidden;
  padding: 16px;
`

const AdvantageIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 45px;
  height: 45px;
  border: 1px solid ${COLOR_VERT_MOBIVILLE};
  border-radius: 50%;

  color: ${COLOR_VERT_MOBIVILLE};
`

const AdvantageTitle = styled.h3`
  margin-top: 0;
  font-weight: 700;
  font-size: 20px;
  line-height: 33px;
  margin-block-end: unset;
  margin-bottom: 5px;
  color: ${COLOR_PRIMARY};
`

const AdvantageText = styled.p`
  margin: 0;
  padding: 4px;
  padding-top: 0;

  text-align: left;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`

const Advantages = () => {
    const windowsSize = useWindowSize()
    const isMobile = isMobileView(windowsSize)

    return (
      <Section>
        <SectionTitle>Les avantages du service Mobiville</SectionTitle>
        <Container isMobile={isMobile}>

          <Advantage isMobile={isMobile}>
            <AdvantageIconContainer>
              <HouseOutlineIcon />
            </AdvantageIconContainer>
            <AdvantageTitle>
              Identifiez une ville qui vous correspond
            </AdvantageTitle>
            <AdvantageText>
              Mobiville vous donne une visibilité sur le marché de l’emploi,
              de l’immobilier et le cadre de vie afin de choisir une ville qui
              correspond à votre profil.
            </AdvantageText>
          </Advantage>

          <Advantage isMobile={isMobile}>
            <AdvantageIconContainer>
              <MapPointerIcon />
            </AdvantageIconContainer>
            <div>
              <AdvantageTitle>
                Ciblez un territoire avec peu de candidats
              </AdvantageTitle>
              <AdvantageText>
                Notre service vous propose en priorité les villes avec peu de
                candidats sur le territoire afin d’optimiser votre recherche
                d’emploi.
              </AdvantageText>
            </div>
          </Advantage>

          <Advantage isMobile={isMobile}>
            <AdvantageIconContainer>
              <FinancialHelpIcon />
            </AdvantageIconContainer>
            <div>
              <AdvantageTitle>
                Des conseils et des aides pour votre projet
              </AdvantageTitle>
              <AdvantageText>
                Découvrez des conseils et des aides financières,
                administratives ou humaines que vous pouvez mobiliser dans
                votre projet.
              </AdvantageText>
            </div>
          </Advantage>

        </Container>
      </Section>
    )
}

export default Advantages