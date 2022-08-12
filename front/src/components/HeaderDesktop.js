import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Typography } from '@mui/material'

import { COLOR_HEADER_BACKGROUND, COLOR_TEXT_SECONDARY, COLOR_WHITE } from '../constants/colors'
import LOGO from '../assets/images/LogoMobiville_gros.svg'
import LOGO_FR from '../assets/images/marianne-logo.png'
import LOGO_AL from '../assets/images/logo-action-logement.png'
import LOGO_PE from '../assets/images/logo-pole-emploi.png'

const Header = styled.header`
  height: 100px;
  width: 100%;
  z-index: 1001; //leaflet map est a 1000zindex
  padding: 12px 80px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: ${COLOR_WHITE};
  border-bottom: solid 2px ${COLOR_HEADER_BACKGROUND};
`

const HomeLink = styled(Link)`
  height: 100%;

  display: flex;
  align-items: center;
  gap: 12px;

  & > img {
    height: 100%;
  }
`

const Text = styled(Typography)`
  color: ${COLOR_TEXT_SECONDARY};
  padding-bottom: 8px;

  && {
    font-weight: 500;
    font-size: 14px;
    color: inherit;
  }
`

const PartnersContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const PartnersLogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const LogoImagePartner = styled.img`
  height: 28px;
`

const HeaderDesktop = () => {
    return (
      <Header>
        <HomeLink
            to="/"
            title="Retour à l’accueil"
        >
          <img
              src={LOGO_FR}
              alt="Retour à la page d’accueil"
          />
          <img
              src={LOGO}
              alt="Retour à la page d’accueil"
          />
        </HomeLink>

        <PartnersContainer>
          <Text>Proposé par</Text>
          <PartnersLogoContainer>
            <a
                href="https://www.actionlogement.fr/"
                target="_blank"
                rel="noreferrer"
            >
              <LogoImagePartner src={LOGO_AL} alt="Action logement"/>
            </a>
            <a
                href="https://www.pole-emploi.fr/"
                target="_blank"
                rel="noreferrer"
            >
              <LogoImagePartner src={LOGO_PE} alt="Pôle Emploi"/>
            </a>
          </PartnersLogoContainer>
        </PartnersContainer>
      </Header>
    )
}

HeaderDesktop.propTypes = {}

export default HeaderDesktop
