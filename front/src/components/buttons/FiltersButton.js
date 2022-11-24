import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { ReactComponent as FilterIcon } from '../../assets/images/icons/filter-mobille.svg'
import { COLOR_PRIMARY, COLOR_WHITE } from '../../constants/colors'

const ContainerStyles = css`
  width: fit-content;
  padding: 6px 10px;
  border-radius: 22px;

  display: flex;
  align-items: center;
  gap: 4px;

  background: ${COLOR_PRIMARY};
  color: ${COLOR_WHITE};
  font-size: 16px;

  cursor: pointer;
`

const ContainerLink = styled(Link)`
  ${ContainerStyles}
`

const ContainerButton = styled.button`
  ${ContainerStyles};
  border: none;
`

const FiltersButton = ({
    to,
    libelle = 'Filtrer',
    onClick,
    ...props
}) => {
  if (!!to) return (
    <ContainerLink to={to} onClick={onClick} {...props}>
      <FilterIcon />
      { libelle }
    </ContainerLink>
  )

  return (
    <ContainerButton onClick={onClick} {...props}>
      <FilterIcon />
      { libelle }
    </ContainerButton>
  )
}

FiltersButton.propTypes = {
  to: PropTypes.string,
  libelle: PropTypes.string,
  onClick: PropTypes.func,
}

export default FiltersButton
