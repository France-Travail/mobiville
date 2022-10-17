import { useState } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'
import _ from 'lodash'
import styled, { css } from 'styled-components'

import { KeyFigures, MainLayout, Map } from '../../../components'
import ElectedContact from './components/ElectedContact'
import { useWindowSize } from '../../../common/hooks/window-size'
import { isMobileView } from '../../../constants/mobile'
import { Link } from 'react-router-dom'
import {
    COLOR_GRAY,
    COLOR_PRIMARY, COLOR_WHITE,
} from '../../../constants/colors'

import { ReactComponent as RightChevronIcon } from '../../../assets/images/icons/right_chevron.svg'
import { ReactComponent as CrowdIcon } from '../../../assets/images/icons/crowd.svg'
import { ReactComponent as WeatherIcon } from '../../../assets/images/icons/weather.svg'
import { ReactComponent as CalculatorIcon } from '../../../assets/images/icons/calculator.svg'
import { formatNumber } from '../../../utils/utils'
import CityServiceInfoCards from './components/CityServiceInfoCards'
import BackResultsButton from "../BackResultsButton";

const WelcomeContainer = styled.div`
  background: ${({ $isMobile }) => ($isMobile ? 'none' : 'white')};
  margin-bottom: 10px;
`

const WelcomeWrapper = styled.div`
  max-width: 1036px;
  margin: ${({ $isMobile }) =>
    $isMobile ? '50px auto 0 auto' : '14px auto 50px auto'};
  ${({ $isMobile }) => ($isMobile ? 'padding: 16px' : '')};
  color: ${COLOR_PRIMARY};
`

const Title = styled.h1`
  margin-bottom: 12px;
  font-weight: 900;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  gap: 24px;
`

const TextContainer = styled.div`
  position: relative;

  max-height: ${({ $isTextExpended }) => ($isTextExpended ? 'none' : '255px')};
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: space-between;
`

const Description = styled.p`
  margin: 0;
  overflow: hidden;

  font-size: 18px;
  font-weight: 400;
`

const ReadMore = styled.p`
  cursor: pointer;
  margin: 0;
  flex-shrink: 0;

  color: ${COLOR_PRIMARY};
  font-size: 24px;
  font-weight: 900;
  text-decoration: underline;

  ${({ $isMobile, $isTextExpended }) =>
    !$isTextExpended &&
    css`
      box-shadow: 0px -8px 18px 17px ${$isMobile ? COLOR_GRAY : COLOR_WHITE};
      -webkit-box-shadow: 0px -8px 18px 17px ${$isMobile ? COLOR_GRAY : COLOR_WHITE};
      -moz-box-shadow: 0px -8px 18px 17px ${$isMobile ? COLOR_GRAY : COLOR_WHITE};
    `}
`

const ReadMoreText = styled.span`
  padding-left: 10px;
`

const MapContainer = styled.div`
  flex: 1;
`

const CityServices = ({ backLink, city }) => {
  const isMobile = isMobileView(useWindowSize())

  const [isTextExpended, setIsTextExpended] = useState(false)

  return (
    <MainLayout isMobile={isMobile}>
      <Helmet>
        <title>
          Services et équipements : {_.capitalize(city.nom_comm)} (
          {city.code_dept}) | Mobiville
        </title>
        <meta
          name="description"
          content={`Découvrez les services et équipements disponibles à ${_.capitalize(
            city.nom_comm
          )} : transports, santé, culture et loisirs, éducation, environnement`}
        />
      </Helmet>

      <WelcomeContainer $isMobile={isMobile}>
        <BackResultsButton
            backLink={backLink}
            isMobile={isMobile}
        />
        <WelcomeWrapper $isMobile={isMobile}>
          <Title>Vivre à {_.capitalize(city.nom_comm)}</Title>

          <InfoContainer $isMobile={isMobile}>
            {city.description ? (
              <TextContainer $isTextExpended={isTextExpended}>
                <Description>{city.description}</Description>
                <ReadMore
                  $isMobile={isMobile}
                  $isTextExpended={isTextExpended}
                  onClick={() => setIsTextExpended(!isTextExpended)}
                >
                  {isTextExpended ? (
                    <>
                      <RightChevronIcon />
                      <ReadMoreText>Réduire le texte</ReadMoreText>
                    </>
                  ) : (
                    <>
                      <RightChevronIcon />
                      <ReadMoreText>Lire la suite</ReadMoreText>
                    </>
                  )}
                </ReadMore>
              </TextContainer>
            ) : null}

            <MapContainer>
              <Map
                cities={[
                  {
                    ...city,
                    x: city.geo_point_2d_x ?? 0,
                    y: city.geo_point_2d_y ?? 0,
                  },
                ]}
                style={{ height: 255, width: '100%', margin: 0 }}
                zoom={7}
              />
            </MapContainer>
          </InfoContainer>
        </WelcomeWrapper>
      </WelcomeContainer>

      <KeyFigures
        figures={[
          { label: "Habitants", data: formatNumber(city.population * 1000), icon: <CrowdIcon /> },
          { label: "Superficie", data: formatNumber(city.superficie / 100), icon: <CalculatorIcon /> },
          { label: "Température moyenne", data: `${formatNumber(city.average_temperature)}°`, icon: <WeatherIcon /> },
        ]}
      />

      <CityServiceInfoCards cityEquipments={city.equipments} />

      <ElectedContact />
    </MainLayout>
  )
}

CityServices.propTypes = {
  city: PropTypes.object.isRequired,
  backLink: PropTypes.string,
}

export default CityServices
