import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import queryString from 'query-string'
import {Helmet} from 'react-helmet-async'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import EuroIcon from '@mui/icons-material/Euro'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import PeopleIcon from '@mui/icons-material/People'

import {useHelps} from '../../common/contexts/helpsContext'
import {useWindowSize} from '../../common/hooks/window-size'
import MainLayout from '../../components/MainLayout'
import {COLOR_OTHER_GREEN, COLOR_PRIMARY, COLOR_TEXT_PRIMARY,} from '../../constants/colors'
import {isMobileView} from '../../constants/mobile'
import {ucFirst} from '../../utils/utils'
import UseScrollingUp from './components/UseScrollingUp'

import pictoHelpAccompagnement from '../../assets/images/icons/help-accompagnement.svg'
import pictoHelpFinanciere from '../../assets/images/icons/help-financiere.svg'
import pictoHelpLogement from '../../assets/images/icons/help-logement.svg'
import pictoHelpTransport from '../../assets/images/icons/help-transport.svg'
import pictoFilterMobile from '../../assets/images/icons/filter-mobille.svg'
import {Grid} from '@mui/material'
import HelpsFilter from "./components/HelpFilters"

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

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  background: #f6f7fb;
  padding: 10px;
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

const BlocFilterMobileSearchResult = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 6px;
  gap: 8px;
  height: 32px;
  
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #191970;
  background: #FFF;
  border-radius: 22px;
  margin-right: 10px;

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

const HelpItemImgContainer = styled.div`
  display: inline-grid;
  //vertical-align: top;

  margin-left: ${({ $isMobile }) => ($isMobile ? '0px' : '5px')};

  background: white;
  width: 96px;
  align-items: start;
  justify-content: center;
`
const HelpItemTextContainer = styled.div`
  background: #ffffff;
  width: 100%;
  flex-direction: column;
  color: ${COLOR_TEXT_PRIMARY};
`

const HelpItemTextSubContainer = styled.div`
  display: inline-grid;
  vertical-align: top;
  width: ${({ $isMobile }) => ($isMobile ? '200px' : '350px')};
`

const HelpItemMobileResizer = styled.div`
  height: 8px;
  display: ${({ $isMobile }) => ($isMobile ? 'block' : 'none')};
`

const HelpItemTextTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 4px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: ${({ $isMobile }) => ($isMobile ? '21px' : '33px')};

  vertical-align: bottom;
  display: contents;

  color: ${COLOR_TEXT_PRIMARY};
`

const SpanWho = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #191970;
`

const HelpItemTags = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  color: ${COLOR_PRIMARY};
`

const HelpItemType = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px;
  gap: 4px;
`
const HelpItemText = styled.div`
  margin-left: 8px;
  font-weight: 700;
  font-size: 12px;
  display: inline;
  line-height: 14px;
`

const HelpItemContainer = styled.div`
  background: #c3e9e9;
  color: ${COLOR_PRIMARY};
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 1px 3px;
`

const ViewMore = styled.div`
  display: flex;
  align-items: center;
  color: ${COLOR_PRIMARY};
  font-weight: bold;
  font-size: 16px;
  justify-content: flex-end;
  padding-top: 8px;
`


const HelpTypeTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  margin-top: ${({ isFirst }) => (isFirst ? '' : '40px')};
  margin-bottom: 20px;

  width: ${({ $isMobile }) => ($isMobile ? '342px' : '1033px')};
  height: 71px;

  background: #c7c7f3;
  border-radius: 4px;

  flex: none;
  order: 0;
  flex-grow: 0;

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

