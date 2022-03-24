import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import MainLayout from '../../components/MainLayout'
import { COLOR_PRIMARY, COLOR_BACKGROUND } from '../../constants/colors'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'

import mobilityHomepagePic from '../../assets/images/02-Mobility-Homepage.png'
import { ReactComponent as MagnifyingGlassIcon } from '../../assets/images/magnifying-glass.svg'
import { ReactComponent as SuperheroIcon } from '../../assets/images/superhero.svg'
import { ReactComponent as MapPointerIcon } from '../../assets/images/map-pointer.svg'
import { ReactComponent as PrizeIcon } from '../../assets/images/prize.svg'
import { ReactComponent as MoneyClockIcon } from '../../assets/images/money-clock.svg'

const H1 = styled.h1`
  font-size: ${({ isMobile }) => (isMobile ? '24px' : '36px')};
  margin: 0;
`

const Block = styled.div`
  width: 98%;
  max-width: 1040px;
  margin: auto;
  padding: 8px 16px;
`

const TopBlockContainer = styled.div`
  background: linear-gradient(180deg, #ddddea 0%, #c3e9e9 100%);
  margin-top: ${({ isMobile }) => (isMobile ? '102px' : '0')};
`

const TopBlock = styled(Block)`
  text-align: center;
  padding: ${({ isMobile }) => (isMobile ? '64px 16px' : '64px')};
`

const MainNavButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ isMobile }) => (isMobile ? '32px 0' : '32px')};
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
`

const MainNavButton = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border: 1px solid ${COLOR_PRIMARY};
  box-shadow: 6px 6px 0px #37b4b4;
  border-radius: 16px;
  color: ${COLOR_PRIMARY};
  font-weight: 500;
  font-size: 18px;
  padding: 16px;
  max-width: ${({ isMobile }) => (isMobile ? 'inherit' : '424px')};
  width: 100%;

  &:first-of-type {
    ${({ isMobile }) =>
      isMobile
        ? `
      margin-bottom: 16px;
    `
        : `
    margin-right: 16px;
    `}
  }
`

const TaglineP = styled.p`
  font-weight: 500;
  font-size: ${({ isMobile }) => (isMobile ? '14px' : '18px')};
  margin: 0;
`

const BlocksContainer = styled.div`
  padding-top: 64px;
  padding: ${({ isMobile }) => (isMobile ? '16px' : '64 0 0')};
`

const AdvantageBlocksContainer = styled.div`
  display: flex;
  margin: 0 auto 32px;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
`

const AdvantageBlock = styled.div`
  background: ${COLOR_BACKGROUND};
  border-radius: 8px;
  display: flex;
  max-width: ${({ isMobile }) => (isMobile ? 'initial' : '336px')};
  width: 100%;
  overflow: hidden;
  padding: 16px;

  &:not(:first-child) {
    ${({ isMobile }) =>
      isMobile
        ? `
      margin-top: 16px;
    `
        : `
      margin-left: 16px;
    `}
  }
`

const AdvantageIconContainer = styled.div`
  flex-shrink: 0;
  margin-right: 16px;
`

const AdvantageH2 = styled.h2`
  margin: 0 auto 32px;
  text-align: center;
`

const AdvantageH3 = styled.h3`
  margin-top: 0;
`

const AdvantageTextP = styled.p`
  margin: 0;
`

const MobilityGuideBlock = styled(Block)`
  padding: ${({ isMobile }) => (isMobile ? '0 16px 16px' : '0 64px')};
  background: #c3e9e9;
  border-radius: 16px;
  margin-bottom: 22px;
  padding: ${({ isMobile }) => (isMobile ? '12px' : '40px 40px 40px 64px')};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: start;
  .mobility-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    .centered {
      max-height: 190px;
      max-width: 265px;
      align-self: center;
    }
  }
`

const SurveyBlock = styled(Block)`
  padding: 32px;
  text-align: center;
  color: white;
  background: ${COLOR_PRIMARY};
  border-radius: 16px;
  margin-bottom: ${({ isMobile }) => (isMobile ? '0px' : '60px')};
`

const MobilityGuideBlockH2 = styled.h2`
  font-size: 24px;
  font-weight: 900;
  line-height: 28px;
  margin-block-start: unset;
  margin-block-end: unset;
`
const SurveyBlockH2 = MobilityGuideBlockH2
const MobilityGuideBlockH3 = styled.h3`
  font-size: 22px;
  font-weight: 400;
  line-height: 27px;
  margin-block-start: 8px;
  margin-block-end: unset;
`
const SurveyBlockH3 = MobilityGuideBlockH3

const ActionButtonContainer = styled.div`
  display: flex;
  margin-top: ${({ isMobile }) => (isMobile ? '0px' : '16px')};
  margin-bottom: ${({ isMobile }) => (isMobile ? '12px' : '0px')};
  justify-content: ${({ isMobile }) => (isMobile ? 'center' : 'flex-start')};
  a {
    text-align: center;
    max-width: ${({ isMobile }) => (isMobile ? '225px' : '327px')};
    font-weight: 700;
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14),
      0px 3px 14px rgba(0, 0, 0, 0.12), 0px 4px 5px rgba(0, 0, 0, 0.2);
  }
`

const actionButtonStyle = `
  text-decoration: none;
  background-color: ${COLOR_PRIMARY};
  height: 50px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 205px;
`

const ActionButton = styled(Link)`
  &,&: hover {
    color: #fff;
  }

  ${actionButtonStyle}
`

