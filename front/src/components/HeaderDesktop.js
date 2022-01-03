import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Typography } from '@mui/material'

import { COLOR_PRIMARY, COLOR_TEXT_SECONDARY } from '../constants/colors'
import LOGO from '../assets/images/LogoMobiville_gros.svg'
import LOGO_FR from '../assets/images/marianne-logo.png'
import LOGO_AL from '../assets/images/logo-action-logement.png'
import LOGO_PE from '../assets/images/logo-pole-emploi.png'

import { ReactComponent as HomeIcon } from '../assets/images/home.svg'
import { ReactComponent as MagnifyingGlassIcon } from '../assets/images/superhero-outlined.svg'
import { ReactComponent as SuperHeroIcon } from '../assets/images/magnifying-glass-outlined.svg'

const Header = styled.header`
  position: fixed;
  height: 102px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12),
    0px 1px 5px rgba(0, 0, 0, 0.2);
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 16px;
`

const Item = styled(Link)`
  && {
    margin-left: 70px;
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
`

const Text = styled(Typography)`
  && {
    font-weight: 500;
    font-size: 14px;
    color: inherit;
    margin-left: 10px;
  }
`

const LogoImagePartner = styled.img`
  height: 28px;
  margin-left: 16px;
`

const HeaderDesktop = () => {
  const location = useLocation()

  const homeSelected = location.pathname === '/'
  const searchSelected = location.pathname.includes('rechercher')
  const helpSelected = location.pathname.includes('aides')

  return (
    <Header>
      <Link to="/" style={{ flexShrink: 0 }} title="Retour à l’accueil">
        <img
          src={LOGO_FR}
          alt="Retour à la page d’accueil"
          style={{ height: 70, marginRight: 16 }}
        />
        <img
          src={LOGO}
          alt="Retour à la page d’accueil"
          style={{ height: 48 }}
        />
      </Link>
      <IconsContainer style={{ flexGrow: 1 }}>
        <Item to="/" selected={homeSelected}>
          <HomeIcon
            style={{
              fill: homeSelected ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY,
            }}
          />
          <Text>Accueil</Text>
        </Item>
        <Item to="/rechercher" selected={searchSelected}>
          <MagnifyingGlassIcon
            style={{
              fill: searchSelected ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY,
            }}
          />
          <Text>Recherche</Text>
        </Item>
        <Item to="/aides" selected={helpSelected}>
          <SuperHeroIcon
            style={{
              fill: helpSelected ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY,
            }}
          />
          <Text>Aides</Text>
        </Item>
      </IconsContainer>
      <div style={{ flexShrink: 0 }}>
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
        <a href="https://www.pole-emploi.fr/" target="_blank" rel="noreferrer">
          <LogoImagePartner src={LOGO_PE} alt="Pôle Emploi" />
        </a>
      </div>
    </Header>
  )
}

HeaderDesktop.propTypes = {}

HeaderDesktop.defaultProps = {}

export default HeaderDesktop
