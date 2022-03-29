import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Typography } from '@mui/material'
import { COLOR_PRIMARY, COLOR_TEXT_SECONDARY } from '../constants/colors'
import { ReactComponent as HomeIcon } from '../assets/images/home-menu.svg'
import { ReactComponent as HelpIcon } from '../assets/images/help-menu.svg'
import { ReactComponent as CitiesIcon } from '../assets/images/cities-menu.svg'

const Nav = styled.nav`
  position: fixed;
  height: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12),
    0px 1px 3px rgba(0, 0, 0, 0.2);
`

const MainWrapper = styled.div`
  background: #ffffff;
  height: 60px;
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 0 16px;
  position: relative;
`

const Item = styled(Link)`
  && {
    flex: 1;
    text-decoration: none;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${(props) =>
      props.selected ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY};

    &:before {
      content: ' ';
      background-color: ${COLOR_PRIMARY};
      position: absolute;
      top: 0;
      transform: translateX(-50%);
      left: 50%;
      right: 0;
      height: 4px;
      border-radius: 0px 0px 2px 2px;
      max-width: 74px;
      width: 100%;
      display: ${(props) => (props.selected ? 'block' : 'none')};
    }
  }
`

const Text = styled(Typography)`
  && {
    font-weight: ${(props) => (props.selected ? 700 : 500)};
    font-size: 10px;
    text-align: center;
    color: inherit;
    margin-top: 5px;
  }
`

const MENU_LINK = [
  {
    path: '/',
    icon: HomeIcon,
    label: 'Accueil',
  },
  {
    path: '/rechercher',
    icon: CitiesIcon,
    label: 'Villes',
    activePaths: ['rechercher', 'cities'],
  },
  {
    path: '/aides',
    icon: HelpIcon,
    label: 'Aides',
    activePaths: ['/aides'],
  },
]

const MenuMobile = () => {
  const [menuLink, setMenuLink] = useState(MENU_LINK)
  const location = useLocation()

  useEffect(() => {
    setMenuLink(
      MENU_LINK.map((m) => ({
        ...m,
        selected:
          m.path === location.pathname ||
          (m.activePaths &&
            m.activePaths.some((path) => location.pathname.includes(path))),
      }))
    )
  }, [location])

  return (
    <Nav>
      <MainWrapper>
        {menuLink.map((m) => (
          <Item key={m.path} to={m.path} selected={m.selected}>
            <m.icon
              style={{
                fill: m.selected ? COLOR_PRIMARY : COLOR_TEXT_SECONDARY,
              }}
            />
            <Text selected={m.selected}>{m.label}</Text>
          </Item>
        ))}
      </MainWrapper>
    </Nav>
  )
}

MenuMobile.propTypes = {}

MenuMobile.defaultProps = {}

export default MenuMobile
