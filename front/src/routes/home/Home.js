import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import MainLayout from '../../components/MainLayout'
import { COLOR_PRIMARY, COLOR_BACKGROUND } from '../../constants/colors'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView, MOBILE_WIDTH } from '../../constants/mobile'

import heroHomepagePic from '../../assets/images/00-Hero-Homepage.png'
import mobilityHomepagePic from '../../assets/images/02-Mobility-Homepage.png'
import { ReactComponent as MapPointerIcon } from '../../assets/images/map-pointer.svg'
import { ReactComponent as PrizeIcon } from '../../assets/images/prize.svg'
import { ReactComponent as MoneyClockIcon } from '../../assets/images/money-clock.svg'
import ArrowForward from '@mui/icons-material/ArrowForward'

const H1 = styled.h1`
  font-size: 36px;
  margin: 0;
  font-weight: 900;
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
  padding-bottom: 60px;
`

const TopBlock = styled(Block)`
  text-align: center;
  /* padding: ${({ isMobile }) => (isMobile ? '64px 16px' : '64px')}; */
  padding-top: 0px;
  .promesse-container {
    display: flex;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
    .promesse {
      margin-top: ${({ isMobile }) => (isMobile ? '34px' : 'unset')};
      justify-content: center;
      display: flex;
      text-align: start;
      flex-direction: column;
    }
    .hero {
      margin: auto;
      max-width: 262px;
      max-height: 262px;
      @media (max-width: ${MOBILE_WIDTH}px) {
        width: 192px;
        height: 192px;
      }
    }
  }
`

const MainNavButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
`

const MainNavButton = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 16px;
  color: ${COLOR_PRIMARY};
  font-weight: 700;
  font-size: 24px;
  padding: 16px;
  max-height: 88px;
  width: 100%;
  transition: all 0.3s ease-in-out;
  :hover,
  :focus {
    background: ${COLOR_PRIMARY};
    color: #fff;
    .icon-forward {
      color: ${COLOR_PRIMARY};
      background: #fff;
    }
  }
  .icon-forward {
    vertical-align: middle;
    background-color: #c3e9e9;
    border-radius: 20px;
    width: 36px;
    height: 36px;
    padding: 8px;
    margin-left: 8px;
  }
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
  font-weight: 400;
  line-height: 27px;
  font-size: ${({ isMobile }) => (isMobile ? '18px' : '22px')};
  margin: 0;
  em {
    color: #191970;
    font-weight: 700;
    font-style: normal;
  }
`

const BlocksContainer = styled.div`
  padding: ${({ isMobile }) => (isMobile ? '25px 10px 0px' : '25px 0px 0px')};
`

const AdvantageBlocksContainer = styled.div`
  display: flex;
  margin: 0 auto 22px;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
`

const AdvantageBlock = styled.div`
  background: ${COLOR_BACKGROUND};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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
  padding-bottom: 5px;
`

const AdvantageH2 = styled.h2`
  margin: 0 auto 20px;
  text-align: center;
  font-weight: 900;
  font-size: 24px;
`

const AdvantageH3 = styled.h3`
  margin-top: 0;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  margin-block-end: unset;
  margin-bottom: 5px;
`

const AdvantageTextP = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  text-align: justify;
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
  margin-bottom: 0px;
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
  color: #fff;
  :active {
    background: #4e4ec9;
    color: #fff;
  }
  :focus {
    background: #191970;
    color: #fff;
  }
  :hover {
    color: #fff;
    background: #191970;
    opacity: 0.9;
  }
  :disabled {
    background: #e4e9ed;
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

  :active {
    background: #e4e9ed;
  }
  :hover {
    background: #f6f7fb;
  }
  :focus {
    background: #ffffff;
  }
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
          <div className="promesse-container">
            <div className="promesse">
              <H1 isMobile={isMobile}>
                Trouvez l’emploi et la ville qui va avec !
              </H1>
              <TaglineP isMobile={isMobile}>
                Décrochez l’emploi dans la ville qui vous correspond et
                identifiez les aides pour votre projet de mobilité
              </TaglineP>
            </div>
            <img className="hero" src={heroHomepagePic} alt="" />
          </div>
          <MainNavButtonsContainer isMobile={isMobile}>
            <MainNavButton to="/rechercher" isMobile={isMobile}>
              <span>
                {isMobile
                  ? 'Rechercher une ville'
                  : 'Rechercher ou découvrir une ville'}
                <ArrowForward className="icon-forward" />
              </span>
            </MainNavButton>
            <MainNavButton to="/aides" isMobile={isMobile}>
              <span>
                {isMobile
                  ? 'Rechercher des aides'
                  : 'Rechercher des aides pour mon projet'}
                <ArrowForward className="icon-forward" />
              </span>
            </MainNavButton>
          </MainNavButtonsContainer>
        </TopBlock>
      </TopBlockContainer>

      <BlocksContainer isMobile={isMobile}>
        <Block style={{ padding: 0 }}>
          <AdvantageH2 isMobile={isMobile}>
            Les avantages du service Mobiville
          </AdvantageH2>
          <AdvantageBlocksContainer isMobile={isMobile}>
            <AdvantageBlock isMobile={isMobile}>
              <AdvantageIconContainer>
                <MapPointerIcon />
              </AdvantageIconContainer>
              <AdvantageH3>
                Identifiez
                <br /> la meilleure destination
              </AdvantageH3>
              <AdvantageTextP>
                Mobiville vous donne une visibilité sur le marché de l’emploi,
                de l’immobilier et le cadre de vie afin de choisir une ville qui
                correspond à votre profil.
              </AdvantageTextP>
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
            {isMobile ? 'Faire ma demande' : 'Répondre à l’enquête'}
          </ActionButtonSecondary>
        </SurveyBlock>
      </BlocksContainer>
    </MainLayout>
  )
}

export default HomePage
