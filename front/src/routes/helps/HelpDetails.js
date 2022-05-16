import React, {useEffect} from 'react'
import styled from 'styled-components'
import {Link, useParams} from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { useHelps } from '../../common/contexts/helpsContext'
import { useWindowSize } from '../../common/hooks/window-size'
import MainLayout from '../../components/MainLayout'
import {
  COLOR_GRAY, COLOR_OTHER_GREEN,
  COLOR_PRIMARY, COLOR_TEXT_PRIMARY, COLOR_TEXT_SECONDARY,
} from '../../constants/colors'
import { isMobileView } from '../../constants/mobile'
import {ucFirst, useElementOnScreen} from '../../utils/utils'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"
import HomeWorkIcon from "@mui/icons-material/HomeWork"
import EuroIcon from "@mui/icons-material/Euro"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import PeopleIcon from "@mui/icons-material/People"

const HeaderLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${COLOR_OTHER_GREEN};
  margin: ${({ isMobile }) => (isMobile ? '10px 10px 0px auto' : '29px 0px -36px -69px')};
`

const Container = styled.div`
  display: ${({ isMobile }) => (isMobile ? 'block' : 'flex')};
  max-width: ${({ isMobile }) => (isMobile ? 'inherit' : '1100px')};
  margin: 0 auto;
  align-items: ${({ isMobile }) => (isMobile ? 'flex-start' : 'stretch')};;
  padding: ${({ isMobile }) => (isMobile ? '0' : '0 16px')};
  flex-direction: ${({ isMobile }) => (isMobile ? 'unset' : 'column')};
`

const TitleContainer = styled.div`
  display: ${({ isMobile }) => (isMobile ? 'block' : 'flex')};
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  border: ${({ isMobile }) => (isMobile ? 'none' : `1px solid ${COLOR_GRAY}`)};
  margin-bottom: ${({ isMobile }) => (isMobile ? '8px' : '21px')};
`

const TitleImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  width: ${({ isMobile }) => (isMobile ? 'auto' : '15%')};
`

const TitleTextContainer = styled.div`
  text-align: ${({ isMobile }) => (isMobile ? 'center' : 'left')};
  margin: ${({ isMobile }) => (isMobile ? '0px 0px 17px 0px' : '30px 0px 30px 22px')};
  width: ${({ isMobile }) => (isMobile ? 'auto' : '50%')};
`

const TitleDemande = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 25px;
  width: 30%;
`

const HelpType = styled.div`
  display: flex;
  align-items: start;
  color: ${COLOR_PRIMARY};
  margin-bottom: 8px;
  font-weight: 700;
  font-size: 16px;
`

const HelpItemText = styled.div`
  margin-left: 8px;
  font-weight: 700;
  font-size: 16px;
`

const HeaderTitle = styled.h1`
  font-weight: ${({ isMobile }) => (isMobile ? '700' : '900')};
  font-size: 24px;
  margin: 0px;
`

const Panel = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 16px 16px 8px;
  width: 100%;
  margin-bottom: ${({ isMobile }) => (isMobile ? '8px' : `16px`)};
  border: ${({ isMobile }) => (isMobile ? 'none' : `1px solid ${COLOR_GRAY}`)};
`

const PanelTitle = styled.h2`
  font-weight: 700;
  font-size: ${({ isMobile }) => (isMobile ? '18px' : '24px')};
  margin: ${({ isMobile }) => (isMobile ? '0 0 16px' : '0px')};
`

const DoublePanelsContainer = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  color: ${COLOR_PRIMARY};

  & > *:first-child {
    margin-right: 16px;
  }
`
const PanelsContainer = styled.div`
  width: 100%;
`

const DescriptionAide = styled.p`
  font-size: ${({ isMobile }) => (isMobile ? '16px' : '18px')};
  font-weight: 700;
  margin: ${({ isMobile }) => (isMobile ? '8px' : '0px')};
`

const DescriptionAideProposee = styled.p`
  font-size: 16px;
  color: ${({ isMobile }) => (isMobile ? COLOR_TEXT_SECONDARY : COLOR_TEXT_PRIMARY)};
  margin: 8px;
`

const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin: 8px 0px;
`

const HelpLink = styled.a`
  display: flex;
  height: 48px;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  background: ${COLOR_PRIMARY};
  border-radius: 48px;
  padding: 12px 0px;
  width: 214px;
  margin: auto;
  box-shadow: 0px 8px 10px rgb(0 0 0 / 14%), 0px 3px 14px rgb(0 0 0 / 12%), 0px 4px 5px rgb(0 0 0 / 20%);
  &,
  &:hover {
    color: #fff;
  }
`

const StickyHelp = styled.div`
  position: sticky;
  height: 60px;
  left: 0;
  right: 0;
  bottom: 0px;
  z-index: 1;
`

