import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useCities } from '../../../common/contexts/citiesContext'
import { alphabetOrder } from '../../../utils/utils'
import { ReactComponent as RightChevronIcon } from '../../../assets/images/icons/right_chevron.svg'

import { COLOR_PRIMARY, COLOR_WHITE } from '../../../constants/colors'

const Container = styled.div`
  color: ${COLOR_PRIMARY};'
`

const Title = styled.h2`
  margin: 16px 16px 0 16px;

  text-align: center;
  font-size: 24px;
  font-weight: 900;
`

const RegionsContainer = styled.div`
  max-width: 1072px; // 1040px + 2*16px
  width: 100%;
  margin: 25px auto;
  padding: 0 16px;

  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(auto-fit, 50%);
  grid-template-rows: repeat(6, 1fr);
  gap: 8px 24px;
`

const RegionLabel = styled(Link)`
  width: 100%;
  height: 80px;
  padding: 30px;
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${COLOR_WHITE};
  font-size: 18px;
  font-weight: 700;
  text-align: start;

  &&:hover {
    background: ${COLOR_PRIMARY};
    color: ${COLOR_WHITE};
  }
`

// Cas des régions mono-département + cas Martinique
const REGION_SPECIALE = [
  { id: '1', label: 'Guadeloupe' },
  { id: '2', label: 'Martinique' },
  { id: '3', label: 'Guyane' },
  { id: '4', label: 'La Réunion' },
  // mayotte ?
]

const HomeHelpsBanner = () => {
  const { criterions } = useCities()
  const [regions, setRegions] = useState([])

  const regionUrl = (region) => {
    // TODO code region + slug de la region
    if (REGION_SPECIALE.map((r) => r.id).includes(region.id)) {
      return `/departement/${region.id}`
    }
    return `/region/${region.id}`
  }

  useEffect(() => {
    setRegions(
      criterions.regions
        .sort(alphabetOrder('label'))
        .slice(0, 12)
        .map((r) => ({ label: r.label, path: regionUrl(r) }))
    )
  }, [criterions])

  return (
    <Container>
      <Title>Découvrez les opportunités métiers par région</Title>

      <RegionsContainer>
        {regions?.map((r) => (
          <RegionLabel to={r.path}>
            <span>{r.label}</span>
            <RightChevronIcon />
          </RegionLabel>
        ))}
      </RegionsContainer>
    </Container>
  )
}

export default HomeHelpsBanner