const ActionButtonSecondary = styled.a`
  ${actionButtonStyle}
  background-color: #fff;
  color: ${COLOR_PRIMARY};
  margin: auto;
  margin-top: 15px;
  filter: drop-shadow(0px 8px 10px rgba(0, 0, 0, 0.14))
    drop-shadow(0px 3px 14px rgba(0, 0, 0, 0.12))
    drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.2));
`

const HomePage = () => {
  const windowsSize = useWindowSize()
  const isMobile = isMobileView(windowsSize)

  return (
    <MainLayout
      isMobile={isMobile}
      topMobileMenu
      style={{ background: '#fff' }}
    >
      <Helmet>
        <title>Mobiville - La Mobilité Facile en France</title>
        <meta
          name="description"
          content="Mobiville est un service vous permettant de trouver la ville qui correspond à votre besoin ainsi que les aides financières à la mobilité."
        />
      </Helmet>

      <TopBlockContainer isMobile={isMobile}>
        <TopBlock isMobile={isMobile}>
          <H1 isMobile={isMobile}>
            Trouver l’emploi et la ville qui va avec !
          </H1>
          <MainNavButtonsContainer isMobile={isMobile}>
            <MainNavButton to="/rechercher" isMobile={isMobile}>
              <MagnifyingGlassIcon />
              <span>Rechercher ou découvrir une ville</span>
            </MainNavButton>
            <MainNavButton to="/aides" isMobile={isMobile}>
              <SuperheroIcon />
              <span>Les aides pour mon projet</span>
            </MainNavButton>
          </MainNavButtonsContainer>
          <TaglineP isMobile={isMobile}>
            Mobiville vous aide à identifier les territoires dans lesquels il y
            a de l’emploi et peu de concurrence afin d’accélérer votre retour à
            l’emploi
          </TaglineP>
        </TopBlock>
      </TopBlockContainer>

      <BlocksContainer isMobile={isMobile}>
        <Block style={{ padding: 0 }}>
          <AdvantageH2 isMobile={isMobile}>
            Les avantages de votre service Mobiville
          </AdvantageH2>
          <AdvantageBlocksContainer isMobile={isMobile}>
            <AdvantageBlock isMobile={isMobile}>
              <AdvantageIconContainer>
                <MapPointerIcon />
              </AdvantageIconContainer>
              <div>
                <AdvantageH3>
                  Identifiez
                  <br /> la meilleure destination
                </AdvantageH3>
                <AdvantageTextP>
                  Mobiville vous donne une visibilité sur le marché de l’emploi,
                  de l’immobilier et le cadre de vie afin de choisir une ville
                  qui correspond à votre profil.
                </AdvantageTextP>
              </div>
            </AdvantageBlock>
            <AdvantageBlock isMobile={isMobile}>
              <AdvantageIconContainer>
                <PrizeIcon />
              </AdvantageIconContainer>
              <div>
                <AdvantageH3>
                  Évitez
                  <br /> la concurrence
                </AdvantageH3>
                <AdvantageTextP>
                  Notre service vous propose en priorité les villes avec peu de
                  candidats sur le territoire afin d’optimiser votre recherche
                  d’emploi.
                </AdvantageTextP>
              </div>
            </AdvantageBlock>
            <AdvantageBlock isMobile={isMobile}>
              <AdvantageIconContainer>
                <MoneyClockIcon />
              </AdvantageIconContainer>
              <div>
                <AdvantageH3>
                  Gagnez
                  <br /> du temps et de l’argent
                </AdvantageH3>
                <AdvantageTextP>
                  Découvrez des conseils et des aides financières,
                  administratives ou humaines que vous pouvez mobiliser dans
                  votre projet.
                </AdvantageTextP>
              </div>
            </AdvantageBlock>
          </AdvantageBlocksContainer>
        </Block>

        <MobilityGuideBlock isMobile={isMobile}>
          <div className="mobility-container">
            <MobilityGuideBlockH2 isMobile={isMobile}>
              Par où commencer ?...{isMobile && <br />} Où aller ?...
              {isMobile && <br />} Comment faire ?...
            </MobilityGuideBlockH2>
            <MobilityGuideBlockH3 isMobile={isMobile}>
              Les réponses se trouvent dans notre guide à la mobilité
            </MobilityGuideBlockH3>
            {isMobile && (
              <img className="centered" src={mobilityHomepagePic} alt="" />
            )}
            <ActionButtonContainer isMobile={isMobile}>
              <ActionButton to="/mobility-guide">
                Consultez notre guide {isMobile && <br />}sur la mobilité
              </ActionButton>
            </ActionButtonContainer>
          </div>
          {!isMobile && <img src={mobilityHomepagePic} alt="" />}
        </MobilityGuideBlock>

        <SurveyBlock>
          <SurveyBlockH2 isMobile={isMobile}>
            Mobiville a besoin de votre aide pour s’améliorer
          </SurveyBlockH2>
          <SurveyBlockH3 isMobile={isMobile}>
            Aidez nous en répondant à notre enquête de satisfaction
          </SurveyBlockH3>
          <ActionButtonSecondary
            href="https://startupsbeta.typeform.com/to/kPDt1Rfk"
            target="_blank"
            rel="noreferrer noopener"
            style={{ fontWeight: 700, lineHeight: 21 }}
          >
            Répondre à l’enquête
          </ActionButtonSecondary>
        </SurveyBlock>
      </BlocksContainer>
    </MainLayout>
  )
}

export default HomePage
