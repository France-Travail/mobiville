import { memo, useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormControl, MenuItem, Select, Button } from '@mui/material'

import { useCities } from '../../../common/contexts/citiesContext'
import {
  COLOR_WHITE,
  COLOR_PRIMARY,
  COLOR_OTHER_GREEN,
} from '../../../constants/colors'
import CityForm from '../../../components/CityForm'
import { ReactComponent as ResetFilterIcon } from '../../../assets/images/icons/reset.svg'

const SearchPanel = styled.div`
`
const SearchBar = styled.div`
  > *:not(input) {
    flex: 1;
  }

  .MuiFormControl-root {
    width: 150px;
    margin: 20px 0;
  }

  .gEkiVf {
    padding: 0px;
    border: 1px solid #f6f7fb;
  }

  position: relative;
`

const SearchFormControl = styled(FormControl)`
  margin-right: 16px !important;
`

const CustomMenuItem = styled(MenuItem)`
  height: 54px;
  width: 155px;
  color: ${({ value }) => (!!value ? COLOR_WHITE : `${COLOR_PRIMARY} !important`)};
  display: flex;
  justify-content: center !important;
  align-items: center !important;
  order: 0;
  flex-grow: 0;
  background-color: transparent !important;
  margin: 10px 10px 0 10px !important;
  &:hover {
    background: #c7c7f3 !important;
    border-radius: 8px;
  }
`
const ItemLabel = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
  margin: auto !important;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  align-items: stretch;
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
`

const ContainerParent = styled.div`
  height: 118px;
  gap: 8px;
  background: ${COLOR_OTHER_GREEN};
  display: flex;
  justify-content: center;
  align-items: center;
`

const SelectBlock = styled(Select)`
  && {
    &.css-nhoni8-MuiInputBase-root-MuiFilledInput-root:before,
    &.css-nhoni8-MuiInputBase-root-MuiFilledInput-root:active::before {
      border-bottom: none !important;
    }

    &.MuiFilledInput-root {
      position: inherit;
    }

    .MuiSelect-select {
      background-color: transparent !important;
      padding-right: 0 !important;
    }

    fieldset {
      border: 1px solid ${COLOR_PRIMARY};
    }

    svg {
      color: ${({ value }) => (value ? COLOR_WHITE : COLOR_PRIMARY)};
    }

    width: 151px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px;
    gap: 8px;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
    background: ${({ value }) => (value ? COLOR_PRIMARY : COLOR_WHITE)};
    color: ${({ value }) => (value ? COLOR_WHITE : COLOR_PRIMARY)};
    border-radius: 20px !important;
  }
`
const ResetFilterLabel = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: ${COLOR_PRIMARY};
  margin-left: 8px;
  text-transform: none;
`
const DesktopCriterionsPanel = ({ paramsUrl }) => {
  const { environmentCriterions, cityCriterions } = useCities()

  const [environmentSelected, setEnvironmentSelected] = useState("")
  const [citySizeSelected, setCitySizeSelected] = useState("")

  const showReset = useCallback(() => (
    !!environmentSelected || !!citySizeSelected
  ), [environmentSelected, citySizeSelected])

  const resetFilter = () => {
    setEnvironmentSelected('')
    setCitySizeSelected('')
  }

  const handleChangeEnv = (event) => {
    setEnvironmentSelected(event.target.value)
  }

  const handleChangeCity = (event) => {
    setCitySizeSelected(event.target.value)
  }

  useEffect(() => {
    if (!!paramsUrl.codeCity && paramsUrl.codeCity !== citySizeSelected) {
      setCitySizeSelected(paramsUrl.codeCity)
    }
    if (!!paramsUrl.codeEnvironment && paramsUrl.codeEnvironment !== environmentSelected) {
      setEnvironmentSelected(paramsUrl.codeEnvironment)
    }
  }, [paramsUrl])

  return (
    <SearchPanel>
      <ContainerParent>
        <Container>
          <CityForm filters={{ environmentSelected, citySizeSelected }} />
        </Container>
      </ContainerParent>
      <Container>
        <SearchBar className="wrapper">
          <SearchFormControl sx={{ m: 1, width: 300 }}>
            <SelectBlock
              displayEmpty
              defaultValue={''}
              onChange={handleChangeEnv}
              value={environmentSelected}
            >
              <CustomMenuItem value="" style={{ display: 'none' }}>
                <ItemLabel>Cadre de vie</ItemLabel>
              </CustomMenuItem>
              {environmentCriterions.map((rome) => (
                <CustomMenuItem key={rome.key} value={rome.key}>
                  <ItemLabel>{rome.label}</ItemLabel>
                </CustomMenuItem>
              ))}
            </SelectBlock>
          </SearchFormControl>

          <SearchFormControl sx={{ m: 1, width: 300 }}>
            <SelectBlock
              displayEmpty
              defaultValue={''}
              onChange={handleChangeCity}
              value={citySizeSelected}
            >
              <CustomMenuItem value="" style={{ display: 'none' }}>
                <ItemLabel>Taille de ville</ItemLabel>
              </CustomMenuItem>
              {cityCriterions.map((rome) => (
                <CustomMenuItem key={rome.key} value={rome.key}>
                  <ItemLabel>{rome.label}</ItemLabel>
                </CustomMenuItem>
              ))}
            </SelectBlock>
          </SearchFormControl>
          {showReset() ? (
            <Button
              onClick={resetFilter}
              style={{
                margin: 0,
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <ResetFilterIcon />
              <ResetFilterLabel>Réinitialiser</ResetFilterLabel>
            </Button>
          ) : null}
        </SearchBar>
      </Container>
    </SearchPanel>
  )
}

DesktopCriterionsPanel.propTypes = {
  paramsUrl: PropTypes.object,
}

DesktopCriterionsPanel.defaultProps = {
  paramsUrl: [],
}

export default memo(DesktopCriterionsPanel)
