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
  order: ${({ $isMobile }) => ($isMobile ? '3' : '1')};

  background: ${({ $isMobile }) =>
    $isMobile ? COLOR_WHITE : COLOR_OTHER_GREEN};
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 13px 0;

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
      path: `/ville/${insee}?codeRome=${codeRome}`,
      label: 'Emploi et logement',
      selected:
        !location.pathname.includes('metier') &&
        !location.pathname.includes('services') &&
        !location.pathname.includes('villes-proches'),
    },
    {
      path: `/ville/${insee}/metier?codeRome=${codeRome}`,
      label: 'Offres d’emploi',
      selected: location.pathname.includes('metier'),
    },
    {
      path: `/ville/${insee}/services?codeRome=${codeRome}`,
      label: 'Services de la ville',
      selected: location.pathname.includes('services'),
    },
    {
      path: `/ville/${insee}/villes-proches?codeRome=${codeRome}`,
      label: isMobile
        ? 'Villes similaires'
        : 'Villes similaires ou à proximité',
      selected: location.pathname.includes('villes-proches'),
    },
  ]

  return (
    <Nav $isMobile={isMobile}>
      <Container>
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
  isMobile: PropTypes.bool,
}

export default MenuNavigation
