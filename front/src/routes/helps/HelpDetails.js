import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {Link, useParams} from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { useHelps } from '../../common/contexts/helpsContext'
import { useWindowSize } from '../../common/hooks/window-size'
import MainLayout from '../../components/MainLayout'
import {
  COLOR_GRAY, COLOR_OTHER_GREEN,
  COLOR_PRIMARY, COLOR_TEXT_SECONDARY,
} from '../../constants/colors'
import { isMobileView } from '../../constants/mobile'
import { ucFirst } from '../../utils/utils'
import SubHeader from '../../components/SubHeader'
import CloseIcon from '@mui/icons-material/Close'

const HeaderCrossLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${COLOR_OTHER_GREEN};
  margin: 10px 10px 0px auto;
`

const Container = styled.div`
  display: ${({ isMobile }) => (isMobile ? 'block' : 'flex')};
  max-width: ${({ isMobile }) => (isMobile ? 'inherit' : '1100px')};
  margin: 0 auto;
  align-items: flex-start;
  padding: ${({ isMobile }) => (isMobile ? '0' : '0 16px')};
`

const TitleContainer = styled.div`
  margin-right: ${({ isMobile }) => (isMobile ? '0' : '16px')};
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  border: ${({ isMobile }) => (isMobile ? 'none' : `1px solid ${COLOR_GRAY}`)};
  margin-bottom: 8px;
`

const TitleImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`

const TitleTextContainer = styled.div`
  text-align: center;
  margin-bottom: 17px;
`

const HeaderTitle = styled.h1`
  font-weight: 700;
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
  font-weight: bold;
  font-size: 16px;
  margin: 0 0 16px;
`

const DoublePanelsContainer = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};

  & > *:first-child {
    margin-right: 16px;
  }
`
const PanelsContainer = styled.div`
  max-width: ${({ isMobile }) => (isMobile ? 'inherit' : '688px')};
  width: 100%;
`

const Description = styled.p`
  font-size: 16px;
  font-weight: 700;
  margin: 8px;
`

const DescriptionAideProposee = styled.p`
  font-size: 16px;
  color: ${COLOR_TEXT_SECONDARY};
  margin: 8px;
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
  position: fixed;
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
  const containerRef = useRef(null)
  const [ isVisibleHelpButton, setIsVisibleHelpButton ] = useState(false)

  const callbackFunction = (entries) => {
    const [entry] = entries
    setIsVisibleHelpButton(entry.isIntersecting)
  }
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0
  }

  useEffect(() => {
    if (slug) {
      onLoadPreview(slug)
    }

    const observer = new IntersectionObserver(callbackFunction, options)
    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      if(containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [slug, containerRef, options])

  const isMobile = isMobileView(size)

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
      {!isMobile && (
          <SubHeader backLink="/aides" title={help.title} isMobile={isMobile} />
      )}
      <Container isMobile={isMobile}>
        <TitleContainer isMobile={isMobile}>
          {isMobile && (
              <HeaderCrossLink to="/aides" title="Fermer" isMobile={isMobile}>
                <CloseIcon color="primary" fontSize="large" />
              </HeaderCrossLink>
          )}
          <TitleImgContainer>
            <img
              src={`/help-logos/${help.logo}`}
              alt=""
              style={{
                width: 96,
                height: 'auto',
              }}
            />
          </TitleImgContainer>
          <TitleTextContainer>
            <HeaderTitle>{help.title}</HeaderTitle>
            <Description>
              {help.goal}
            </Description>

            <DescriptionAideProposee>
              Aide proposée par {help.partner}
            </DescriptionAideProposee>

            {!isMobile && (
              <div style={{ margin: 'auto' }}>
                <HelpLink
                  target="_blank"
                  href={help.link}
                  tag-exit={`faire-ma-demande/${help.title}`}
                  isMobile={isMobile}
                >
                  Faire ma demande
                </HelpLink>
              </div>
            )}

            {isMobile && (
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
            )}
          </TitleTextContainer>
        </TitleContainer>

        <PanelsContainer isMobile={isMobile}>
          <Panel isMobile={isMobile}>
            <PanelTitle>
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
            <PanelTitle>Quand faire la demande ?</PanelTitle>
            <Description
              dangerouslySetInnerHTML={{
                __html: help.when,
              }}
            />
          </Panel>
          <Panel isMobile={isMobile}>
            <PanelTitle>Quelles conditions ?</PanelTitle>
            <Description
              dangerouslySetInnerHTML={{
                __html: help.conditions,
              }}
            />
          </Panel>

          <DoublePanelsContainer isMobile={isMobile}>
            <Panel isMobile={isMobile}>
              <PanelTitle>Est-elle cumulable ?</PanelTitle>
              <Description
                dangerouslySetInnerHTML={{
                  __html: help.cumulable,
                }}
              />
            </Panel>
            <Panel isMobile={isMobile}>
              <PanelTitle>Public concerné</PanelTitle>
              <span
                dangerouslySetInnerHTML={{
                  __html: help.who
                    .split('^')
                    .map((t) => ucFirst(t))
                    .join(' · '),
                }}
              ></span>
            </Panel>
          </DoublePanelsContainer>
        </PanelsContainer>
        <div />
      </Container>
      {isMobile && !isVisibleHelpButton && (
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
