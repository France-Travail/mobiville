import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import PersonIcon from '@mui/icons-material/Person'
import { Link, useHistory } from 'react-router-dom'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import { useCities } from '../../common/contexts/citiesContext'
import {
  COLOR_PRIMARY,
  COLOR_TEXT_SECONDARY,
  COLOR_SECONDARY,
} from '../../constants/colors'
import { formatNumber, ucFirstOnly } from '../../utils/utils'
import { isMobileView } from '../../constants/mobile'
import { useWindowSize } from '../../common/hooks/window-size'
import { useScroll } from '../../common/hooks/use-scroll'

const MainLayout = styled.div`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12),
    0px 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  padding-top: ${(props) => (props.isMobile ? '0' : '72px')};
  z-index: 1;
`

const ImageView = styled.div`
  height: 220px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: ${(props) => (props.isMobile ? '100%' : '95%')};
  margin-left: auto;
  margin-right: auto;
  max-width: 1024px;
  margin-bottom: ${(props) => (props.isMobile ? '0' : '16px')};
  border-radius: ${(props) => (props.isMobile ? '0' : '8px')};
`

const TitlesContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
`

const CityName = styled.h1`
  height: ${(props) => (props.fixedView ? '78px' : '46px')};
  line-height: ${(props) => (props.fixedView ? '100px' : '46px')};
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
`

const RegionName = styled.h2`
  height: 17px;
  font-size: 12px;
  text-align: center;
  position: relative;
  top: 10px;
  font-weight: normal;
  margin: 0;
  padding: 0;
`

const NameMobile = styled.p`
  && {
    height: 46px;
    line-height: 41px;
    font-weight: 500;
    font-size: 24px;
    text-align: center;
    margin-top: 0;
    margin-bottom: 0;
  }
`

const CityPreview = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  ${(props) =>
    props.isMobile
      ? `
    > *:first-child {
      margin-left: 32px;
    }

    a {
      margin-top: 16px;
    }
  `
      : ''};
`

const CityTab = styled.div`
  height: 46px;
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  margin-left: ${(props) => (props.fixedView ? 'auto' : '')};
  margin-right: ${(props) => (props.fixedView ? 'auto' : '')};
  width: ${(props) => (props.fixedView ? 'fit-content' : 'auto')};
`

const CityTabMobile = styled.div`
  height: 46px;
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  margin-left: ${(props) => (props.fixedView ? 'auto' : '')};
  margin-right: ${(props) => (props.fixedView ? 'auto' : '')};
  width: ${(props) => (props.fixedView ? 'fit-content' : 'auto')};
`

const TabItem = styled.button`
  && {
    color: ${(props) =>
      props.selected ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY};
    font-weight: 500;
    font-size: 14px;
    margin-right: ${(props) => (props.fixedView ? '24px' : '68px')};
    margin-left: ${(props) => (props.fixedView ? '24px' : '')};
    position: relative;
    line-height: 46px;
    cursor: pointer;
    margin-top: 0;
    margin-bottom: 0;
    background: none;
    border: none;
    white-space: nowrap;

    &:before {
      content: ' ';
      display: ${(props) => (props.selected ? 'block' : 'none')};
      position: absolute;
      left: 0;
      right: 0;
      top: calc(100% - 4px);
      background-color: ${COLOR_PRIMARY};
      border-radius: 2px 2px 0px 0px;
      height: 4px;
    }
  }
`

const TabItemMobile = styled.button`
  && {
    color: ${(props) =>
      props.selected ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY};
    font-weight: 500;
    font-size: 14px;
    margin-right: 0;
    margin-left: 0;
    position: relative;
    line-height: 46px;
    cursor: pointer;
    margin-top: 0;
    margin-bottom: 0;
    justify-content: space-around;
    background: none;
    border: none;
    white-space: nowrap;

    &:before {
      content: ' ';
      display: ${(props) => (props.selected ? 'block' : 'none')};
      position: absolute;
      left: 0;
      right: 0;
      top: calc(100% - 4px);
      background-color: ${COLOR_PRIMARY};
      border-radius: 2px 2px 0px 0px;
      height: 4px;
    }
  }
`

const SecondSection = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? 'column' : 'row-reverse')};
  margin-left: auto;
  margin-right: auto;
  width: ${(props) => (props.isMobile ? '100%' : '95%')};
  max-width: 1024px;
  justify-content: space-between;
`

const PersonIconGreen = styled(PersonIcon)`
  color: ${COLOR_SECONDARY};
  margin-left: 33px;
`

const PreviewItem = styled.div`
  font-size: 10px;
  font-weight: 500;
  margin-left: 12px;

  b {
    font-size: 12px;
    margin-top: 2px;
    display: block;
    font-weight: 700;
  }
`

const FixedLayout = styled.div`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12),
    0px 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  position: fixed;
  top: 76px;
  left: 0;
  right: 0;
  height: 124px;
  z-index: 10;
`

const FixedLayoutMobile = styled.div`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12),
    0px 1px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 92px;
  z-index: 10;
`

const ArrowBackOutlinedIconDesktopFull = styled(ArrowBackOutlinedIcon)`
  position: relative;
  top: -40px;
  cursor: pointer;
`

const SpaceArrowBackOutlinedIconMobileFull = styled.div`
  position: fixed;
  top: 16px;
  left: 16px;
  cursor: pointer;
  background: #ffffff;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12),
    0px 4px 5px rgba(0, 0, 0, 0.2);
  width: 32px;
  height: 32px;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ArrowBackOutlinedIconMobileFull = styled(ArrowBackOutlinedIcon)``

