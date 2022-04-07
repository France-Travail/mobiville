import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { orderBy } from 'lodash'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { Helmet } from 'react-helmet'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import EuroIcon from '@mui/icons-material/Euro'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import PeopleIcon from '@mui/icons-material/People'

import { useHelps } from '../../common/contexts/helpsContext'
import { useWindowSize } from '../../common/hooks/window-size'
import MainLayout from '../../components/MainLayout'
import {
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
  COLOR_TEXT_SECONDARY,
} from '../../constants/colors'
import { isMobileView } from '../../constants/mobile'
import { ucFirst } from '../../utils/utils'
import helpsPic from '../../assets/images/Generique_Aides.png'

const Title = styled.h1`
  color: ${COLOR_TEXT_PRIMARY};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 32px;
`

const SubTitle = styled.p`
  color: ${COLOR_TEXT_PRIMARY};
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
`

const Header = styled.div`
  margin: 0 auto;
  font-weight: bold;
  display: flex;
  align-items: center;
`

const HeaderTitle = styled.h1`
  font-weight: 900;
  font-size: 36px;
  margin: 45px 0px 0px 10px;
`

const HeaderSubtitle = styled.h2`
  font-size: 24px;
  line-height: 33px;
  margin: 8px 0px 53px 10px;
`

const HeaderImg = styled.img`
  height: 136px;
  width: 136px;
  margin-top: 45px;
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
    margin: 0 0 64px 0;
    padding: 0;
  `}
`

const TagsSelectionPanel = styled.div`
  width: ${({ isMobile }) => (isMobile ? '100%' : '424px')};
  background: #ffffff;
  box-shadow: ${({ isMobile }) =>
    !isMobile
      ? `0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)`
      : ''};
  border-radius: 8px;
  padding: 16px;
`

const CategoryTagsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const HelpsPanel = styled.div`
  flex: 1;
  padding: ${({ isMobile }) => (isMobile ? '0 16px' : '0 16px 32px 16px')};
`

const CategoryTag = styled(Link)`
  background: ${({ selected }) => (selected ? COLOR_PRIMARY : 'white')};
  border-radius: 8px;
  max-width: 118px;
  width: 100%;
  padding: 4px;
  margin: 0 2px;
  display: block;
  cursor: pointer;
  text-align: center;
  font-weight: 500;
  border: 2px solid ${COLOR_PRIMARY};
  &,
  &:hover {
    color: ${({ selected }) => (selected ? 'white' : COLOR_TEXT_PRIMARY)};
  }
`

const SituationTag = styled(Link)`
  background: ${({ selected }) => (selected ? COLOR_PRIMARY : 'white')};
  border-radius: 44px;
  padding: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  display: inline-block;
  cursor: pointer;
  font-weight: 500;
  font-size: 12px;
  border: 2px solid ${COLOR_PRIMARY};
  &,
  &:hover {
    color: ${({ selected }) => (selected ? '#fff' : COLOR_TEXT_PRIMARY)};
  }
`

const TitleHelps = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;
  color: black;
  font-weight: 700;
  font-size: 24px;
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
  background: ${COLOR_GRAY};
  padding: 8px;
  width: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const HelpItemTextContainer = styled.div`
  padding: 16px;
  background: #ffffff;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const HelpItemTextTitle = styled.h4`
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 14px;
`

const HelpItemTags = styled.div`
  margin-top: 8px;
`

const HelpItemType = styled.div`
  display: flex;
  align-items: center;
  padding-top: 16px;
  color: #37b4b4;
`
const HelpItemText = styled.div`
  margin-left: 8px;
  font-weight: 500;
  color: ${COLOR_TEXT_SECONDARY};
`

const ViewMore = styled.div`
  display: flex;
  align-items: center;
  color: ${COLOR_PRIMARY};
  font-weight: bold;
  justify-content: flex-end;
  padding-top: 8px;