const HelpItem = styled(Link)`
  border-radius: 8px;
  overflow: hidden;

  justify-content: flex-end;
  align-items: flex-end;

  padding: 18px;
  gap: 33px;

  width: ${({ $isMobile }) => ($isMobile ? '340px' : '511px')};
  height: ${({ $isMobile }) => ($isMobile ? '' : '231px')};
  border: ${({ $isMobile }) => ($isMobile ? 'none' : '2px solid #fff')};

  display: block;

  background: #ffffff;
  color: ${COLOR_TEXT_PRIMARY};

  &:hover {
    border: ${({ $isMobile }) => ($isMobile ? 'none' : '2px solid #191970')};
  }
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

  const filterHelpItemWho = function (who) {
    let whoItems = ''
    const lowerCaseWho = who.toLowerCase()
    if (lowerCaseWho.includes('salarié')) whoItems += 'salarié^'
    if (lowerCaseWho.includes('*tout public')) whoItems += '*tout public^'
    if (lowerCaseWho.includes('alternance')) whoItems += 'alternance^'

    if (lowerCaseWho.includes("demandeur d'emploi avec promesse d'embauche^")) {
      whoItems += "demandeur d'emploi avec promesse d'embauche^"
    } else {
      if (lowerCaseWho.includes("demandeur d'emploi"))
        whoItems += "demandeur d'emploi^"
    }

    if (lowerCaseWho.includes('DE -26 ans')) whoItems += 'DE -26 ans^'
    if (lowerCaseWho.includes('moins de 26 ans')) whoItems += '-26 ans^'
    if (lowerCaseWho.includes('plus de 26 ans')) whoItems += '+26 ans^'
    if (lowerCaseWho.includes('moins de 30 ans')) whoItems += '-30 ans^'
    if (lowerCaseWho.includes('plus de 30 ans')) whoItems += '+30 ans^'
    if (lowerCaseWho.includes('jeune de 18 à 30 ans'))
      whoItems += 'jeune de 18 à 30 ans^'

    if (whoItems.length > 0)
      whoItems = whoItems.substring(0, whoItems.length - 1)

    return whoItems
  }

  const params = decodeURIComponent(window.location.search)
  const [isFiltreRecherche, setFiltreRecherche] = useState(false)

  useEffect(() => {
    setFiltreRecherche(params && params.length > 0 ? true : false)
  }, [params])

  const gridStyle = isMobile
      ? { width: '350px', minWidth: '350px' }
      : { width: '1050px', minWidth: '1050px' }
  const logoStyle = {
    'mobili-pass.jpg': { width: '100px', height: 'auto' },
    'visale.jpg': { width: '100px', height: 'auto' },
    'action-logement-2.png': { width: '100px', height: 'auto' },
    'renault-group.png': { width: '110px', height: 'auto', paddingTop: '5px' },
    'pole-emploi.png': { width: 'auto', height: '55px' },
    defaultStyle: { width: 'auto', height: '60px' },
  }

  function getHelpsPanel(listHelpItems) {
    return (
        <>
          <Grid container spacing={2} style={gridStyle}>
            {listHelpItems.map((item) => {
              // kinda clunky, using labels to determine icon.
              const helpIcon = item.type.includes('admin') ? (
                  <ReceiptLongIcon />
              ) : item.type.includes('logement') ? (
                  <HomeWorkIcon />
              ) : item.type.includes('financière') ? (
                  <EuroIcon />
              ) : item.type.includes('transport') ? (
                  <DirectionsCarIcon />
              ) : (
                  <PeopleIcon />
              )

              return (
                  <Grid item xs={isMobile ? 12 : 6} md={6} key={item.id}>
                    <HelpItem
                        $isMobile={isMobile}
                        to={`/aides/${item.slug}` + window.location.search}
                    >
                      <div>
                        <HelpItemTextContainer>
                          <HelpItemTextSubContainer $isMobile={isMobile}>
                            <HelpItemMobileResizer $isMobile={isMobile}></HelpItemMobileResizer>
                            <HelpItemTextTitle $isMobile={isMobile}>
                              {item.title}
                            </HelpItemTextTitle>
                            <HelpItemType>
                              <HelpItemContainer>
                                {helpIcon}
                                <HelpItemText>{item.type}</HelpItemText>
                              </HelpItemContainer>
                            </HelpItemType>
                          </HelpItemTextSubContainer>
                          <HelpItemImgContainer>
                            <img
                                src={`/help-logos/${item.logo}`}
                                alt=""
                                style={
                                  logoStyle[
                                      item.logo in logoStyle
                                          ? item.logo
                                          : 'defaultStyle'
                                      ]
                                }
                            />
                          </HelpItemImgContainer>
                        </HelpItemTextContainer>
                        <HelpItemTags>
                          <SpanWho
                              dangerouslySetInnerHTML={{
                                __html: filterHelpItemWho(item.who)
                                    .split('^')
                                    .map((t) => ucFirst(t))
                                    .join(' • '),
                              }}
                          ></SpanWho>
                        </HelpItemTags>
                        <div>{item.goal}</div>
                        <ViewMore>
                          Découvrir l'aide <ArrowForwardIcon fontSize="small" />
                        </ViewMore>
                      </div>
                    </HelpItem>
                  </Grid>
              )
            })}
          </Grid>
        </>
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
              {' '}
              {listEveryHelpItems.length} aide
              {listEveryHelpItems.length > 1 ? 's' : ''} disponible
              {listEveryHelpItems.length > 1 ? 's' : ''} pour votre situation{' '}
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
              <SearchContainer className={`${isScrollingUp ? 'stickyFilterMobile' : ''}`} >
                {search.includes("=emploi") && (<BlocFilterMobileSearchResult>Recherche d'emploi</BlocFilterMobileSearchResult>)}
                {search.includes("=logement") && (<BlocFilterMobileSearchResult>Recherche de logement</BlocFilterMobileSearchResult>)}
                {search.includes("=déménage") && (<BlocFilterMobileSearchResult>Déménagement</BlocFilterMobileSearchResult>)}
                {search.includes("=demandeur d'emploi") && (<BlocFilterMobileSearchResult>Demandeur d'emploi</BlocFilterMobileSearchResult>)}
                {search.includes("=salarié") && (<BlocFilterMobileSearchResult>Salarié</BlocFilterMobileSearchResult>)}
                {search.includes("=alternance") && (<BlocFilterMobileSearchResult>Alternance</BlocFilterMobileSearchResult>)}
                {search.includes("=moins de 26 ans") && (<BlocFilterMobileSearchResult>Moins de 26 ans</BlocFilterMobileSearchResult>)}
                {search.includes("=plus de 26 ans") && (<BlocFilterMobileSearchResult>Plus de 26 ans</BlocFilterMobileSearchResult>)}
                <BlocFilterMobile $isResults={isResults} to={`/aides-filters` + window.location.search}>
                  <img alt={''} src={pictoFilterMobile} />
                  <div>Modifier</div>
                </BlocFilterMobile>
              </SearchContainer>
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
              <HelpsFilter />
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
