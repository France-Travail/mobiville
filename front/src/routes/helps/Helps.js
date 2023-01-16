import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import queryString from 'query-string'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

import { useHelps } from '../../common/contexts/helpsContext'
import { useWindowSize } from '../../common/hooks/window-size'
import MainLayout from '../../components/MainLayout'
import {
  COLOR_OTHER_GREEN,
  COLOR_PRIMARY,
  COLOR_WHITE,
} from '../../constants/colors'
import { isMobileView } from '../../constants/mobile'
import { useScroll } from '../../common/hooks/use-scroll'

import { Grid } from '@mui/material'
import MobileAppliedFilters from './components/MobileAppliedFilters'
import HelpCard from './components/HelpCard'
import { HelpForm } from '../../components'

import EuroIcon from '@mui/icons-material/Euro'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import PeopleIcon from '@mui/icons-material/People'
import {
  AGE_SITUATIONS,
  JOB_SITUATIONS,
  PROJECTS,
} from '../../constants/search'

const TitleContainer = styled.div`
  padding: ${({ $isMobile }) => ($isMobile ? '5px 0px 0px 10px' : '0px')};
`

const Title = styled.h1`
  max-width: 1036px;
  height: 42px;
  margin: 20px auto;
  margin-bottom: 16px;

  display: ${({ $isMobile }) => ($isMobile ? 'contents' : 'flex')};
  align-items: center;

  font-weight: 900;
  font-size: ${({ $isMobile }) => ($isMobile ? '24px' : '36px')};
  line-height: 42px;

  color: ${COLOR_PRIMARY};
`

const Header = styled.div`
  margin-top: ${({ $isMobile }) => ($isMobile ? '13px' : '0')};

  display: flex;
  flex-direction: column;
  align-items: center;

  font-weight: bold;
  background-color: ${({ $isMobile }) => $isMobile ? 'none' : COLOR_OTHER_GREEN};

  ${({ $isMobile }) =>
    !$isMobile &&
    css`
      position: sticky;
      top: 0;
      left: 0;
    `}
`

const HelpFormContainer = styled.div`
  width: 100%;
  margin: 23px 0;
`

const MySearchContainer = styled.div`
  margin-top: 5px;
  align-self: start;
`

const Container = styled.div`
  width: 100%;
  max-width: 1040px;
  margin: 0 auto 64px auto;

  display: flex;
  align-items: flex-start;

  ${({ $isMobile }) =>
    $isMobile &&
    `
    padding: 0 16px;
    display: block;
    padding: 0;
  `}
`

const HelpsPanel = styled.div`
  flex: 1;
  padding: ${({ $isMobile }) => ($isMobile ? '16px' : '')};
`

const HelpTypeTitleContainer = styled.div`
  height: 71px;
  margin-top: ${({ isFirst }) => (isFirst ? '32px' : '48px')};
  margin-bottom: 20px;
  padding-left: 8px;

  flex: none;
  order: 0;
  flex-grow: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  border-radius: 4px;

  h2 {
    width: ${({ $isMobile }) => ($isMobile ? '248px' : '410px')};
    font-weight: 900;
    font-size: 24px;
    line-height: 28px;
    color: ${COLOR_PRIMARY};
    flex: none;
    order: 1;
    flex-grow: 0;
  }
`

const CustomGridContainer = styled(Grid)`
  width: ${({ $isMobile }) => ($isMobile ? '350px' : '1050px')};
  margin: auto;
`

const Anchors = styled.div`
  width: 100%;
  padding: 13px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: ${({ $isMobile }) => ($isMobile ? '8px' : '16px')};
  flex-wrap: wrap;

  background: ${({ $isMobile }) => ($isMobile ? 'none' : COLOR_WHITE)};
`

