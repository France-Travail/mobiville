import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import queryString from 'query-string'
import {Helmet} from 'react-helmet'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import EuroIcon from '@mui/icons-material/Euro'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import PeopleIcon from '@mui/icons-material/People'

import {useHelps} from '../../common/contexts/helpsContext'
import {useWindowSize} from '../../common/hooks/window-size'
import MainLayout from '../../components/MainLayout'
import {COLOR_OTHER_GREEN, COLOR_PRIMARY, COLOR_TEXT_PRIMARY} from '../../constants/colors'
import {isMobileView} from '../../constants/mobile'
import {ucFirst} from '../../utils/utils'
import CheckmarksSelect from './components/CheckmarksSelect'
import CheckmarksSelectSituation from './components/CheckmarksSelectSituation'
import CheckmarksSelectMobile from "./components/CheckmarksSelectMobile"
import CheckmarksSelectSituationMobile from "./components/CheckmarksSelectSituationMobile"

import pictoHelpAccompagnement from '../../assets/images/icons/help-accompagnement.svg'
import pictoHelpFinanciere from '../../assets/images/icons/help-financiere.svg'
import pictoHelpLogement from '../../assets/images/icons/help-logement.svg'
import pictoHelpTransport from '../../assets/images/icons/help-transport.svg'
import {Grid} from "@mui/material"

//import TypeHelpFilter from "./components/TypeHelpFilter";

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 20px auto;
  
  width: 1036px;
  height: 42px;
  
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-size: 36px;
  line-height: 42px;
  display:  ${({ isMobile }) => (isMobile ? 'contents' : 'flex')};
  align-items: center;
  
  color: ${COLOR_PRIMARY};
`

const Header = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  height:118px;
  background-color:${COLOR_OTHER_GREEN};
  
   div, a {
    margin: 0 auto;
   }
   
   ${(props) =>
    props.isMobile &&
    `
    display: block;
    margin: 102px 0 64px 0;
    padding: 0;
    height:377px;
    padding: 20px 0.5%;
  `}
`

const HeaderSearchBloc = styled.div`
 display: inline-grid;
 align-items: center;
 margin: 0px 10px !important;
 vertical-align: bottom;
 
 ${(props) =>
    props.isMobile &&
    `
    padding: 5px 0px;
  `}
`


const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1040px;
  margin: 0 auto 64px auto;
  padding: 0 16px;
  align-items: flex-start;

  ${(props) =>
    props.isMobile &&
    `
    display: block;
    padding: 0;
  `}
`

const HelpsPanel = styled.div`
  flex: 1;
  padding: ${({ isMobile }) => (isMobile ? '16px' : '0 16px 32px 16px')};
`

const HelpItemImgContainer = styled.div`
  display: inline-grid;
  vertical-align: bottom;
  
  margin-left: 5px;
  
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
  width:${({ isMobile }) => (isMobile ? '200px' : '350px')};
`

const HelpItemTextTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 4px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  
  color: ${COLOR_TEXT_PRIMARY};
`

const SpanWho = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #191970;
`

const HelpItemTags = styled.div`
  margin-top: 10px;
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
  font-size: 16px;
  display: inline;
`

const HelpItemContainer = styled.div`
  background: #C3E9E9;
  color: ${COLOR_PRIMARY};
  display : flex;
  align-items : center;
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

const SearchButton = styled(Link)`
  width: ${({ isMobile }) => (isMobile ? '350px' : '184px')};
  height: 73px;
  display: flex;
  border-radius: 20px;
  display: inline-grid;
  padding: 17px 16px;
  gap: 10px;
  background: #191970;
  color: #eee;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  &,
  &:hover {
    color: #eee;
  }
`


const CATEGORIES = [
  {
    key: 'emploi',
    icon: '/icons/emploi.svg',
    text: 'Je recherche un emploi',
    name: "d'emploi"
  },
  {
    key: 'logement',
    icon: '/icons/logement.svg',
    text: 'Je recherche un logement',
    name: "logement"
  },
  {
    key: 'déménage',
    icon: '/icons/demenagement.svg',
    text: 'Je déménage prochainement',
    name: "déménagement"
  },
]

const SITUATIONS = [
  {
    key: "demandeur d'emploi",
    text: "Demandeur d'emploi",
    name: "Demandeur d'emploi"
  },
  {
    key: 'salarié',
    text: 'Salarié',
    name: "Salarié"
  },
  {
    key: 'alternance',
    text: 'Alternant',
    name: "Alternant"
  },
  {
    key: 'moins de 26 ans',
    text: '- 26 ans',
    name: "moins de 26 ans"
  },
  {
    key: 'plus de 26 ans',
    text: '+ 26 ans',
    name: "plus de 26 ans"
  },
]

