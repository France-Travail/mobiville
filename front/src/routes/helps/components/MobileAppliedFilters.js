import { useCallback } from 'react'
import styled from 'styled-components'

import { FiltersButton } from '../../../components'
import { COLOR_PRIMARY, COLOR_WHITE } from '../../../constants/colors'

const Container = styled.div`
  align-self: start;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;

  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`

const Tag = styled.div`
  padding: 6px;
  border-radius: 22px;

  color: ${COLOR_PRIMARY};
  background: ${COLOR_WHITE};

  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
`

const MobileAppliedFilters = ({ search, style }) => {
  search = decodeURI(search)

  const AppliedFilters = useCallback(
    () => (
      <>
        {search.split('&').map((param) => {
          if (param.includes('=emploi')) {
            return <Tag key={'emploi'}>Recherche d'emploi</Tag>
          } else if (param.includes('=logement')) {
            return <Tag key={'logement'}>Recherche de logement</Tag>
          } else if (param.includes('=déménage')) {
            return <Tag key={'déménage'}>Déménagement</Tag>
          } else if (param.includes("=demandeur d'emploi")) {
            return <Tag key={"demandeur d'emploi"}>Demandeur d'emploi</Tag>
          } else if (param.includes('=salarié')) {
            return <Tag key={'salarié'}>Salarié</Tag>
          } else if (param.includes('=alternance')) {
            return <Tag key={'alternance'}>Alternance</Tag>
          } else if (param.includes('=moins de 26 ans')) {
            return <Tag key={'moins de 26 ans'}>Moins de 26 ans</Tag>
          } else if (param.includes('=plus de 26 ans')) {
            return <Tag key={'plus de 26 ans'}>Plus de 26 ans</Tag>
          }
          return null
        })}
      </>
    ),
    [search]
  )

  return (
    <Container style={style}>
      <AppliedFilters />

      <FiltersButton
        to={`/aides-filtres` + window.location.search}
        libelle={!!search ? 'Modifier' : 'Filtrer selon votre situation'}
      />
    </Container>
  )
}

export default MobileAppliedFilters
