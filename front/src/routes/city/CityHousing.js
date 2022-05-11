import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import { COLOR_RED, COLOR_GREEN, COLOR_GRAY } from '../../constants/colors'
import MainLayout from '../../components/MainLayout'
import { formatNumber, ucFirstOnly } from '../../utils/utils'

import building from '../../assets/images/icons/building.svg'
import house from '../../assets/images/icons/house.svg'
import houses from '../../assets/images/icons/houses.svg'
import hourglass from '../../assets/images/icons/hourglass.svg'

import SubHeader from '../../components/SubHeader'
import { InputAdornment, TextField } from '@mui/material'
import Euro from '@mui/icons-material/Euro'

const Container = styled.div`
  width: 100%;
  max-width: 688px;
  margin: 0 auto;
`

const BlocksContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
`

const ItemLayout = styled.div`
  background: #ffffff;
  border-radius: 8px;
  width: 100%;
  padding: 16px;
  margin: ${({ isMobile }) => (isMobile ? '0 0 4px' : '0 8px 16px')};
  border: 1px ${COLOR_GRAY} solid;
`

const ItemContentLayout = styled.div`
  display: flex;
  justify-content: space-around;
`

const ItemTitleLayout = styled.div`
  font-weight: bold;
  font-size: 14px;
  padding-bottom: 16px;
`

const SimulatorElement = styled.div`
  display: ${({ isMobile }) => (isMobile ? 'block' : 'flex')};
  justify-content: space-around;

  & > * {
    width: 100%;
    &:last-of-type {
      margin-left: ${({ isMobile }) => (isMobile ? '0' : '16px')};
    }
  }
`

const ElementObject = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const Tag = styled.div`
  line-height: 32px;
  height: 32px;
  width: 54px;
  text-align: center;
  border-radius: 32px;
  background-color: ${(props) => (props.isRed ? COLOR_RED : COLOR_GREEN)};
  color: white;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
