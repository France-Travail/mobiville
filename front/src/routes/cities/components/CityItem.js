import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styled, {css} from 'styled-components'

import {formatNumber} from '../../../utils/utils'
import {COLOR_GRAY, COLOR_PRIMARY, COLOR_TAG_GREEN, COLOR_TAG_RED,} from '../../../constants/colors'
import {useWindowSize} from '../../../common/hooks/window-size'
import {isMobileView} from '../../../constants/mobile'
import redMarker from '../../../assets/images/marker-red.png'
import {ReactComponent as RightChevronIcon} from '../../../assets/images/icons/right_chevron.svg'

import {CircularProgress} from '@mui/material'

const CityLink = styled(Link)`
  margin-top: 16px;
  margin-bottom: ${({ $isMobile }) => ($isMobile ? '16px' : '32px')};
  border-radius: 8px;
  border: 1px solid #e4e9ed;

  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'stretch' : 'center')};

  background: #ffffff;
  color: inherit;
  text-decoration: none;

  &:hover,
  &:focus {
    border: 1px solid ${ COLOR_PRIMARY };
    color: inherit;
  }
`

const Title = styled.p`
  margin: 0;
  
  font-weight: bold;
  font-size: 18px;
`

const SelectedMarkerImg = styled.img`
  width: 12px;
  height: auto;
  margin-left: 8px;
`

const Image = styled.div`
  width: ${({ $isMobile }) => ($isMobile ? '100%' : '160px')};
  min-width: ${({ $isMobile }) => ($isMobile ? 'auto' : '160px')};
  min-height: ${({ $isMobile }) => ($isMobile ? '172px' : '160px')};
  border-top-left-radius: 8px;
  border-top-right-radius: ${({ $isMobile }) => ($isMobile ? '8px' : '0')};
  border-bottom-left-radius: ${({ $isMobile }) => ($isMobile ? '0' : '8px')};
  
  align-self: stretch;
  
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

const Department = styled.p`
  margin: 0;

  font-size: 16px;
  font-weight: 400;
  color: ${ COLOR_PRIMARY };
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

const Tag = styled.div`
  padding: 4px 6px;
  border-radius: 8px;

  font-size: 12px;
  font-weight: 500;
  color: ${COLOR_PRIMARY};
  background: white;
  background: ${({ $color }) => ($color ? $color : COLOR_GRAY)};
`

const InformationsContainer = styled.div`
  width: 100%;
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 8px;
`

const RightChevronIconCustom = styled(RightChevronIcon)`
  height: 12px;
  width: 12px;
  margin-right: 18px;

  color: ${COLOR_PRIMARY};

  ${({ $isMobile }) => ($isMobile && css`
    align-self: end;
    margin-top: -36px;
    margin-bottom: 18px
  `)}
`

const CityItem = ({
  city: {
    nom_comm,
    nom_dept,
    population,
    totalOffres,
    // bassin_int: ['bassin.tensions.ind_t']
   },
  city,
  selected,
  onMouseOver,
  onMouseLeave,
  to,
  isLoadingProfessions,
  //totalOffres,
}) => {
  const size = useWindowSize()

  if (!city) {
    return <div />
  }

  let { photo } = city
  if (photo) {
    photo = photo.replace('/2000px', '/500px')
  } else {
    photo = `/regions/region-${city?.newRegion?.code}.jpg`
  }

  const formatCityTension = (tension) => {
    if (tension < 4) {
      return "Opportunités d'emploi"
    }
    return "Peu d'opportunités d'emploi"
  }

  return (
    <CityLink
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      to={to}
      $isMobile={isMobileView(size)}
    >

      <Image
        style={{ backgroundImage: `url(${photo})` }}
        $isMobile={isMobileView(size)}
      />

      <InformationsContainer>
        {/*<TagsContainer>
          <Tag
            $color={'bassin.tensions.ind_t'] < 4 ? COLOR_TAG_GREEN : COLOR_TAG_RED}
          >
            {formatCityTension(city['bassin.tensions.ind_t'])}
          </Tag>
        </TagsContainer>*/}

        <Title>
          {_.capitalize(nom_comm)}
          {selected && <SelectedMarkerImg src={redMarker} alt="" />}
        </Title>
        <Department>{_.capitalize(nom_dept)}</Department>

        <TagsContainer>
          <Tag>
            {formatNumber(population * 1000)} habitants
          </Tag>
          {!isLoadingProfessions && (
          <Tag>
            {totalOffres} offre{totalOffres > 0 ? "s" : ""} d'emploi
          </Tag>
          )}

          <>
            {isLoadingProfessions ? <CircularProgress color="inherit" size={20} /> : null}
          </>

        </TagsContainer>
      </InformationsContainer>

      <RightChevronIconCustom $isMobile={isMobileView(size)} />
    </CityLink>
  )
}

CityItem.propTypes = {
  city: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired,
  isLoadingProfessions: PropTypes.any,
  //totalOffres: PropTypes.any,
}

CityItem.defaultProps = {}

export default CityItem
