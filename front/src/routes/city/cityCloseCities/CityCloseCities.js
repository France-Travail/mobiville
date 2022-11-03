import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { COLOR_PRIMARY, COLOR_WHITE } from '../../../constants/colors'
import { ReactComponent as RightChevronIcon } from '../../../assets/images/icons/right_chevron.svg'
import { useCities } from '../../../common/contexts/citiesContext'
import { useEffect } from 'react'
import { capitalize, formatCityUrl } from '../../../utils/utils'
import { ActionButton } from '../../../components'
import { useProfessions } from '../../../common/contexts/professionsContext'

const Container = styled.div`
  max-width: 1040px;
  width: 100%;
  margin: auto;

  color: ${COLOR_PRIMARY};
`

const Title = styled.h1`
  font-weight: 900;
  font-size: 36px;
  line-height: 54px;
`

const BlockContainer = styled.p``

const BlockTitle = styled.p`
  margin: 8px 0;

  font-weight: 900;
  font-size: 24px;
  line-height: 36px;
`

const CitiesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(440px, 1fr));
  grid-template-rows: repeat(3, 84px);
  place-items: stretch;
  /* justify-content: stretch; */
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
`

const CityItemStrong = styled.span`
  font-weight: 900;
`

const CityItemCity = styled.span`
  font-weight: 700;
`

const ButtonContainer = styled.div`
    width: fit-content;
    margin: 16px auto;
`

const CityCloseCities = ({
  // city,
  codeRome,
  backLink,
}) => {
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

  const CityItem = ({ city, total }) => (
    <CityItemContainer to={formatCityUrl(city, codeRome)}>
      <CityItemCity>
        <CityItemStrong>{total ?? '_'} offres</CityItemStrong> à{' '}
        {capitalize(city?.nom_comm)}
      </CityItemCity>
      <RightChevronIcon />
    </CityItemContainer>
  )

  return (
    <Container>
      <Title>Elargir votre zone géographique</Title>

      <BlockContainer>
        <BlockTitle>Villes à proximité</BlockTitle>

        <CitiesContainer>
          {closeCities.map((closeCity) => (
            <CityItem
              key={closeCity.id}
              city={closeCity}
              total={
                professionsCountList.find((item) =>
                  item?.insee?.includes(closeCity.insee_com)
                )?.total
              }
            />
          ))}
        </CitiesContainer>

        <ButtonContainer>
            <ActionButton
                path={backLink}
                libelle="Voir toutes les villes"
                isBlue={false}
                isWhite />
        </ButtonContainer>

      </BlockContainer>

      <BlockContainer>
        <BlockTitle>Villes similaires</BlockTitle>

        <CitiesContainer>
          {similarCities.map((similarCity) => (
            <CityItem
              key={similarCity.id}
              city={similarCity}
              total={
                professionsCountList?.find((item) =>
                  item?.insee?.includes(similarCity.insee_com)
                )?.total
              }
            />
          ))}
        </CitiesContainer>

        <ButtonContainer>
            <ActionButton
                path={backLink}
                libelle="Voir toutes les villes"
                isBlue={false}
                isWhite />
        </ButtonContainer>
    
      </BlockContainer>
    </Container>
  )
}

CityCloseCities.propTypes = {
  backLink: PropTypes.string,
}

export default CityCloseCities