`

const CATEGORIES = [
  {
    key: 'emploi',
    icon: '/icons/emploi.svg',
    text: 'Je recherche un emploi',
  },
  {
    key: 'logement',
    icon: '/icons/logement.svg',
    text: 'Je recherche un logement',
  },
  {
    key: 'déménage',
    icon: '/icons/demenagement.svg',
    text: 'Je déménage prochainement',
  },
]

const SITUATIONS = [
  {
    key: 'emploi',
    text: "Demandeur d'emploi",
  },
  {
    key: 'salarie',
    text: 'Salarié',
  },
  {
    key: 'Moins de 26 ans',
    text: 'Moins de 26 ans',
  },
  {
    key: 'Plus de 26 ans',
    text: 'Plus de 26 ans',
  },
]

const HelpsPage = ({ location: { search } }) => {
  const { previews, onLoadPreviews } = useHelps()
  const size = useWindowSize()

  useEffect(() => {
    onLoadPreviews()
  }, [])

  const parsedQueryString = queryString.parse(search)
  const parsedSituations = parsedQueryString.situation
    ? typeof parsedQueryString.situation === 'string'
      ? [parsedQueryString.situation]
      : parsedQueryString.situation
    : []

  const project =
    CATEGORIES.find(({ key }) => parsedQueryString.project === key) || null
  const situations = SITUATIONS.filter(({ key }) =>
    parsedSituations.includes(key)
  )

  let list = previews.filter((preview) => {
    if (situations.length) {
      if (
        !situations.every(({ text }) =>
          preview.who.toLowerCase().includes(text.toLowerCase())
        )
      ) {
        return false
      }
    }

    if (project) {
      if (
        !preview.situation.toLowerCase().includes(project.key.toLowerCase())
      ) {
        return false
      }
    }

    return true
  })

  if (!situations.length && !project) {
    list = orderBy(previews, ['count_vue'], ['desc']).slice(0, 4)
  }

  const isMobile = isMobileView(size)

  return (
    <MainLayout>
      <Helmet>
        <title>Liste des aides à la mobilité - Mobiville</title>
        <meta
          name="description"
          content="Trouvez facilement les aides dont vous pouvez bénéficier pour votre projet de mobilité en France"
        />
      </Helmet>

      {!isMobile && (
        <Header>
          <div>
            <HeaderTitle>
              Vous avez besoin d{"'"}
              aide pour votre projet de mobilité ?
            </HeaderTitle>
            <HeaderSubtitle>Découvrez les solutions pour accélérer votre projet</HeaderSubtitle>
          </div>
          <HeaderImg src={helpsPic} alt="" />
        </Header>
      )}
      <Container isMobile={isMobile}>
        <TagsSelectionPanel isMobile={isMobile}>
          <Title>Découvrez les aides pour vous</Title>
          <SubTitle>Quel est votre projet ?</SubTitle>
          <CategoryTagsContainer>
            {CATEGORIES.map((c) => {
              const selected = project && c.key === project.key
              return (
                <CategoryTag
                  key={c.text}
                  selected={project && c.key === project.key}
                  to={`/aides?${queryString.stringify({
                    project: selected ? '' : c.key,
                    situation: situations.map(({ key }) => key),
                  })}`}
                >
                  <img src={c.icon} alt={c.text} />
                  <div>{c.text}</div>
                </CategoryTag>
              )
            })}
          </CategoryTagsContainer>
          <SubTitle>Ma situation</SubTitle>
          {SITUATIONS.map((c) => {
            const selected = situations.some(({ key }) => key === c.key)
            const situationsForLink = selected
              ? situations.filter(({ key }) => key !== c.key)
              : situations.concat({ key: c.key })
            return (
              <SituationTag
                key={c.text}
                selected={selected}
                to={`/aides?${queryString.stringify({
                  project: project?.key,
                  situation: situationsForLink.map(({ key }) => key),
                })}`}
              >
                {c.text}
              </SituationTag>
            )
          })}
        </TagsSelectionPanel>
        <HelpsPanel isMobile={isMobile}>
          {!isMobile && (
            <TitleHelps>
              {project || situations.length
                ? 'Mes aides disponibles'
                : 'Les aides les plus consultées'}
            </TitleHelps>
          )}
          {list.map((item) => {
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
                to={`/aides/${item.slug}`}
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
                  <div>
                    <HelpItemTextTitle>{item.title}</HelpItemTextTitle>
                    <div>{item.goal}</div>
                  </div>
                  <HelpItemTags style={{ color: COLOR_TEXT_SECONDARY }}>
                    Public concerné :{' '}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: item.who
                          .split('^')
                          .map((t) => ucFirst(t))
                          .join(' · '),
                      }}
                    ></span>
                  </HelpItemTags>
                  <HelpItemType>
                    {helpIcon}
                    <HelpItemText>{item.type}</HelpItemText>
                  </HelpItemType>
                  <ViewMore>
                    En savoir plus <ArrowForwardIcon fontSize="small" />
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
