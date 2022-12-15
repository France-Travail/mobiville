import { useEffect } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { CircularProgress } from '@mui/material'

import { COLOR_PRIMARY, COLOR_WHITE } from '../../../constants/colors'
import { ReactComponent as RightChevronIcon } from '../../../assets/images/icons/right_chevron.svg'
import { useCities } from '../../../common/contexts/citiesContext'
import { capitalize, formatCityUrl } from '../../../utils/utils'
import { ActionButton } from '../../../components'
import { useProfessions } from '../../../common/contexts/professionsContext'
import { isMobileView } from '../../../constants/mobile'
import { useWindowSize } from '../../../common/hooks/window-size'

const Container = styled.div`
  max-width: 1040px;
  width: 100%;
  margin: auto;

  color: ${COLOR_PRIMARY};

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      padding: 0 16px;
    `}
`

const Title = styled.h1`
  font-weight: 900;
  font-size: 36px;
  line-height: 54px;
`

const BlockContainer = styled.div``

const BlockTitle = styled.p`
  margin: 8px 0;

  font-weight: 900;
  font-size: 24px;
  line-height: 36px;
`

const CitiesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $isMobile }) => ($isMobile ? 1 : 2)}, 1fr);
  grid-template-rows: repeat(${({ $isMobile }) => ($isMobile ? 6 : 3)}, 84px);
  place-items: stretch;
  grid-auto-flow: column dense;
  grid-gap: 8px 22px;
`

const CityItemContainer = styled(Link)`
  padding: 24px;
  border-radius: 8px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: ${COLOR_WHITE};
  font-size: 24px;

  white-space: nowrap;
  overflow: hidden;

  &:hover {
    box-shadow: 0px 0px 0px 1px ${COLOR_PRIMARY};
    -webkit-box-shadow: 0px 0px 0px 1px ${COLOR_PRIMARY};
    -moz-box-shadow: 0px 0px 0px 1px ${COLOR_PRIMARY};
  }
`

const CityItemStrong = styled.span`
  font-weight: 900;
`

const CityItemCity = styled.span`
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
`

const CircularProgressContainer = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / -1;

  display: grid;
  place-content: center;
`

const ButtonContainer = styled.div`
  margin: 16px auto;

  ${({ $isMobile }) =>
    !$isMobile &&
    css`
      width: fit-content;
    `}
`

const CityCloseCities = ({ codeRome, backLink }) => {
  const isMobile = isMobileView(useWindowSize())

  const {
    city,
    similarCities,
    onSearchSimilarCities,
    closeCities,
    onSearchCloseCities,
  } = useCities()

  const { onSearchCountList, professionsCountList } = useProfessions()

  useEffect(() => {
    onSearchSimilarCities({
      codeRome,
      city,
    })
    onSearchCloseCities({
      latitude: city.geo_point_2d_x,
      longitude: city.geo_point_2d_y,
      codeRome,
      inseeCode: city.insee_com,
    })
  }, [])

  useEffect(() => {
    if (closeCities?.length < 0 || !codeRome) return

    onSearchCountList({
      codeRome: [codeRome],
      inseeList: closeCities.map((city) => [city.insee_com]),
    })
  }, [closeCities, codeRome])

  useEffect(() => {
    if (similarCities?.length < 0 || !codeRome) return

    onSearchCountList({
      codeRome: [codeRome],
      inseeList: similarCities.map((city) => [city.insee_com]),
    })
  }, [similarCities, codeRome])

  const CityItem = ({ city, total, containerProps }) => (
    <CityItemContainer to={formatCityUrl(city, codeRome)} {...containerProps}>
      <CityItemCity>
        <CityItemStrong>{total ?? '_'} offres</CityItemStrong> à{' '}
        {capitalize(city?.nom_comm)}
      </CityItemCity>
      <RightChevronIcon />
    </CityItemContainer>
  )

  return (
    <div tag-page="/city-villes-similaires">
    <Container $isMobile={isMobile}>
      <Title>Elargir votre zone géographique</Title>

      <BlockContainer>
        <BlockTitle>Villes à proximité</BlockTitle>

        <CitiesContainer $isMobile={isMobile}>
          {!!closeCities && closeCities.length > 0 ? (
            closeCities.map((closeCity) => (
              <CityItem
                key={closeCity.id}
                city={closeCity}
                total={
                  professionsCountList.find((item) =>
                    item?.insee?.includes(closeCity.insee_com)
                  )?.total
                }
                containerProps={{
                  onClick: () => {
                    window.smartTag({
                      name: 'acces_offre',
                      type: 'navigation',
                      chapters: ['city-villes-similaire', 'proximite'],
                    })
                  },
                }}
              />
            ))
          ) : (
            <CircularProgressContainer>
              <CircularProgress />
            </CircularProgressContainer>
          )}
        </CitiesContainer>

        <ButtonContainer $isMobile={isMobile}>
          <ActionButton
            path={backLink}
            libelle="Voir toutes les villes à proximité"
            isBlue={false}
            isWhite
            buttonProps={{
              onClick: () => {
                window.smartTag({
                  name: 'voir_toutes_les_villes',
                  type: 'navigation',
                  chapters: ['city-villes-similaire', 'proximite'],
                })
              },
            }}
          />
        </ButtonContainer>
      </BlockContainer>

      <BlockContainer>
        <BlockTitle>Villes similaires</BlockTitle>

        <CitiesContainer $isMobile={isMobile}>
          {!!similarCities && similarCities.length > 0 ? (
            similarCities.map((similarCity) => (
              <CityItem
                key={similarCity.id}
                city={similarCity}
                total={
                  professionsCountList?.find((item) =>
                    item?.insee?.includes(similarCity.insee_com)
                  )?.total
                }
                containerProps={{
                  onClick: () => {
                    window.smartTag({
                      name: 'acces_offre',
                      type: 'navigation',
                      chapters: ['city-villes-similaire', 'similaires'],
                    })
                  },
                }}
              />
            ))
          ) : (
            <CircularProgressContainer>
              <CircularProgress />
            </CircularProgressContainer>
          )}
        </CitiesContainer>

        <ButtonContainer $isMobile={isMobile}>
          <ActionButton
            path={backLink}
            libelle="Voir toutes les villes similaires"
            isBlue={false}
            isWhite
            buttonProps={{
              onClick: () => {
                window.smartTag({
                  name: 'voir_toutes_les_villes',
                  type: 'navigation',
                  chapters: ['city-villes-similaire', 'similaires'],
                })
              },
            }}
          />
        </ButtonContainer>
      </BlockContainer>
    </Container>
    </div>
  )
}

CityCloseCities.propTypes = {
  codeRome: PropTypes.string,
  backLink: PropTypes.string,
}

export default CityCloseCities
