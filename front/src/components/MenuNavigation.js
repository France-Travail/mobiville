import React, { useEffect } from 'react'
import styled from 'styled-components'
import { COLOR_OTHER_GREEN, COLOR_TEXT_PRIMARY } from '../constants/colors'

const Nav = styled.nav`
  background: ${COLOR_OTHER_GREEN};
  position: absolute;
  height: 50px;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12),
    0px 1px 3px rgba(0, 0, 0, 0.2);
`
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  gap: 8px;
`
const MenuItem = styled.a`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 24px;
color: ${COLOR_TEXT_PRIMARY};
margin-right: 30px;
`

const MENU_LINK = [
  {
    path: '/',
    label: 'Emploi et logement',
  },
  {
    path: '/rechercher',
    label: 'Offres d’emploi',
  },
  {
    path: '/aides',
    label: 'Services de la ville',
  },
  {
    path: '/aides',
    label: 'Villes similaires ou à proximité',
  },
]

const MenuNavigation = () => {

  useEffect(() => {
    })

  return (
    <Nav>
        <Container>
        {
            MENU_LINK.map((menu, key) => 
            <MenuItem key={key} href={menu.path}>{menu.label}</MenuItem>
            ) 
        }
        </Container>
    </Nav>
  )
}

MenuNavigation.propTypes = {}

MenuNavigation.defaultProps = {}

export default MenuNavigation
