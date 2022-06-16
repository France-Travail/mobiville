import React, {useEffect} from 'react'
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

//import TypeHelpFilter from "./components/TypeHelpFilter";

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  //margin-bottom: ${({ isMobile }) => (isMobile ? '4px' : '8px')};
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
    margin: 102px 0 64px 0;
    padding: 0;
  `}
`

const HelpsPanel = styled.div`
  flex: 1;
  padding: ${({ isMobile }) => (isMobile ? '16px' : '0 16px 32px 16px')};
`

const HelpItem = styled(Link)`
  margin: 16px 0;
  display: flex;
  border-radius: 8px;
  overflow: hidden;

  &,
  &:hover {
    color: ${COLOR_TEXT_PRIMARY};
  }
`

const HelpItemImgContainer = styled.div`
  background: white;
  padding: 32px 8px 8px 8px;
  width: 96px;
  display: flex;
  align-items: start;
  justify-content: center;
`
const HelpItemTextContainer = styled.div`
  padding: 16px;
  background: #ffffff;
  width: 100%;
  display: flex;
  flex-direction: column;
  color: ${COLOR_TEXT_PRIMARY};
`

const HelpItemTextTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 8px;
  font-size: ${({ isMobile }) => (isMobile ? '16px' : '18px')};
  color: ${COLOR_TEXT_PRIMARY};
`

const HelpItemTags = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: ${COLOR_PRIMARY};
`

const HelpItemTagsTitle = styled.span`
  font-weight: 700;
  font-size: 16px;
`

const HelpItemType = styled.div`
  display: flex;
  align-items: start;
  padding-top: 16px;
  color: ${COLOR_PRIMARY};
  margin-bottom: 8px;
`
const HelpItemText = styled.div`
  margin-left: 8px;
  font-weight: 700;
  font-size: 16px;
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

  let listHelpItem = previews.filter((preview) => {
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
  })


  const isMobile = isMobileView(size)
  const [wholeUrlParameters, setWholeUrlParameters] = React.useState('')
  const [searchParametersCategories, setSearchParametersCategories] = React.useState('')
  const [searchParametersSituations, setSearchParametersSituations] = React.useState('')
  const [searchParametersSituationsAge, setSearchParametersSituationsAge] = React.useState('')

  const onSearchParametersCategories = function(parameter) {
    let listParameter = parameter.toString().replaceAll(",","&project=")
    CATEGORIES.forEach((categorie) =>  listParameter = listParameter.replaceAll(categorie.name, categorie.key))
    setSearchParametersCategories("project="+listParameter)
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
    if (searchParametersCategories.length > 0 || searchParametersSituations.length > 0 || searchParametersSituationsAge.length > 0) {
       setWholeUrlParameters("?"+searchParametersCategories+"&"+searchParametersSituations+"&"+searchParametersSituationsAge)
       return
    }
    setWholeUrlParameters("")
  }

  const params = decodeURIComponent(window.location.search)

  useEffect(() => {updateQueryParameter() }, [searchParametersCategories, searchParametersSituations, searchParametersSituationsAge])

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
            <HeaderSearchBloc isMobile={isMobile} >
              {!isMobile && (
              <CheckmarksSelect searchCriteria={CATEGORIES} title={"Quel est votre projet ?"} onSearchParameters={onSearchParametersCategories} params={params} />
              )}
              {isMobile && (
                <CheckmarksSelectMobile searchCriteria={CATEGORIES} title={"Quel est votre projet ?"} onSearchParameters={onSearchParametersCategories} params={params} />
              )}
            </HeaderSearchBloc>
            <HeaderSearchBloc isMobile={isMobile}>
              {!isMobile && (
                  <CheckmarksSelectSituation searchCriteria={SITUATIONS.slice(0,3)} title={"Votre situation"} onSearchParameters={onSearchParametersSituations} params={params} />
              )}
              {isMobile && (
                  <CheckmarksSelectSituationMobile searchCriteria={SITUATIONS.slice(0,3)} title={"Votre situation"} onSearchParameters={onSearchParametersSituations} params={params} />
              )}
            </HeaderSearchBloc>
            <HeaderSearchBloc isMobile={isMobile}>
              {!isMobile && (
                  <CheckmarksSelectSituation searchCriteria={SITUATIONS.slice(-2)} title={"Votre âge"} onSearchParameters={onSearchParametersSituationsAge} params={params}  />
              )}
              {isMobile && (
                  <CheckmarksSelectSituationMobile searchCriteria={SITUATIONS.slice(-2)} title={"Votre âge"} onSearchParameters={onSearchParametersSituationsAge} params={params}  />
              )}
            </HeaderSearchBloc>
            <HeaderSearchBloc isMobile={isMobile}>
              <SearchButton to={`/aides${wholeUrlParameters}`} isMobile={isMobile} >Rechercher</SearchButton>
            </HeaderSearchBloc>
          </div>
        </Header>

      <Title isMobile={isMobile}> Toutes les aides à la mobilité résidentielle </Title>

      {/*EN ATTENTE MODICATIONS UX*/}
      {/*<TypeHelpFilter />*/}

      <Container isMobile={isMobile}>
        <HelpsPanel isMobile={isMobile}>
          {listHelpItem.map((item) => {
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
              <HelpItem
                key={item.id}
                to={`/aides/${item.slug}`+window.location.search}
                ismobile={isMobile ? 'true' : 'false'}
              >
                <HelpItemImgContainer>
                  <img
                    src={`/help-logos/${item.logo}`}
                    alt=""
                    style={{ width: '100%', height: 'auto' }}
                  />
                </HelpItemImgContainer>
                <HelpItemTextContainer>
                  <HelpItemType>
                    {helpIcon}
                    <HelpItemText>{item.type}</HelpItemText>
                  </HelpItemType>
                  <div>
                    <HelpItemTextTitle isMobile={isMobile}>
                      {item.title}
                    </HelpItemTextTitle>
                    <div>{item.goal}</div>
                  </div>
                  <HelpItemTags>
                    <HelpItemTagsTitle>Public concerné</HelpItemTagsTitle>
                    <br />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: item.who
                          .split('^')
                          .map((t) => ucFirst(t))
                          .join(' · '),
                      }}
                    ></span>
                  </HelpItemTags>
                  <ViewMore>
                    Découvrir l'aide <ArrowForwardIcon fontSize="small" />
                  </ViewMore>
                </HelpItemTextContainer>
              </HelpItem>
            )
          })}
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
