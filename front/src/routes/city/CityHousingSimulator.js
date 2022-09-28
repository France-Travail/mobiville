import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import {
  COLOR_RED,
  COLOR_GREEN,
  COLOR_GRAY,
  COLOR_WHITE,
  COLOR_PRIMARY,
} from '../../constants/colors'
import { formatNumber } from '../../utils/utils'

import logoLogementSocial from '../../assets/images/logo-logement-social.png'
import logoALin from '../../assets/images/logo-ALin.png'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import building from '../../assets/images/icons/building.svg'
import HousingSimulator from './components/HousingSimulator'
import { Link } from 'react-router-dom'

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

const HousingMetrics = styled.div`
  .no-events {
    pointer-events: none;
    user-select: none;
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

const HousingSearchContainer = styled.div`
  max-width: 888px;
  margin: 0 8px;

  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  gap: 16px;
`

const HousingActorsContainer = styled.div`
  flex: 1;
  max-width: 440px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  color: ${COLOR_PRIMARY};
`

const HousingActor = styled.div`
  padding: 44px;
  flex: auto;

  display: flex;
  flex-direction: column;
  gap: 8px;

  border-radius: 4px;
  background: ${COLOR_WHITE};
`

const HousingActorTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
`

const HousingActorDescription = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
`

const HousingActorLink = styled(Link)`
  height: 19px;
  align-self: center;

  font-weight: 700;
  font-size: 16px;
  line-height: 19px;

  text-decoration-line: underline;

  color: ${COLOR_PRIMARY};

  & > svg {
    vertical-align: bottom;
  }
`

const HousingActorImage = styled.img`
  max-height: 70px;
  align-self: center;
`

const CityHousingSimulator = ({ city, nbSocialHousing }) => {
  const size = useWindowSize()
  const isMobile = isMobileView(size)

  // TODO a supprimer
  // const socialHousingNode = (
  //   <ItemLayout isMobile={isMobile}>
  //     <ItemTitleLayout>Logements sociaux</ItemTitleLayout>
  //     <ItemContentLayout>
  //       <ElementObject>
  //         <img src={houses} alt="" />
  //         <div>
  //           <b>
  //             Nombre de logements dans la commune
  //             <br />
  //             {formatNumber(nbSocialHousing) || 'Information non disponible'}
  //           </b>
  //         </div>
  //       </ElementObject>
  //       <ElementObject>
  //         <img src={hourglass} alt="" />
  //         <div>
  //           <b>
  //             Délais d{"'"}
  //             obtention moyen dans la région
  //             <br />
  //             {city?.newRegion.average_delay_obtain_social_housing
  //               ? `${city.newRegion.average_delay_obtain_social_housing} mois`
  //               : 'Information non disponible'}
  //           </b>
  //         </div>
  //       </ElementObject>
  //     </ItemContentLayout>
  //   </ItemLayout>
  // )

  return (
    <>
      <HousingMetrics>
        <div>
          <Tag isRed={city && city.city_house_tension}>
            {city && city.city_house_tension
              ? "Tension immobilière a l'achat"
              : 'Non'}
          </Tag>
        </div>

        <ItemLayout isMobile={isMobile}>
          <ItemTitleLayout>Prix des logements</ItemTitleLayout>
          <ItemContentLayout>
            <ElementObject>
              <img
                className="no-events"
                draggable="false"
                src="/icons/building.svg"
                alt="icone d'immeuble"
              />
              <b>
                {city.average_houseselled
                  ? `${formatNumber(city.average_houseselled)}€`
                  : 'A venir'}
              </b>
              <div style={{ fontSize: 10 }}>Prix d’achat moyen/m2</div>
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
      </HousingMetrics>

      <HousingSearchContainer $isMobile={isMobile}>
        <HousingActorsContainer>
          <HousingActor>
            <HousingActorImage src={logoLogementSocial} />
            <div>
              <HousingActorTitle>Demandez un logement social</HousingActorTitle>
              <HousingActorDescription>
                Pour obtenir un logement social (ou logement HLM), vous devez
                faire votre demande en ligne ou sur place (au guichet) et
                obtenir un numéro unique de demande de logement social (NUR/NUD)
              </HousingActorDescription>
            </div>
            <HousingActorLink to="https://www.demande-logement-social.gouv.fr/index">
              Créez ma demande de logement <ArrowForwardIcon />
            </HousingActorLink>
          </HousingActor>

          <HousingActor>
            <HousingActorImage src={logoALin} />
            <div>
              <HousingActorTitle>Offres de logement</HousingActorTitle>
              <HousingActorDescription>
                Salariés, consultez la plateforme d'offres de logements liées à
                votre situation
              </HousingActorDescription>
            </div>
            <HousingActorLink to="https://al-in.fr/">
              Recherchez des logements <ArrowForwardIcon />
            </HousingActorLink>
          </HousingActor>
        </HousingActorsContainer>

        {(!!city?.average_houserent || !!city?.average_houseselled) && (
          <HousingSimulator city={city} />
        )}
      </HousingSearchContainer>
    </>
  )
}

CityHousingSimulator.propTypes = {
  city: PropTypes.object.isRequired,
}

export default CityHousingSimulator
