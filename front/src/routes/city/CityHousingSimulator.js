import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { useWindowSize } from '../../common/hooks/window-size'
import { COLOR_PRIMARY, COLOR_TAG_GREEN, COLOR_TAG_RED, COLOR_WHITE } from '../../constants/colors'
import { isMobileView } from '../../constants/mobile'
import { formatNumber } from '../../utils/utils'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import logoALin from '../../assets/images/logo-ALin.png'
import logoLogementSocial from '../../assets/images/logo-logement-social.png'

import HousingSimulator from './components/HousingSimulator'

const HousingMetrics = styled.div`
  display: flex;
  color: ${COLOR_PRIMARY};
  width: 100%;
  flex-direction: column;
  margin-bottom: 40px;
  .metrics-container {
    display: flex;
    justify-content: space-between;
    /* width: 400px; */
    width: ${({ $isMobile }) => ($isMobile ? '328px' : '400px')};
    margin: 0px auto;
  }

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

  img {
    width: 40px;
    height: 42px;
  }
  b {
    font-weight: 900;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
  }
  .metrics-title {
    margin: unset;
    vertical-align: middle;
    span {
      font-weight: 900;
      font-size: 45px;
    }
  }
  .metrics-description {
    font-weight: 700;
    line-height: 19px;
    text-align: center;
    font-size: 16px;
    margin: unset;
  }
`

const Tag = styled.div`
  /* height: 25px; */
  margin: auto;
  /* text-align: center; */
  width: fit-content;
  padding: 4px 6px;
  margin-bottom: 20px;
  border-radius: 8px;

  background-color: ${({ isRed }) => isRed ? COLOR_TAG_RED : COLOR_TAG_GREEN};
  color: ${COLOR_PRIMARY};
  font-size: 16px;
  font-weight: bold;
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
  align-self: center;
`

const CityHousingSimulator = ({ city, nbSocialHousing }) => {
  const size = useWindowSize()
  const isMobile = isMobileView(size)

  return (
    <>
      <HousingMetrics $isMobile={isMobile}>
        <Tag
          isRed={city && city.city_house_tension}
        >{
          city && city.city_house_tension
          ? "Tension immobilière a l'achat"
          : "Pas de tension immobilière a l'achat"
        }</Tag>
        <div className="metrics-container">
          <ElementObject $isMobile={isMobile}>
            <div>
              <img
                className="no-events"
                draggable="false"
                src="/icons/building.svg"
                alt="icone d'immeuble"
              />
            </div>
            <b>
              {city.average_houseselled
                ? `${formatNumber(city.average_houseselled)}€`
                : 'A venir'}
            </b>
            <p className="metrics-description">
              Prix d’achat <br />
              moyen/m2
            </p>
          </ElementObject>

          {[
            { label: '2', rentValue: city.average_houserent_f2 },
            { label: '4', rentValue: city.average_houserent_f4 },
          ].map(({ label, rentValue }) => (
            <ElementObject $isMobile={isMobile} key={label}>
              <div
                style={{
                  height: '48px',
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
              >
                <p className="metrics-title">
                  <span>{label}</span> pièces
                </p>
              </div>
              <b>{rentValue ? `${+rentValue}€` : 'A venir'}</b>
              <p className="metrics-description">
                Loyer moyen <br />
                en location
              </p>
            </ElementObject>
          ))}
        </div>
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
