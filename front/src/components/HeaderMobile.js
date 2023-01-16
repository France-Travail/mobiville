import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import LOGO from '../assets/images/LogoMobiville_gros.svg'
import LOGO_FR from '../assets/images/marianne-logo.png'

const Header = styled.header`
  height: 102px;
  padding: 0 16px;

  display: flex;
  align-items: center;

  background-color: #fff;
`

const HeaderMobile = () => (
  <Header>
    <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
      <img src={LOGO_FR} alt="" style={{ height: 70, marginRight: 16 }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={LOGO}
          alt="logo"
          style={{
            width: '100%',
            maxHeight: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    </Link>
  </Header>
)

export default HeaderMobile
