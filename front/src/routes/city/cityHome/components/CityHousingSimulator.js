import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { useWindowSize } from '../../../../common/hooks/window-size'
import { COLOR_PRIMARY, COLOR_WHITE } from '../../../../constants/colors'
import { isMobileView } from '../../../../constants/mobile'
import { formatNumber } from '../../../../utils/utils'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import logoALin from '../../../../assets/images/logo-ALin.png'
import logoLogementSocial from '../../../../assets/images/logo-logement-social.png'

import HousingSimulator from '../../components/HousingSimulator'
import { KeyFigures, Tag } from '../../../../components'

import { ReactComponent as BuildingIcon } from '../../../../assets/images/icons/building.svg'

const HousingMetrics = styled.div`
  display: flex;
  color: ${COLOR_PRIMARY};
  width: 100%;
  flex-direction: column;
  margin-bottom: 40px;
`

const MetricsTitle = styled.p`
  vertical-align: middle;
  height: 48px;
  line-height: 48px;
  span {
    font-weight: 900;
    font-size: 45px;
  }
`

const TagsContainer = styled.div`
  margin: 28px auto;
`

const HousingSearchContainer = styled.div`
  max-width: 888px;
  margin: ${({ $isMobile }) => ($isMobile ? '0 21px' : '0 8px')};

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
  padding: ${({ $isMobile }) => ($isMobile ? '37px' : '44px')};
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

const HousingActorLink = styled.a`
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
  max-width: 100%;
  align-self: center;
`

const CityHousingSimulator = ({ city }) => {
  const size = useWindowSize()
  const isMobile = isMobileView(size)

  return (
    <>
      <HousingMetrics $isMobile={isMobile}>
        
        <TagsContainer>
          <Tag green={!city.city_house_tension} size='tall'>{
            city && city.city_house_tension
            ? "Tension immobilière a l'achat"
            : "Pas de tension immobilière a l'achat"
          }</Tag>
        </TagsContainer>

        <KeyFigures
          figures={[
            {
              label: "Prix d’achat moyen/m2",
              data: city.average_houseselled ? `${formatNumber(city.average_houseselled)}€` : 'A venir',
              icon: <BuildingIcon />,
            },
            {
              label: 'Loyer moyen en location',
              data: (city.rent_t2 || city?.departement?.rent_t2) ? `${formatNumber(city.rent_t2 ?? city?.departement?.rent_t2)}€` : 'A venir',
              icon: (<MetricsTitle className="metrics-title">
                <span>2</span> pièces
              </MetricsTitle>),
            },
            {
              label: 'Loyer moyen en location',
              data: (city.rent_t4 || city?.departement?.rent_t4) ? `${formatNumber(city.rent_t4 ?? city?.departement?.rent_t4)}€` : 'A venir',
              icon: (<MetricsTitle className="metrics-title">
                <span>4</span> pièces
              </MetricsTitle>),
            },
          ]}
        />

      </HousingMetrics>

      <HousingSearchContainer $isMobile={isMobile}>
        <HousingActorsContainer>
          <HousingActor $isMobile={isMobile}>
            <HousingActorImage src={logoLogementSocial} />
            <div>
              <HousingActorTitle>Demandez un logement social</HousingActorTitle>
              <HousingActorDescription>
                Pour obtenir un logement social (ou logement HLM), vous devez
                faire votre demande en ligne ou sur place (au guichet) et
                obtenir un numéro unique de demande de logement social (NUR/NUD)
              </HousingActorDescription>
            </div>
            <HousingActorLink href="https://www.actionlogement.fr/le-logement-social" target="_blank">
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
            <HousingActorLink href="https://al-in.fr/" target="_blank">
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
