import React, { useState, useEffect } from 'react'
import { Link as _Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { deburr, sortBy } from 'lodash'

import MainLayout from '../../components/MainLayout'
import { isMobileView } from '../../constants/mobile'
import { useWindowSize } from '../../common/hooks/window-size'

import aSVG from '../../assets/images/rome/A.svg'
import bSVG from '../../assets/images/rome/B.svg'
import cSVG from '../../assets/images/rome/C.svg'
import dSVG from '../../assets/images/rome/D.svg'
import fSVG from '../../assets/images/rome/F.svg'
import gSVG from '../../assets/images/rome/G.svg'
import hSVG from '../../assets/images/rome/H.svg'
import iSVG from '../../assets/images/rome/I.svg'
import jSVG from '../../assets/images/rome/J.svg'
import kSVG from '../../assets/images/rome/K.svg'
import mSVG from '../../assets/images/rome/M.svg'
import nSVG from '../../assets/images/rome/N.svg'

const PAGE_HEADER_SIZE = 92
const MAIN_HEADER_SIZE = 0

const MAIN_CATEGORIES = {
  A: {
    label:
      'Agriculture et Pêche, Espaces naturels et Espaces verts, Soins aux animaux',
    svg: aSVG,
  },
  B: {
    label: "Arts et Façonnage d'ouvrages d'art",
    svg: bSVG,
  },
  C: {
    label: 'Banque, Assurance, Immobilier',
    svg: cSVG,
  },
  D: {
    label: 'Commerce, Vente et Grande distribution',
    svg: dSVG,
  },
  E: {
    label: 'Communication, Média et Multimédia',
  },
  F: {
    label: 'Construction, Bâtiment et Travaux publics',
    svg: fSVG,
  },
  G: {
    label: 'Hôtellerie-Restauration, Tourisme, Loisirs et Animation',
    svg: gSVG,
  },
  H: {
    label: 'Industrie',
    svg: hSVG,
  },
  I: {
    label: 'Installation et Maintenance',
    svg: iSVG,
  },
  J: {
    label: 'Santé',
    svg: jSVG,
  },
  L: {
    label: 'Spectacle',
  },
  K: {
    label: 'Services à la personne et à la collectivité',
    svg: kSVG,
  },
  M: {
    label: "Support à l'entreprise",
    svg: mSVG,
  },
  N: {
    label: 'Transport et Logistique',
    svg: nSVG,
  },
}

const Wrapper = styled.div`
  margin: auto;
  max-width: 500px;
  padding: 8px;
  padding-top: 32px;
`

const H1 = styled.h1`
  height: ${PAGE_HEADER_SIZE}px;
  background: ${({ isMobile }) => (isMobile ? '#fff' : 'none')};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ isMobile }) => (isMobile ? '18px' : '24px')};
  top: ${({ isMobile }) => (isMobile ? '0' : `${MAIN_HEADER_SIZE}px`)};
  margin: 0;
  padding: 0 10px;
  width: 100%;
  position: ${({ isMobile }) => (isMobile ? 'fixed' : 'static')};
    box-shadow: ${({ isMobile }) =>
      isMobile
        ? '0 0 #fff, 0px 3px 4px rgba(0,0,0,0.12), 0px 1px 5px rgba(0,0,0,0.2)'
        : 'none'};

  + * {
    margin-top: ${({ isMobile }) => (isMobile ? `${PAGE_HEADER_SIZE}px` : '0')};
  }
}
`

const CategoryDiv = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12),
    0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
`

const H2 = styled.h2`
  && {
    font-size: 18px;
    font-size: bold;
  }
`

const Ul = styled.ul`
  list-style: none;
  padding: 0;
`

const Li = styled.li`
  padding-bottom: 8px;
  font-size: 14px;
`

const Link = styled(_Link)`
  color: #000;
`

const RomeList = () => {
  const size = useWindowSize()
  const isMobile = isMobileView(size)

  const [isLoading, setIsLoading] = useState(true)
  const [dataByCategory, setDataByCategory] = useState({})

  useEffect(() => {
    setIsLoading(true)

    axios.get('/api/ogrs').then((response) => {
      response.data.sort((a, b) =>
        deburr(a.romeLabel) < deburr(b.romeLabel) ? 1 : -1
      )

      const groupedData = sortBy(response.data, [
        'romeLabel',
        'ogrLabel',
      ]).reduce(
        (prev, { rome, romeLabel, ogrLabel }) => ({
          ...prev,
          [rome]: {
            rome,
            label: romeLabel,
            ogrs: (prev[rome]?.ogrs || []).concat(ogrLabel),
          },
        }),
        {}
      )

      const keys = Object.keys(groupedData)
      keys.sort((a, b) => (deburr(a) > deburr(b) ? 1 : -1))

      const dataGroupedByRomeCategory = keys.reduce((prev, rome) => {
        const romeFirstChar = rome[0]

        return {
          ...prev,
          [romeFirstChar]: (prev[romeFirstChar] || []).concat(
            groupedData[rome]
          ),
        }
      }, {})

      setDataByCategory(dataGroupedByRomeCategory)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <div style={{ margin: 'auto' }}>Chargement…</div>
  }

  return (
    <MainLayout>
      {isMobile && (
        <H1 isMobile>Les métiers disponibles sur Mobiville</H1>
      )}
      <Wrapper style={{ marginTop: isMobile ? PAGE_HEADER_SIZE : 0 }}>
        {!isMobile && <H1>Les métiers disponibles sur Mobiville</H1>}
        {Object.keys(dataByCategory).map((categoryLetter) => (
          <CategoryDiv key={categoryLetter}>
            {MAIN_CATEGORIES[categoryLetter].svg && (
              <img src={MAIN_CATEGORIES[categoryLetter].svg} alt="" />
            )}
            <H2>{MAIN_CATEGORIES[categoryLetter].label}</H2>
            <Ul>
              {Object.keys(dataByCategory[categoryLetter]).map((index) => (
                <Li key={dataByCategory[categoryLetter][index].rome}>
                  {dataByCategory[categoryLetter][index].label}
                </Li>
              ))}
            </Ul>
          </CategoryDiv>
        ))}
      </Wrapper>
    </MainLayout>
  )
}

export default RomeList