const HelpsPage = ({ location: { search } }) => {
  const { previews, onLoadPreviews } = useHelps()

  const size = useWindowSize()
  const isMobile = isMobileView(size)

  const HelpTypeTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    
    margin-top: 40px;
    margin-bottom: 20px;
    
    width: ${({ isMobile }) => (isMobile ? '342px' : '1033px')};
    height: 71px;
    
    background: #C7C7F3;
    border-radius: 4px;
    
    flex: none;
    order: 0;
    flex-grow: 0;
    
    H2 {
      width: 410px;
      height: 28px;
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
      margin-left:8px;
    }
  `
  
  const HelpTypeTitle = styled.h2`
    ${({ isMobile }) => (isMobile ? 'margin-bottom: 50px;' : '')}
  `
  
  const HelpItem = styled(Link)`
  border-radius: 8px;
  overflow: hidden;
  
  justify-content: flex-end;
  align-items: flex-end;
  
  padding: 18px;
  gap: 33px;
  
  width: ${({ isMobile }) => (isMobile ? '340px' : '511px')};
  height: ${({ isMobile }) => (isMobile ? '' : '231px')};
  
  display: block;
  
  background: #FFFFFF;
  border-radius: 8px;
  
  &,
  &:hover {
    color: ${COLOR_TEXT_PRIMARY};
  }
  
`

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

  const projects = CATEGORIES.filter(({ key }) =>
    parsedProjects.includes(key)
  )
  const situations = SITUATIONS.filter(({ key }) =>
    parsedSituations.includes(key)
  )

  function filterListHelpBySituationAndProject(preview) {
    if (situations.length) {
      if (
          !situations.every(({key}) =>
              preview.who.toLowerCase().includes(key.toLowerCase())
          )
      ) {
        return false
      }
    }
    if (projects.length) {
      if (
          !projects.some(({key}) =>
              preview.situation.toLowerCase().includes(key.toLowerCase())
          )
      ) {
        return false
      }
    }
    return true
  }

  previews.forEach((preview) => {
    if(preview.type.includes(",")) {
        preview.type = preview.type.substring(0, preview.type.indexOf(","))
    }
    if(preview.goal.includes(".")) {
      preview.goal = preview.goal.substring(0, preview.goal.indexOf(".") + 1 )
    }
    if(preview.type.toLowerCase().includes("aide administrative") || preview.type.toLowerCase().includes("accompagnement du projet")) {
      preview.type = "Accompagnement"
    }
  })
  const listHelpItem = previews.filter((preview) => {
    return filterListHelpBySituationAndProject(preview)
  })
  const listHelpItemFinance = listHelpItem.filter((preview) => {
    return preview.type.toLowerCase().includes("aide financière")
  })
  const listHelpItemLogement = listHelpItem.filter((preview) => {
    return preview.type.toLowerCase().includes("accès au logement")
  })
  const listHelpItemAccompagnement = listHelpItem.filter((preview) => {
    return preview.type.includes("Accompagnement")
  })
  const listHelpItemTransport = listHelpItem.filter((preview) => {
    return preview.type.toLowerCase().includes("aide transport")
  })
  const listEveryHelpItems = [...listHelpItemFinance, ...listHelpItemLogement, ...listHelpItemAccompagnement, ...listHelpItemTransport]

  const filterHelpItemWho = function(who) {
    let whoItems = ""
    const lowerCaseWho = who.toLowerCase()
    if (lowerCaseWho.includes("salarié")) whoItems += "salarié^"
    if (lowerCaseWho.includes("*tout public")) whoItems += "*tout public^"
    if (lowerCaseWho.includes("alternance")) whoItems += "alternance^"

    if(lowerCaseWho.includes("demandeur d'emploi avec promesse d'embauche^")) {
      whoItems += "demandeur d'emploi avec promesse d'embauche^"
    } else {
      if (lowerCaseWho.includes("demandeur d'emploi")) whoItems += "demandeur d'emploi^"
    }

    if (lowerCaseWho.includes("DE -26 ans")) whoItems += "DE -26 ans^"
    if (lowerCaseWho.includes("moins de 26 ans")) whoItems += "-26 ans^"
    if (lowerCaseWho.includes("plus de 26 ans")) whoItems += "+26 ans^"
    if (lowerCaseWho.includes("moins de 30 ans")) whoItems += "-30 ans^"
    if (lowerCaseWho.includes("plus de 30 ans")) whoItems += "+30 ans^"
    if (lowerCaseWho.includes("jeune de 18 à 30 ans")) whoItems += "jeune de 18 à 30 ans^"

    if(whoItems.length > 0) whoItems = whoItems.substring(0, whoItems.length - 1)

    return whoItems
  }

  const [wholeUrlParameters, setWholeUrlParameters] = React.useState('')
  const [searchParametersCategories, setSearchParametersCategories] = React.useState('')
  const [searchParametersSituations, setSearchParametersSituations] = React.useState('')
  const [searchParametersSituationsAge, setSearchParametersSituationsAge] = React.useState('')

  const onSearchParametersCategories = function(parameter) {
    let listParameter = parameter.toString().replaceAll(",","&project=")
    CATEGORIES.forEach((categorie) =>  listParameter = listParameter.replaceAll(categorie.name, categorie.key))
    if(listParameter.length === 0) setSearchParametersCategories("")
    else setSearchParametersCategories("project="+listParameter)
  }
  const onSearchParametersSituations = function(parameter) {
    if(parameter === "empty") {
      setSearchParametersSituations("")
      return
    }
    let listParameter = parameter.toString().replaceAll(",","&situation=")
    SITUATIONS.forEach((situation) =>  listParameter = listParameter.replaceAll(situation.name, situation.key))
    setSearchParametersSituations("situation="+listParameter)
  }
  const onSearchParametersSituationsAge = function(parameter) {
    if(parameter === "empty") {
      setSearchParametersSituationsAge("")
      return
    }
    let listParameter = parameter.toString().replaceAll(",","&situation=")
    SITUATIONS.forEach((situation) =>  listParameter = listParameter.replaceAll(situation.name, situation.key))
    setSearchParametersSituationsAge("situation="+listParameter)
  }

  const updateQueryParameter = function() {
    const urlParameters = "?"+searchParametersCategories+"&"+searchParametersSituations+"&"+searchParametersSituationsAge
    if(!urlParameters.includes("situation") && !urlParameters.includes("project")) {
        setWholeUrlParameters("")
    } else {
      setWholeUrlParameters(urlParameters)
    }
  }

  const params = decodeURIComponent(window.location.search)
  const [isFiltreRecherche, setFiltreRecherche] = useState(false)

  useEffect(() => {setFiltreRecherche(params && params.length > 0 ? true : false )}, [params])
  useEffect(() => {updateQueryParameter() }, [searchParametersCategories, searchParametersSituations, searchParametersSituationsAge])

  function getHelpsPanel(listHelpItems) {
    return <>

      <Grid container spacing={2} style={{width: "1050px", minWidth: "1050px"}} >
      {listHelpItems.map((item) => {
        // kinda clunky, using labels to determine icon.
        const helpIcon = item.type.includes('admin') ? (
            <ReceiptLongIcon/>
        ) : item.type.includes('logement') ? (
            <HomeWorkIcon/>
        ) : item.type.includes('financière') ? (
            <EuroIcon/>
        ) : item.type.includes('transport') ? (
            <DirectionsCarIcon/>
        ) : (
            <PeopleIcon/>
        )

        return (
            <Grid item xs={6} md={6} >
              <HelpItem
                  isMobile={isMobile}
                  key={item.id}
                  to={`/aides/${item.slug}` + window.location.search}
              >
                <div>
                <HelpItemTextContainer>
                  <HelpItemTextSubContainer isMobile={isMobile} >
                    <HelpItemTextTitle isMobile={isMobile}>
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
                        style={{width: '100%', height: 'auto'}}
                    />
                  </HelpItemImgContainer>
                </HelpItemTextContainer>
                <HelpItemTags>
                  <SpanWho
                      dangerouslySetInnerHTML={{
                        __html: filterHelpItemWho(item.who)
                            .split('^')
                            .map((t) => ucFirst(t))
                            .join(' · '),
                      }}
                  ></SpanWho>
                </HelpItemTags>
                  <div>{item.goal}</div>
                  <ViewMore>
                    Découvrir l'aide <ArrowForwardIcon fontSize="small"/>
                  </ViewMore>
                </div>
              </HelpItem>
            </Grid>
        )
      })}
      </Grid>
    </>
  }

  function getFilteredHelpsPanel(listHelpItem, isFiltreRecherche) {
    if(!isFiltreRecherche) return
    return <>
      {getHelpsPanel(listEveryHelpItems)}
    </>
  }

  function getAllHelpsPanel(isFiltreRecherche) {
    if(isFiltreRecherche) return
    return <>
      <HelpTypeTitleContainer isMobile={isMobile} >
        <img alt={""} src={pictoHelpFinanciere}/>  <h2>Les aides financières</h2>
      </HelpTypeTitleContainer>
      {getHelpsPanel(listHelpItemFinance)}

      <HelpTypeTitleContainer isMobile={isMobile} >
        <img alt={""} src={pictoHelpAccompagnement}/>  <HelpTypeTitle isMobile={isMobile} >Les aides {isMobile ? <br/> : "" } d'accompagnement</HelpTypeTitle>
      </HelpTypeTitleContainer>
      {getHelpsPanel(listHelpItemAccompagnement)}

      <HelpTypeTitleContainer isMobile={isMobile} >
        <img alt={""} src={pictoHelpLogement}/>  <h2>Les aides au logement</h2>
      </HelpTypeTitleContainer>
      {getHelpsPanel(listHelpItemLogement)}

      <HelpTypeTitleContainer isMobile={isMobile} >
        <img alt={""} src={pictoHelpTransport}/>  <h2>Les aides Transport</h2>
      </HelpTypeTitleContainer>
      {getHelpsPanel(listHelpItemTransport)}
    </>
  }

  function getTitle() {
    if(isFiltreRecherche) {
      return <Title isMobile={isMobile}> {listEveryHelpItems.length} aide{listEveryHelpItems.length > 1 ? "s" : ""} disponible{listEveryHelpItems.length > 1 ? "s" : ""} pour votre situation </Title>
    }

    return <Title isMobile={isMobile}> Toutes les aides à la mobilité résidentielle </Title>
  }

  return (
    <MainLayout topMobileMenu>
      <Helmet>
        <title>Liste des aides à la mobilité - Mobiville</title>
        <meta
            name="description"
            content="Trouvez facilement les aides dont vous pouvez bénéficier pour votre projet de mobilité en France"
        />
      </Helmet>

      <Header isMobile={isMobile}>
        <div>
          <HeaderSearchBloc isMobile={isMobile}>
            {!isMobile && (
                <CheckmarksSelect searchCriteria={CATEGORIES} title={"Quel est votre projet ?"}
                                  onSearchParameters={onSearchParametersCategories} params={params}/>
            )}
            {isMobile && (
                <CheckmarksSelectMobile searchCriteria={CATEGORIES} title={"Quel est votre projet ?"}
                                        onSearchParameters={onSearchParametersCategories} params={params}/>
            )}
          </HeaderSearchBloc>
          <HeaderSearchBloc isMobile={isMobile}>
            {!isMobile && (
                <CheckmarksSelectSituation searchCriteria={SITUATIONS.slice(0, 3)} title={"Votre situation"}
                                           onSearchParameters={onSearchParametersSituations} params={params}
                                           placeholder={"Demandeur d'emploi, salarié"}/>
            )}
            {isMobile && (
                <CheckmarksSelectSituationMobile searchCriteria={SITUATIONS.slice(0, 3)} title={"Votre situation"}
                                                 onSearchParameters={onSearchParametersSituations} params={params}
                                                 placeholder={"Demandeur d'emploi, salarié"}/>
            )}
          </HeaderSearchBloc>
          <HeaderSearchBloc isMobile={isMobile}>
            {!isMobile && (
                <CheckmarksSelectSituation searchCriteria={SITUATIONS.slice(-2)} title={"Votre âge"}
                                           onSearchParameters={onSearchParametersSituationsAge} params={params}
                                           placeholder={"Moins de 26 ans, plus de 26 ans"}/>
            )}
            {isMobile && (
                <CheckmarksSelectSituationMobile searchCriteria={SITUATIONS.slice(-2)} title={"Votre âge"}
                                                 onSearchParameters={onSearchParametersSituationsAge} params={params}
                                                 placeholder={"Moins de 26 ans, plus de 26 ans"}/>
            )}
          </HeaderSearchBloc>
          <HeaderSearchBloc isMobile={isMobile}>
            <SearchButton to={`/aides${wholeUrlParameters}`} isMobile={isMobile}>Rechercher</SearchButton>
          </HeaderSearchBloc>
        </div>
      </Header>

      {getTitle()}

      {/*EN ATTENTE MODICATIONS UX*/}
      {/*<TypeHelpFilter />*/}

      <Container isMobile={isMobile}>
        <HelpsPanel isMobile={isMobile}>

          {getAllHelpsPanel(isFiltreRecherche)}

          {getFilteredHelpsPanel(listHelpItem, isFiltreRecherche)}

        </HelpsPanel>
      </Container>
    </MainLayout>
  )
}

HelpsPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
}

HelpsPage.defaultProps = {
  location: {
    search: '',
  },
}
export default HelpsPage
