import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import queryString from 'query-string'
import {Helmet} from 'react-helmet-async'

import {useHelps} from '../../common/contexts/helpsContext'
import {useWindowSize} from '../../common/hooks/window-size'
import MainLayout from '../../components/MainLayout'
import {COLOR_OTHER_GREEN, COLOR_PRIMARY} from '../../constants/colors'
import {isMobileView} from '../../constants/mobile'
import UseScrollingUp from './components/UseScrollingUp'

import pictoHelpAccompagnement from '../../assets/images/icons/help-accompagnement.svg'
import pictoHelpFinanciere from '../../assets/images/icons/help-financiere.svg'
import pictoHelpLogement from '../../assets/images/icons/help-logement.svg'
import pictoHelpTransport from '../../assets/images/icons/help-transport.svg'
import pictoFilterMobile from '../../assets/images/icons/filter-mobille.svg'
import {Grid} from '@mui/material'
import MobileAppliedFilters from './components/MobileAppliedFilters'
import HelpCard from './components/HelpCard'
import { HelpForm } from '../../components'

//import TypeHelpFilter from "./components/TypeHelpFilter";

const TitleContainer = styled.div`
  padding: ${({ $isMobile }) => ($isMobile ? '5px 0px 0px 10px' : '0px')};
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 20px auto;
  margin-bottom: 16px;

  width: 1036px;
  height: 42px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-size: ${({ $isMobile }) => ($isMobile ? '24px' : '36px')};
  line-height: 42px;
  display: ${({ $isMobile }) => ($isMobile ? 'contents' : 'flex')};
  align-items: center;

  color: ${COLOR_PRIMARY};
`

const Header = styled.div`
  height: 118px;

  display: flex;
  align-items: center;

  font-weight: bold;
  background-color: ${COLOR_OTHER_GREEN};

  ${({ $isMobile }) =>
    $isMobile && `
      display: block;
      margin: 102px 0 0px 0;
      padding: 0;
      height:377px;
      padding: 20px 0.5%;
  `}
`

const MySearchContainer = styled.div`
  margin-top: 105px !important;
`

