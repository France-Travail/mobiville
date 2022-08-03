import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ArrowForward from '@mui/icons-material/ArrowForward'

import { useWindowSize } from '../../common/hooks/window-size'
import { COLOR_BACKGROUND, COLOR_PRIMARY, COLOR_WHITE } from '../../constants/colors'
import { isMobileView, MOBILE_WIDTH } from '../../constants/mobile'

import heroHomepagePic from '../../assets/images/00-Hero-Homepage.png'

import { MainLayout, Section } from '../../components/';
import Testimonies from './components/Testimonies'
import MobilityGuide from './components/MobilityGuide'
import Advantages from './components/Advantages'

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
  /* padding-bottom: 60px; */
  padding-bottom: 6vh;
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

const SubTitleH2 = styled.h2`
  font-weight: 400;
  line-height: 27px;
  font-size: ${({ isMobile }) => (isMobile ? '18px' : '22px')};
  margin: 0;
`

// === COMPONENT ===

const HomePage = () => {
  const windowsSize = useWindowSize()
  const isMobile = isMobileView(windowsSize)

  return (
    <MainLayout
      isMobile={isMobile}
      topMobileMenu
      style={{ background: COLOR_BACKGROUND }}
    >
      <Helmet>
        <title>Trouvez l’emploi et la ville qui va avec ! | Mobiville</title>
        <meta
          name="description"
          content="Mobiville permet aux demandeurs d’emploi et aux salariés de choisir la ville adaptée à leur projet ainsi que les aides financières à la mobilité."
        />
      </Helmet>

      {/* WELCOME SECTION */}
      <TopBlockContainer isMobile={isMobile}>
        <TopBlock isMobile={isMobile}>
          <div className="promesse-container">
            <div className="promesse">
              <H1 isMobile={isMobile}>
                Trouvez l’emploi et la ville qui va avec !
              </H1>
              <SubTitleH2 isMobile={isMobile}>
                Décrochez l’emploi dans la ville {isMobile && <br />} qui vous
                correspond {isMobile || <br />}
                et {isMobile && <br />}identifiez les aides pour votre{' '}
                {isMobile && <br />} projet de mobilité
              </SubTitleH2>
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

      {/* ADVANTAGES */}
      <Advantages></Advantages>

      {/* MOBILITY GUIDE */}
      <MobilityGuide></MobilityGuide>

      {/* TESTIMONIES */}
      <Testimonies></Testimonies>

    </MainLayout>
  )
}

export default HomePage
