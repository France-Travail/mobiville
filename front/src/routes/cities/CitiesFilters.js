import React, { useEffect } from 'react'
import styled from 'styled-components'
import { MenuItem, Select } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { useCities } from '../../common/contexts/citiesContext'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const SelectBlock = styled(Select).attrs({ variant: 'standard' })`
  && {
    &.MuiInput-underline:before {
      border-bottom: none !important;
    }

    .MuiSelect-select {
      background-color: transparent !important;
      padding-right: 0 !important;
    }

    .MuiSelect-icon {
      display: none;
    }
  }
`

const SpaceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  svg {
    margin-left: 8px;
  }
`

const CitiesFilters = () => {
  const { setSortCriterions, sortCriterions } = useCities()

  useEffect(() => {
    setSortCriterions('')
  }, [])

  return (
    <Wrapper>
      <SelectBlock
        displayEmpty
        value={sortCriterions}
        onChange={(event) => setSortCriterions(event.target.value)}
      >
        <MenuItem value="">
          <SpaceItem>
            Nombre d{"'"}
            habitants
            <FilterListIcon />
          </SpaceItem>
        </MenuItem>
        <MenuItem value="mer">
          <SpaceItem>
            Plus proche de la mer
            <FilterListIcon />
          </SpaceItem>
        </MenuItem>
        <MenuItem value="montagne">
          <SpaceItem>
            Plus en montagne
            <FilterListIcon />
          </SpaceItem>
        </MenuItem>
      </SelectBlock>
    </Wrapper>
  )
}

CitiesFilters.propTypes = {}

CitiesFilters.defaultProps = {}

export default CitiesFilters
