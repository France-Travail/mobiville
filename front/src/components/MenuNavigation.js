import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

import {
  COLOR_OTHER_GREEN,
  COLOR_PRIMARY,
  COLOR_TEXT_PRIMARY,
  COLOR_WHITE,
} from '../constants/colors'

const Nav = styled.nav`
  position: ${({ $isMobile }) => ($isMobile ? 'sticky' : 'absolute')};
  left: 0;
  right: 0;
  min-height: 50px;
  z-index: 100;
  margin-top: 12px;

  background: ${({ $isMobile }) =>
    $isMobile ? COLOR_WHITE : COLOR_OTHER_GREEN};
`
const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px 38px;
`
const MenuItem = styled(Link)`
  font-weight: ${({ $selected }) => ($selected ? 700 : 400)};
  font-size: 16px;
  line-height: 24px;

  color: ${({ $disabled = false, $selected }) =>
    $disabled ? 'grey' : $selected ? COLOR_PRIMARY : COLOR_TEXT_PRIMARY};
  text-decoration: ${({ $selected }) => ($selected ? 'underline' : 'none')};

  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'inherit')};
`

const MenuNavigation = ({ isMobile = false }) => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const codeRome = params.get('codeRome')
  const insee = location.pathname.split('/')[2]

  const MENU_LINK = [
    {
      path: `/city/${insee}?codeRome=${codeRome}`,
      label: 'Emploi et logement',
      selected:
        !location.pathname.includes('job') &&
        !location.pathname.includes('life') &&
        !location.pathname.includes('villes-proches'),
    },
    {
      path: `/city/${insee}/job?codeRome=${codeRome}`,
      label: 'Offres d’emploi',
      selected: location.pathname.includes('job'),
    },
    {
      path: `/city/${insee}/life?codeRome=${codeRome}`,
      label: 'Services de la ville',
      selected: location.pathname.includes('life'),
    },
    {
      path: `/city/${insee}/villes-proches?codeRome=${codeRome}`,
      label: isMobile
        ? 'Villes similaires'
        : 'Villes similaires ou à proximité',
      selected: location.pathname.includes('villes-proches'),
    },
  ]

  return (
    <Nav $isMobile={isMobile}>
      <Container $isMobile={isMobile}>
        {MENU_LINK.map((menu, key) => (
          <MenuItem
            $isMobile={isMobile}
            $disabled={menu.disabled}
            $selected={menu.selected}
            key={key}
            to={menu.path}
          >
            {menu.label}
          </MenuItem>
        ))}
      </Container>
    </Nav>
  )
}

MenuNavigation.propTypes = {
  isMobile: PropTypes.bool
}

export default MenuNavigation
