import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ButtonGroup, CityForm, HelpForm } from '../../../components'

import { ReactComponent as HouseOutlineIcon } from '../../../assets/images/icons/house-outline.svg'
import { ReactComponent as FinancialHelpIcon } from '../../../assets/images/icons/financial-help.svg'

import { isMobileView } from '../../../constants/mobile'
import { useWindowSize } from '../../../common/hooks/window-size'
import styled from 'styled-components'

// === SEARCH BLOCK ===

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 24px;

  margin-top: ${({ $isMobile }) => ($isMobile ? '' : '-96px')};
`

const ButtonGroupLabel = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin: 8px 0;
`

const WelcomeSearchForm = () => {
  const HELPS_BUTTON_ID = 'helps'
  const CITIES_BUTTON_ID = 'cities'

  const isMobile = isMobileView(useWindowSize())
  const navigate = useNavigate()

  const [selectedSearchMode, setSelectedSearchMode] = useState('city')

  const isSelected = useCallback(
    (id) => {
      return id === selectedSearchMode
    },
    [selectedSearchMode]
  )

  const handleClick = (buttonId) => {
    // redirect to modale on mobile
    if (isMobile) {
      if (buttonId === HELPS_BUTTON_ID) {
        navigate('/aides-search')
      } else if (buttonId === CITIES_BUTTON_ID) {
        navigate('/rechercher')
      }
    }
  }

  const handleChange = (buttonId) => {
    setSelectedSearchMode(buttonId)
  }

  return (
    <Container $isMobile={isMobile}>
      <div style={{ width: '100%' }}>
        <ButtonGroupLabel>Que recherchez-vous ?</ButtonGroupLabel>
        <ButtonGroup
          onChange={handleChange}
          onClick={handleClick}
          defaultSelected={CITIES_BUTTON_ID}
        >
          <button
            data-automation-id="search-ville"
            type="button"
            id={CITIES_BUTTON_ID}
          >
            <HouseOutlineIcon />
            <p>Une ville</p>
          </button>

          <button
            type="button"
            data-automation-id="search-aide"
            id={HELPS_BUTTON_ID}
          >
            <FinancialHelpIcon />
            <p>Une aide</p>
          </button>
        </ButtonGroup>
      </div>

      {!isMobile && (
        <>
          <CityForm hidden={!isSelected(CITIES_BUTTON_ID)}></CityForm>

          <HelpForm hidden={!isSelected(HELPS_BUTTON_ID)}></HelpForm>
        </>
      )}
    </Container>
  )
}

export default WelcomeSearchForm