const ArrowBackOutlinedIconDesktopSmall = styled(ArrowBackOutlinedIcon)`
  position: absolute;
  top: 36px;
  cursor: pointer;
`

const ArrowBackOutlinedIconMobileSmall = styled(ArrowBackOutlinedIcon)`
  position: absolute;
  left: 20px;
  top: 11px;
  cursor: pointer;
`

const BackLine = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: ${(props) => (props.isMobile ? '100%' : '95%')};
  max-width: 1024px;
  position: relative;
`

const HeaderLink = styled(Link)`
  && {
    color: inherit;
    text-decoration: none;
    display: flex;
    cursor: pointer;
    margin-left: 32px;

    div {
      font-weight: 500;
      font-size: 12px;
      color: #336e7b;
      padding: 8px;
      border: 2px solid #336e7b;
      border-radius: 30px;
      margin-left: 8px;
      font-weight: 500;
      white-space: nowrap;
    }
  }
`

const CityHeader = ({ tabList, tabSelected, onSelectTab }) => {
  const { city } = useCities()
  const { scrollY } = useScroll()
  const size = useWindowSize()
  const history = useHistory()

  const onBack = () => {
    history.push({
      pathname: '/cities',
      search: localStorage.getItem('lastSearch'),
    })
  }

  return (
    <>
      <MainLayout isMobile={isMobileView(size)}>
        <ImageView
          style={{
            backgroundImage: `url(${
              city.photo || `/regions/region-${city['region.new_code']}.jpg`
            })`,
          }}
          isMobile={isMobileView(size)}
        >
          {!isMobileView(size) && (
            <ArrowBackOutlinedIconDesktopFull onClick={onBack} />
          )}
          {isMobileView(size) && (
            <SpaceArrowBackOutlinedIconMobileFull onClick={onBack}>
              <ArrowBackOutlinedIconMobileFull />
            </SpaceArrowBackOutlinedIconMobileFull>
          )}
        </ImageView>

        <TitlesContainer>
          <CityName>{ucFirstOnly(city.nom_comm)}</CityName>
          <RegionName>{ucFirstOnly(city['region.new_name'])}</RegionName>
        </TitlesContainer>

        <SecondSection isMobile={isMobileView(size)}>
          <CityPreview isMobile={isMobileView(size)}>
            <img src="/icons/people.svg" alt="people" />
            <PreviewItem>
              Habitants
              <b>{formatNumber(city.population * 1000)}</b>
            </PreviewItem>
            <PersonIconGreen />
            <PreviewItem>
              Température moyenne
              <b>
                {Math.floor(city.average_temperature)}
                °C
              </b>
            </PreviewItem>
            <HeaderLink
              to={`/aides?codeRegion=${city['region.new_code']}&insee_com=${city.insee_com}`}
            >
              <img src="/icons/superhero.svg" alt="superhero" />
              <PreviewItem>Découvrir les aides</PreviewItem>
            </HeaderLink>
          </CityPreview>
          {isMobileView(size) && (
            <CityTabMobile>
              {tabList.map((t, i) => (
                <TabItemMobile
                  isMobile={isMobileView(size)}
                  key={t.key}
                  selected={t.key === tabSelected}
                  onClick={() => onSelectTab(i)}
                >
                  {t.label}
                </TabItemMobile>
              ))}
            </CityTabMobile>
          )}
          {!isMobileView(size) && (
            <CityTab>
              {tabList.map((t, i) => (
                <TabItem
                  isMobile={isMobileView(size)}
                  key={t.key}
                  selected={t.key === tabSelected}
                  onClick={() => onSelectTab(i)}
                >
                  {t.label}
                </TabItem>
              ))}
            </CityTab>
          )}
        </SecondSection>
      </MainLayout>
      {scrollY >= 296 && (
        <>
          {isMobileView(size) && (
            <FixedLayoutMobile>
              <BackLine isMobile={isMobileView(size)}>
                <ArrowBackOutlinedIconMobileSmall onClick={onBack} />
              </BackLine>
              <NameMobile fixedView>{ucFirstOnly(city.nom_comm)}</NameMobile>
              <CityTabMobile fixedView>
                {tabList.map((t, i) => (
                  <TabItem
                    fixedView
                    key={t.key}
                    selected={t.key === tabSelected}
                    onClick={() => onSelectTab(i)}
                  >
                    {t.label}
                  </TabItem>
                ))}
              </CityTabMobile>
            </FixedLayoutMobile>
          )}
          {!isMobileView(size) && (
            <FixedLayout>
              <BackLine>
                <ArrowBackOutlinedIconDesktopSmall onClick={onBack} />
              </BackLine>
              <CityName fixedView>{ucFirstOnly(city.nom_comm)}</CityName>
              <CityTab fixedView>
                {tabList.map((t, i) => (
                  <TabItem
                    fixedView
                    key={t.key}
                    selected={t.key === tabSelected}
                    onClick={() => onSelectTab(i)}
                  >
                    {t.label}
                  </TabItem>
                ))}
              </CityTab>
            </FixedLayout>
          )}
        </>
      )}
    </>
  )
}

export default CityHeader

CityHeader.propTypes = {
  tabList: PropTypes.array,
  tabSelected: PropTypes.string,
  onSelectTab: PropTypes.func,
}

CityHeader.defaultProps = {
  tabList: [],
  tabSelected: '',
  onSelectTab: () => {},
}