const Anchor = styled.button`
  padding: 8px;
  border: 1px solid ${COLOR_OTHER_GREEN};
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  background: ${({ $active }) => ($active ? COLOR_OTHER_GREEN : COLOR_WHITE)};

  font-weight: 400;
  font-size: 16px;
  color: ${COLOR_PRIMARY};

  &:hover {
    background: ${COLOR_OTHER_GREEN};
    cursor: pointer;
  }

  &:focus {
    outline: none !important;
    outline-offset: none !important;
    background: ${({ $active }) => ($active ? COLOR_OTHER_GREEN : 'none')};
  }
`

const StickyFooter = styled.div`
  width: 100%;
  visibility: ${({ $isScrollingUp }) => ($isScrollingUp ? 'show' : 'hidden')};
  position: fixed;
  bottom: 68px;

  display: flex;
  justify-content: center;
`

const FINANCIERE = 'financiere'
const ACCOMPAGNEMENT = 'accompagnement'
const LOGEMENT = 'logement'
const TRANSPORT = 'transport'

const Helps = () => {
  // contexts
  const { previews, onLoadPreviews } = useHelps()
  const { search, hash } = useLocation()
  const size = useWindowSize()
  const isMobile = isMobileView(size)
  const { isScrollingUp, currentScroll } = useScroll()

  // scroll gesture
  const [activeAnchor, setActiveAnchor] = useState()
  const [initialScrollDone, setInitialScrollDone] = useState(false)
  const financiereHeaderRef = useRef(null)
  const accompagnementHeaderRef = useRef(null)
  const logementHeaderRef = useRef(null)
  const transportHeaderRef = useRef(null)

  // helps data
  const [filteredItems, setFilteredItems] = useState([])
  const [allItems, setAllItems] = useState([])
  const [financeItems, setFinanceItems] = useState([])
  const [logementItems, setLogementItems] = useState([])
  const [accompagnementItems, setAccompagnementItems] = useState([])
  const [transportItems, setTransportItems] = useState([])

  // filters
  const [projects, setProjects] = useState([])
  const [situations, setSituations] = useState([])

  useEffect(() => {
    onLoadPreviews()
  }, [])

  useEffect(() => {
    setAllItems(previews)
  }, [previews])

  useEffect(() => {
    const parsedQueryString = queryString.parse(search)

    const parsedProjects = parsedQueryString.project
      ? typeof parsedQueryString.project === 'string'
        ? [parsedQueryString.project]
        : parsedQueryString.project
      : []
    const parsedSituations = parsedQueryString.situation
      ? typeof parsedQueryString.situation === 'string'
        ? [parsedQueryString.situation]
        : parsedQueryString.situation
      : []

    setProjects(PROJECTS.filter(({ key }) => parsedProjects.includes(key)))
    setSituations(
      [...JOB_SITUATIONS, ...AGE_SITUATIONS].filter(({ key }) =>
        parsedSituations.includes(key)
      )
    )
  }, [search])

  useEffect(() => {
    setFilteredItems(
      allItems.filter((preview) => {
        if (
          situations.length &&
          !situations.every(({ key }) =>
            preview.who.toLowerCase().includes(key.toLowerCase())
          )
        ) {
          return false
        }
        if (
          projects.length &&
          !projects.some(({ key }) =>
            preview.situation.toLowerCase().includes(key.toLowerCase())
          )
        ) {
          return false
        }
        return true
      })
    )
  }, [allItems, situations, projects])

  useEffect(() => {
    setFinanceItems(
      allItems.filter((preview) =>
        preview.type.toLowerCase().includes('aide financière')
      )
    )
    setLogementItems(
      allItems.filter((preview) =>
        preview.type.toLowerCase().includes('accès au logement')
      )
    )
    setAccompagnementItems(
      allItems.filter((preview) =>
        preview.type.toLowerCase().includes('accompagnement')
      )
    )
    setTransportItems(
      allItems.filter((preview) =>
        preview.type.toLowerCase().includes('aide transport')
      )
    )
  }, [allItems])

  useEffect(() => {
    if ((!!projects && projects.length) || (!!situations && situations.length))
      return

    const financiereHeaderPositionY =
      financiereHeaderRef.current.getBoundingClientRect().y
    const accompagnementHeaderPositionY =
      accompagnementHeaderRef.current.getBoundingClientRect().y
    const logementHeaderPositionY =
      logementHeaderRef.current.getBoundingClientRect().y
    const transportHeaderPositionY =
      transportHeaderRef.current.getBoundingClientRect().y

    const FOCUS_TRIGGER_AREA = 200

    if (currentScroll < 20) {
      setActiveAnchor(null)
    } else if (
      (!isScrollingUp && transportHeaderPositionY < FOCUS_TRIGGER_AREA + 50) ||
      transportHeaderPositionY < size.height - (FOCUS_TRIGGER_AREA + 50)
    ) {
      setActiveAnchor(TRANSPORT)
    } else if (
      (!isScrollingUp && logementHeaderPositionY < FOCUS_TRIGGER_AREA) ||
      logementHeaderPositionY < size.height - FOCUS_TRIGGER_AREA
    ) {
      setActiveAnchor(LOGEMENT)
    } else if (
      (!isScrollingUp && accompagnementHeaderPositionY < FOCUS_TRIGGER_AREA) ||
      accompagnementHeaderPositionY < size.height - FOCUS_TRIGGER_AREA
    ) {
      setActiveAnchor(ACCOMPAGNEMENT)
    } else if (
      (!isScrollingUp && financiereHeaderPositionY < FOCUS_TRIGGER_AREA) ||
      financiereHeaderPositionY < size.height - FOCUS_TRIGGER_AREA
    ) {
      setActiveAnchor(FINANCIERE)
    }
  }, [currentScroll, isScrollingUp, projects, situations])

  useEffect(() => {
    if (!!allItems && !initialScrollDone && !!hash && !search) {
      const hashAnchor = hash.substring(1)

      let ref = null
      if (hashAnchor === FINANCIERE) {
        ref = financiereHeaderRef
      } else if (hashAnchor === ACCOMPAGNEMENT) {
        ref = accompagnementHeaderRef
      } else if (hashAnchor === LOGEMENT) {
        ref = logementHeaderRef
      } else if (hashAnchor === TRANSPORT) {
        ref = transportHeaderRef
      }

      if (!!ref) {
        setInitialScrollDone(true)
        setTimeout(() => {
          scrollTo(ref)
        }, 350)
      }
    }
  }, [hash, allItems, initialScrollDone])

  const handleAnchorClick = (ref) => {
    scrollTo(ref)
  }

  const scrollTo = (ref) => {
    const BANNER_SIZE = 216
    const scrollTop = ref.current.offsetTop - BANNER_SIZE
    window.scroll({
      top: scrollTop,
      behavior: 'smooth',
    })
  }

  const HelpList = ({ items }) => (
    <CustomGridContainer
      container
      justifyContent={isMobile ? 'center' : 'start'}
      columnSpacing={{
        xs: 0,
        md: 2,
      }}
      rowSpacing={2}
    >
      {items.map((item) => (
        <HelpCard key={item.id} help={item}></HelpCard>
      ))}
    </CustomGridContainer>
  )

  const ResultTitle = () => (
    <TitleContainer $isMobile={isMobile}>
      <Title $isMobile={isMobile}>
        {!(
          (!!projects && projects.length) ||
          (!!situations && situations.length)
        ) ? (
          'Toutes les aides à la mobilité professionnelle et résidentielle'
        ) : (
          <>
            {filteredItems.length} aide
            {filteredItems.length > 1 ? 's ' : ' '}
            disponible{filteredItems.length > 1 ? 's ' : ' '}
            {isMobile ? <br /> : null}
            pour votre situation
          </>
        )}
      </Title>
    </TitleContainer>
  )

  const GeneratedHelpsPanel = useCallback(
    () => (
      <>
        {(!!projects && projects.length) ||
        (!!situations && situations.length) ? (
          <HelpList items={filteredItems} />
        ) : (
          <>
            <HelpTypeTitleContainer isFirst={true} $isMobile={isMobile}>
              <h2 id={FINANCIERE} ref={financiereHeaderRef}>
                Les aides financières
              </h2>
            </HelpTypeTitleContainer>
            <HelpList items={financeItems} />

            <HelpTypeTitleContainer $isMobile={isMobile}>
              <h2 id={ACCOMPAGNEMENT} ref={accompagnementHeaderRef}>
                Les aides {isMobile ? <br /> : ''} d'accompagnement
              </h2>
            </HelpTypeTitleContainer>
            <HelpList items={accompagnementItems} />

            <HelpTypeTitleContainer $isMobile={isMobile}>
              <h2 id={LOGEMENT} ref={logementHeaderRef}>
                Les aides au logement
              </h2>
            </HelpTypeTitleContainer>
            <HelpList items={logementItems} />

            <HelpTypeTitleContainer $isMobile={isMobile}>
              <h2 id={TRANSPORT} ref={transportHeaderRef}>
                Les aides transport
              </h2>
            </HelpTypeTitleContainer>
            <HelpList items={transportItems} />
          </>
        )}
      </>
    ),
    [
      projects,
      situations,
      filteredItems,
      financeItems,
      accompagnementItems,
      logementItems,
      transportItems,
    ]
  )

  return (
    <MainLayout topMobileMenu>
      <Helmet>
        <title>Identifiez les aides à la mobilité | Mobiville</title>
        <meta
          name="description"
          content="Découvrez des conseils et des aides financières, administratives ou humaines que vous pouvez mobiliser dans votre projet de mobilité professionnelle et résidentielle."
        />
      </Helmet>

      <Header $isMobile={isMobile} $isScrollingUp={isScrollingUp}>
        {!isMobile && (
          <HelpFormContainer>
            <HelpForm />
          </HelpFormContainer>
        )}

        {isMobile && (
          <div
            style={{
              alignSelf:
                (!!projects && projects.length) ||
                (!!situations && situations.length)
                  ? 'start'
                  : 'center',
            }}
          >
            {!(
              (!projects || !projects.length) &&
              (!situations || !situations.length)
            ) && (
              <MySearchContainer>
                <TitleContainer $isMobile={isMobile}>
                  <Title $isMobile={isMobile}>Ma recherche</Title>
                </TitleContainer>
              </MySearchContainer>
            )}
            <MobileAppliedFilters search={search} />
          </div>
        )}

        {!search && (
          <Anchors $isMobile={isMobile}>
            <Anchor
              onClick={() => handleAnchorClick(financiereHeaderRef)}
              $active={activeAnchor === FINANCIERE}
            >
              <EuroIcon /> Financier
            </Anchor>
            <Anchor
              onClick={() => handleAnchorClick(accompagnementHeaderRef)}
              $active={activeAnchor === ACCOMPAGNEMENT}
            >
              <PeopleIcon /> Accompagnement
            </Anchor>
            <Anchor
              onClick={() => handleAnchorClick(logementHeaderRef)}
              $active={activeAnchor === LOGEMENT}
            >
              <HomeWorkIcon /> Logement
            </Anchor>
            <Anchor
              onClick={() => handleAnchorClick(transportHeaderRef)}
              $active={activeAnchor === TRANSPORT}
            >
              <DirectionsCarIcon /> Transport
            </Anchor>
          </Anchors>
        )}
      </Header>

      <ResultTitle />

      <Container $isMobile={isMobile}>
        <HelpsPanel $isMobile={isMobile}>
          <GeneratedHelpsPanel />
        </HelpsPanel>
      </Container>

      {isMobile ? (
        <StickyFooter $isScrollingUp={isScrollingUp}>
          <MobileAppliedFilters search={search} />
        </StickyFooter>
      ) : null}
    </MainLayout>
  )
}

Helps.propTypes = {}

export default Helps
