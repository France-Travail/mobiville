import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styled, { css } from 'styled-components'

import { formatCityTension, formatNumber } from '../../../utils/utils'
import {
  COLOR_LIGHT_GREY,
  COLOR_PRIMARY,
  COLOR_WHITE,
} from '../../../constants/colors'
import { useWindowSize } from '../../../common/hooks/window-size'
import { isMobileView } from '../../../constants/mobile'
import selectedMarker from '../../../assets/images/marker-selected.svg'
import { ReactComponent as RightChevronIcon } from '../../../assets/images/icons/right_chevron.svg'

import { CircularProgress } from '@mui/material'
import { Tag } from '../../../components'

const CityLink = styled(Link)`
  margin: 8px 0;
  border-radius: 8px;
  border: 1px solid ${COLOR_LIGHT_GREY};

  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'stretch' : 'center')};
  max-width: ${({ $isMobile }) => ($isMobile ? '100%' : 'inherit')};

  background: ${COLOR_WHITE};
  color: inherit;
  text-decoration: none;

  &:hover,
  &:focus {
    border: 1px solid ${COLOR_PRIMARY};
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
  color: ${COLOR_PRIMARY};
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
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

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      align-self: end;
      margin-top: -36px;
      margin-bottom: 18px;
    `}
`

const CityItem = ({
  city,
  selected,
  onMouseOver,
  onMouseLeave,
  to,
  isLoadingProfessions,
}) => {
  const size = useWindowSize()
  const isMobile = isMobileView(size)

  if (!city) {
    return <div />
  }

  if (city.photo) {
    city.photo = city.photo.replace('/2000px', '/500px')
  } else {
    city.photo = `/regions/region-${city.newRegion?.code}.jpg`
  }

  return (
    <CityLink
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      to={to}
      $isMobile={isMobile}
      data-automation-id={`cityItem-${city.nom_comm}`}
    >
      <Image
        style={{ backgroundImage: `url(${city.photo})` }}
        $isMobile={isMobileView(size)}
      />

      <InformationsContainer>
        <Title>
          {_.capitalize(city.nom_comm)}
          {selected && <SelectedMarkerImg src={selectedMarker} alt="" />}
        </Title>
        <Department>{_.capitalize(city.nom_dept)}</Department>

        <TagsContainer>
          <Tag green={city['bassin.tensions.ind_t'] < 4}>
            {formatCityTension(city['bassin.tensions.ind_t'])}
          </Tag>
          <Tag>{formatNumber(city.population * 1000)} habitants</Tag>
          {!isLoadingProfessions ? (
            <Tag>
              {city.totalOffres} offre{city.totalOffres > 0 ? 's' : ''} d'emploi
            </Tag>
          ) : (
            <CircularProgress color="inherit" size={20} />
          )}
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
}

export default CityItem