`

const CityHousing = ({ backLink, city, nbSocialHousing }) => {
  const size = useWindowSize()
  const isMobile = isMobileView(size)

  const [squareMeters, setSquareMeters] = useState(0)
  const [housingCost, setHousingCost] = useState(0)

  const calculateSquareMeters = (value) => {
    const result = parseInt(value, 10) / city.average_houserent
    setSquareMeters(Number.isNaN(result) ? null : result.toFixed())
  }
  const calculateHousingCost = (value) => {
    const result =
      parseInt(value.replace(/ /g, ''), 10) * city.average_houseselled
    setHousingCost(Number.isNaN(result) ? null : result.toFixed())
  }

  const housingPriceNode = (
    <ItemLayout isMobile={isMobile}>
      <ItemTitleLayout>Prix des logements</ItemTitleLayout>
      <ItemContentLayout>
        <ElementObject>
          <img src={house} alt="" />
          <div>
            <b>Achat</b>
          </div>
          <div style={{ fontSize: 10 }}>Prix au m2 moyen</div>
          <div>
            <b>
              {city.average_houseselled
                ? `${formatNumber(city.average_houseselled)}€`
                : 'A venir'}
            </b>
          </div>
        </ElementObject>
        <ElementObject>
          <img src={building} alt="" />
          <div>
            <b>Location</b>
          </div>
          <div style={{ fontSize: 10 }}>Loyer au m2 moyen</div>
          <div>
            <b>
              {city.average_houserent
                ? `${city.average_houserent.toFixed(2)}€`
                : 'A venir'}
            </b>
          </div>
        </ElementObject>
      </ItemContentLayout>
    </ItemLayout>
  )

  const socialHousingNode = (
    <ItemLayout isMobile={isMobile}>
      <ItemTitleLayout>Logements sociaux</ItemTitleLayout>
      <ItemContentLayout>
        <ElementObject>
          <img src={houses} alt="" />
          <div>
            <b>
              Nombre de logements dans la région
              <br />
              {formatNumber(nbSocialHousing) || 'A venir'}
            </b>
          </div>
        </ElementObject>
        <ElementObject>
          <img src={hourglass} alt="" />
          <div>
            <b>
              Délais d{"'"}
              obtention moyen dans la région
              <br />
              {city['region.average_delay_obtain_social_housing']
                ? `${city['region.average_delay_obtain_social_housing']} mois`
                : 'A venir'}
            </b>
          </div>
        </ElementObject>
      </ItemContentLayout>
    </ItemLayout>
  )

  const housingTensionNode = (
    <ItemLayout isMobile={isMobile}>
      <ItemTitleLayout>Tension immobilière</ItemTitleLayout>
      <div>
        <Tag isRed={city && city.city_house_tension}>
          {city && city.city_house_tension ? 'Oui' : 'Non'}
        </Tag>
        <p>
          <b>
            Il y a {city && city.city_house_tension ? 'plus' : 'moins'} d{"'"}
            acheteurs que de biens à vendre.
          </b>
        </p>
        <p>
          L{"'"}
          Indicateur de Tension Immobilière (ITI) permet de comprendre l{"'"}
          impact sur le marché immobilier dans les 6 prochains mois grâce au
          rapport entre le nombre d{"'"}
          acheteurs et le nombre de biens à vendre.
        </p>
      </div>
    </ItemLayout>
  )

  const simulatorNode = (
    <ItemLayout isMobile={isMobile}>
      <ItemTitleLayout>Simulateur de logement</ItemTitleLayout>
      <SimulatorElement isMobile={isMobile}>
        {!!city.average_houserent && (
          <div>
            <div>
              <b>Pour une location</b>
            </div>
            <TextField
              label="Votre budget"
              variant="filled"
              onChange={(event) => calculateSquareMeters(event.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Euro />
                  </InputAdornment>
                ),
              }}
            />
            <p>
              Vous pouvez occuper un logement de :<br />
              <b>{formatNumber(squareMeters) || '__'}m²</b>
            </p>
          </div>
        )}
        {!!city.average_houseselled && (
          <div>
            <div>
              <b>Pour un achat</b>
            </div>
            <TextField
              label="Nombre de m2"
              variant="filled"
              onChange={(event) => calculateHousingCost(event.target.value)}
              fullWidth
            />
            <p>
              Votre logement va coûter :<br />
              <b>{formatNumber(housingCost) || '__'}€</b>
            </p>
          </div>
        )}
      </SimulatorElement>
    </ItemLayout>
  )

  return (
    <MainLayout>
      <Helmet>
        <title>Logement à {ucFirstOnly(city.nom_comm)} - Mobiville</title>
        <meta
          name="description"
          content={`Toutes les informations clés de logement sur la ville de ${ucFirstOnly(
            city.nom_comm
          )}`}
        />
      </Helmet>
      <SubHeader
        notFixed={!isMobile}
        backLink={backLink}
        isMobile={isMobile}
        title={`Information sur le logement à ${ucFirstOnly(city.nom_comm)}`}
      />
      {isMobile ? (
        <Container>
          {housingPriceNode}
          {housingTensionNode}
          {socialHousingNode}
          {simulatorNode}
        </Container>
      ) : (
        <Container>
          <BlocksContainer isMobile={isMobile}>
            {housingPriceNode}
            {socialHousingNode}
          </BlocksContainer>

          <BlocksContainer isMobile={isMobile}>
            {housingTensionNode}
          </BlocksContainer>

          {(!!city.average_houserent || !!city.average_houseselled) && (
            <BlocksContainer isMobile={isMobile}>
              {simulatorNode}
            </BlocksContainer>
          )}
        </Container>
      )}
    </MainLayout>
  )
}

CityHousing.propTypes = {
  city: PropTypes.object.isRequired,
}

CityHousing.defaultProps = {}

export default CityHousing
