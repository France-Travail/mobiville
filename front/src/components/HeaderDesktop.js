import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Typography } from '@mui/material'

import {
  COLOR_HEADER_BACKGROUND,
  COLOR_PRIMARY,
  COLOR_TEXT_SECONDARY,
} from '../constants/colors'
import LOGO from '../assets/images/LogoMobiville_gros.svg'
import LOGO_FR from '../assets/images/marianne-logo.png'
import LOGO_AL from '../assets/images/logo-action-logement.png'
import LOGO_PE from '../assets/images/logo-pole-emploi.png'

const Header = styled.header`
  height: 102px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001; //leaflet map est a 1000zindex
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 16px 70px;
  border-bottom: solid 2px ${COLOR_HEADER_BACKGROUND};

  .taille-fixe {
    flex-shrink: 0;
    width: 300px;
  }
`

const Item = styled(Link)`
  && {
    margin: 0px 11px;
    text-decoration: none;
    position: relative;
    display: flex;
    align-items: center;
    color: ${(props) =>
      props.selected ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY};
  }
`

const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;

  a:hover {
    color: ${COLOR_PRIMARY};
  }
`

const Text = styled(Typography)`
  && {
    font-weight: 500;
    font-size: 14px;
    color: inherit;
  }
`

const LogoImagePartner = styled.img`
  height: 28px;
  margin-left: 16px;
`

const HeaderDesktop = (props) => {
  const location = useLocation()

  const searchSelected = location.pathname.includes('rechercher')
  const helpSelected = location.pathname.includes('aides')

  function displaySearch() {
    const flag = props.displaySearch
    if (flag)
      return (
        <IconsContainer>
          <Item to="/rechercher" selected={searchSelected}>
            <Text>Rechercher une ville</Text>
          </Item>
          <Item to="/aides" selected={helpSelected}>
            <Text>Rechercher des aides</Text>
          </Item>
        </IconsContainer>
      )
  }

  return (
    <Header>
      <Link
        to="/"
        className="taille-fixe"
        title="Retour à l’accueil"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <img
          src={LOGO_FR}
          alt="Retour à la page d’accueil"
          style={{ height: 70, marginRight: 16 }}
        />
        <img
          src={LOGO}
          alt="Retour à la page d’accueil"
          style={{ height: 85 }}
        />
      </Link>
      {displaySearch()}
      <div className="taille-fixe" style={{ display: 'flex' }}>
        <div style={{ marginLeft: 'auto' }}>
          <Text style={{ color: COLOR_TEXT_SECONDARY, paddingBottom: 8 }}>
            Proposé par
          </Text>
          <a
            href="https://www.actionlogement.fr/"
            target="_blank"
            rel="noreferrer"
          >
            <LogoImagePartner src={LOGO_AL} alt="Action logement" />
          </a>
          <a
            href="https://www.pole-emploi.fr/"
            target="_blank"
            rel="noreferrer"
          >
            <LogoImagePartner src={LOGO_PE} alt="Pôle Emploi" />
          </a>
        </div>
      </div>
    </Header>
  )
}

HeaderDesktop.propTypes = {}

HeaderDesktop.defaultProps = {}

export default HeaderDesktop
