import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useWindowSize } from '../common/hooks/window-size'
import { COLOR_TEXT_PRIMARY, COLOR_TEXT_SECONDARY } from '../constants/colors'
import { isMobileView } from '../constants/mobile'
import IMGPE from '../assets/images/img-footer-pe.png'
import IMGEUROPE from '../assets/images/img-footer-europe.png'
import IMGAL from '../assets/images/img-footer-al.png'

const MainSpace = styled.div``

const Wrapper = styled.div`
  padding: 64px 0;
  max-width: 700px;
  margin: auto;

  img {
    max-width: 192px;
  }
`

const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > * {
    color: white;
  }

  ${(props) =>
    props.isMobile
      ? `
    flex-direction: column;
    align-items: center;

    > * {
      margin-bottom: 16px;
      text-align: center;

      &:last-child {
        margin-bottom: 0;
      }
    }
  `
      : ''}
`

const Item = styled.div`
  flex: 1;
  text-align: center;

  > a {
    color: white;
  }
`

const CustomLink = styled(Link)`
  color: white;
`

const CopyRight = styled.p`
  color: white;
  text-align: center;
  margin-top: 32px;
`

const Footer = () => {
  const size = useWindowSize()

  return (
    <MainSpace>
      <div style={{ backgroundColor: COLOR_TEXT_PRIMARY }}>
        <Wrapper>
          <Line isMobile={isMobileView(size)}>
            <Item>
              <CustomLink to="/legal">Mentions légales</CustomLink>
            </Item>
            <Item>
              <CustomLink to="/faq">FAQ</CustomLink>
            </Item>
            <Item>
              <CustomLink to="/accessibility">Accessibilité</CustomLink>
            </Item>
            <Item>
              <a
                href="https://nextcloud.beta.pole-emploi.fr/s/Dsmn2peD6fgPMTX"
                target="_blank"
                rel="noreferrer"
              >
                Statistiques
              </a>
            </Item>
            <Item>
              <a href="mailto:contact@mobiville.pole-emploi.fr">
                contact@mobiville.pole-emploi.fr
              </a>
            </Item>
          </Line>
        </Wrapper>
      </div>
      <div style={{ backgroundColor: COLOR_TEXT_SECONDARY }}>
        <Wrapper>
          <Line isMobile={isMobileView(size)}>
            <a
              href="https://www.pole-emploi.fr/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={IMGPE} alt="pole emploi" />
            </a>
            <a href="http://www.fse.gouv.fr/" target="_blank" rel="noreferrer">
              <img src={IMGEUROPE} alt="europe" />
            </a>
            <a
              href="https://www.actionlogement.fr/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={IMGAL} alt="action logement" />
            </a>
          </Line>
          <CopyRight>COPYRIGHT 2021 - MOBIVILLE</CopyRight>
        </Wrapper>
      </div>
    </MainSpace>
  )
}

export default Footer