const HelpDetailsPage = () => {
  const { slug } = useParams()
  const { help, onLoadPreview } = useHelps()
  const size = useWindowSize()
  const [containerRef, isVisibleHelpButton] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0
  })

  const isMobile = isMobileView(size)

  useEffect(() => {
    if (slug) {
      onLoadPreview(slug)
    }

  }, [slug])

  if (!help) {
    return <MainLayout>Chargement…</MainLayout>
  }

  return (
    <MainLayout menu={{ visible: !isMobile }}>
      <Helmet>
        <title>{help.title} - Mobiville</title>
        <meta
          name="description"
          content="Cette aide va vous permettre d'aborder votre projet de mobilité plus sereinement"
        />
      </Helmet>

      <Container isMobile={isMobile}>

      {!isMobile && (
        <div>
        <HeaderLink to={`/aides`+window.location.search} title="Fermer" isMobile={isMobile}>
          <ArrowBackIcon color="primary" fontSize="large" />
        </HeaderLink>
        <TitleContainer isMobile={isMobile}>
          <TitleTextContainer isMobile={isMobile}>
            <HelpType>
              {help.type.includes('admin') ? (
                  <ReceiptLongIcon />
              ) : help.type.includes('logement') ? (
                  <HomeWorkIcon />
              ) : help.type.includes('financière') ? (
                  <EuroIcon />
              ) : help.type.includes('transport') ? (
                  <DirectionsCarIcon />
              ) : (
                  <PeopleIcon />
              )}
              <HelpItemText>{help.type}</HelpItemText>
            </HelpType>
            <HeaderTitle>{help.title}</HeaderTitle>
            <DescriptionAide>
              {help.goal}
            </DescriptionAide>
          </TitleTextContainer>
          <TitleImgContainer isMobile={isMobile}>
            <img
                src={`/help-logos/${help.logo}`}
                alt=""
                style={{
                  width: 96,
                  height: 'auto',
                }}
            />
          </TitleImgContainer>
          <TitleDemande>
            <DescriptionAideProposee>
              Aide proposée par {help.partner}
            </DescriptionAideProposee>

            <div>
              <HelpLink
                  target="_blank"
                  href={help.link}
                  tag-exit={`faire-ma-demande/${help.title}`}
                  isMobile={isMobile}
                  ref={containerRef}
              >
                Demander l'aide
              </HelpLink>
            </div>
          </TitleDemande>
        </TitleContainer>
        </div>
      )}
      {isMobile && (
        <TitleContainer isMobile={isMobile}>
          <HeaderLink to="/aides" title="Fermer" isMobile={isMobile}>
            <CloseIcon color="primary" fontSize="large" />
          </HeaderLink>
          <TitleImgContainer isMobile={isMobile}>
            <img
                src={`/help-logos/${help.logo}`}
                alt=""
                style={{
                  width: 96,
                  height: 'auto',
                }}
            />
          </TitleImgContainer>
          <TitleTextContainer isMobile={isMobile}>
            <HeaderTitle isMobile={isMobile}>{help.title}</HeaderTitle>
            <DescriptionAide isMobile={isMobile}>
              {help.goal}
            </DescriptionAide>

            <DescriptionAideProposee isMobile={isMobile}>
              Aide proposée par {help.partner}
            </DescriptionAideProposee>

            <a
                target="_blank"
                href={help.link}
                style={{ cursor: 'pointer' }}
                tag-exit={`faire-ma-demande/${help.title}`}
            >
              <HelpLink
                  target="_blank"
                  href={help.link}
                  tag-exit={`faire-ma-demande/${help.title}`}
                  isMobile={isMobile}
                  ref={containerRef}
              >
                Demander l'aide
              </HelpLink>
            </a>
          </TitleTextContainer>
        </TitleContainer>
      )}
        <PanelsContainer isMobile={isMobile}>
          <DoublePanelsContainer isMobile={isMobile}>
            <Panel isMobile={isMobile}>
              <PanelTitle isMobile={isMobile}>Public concerné</PanelTitle>
              <Description
                           dangerouslySetInnerHTML={{
                             __html: help.who
                                 .split('^')
                                 .map((t) => ucFirst(t))
                                 .join(' · '),
                           }}
              />
            </Panel>
            <Panel isMobile={isMobile}>
              <PanelTitle isMobile={isMobile}>Est-elle cumulable ?</PanelTitle>
              <Description
                           dangerouslySetInnerHTML={{
                             __html: help.cumulable,
                           }}
              />
            </Panel>
          </DoublePanelsContainer>

          <Panel isMobile={isMobile}>
            <PanelTitle isMobile={isMobile}>
              Descriptif de l{"'"}
              aide
            </PanelTitle>
            <Description
                         dangerouslySetInnerHTML={{
                           __html: help.description,
                         }}
            />
          </Panel>
          <Panel isMobile={isMobile}>
            <PanelTitle isMobile={isMobile}>Quand faire la demande ?</PanelTitle>
            <Description
                         dangerouslySetInnerHTML={{
                           __html: help.when,
                         }}
            />
          </Panel>
          <Panel isMobile={isMobile}>
            <PanelTitle isMobile={isMobile}>Quelles conditions ?</PanelTitle>
            <Description
                         dangerouslySetInnerHTML={{
                           __html: help.conditions,
                         }}
            />
          </Panel>
        </PanelsContainer>
        <div />
      </Container>
      {!isVisibleHelpButton && (
        <StickyHelp>
          <a
            target="_blank"
            href={help.link}
            style={{ cursor: 'pointer' }}
            tag-exit={`faire-ma-demande/${help.title}`}
          >
            <HelpLink
              target="_blank"
              href={help.link}
              tag-exit={`faire-ma-demande/${help.title}`}
              isMobile={isMobile}
            >
              Demander l'aide
            </HelpLink>
          </a>
        </StickyHelp>
        )}
    </MainLayout>
  )
}

export default HelpDetailsPage