const BlocFilterMobile = styled(Link)`
  display: flex;
  align-items: center;
  vertical-align: bottom;
  width: ${({ $isResults }) => ($isResults ? '95px' : '224px')};
  height: 32px;
  
  margin:${({ $isResults }) => ($isResults ? '' : '120px auto 0px !important')};
  
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #FFF;
  background: #191970;
  border-radius: 22px;

  img {
    margin: 0px 4px;
    height: 16px;
    width: 16px
  }

`

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1040px;
  margin: 0 auto 64px auto;
  align-items: flex-start;

  ${({ $isMobile }) =>
    $isMobile && `
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
  flex: none;
  order: 0;
  flex-grow: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  height: 71px;
  margin-top: ${({ isFirst }) => (isFirst ? '' : '40px')};
  margin-bottom: 20px;

  background: #c7c7f3;
  border-radius: 4px;

  h2 {
    width: ${({ $isMobile }) => ($isMobile ? '248px' : '410px')};
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 900;
    font-size: 24px;
    line-height: 28px;
    color: #191970;
    flex: none;
    order: 1;
    flex-grow: 0;
  }

  img {
    margin-left: 8px;
  }
`

const CustomGridContainer = styled(Grid)`
  width: ${({ $isMobile }) => $isMobile ? '350px' : '1050px'};
  margin: auto;
`

const CATEGORIES = [
  {
    key: 'emploi',
    icon: '/icons/emploi.svg',
    text: 'Je recherche un emploi',
    name: 'Je recherche un emploi',
  },
  {
    key: 'logement',
    icon: '/icons/logement.svg',
    text: 'Je recherche un logement',
    name: 'Je recherche un logement',
  },
  {
    key: 'déménage',
    icon: '/icons/demenagement.svg',
    text: 'Je déménage prochainement',
    name: 'Je déménage prochainement',
  },
]

const SITUATIONS = [
  {
    key: "demandeur d'emploi",
    text: "Demandeur d'emploi",
    name: "Je suis demandeur d'emploi",
  },
  {
    key: 'salarié',
    text: 'Salarié',
    name: 'Je suis salarié',
  },
  {
    key: 'alternance',
    text: 'Alternant',
    name: 'Je suis alternant',
  },
  {
    key: 'moins de 26 ans',
    text: '- 26 ans',
    name: "J'ai moins de 26 ans",
  },
  {
    key: 'plus de 26 ans',
    text: '+ 26 ans',
    name: "J'ai plus de 26 ans",
  },
]

const Helps = ({ location: { search } }) => {
  const { previews, onLoadPreviews } = useHelps()

  const size = useWindowSize()
  const isMobile = isMobileView(size)

  useEffect(() => {
    onLoadPreviews()
  }, [])

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

  const projects = CATEGORIES.filter(({ key }) => parsedProjects.includes(key))
  const situations = SITUATIONS.filter(({ key }) =>
      parsedSituations.includes(key)
  )

  function filterListHelpBySituationAndProject(preview) {
    if (situations.length) {
      if (
          !situations.every(({ key }) =>
              preview.who.toLowerCase().includes(key.toLowerCase())
          )
      ) {
        return false
      }
    }
    if (projects.length) {
      if (
          !projects.some(({ key }) =>
              preview.situation.toLowerCase().includes(key.toLowerCase())
          )
      ) {
        return false
      }
    }
    return true
  }

  previews.forEach((preview) => {
    if (preview.type.includes(',')) {
      preview.type = preview.type.substring(0, preview.type.indexOf(','))
    }
    if (preview.goal.includes('.')) {
      preview.goal = preview.goal.substring(0, preview.goal.indexOf('.') + 1)
    }
    if (
        preview.type.toLowerCase().includes('aide administrative') ||
        preview.type.toLowerCase().includes('accompagnement du projet')
    ) {
      preview.type = 'Accompagnement'
    }
  })
  const listHelpItem = previews.filter((preview) => {
    return filterListHelpBySituationAndProject(preview)
  })
  const listHelpItemFinance = listHelpItem.filter((preview) => {
    return preview.type.toLowerCase().includes('aide financière')
  })
  const listHelpItemLogement = listHelpItem.filter((preview) => {
    return preview.type.toLowerCase().includes('accès au logement')
  })
  const listHelpItemAccompagnement = listHelpItem.filter((preview) => {
    return preview.type.includes('Accompagnement')
  })
  const listHelpItemTransport = listHelpItem.filter((preview) => {
    return preview.type.toLowerCase().includes('aide transport')
  })
  const listEveryHelpItems = [
    ...listHelpItemFinance,
    ...listHelpItemLogement,
    ...listHelpItemAccompagnement,
    ...listHelpItemTransport,
  ]

  const params = decodeURIComponent(window.location.search)
  const [isFiltreRecherche, setFiltreRecherche] = useState(false)

  useEffect(() => {
    setFiltreRecherche(params && params.length > 0 ? true : false)
  }, [params])

  function getHelpsPanel(listHelpItems) {
    return (
      <CustomGridContainer
        container
        justifyContent={isMobile ? "center" : "start"}
        columnSpacing={{
          xs: 0,
          md: 2
        }}
        rowSpacing={2}
      >
        {listHelpItems.map((item) => (
          <HelpCard
            key={item.id}
            help={item}
          ></HelpCard>
        ))}
      </CustomGridContainer>
    )
  }

  function getFilteredHelpsPanel(listHelpItem, isFiltreRecherche) {
    if (!isFiltreRecherche) return
    return <>{getHelpsPanel(listEveryHelpItems)}</>
  }

  function getAllHelpsPanel(isFiltreRecherche) {
    if (isFiltreRecherche) return
    return (
        <>
          <HelpTypeTitleContainer isFirst={true} $isMobile={isMobile}>
            <img alt={''} src={pictoHelpFinanciere} />{' '}
            <h2>Les aides financières</h2>
          </HelpTypeTitleContainer>
          {getHelpsPanel(listHelpItemFinance)}

          <HelpTypeTitleContainer $isMobile={isMobile}>
            <img alt={''} src={pictoHelpAccompagnement} />{' '}
            <h2>Les aides {isMobile ? <br /> : ''} d'accompagnement</h2>
          </HelpTypeTitleContainer>
          {getHelpsPanel(listHelpItemAccompagnement)}

          <HelpTypeTitleContainer $isMobile={isMobile}>
            <img alt={''} src={pictoHelpLogement} />{' '}
            <h2>Les aides au logement</h2>
          </HelpTypeTitleContainer>
          {getHelpsPanel(listHelpItemLogement)}

          <HelpTypeTitleContainer $isMobile={isMobile}>
            <img alt={''} src={pictoHelpTransport} />
            <h2>Les aides Transport</h2>
          </HelpTypeTitleContainer>
          {getHelpsPanel(listHelpItemTransport)}
        </>
    )
  }

  function getTitle() {
    if (isFiltreRecherche) {
      return (
          <TitleContainer $isMobile={isMobile}>
            <Title $isMobile={isMobile}>
              {' '}{listEveryHelpItems.length}{' '}
              aide{listEveryHelpItems.length > 1 ? 's ' : ' '}
              disponible{listEveryHelpItems.length > 1 ? 's ' : ' '}{isMobile ? <br /> : null}
              pour votre situation
            </Title>
          </TitleContainer>
      )
    }

    return (
        <TitleContainer $isMobile={isMobile}>
          <Title $isMobile={isMobile}>
            {' '}
            Toutes les aides à la mobilité professionnelle et résidentielle{' '}
          </Title>
        </TitleContainer>
    )
  }

  const isScrollingUp = UseScrollingUp()
  const isResults = projects.length > 0 || situations.length > 0

  return (
      <MainLayout topMobileMenu>
        <Helmet>
          <title>Identifiez les aides à la mobilité | Mobiville</title>
          <meta
              name="description"
              content="Découvrez des conseils et des aides financières, administratives ou humaines que vous pouvez mobiliser dans votre projet de mobilité professionnelle et résidentielle."
          />
        </Helmet>

        {isMobile && isResults && (
            <>
              <MySearchContainer>
                <TitleContainer $isMobile={isMobile}>
                  <Title $isMobile={isMobile}>
                    Ma recherche
                  </Title>
                </TitleContainer>
              </MySearchContainer>

              <MobileAppliedFilters search={search} />
            </>
        )}
        {(isMobile && !isResults) && (
            <BlocFilterMobile $isResults={isResults} to={`/aides-filters` + window.location.search} className={`${isScrollingUp ? 'stickyFilterMobile' : ''}`}>
              <img alt={''} src={pictoFilterMobile} />
              <div>Filtrer selon votre situation</div>
            </BlocFilterMobile>
        )}

        {!isMobile && (
            <Header
                $isMobile={isMobile}
                className={`${!isMobile && isScrollingUp ? 'stickyHeader' : ''}`}
            >
              <HelpForm />
            </Header>
        )}

        {getTitle()}

        {/*EN ATTENTE MODICATIONS UX*/}
        {/*<TypeHelpFilter />*/}

        <Container $isMobile={isMobile}>
          <HelpsPanel $isMobile={isMobile}>
            {getAllHelpsPanel(isFiltreRecherche)}

            {getFilteredHelpsPanel(listHelpItem, isFiltreRecherche)}
          </HelpsPanel>
        </Container>
      </MainLayout>
  )
}

Helps.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
}

Helps.defaultProps = {
  location: {
    search: '',
  },
}
export default Helps
