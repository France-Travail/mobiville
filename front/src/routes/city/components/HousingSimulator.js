import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { COLOR_OTHER_GREEN, COLOR_PRIMARY } from '../../../constants/colors'

import Euro from '@mui/icons-material/Euro'
import { TextInput } from '../../../components'
import { formatNumber } from '../../../utils/utils'
import {isMobileView} from "../../../constants/mobile"
import {useWindowSize} from "../../../common/hooks/window-size"

const Container = styled.div`
  max-width: 440px;
  padding: 56px;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background: ${COLOR_OTHER_GREEN};
  color: ${COLOR_PRIMARY};
`

const Title = styled.p`
  margin: 0;

  font-size: 24px;
  font-weight: bold;
  line-height: 28px;
`

const SubTitle = styled.p`
  margin: 0 0 8px 0;

  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  padding-right: ${({ $isMobile }) => ($isMobile ? '0' : '65px')};
`

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const InputLabel = styled.p`
  margin: 8px 0;

  font-size: 18px;
  font-weight: bold;
`

const InputAdornment = styled.p`
  font-size: 24px;
  font-weight: bold;
`

const ResultContainer = styled.div`
  min-height: 1px;

  margin: ${({ $isVisible }) => ($isVisible ? '16px 0' : '0 0 8px 0')};
  line-height: ${({ $isVisible }) => ($isVisible ? '36px' : '0')};
`

const ResultText = styled.div`
  margin: 0;

  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};

  font-size: 18px;
  font-weight: 700;
`

const Result = styled.span`
  margin: 0;

  font-size: ${({ $isMobile }) => ($isMobile ? '30px' : '36px')};
  font-weight: 900;
`

const HR = styled.hr`
  height: 0;
  border: 1px solid ${COLOR_PRIMARY};
  width: 100%;
`

const HousingSimulator = ({ city }) => {
  const isMobile = isMobileView(useWindowSize())
  const [squareMeters, setSquareMeters] = useState(0)
  const [housingCost, setHousingCost] = useState(0)

  const calculateSquareMeters = (value) => {
    if (!!city?.average_houserent) {
      const result = parseInt(value, 10) / city.average_houserent
      setSquareMeters(Number.isNaN(result) ? null : result.toFixed())
    }
    // else retour utilisateur : information indisponible dans la ville / disabled
  }

  const calculateHousingCost = (value) => {
    if (!!city?.average_houseselled) {
      const result =
        parseInt(value.replace(/ /g, ''), 10) * city.average_houseselled
      setHousingCost(Number.isNaN(result) ? null : result.toFixed())
    }
    // else retour utilisateur : information indisponible dans la ville / disabled
  }

  return (
    <>
      {(!!city?.average_houserent || !!city?.average_houseselled) && (
        <Container>
          <div>
            <Title>Simulateur de logement</Title>
            <SubTitle $isMobile={isMobile}>
              Calculer votre budget pour un achat
              ou une location
            </SubTitle>
          </div>

          {!!city?.average_houserent && (
            <div>
              <InputLabel>Pour un loyer en location</InputLabel>
              <InputGroup>
                <TextInput
                  placeholder="Renseigner un budget"
                  type="number"
                  onChange={(event) =>
                    calculateSquareMeters(event.target.value)
                  }
                ></TextInput>
                <Euro fontSize="large" />
              </InputGroup>
              <ResultContainer $isVisible={!!squareMeters}>
                <ResultText $isVisible={!!squareMeters}>
                  Votre pouvez occuper un logement de{' '}
                  {squareMeters ? (
                      <Result $isMobile={isMobile}>
                        <span data-automation-id="housing-square-meters">{formatNumber(squareMeters)}</span>
                        m2
                      </Result>
                  ) : null}
                </ResultText>
              </ResultContainer>
            </div>
          )}

          {!!city?.average_houserent && !!city?.average_houseselled && <HR />}

          {!!city?.average_houseselled && (
            <div>
              <InputLabel>Pour un achat de logement</InputLabel>
              <InputGroup>
                <TextInput
                  placeholder="Renseigner la surface"
                  type="number"
                  onChange={(event) => calculateHousingCost(event.target.value)}
                ></TextInput>
                <InputAdornment>m2</InputAdornment>
              </InputGroup>
              <ResultContainer $isVisible={!!housingCost}>
                <ResultText $isVisible={!!housingCost}>
                  Votre logement va vous coûter{' '}
                  {housingCost ? (
                      <Result $isMobile={isMobile}>
                    <span data-automation-id="housing-cost">
                      {formatNumber(housingCost)}
                    </span>
                        <Euro fontSize="large" />
                      </Result>
                  ) : null}
                </ResultText>
              </ResultContainer>
            </div>
          )}
        </Container>
      )}
    </>
  )
}

HousingSimulator.propTypes = {
  city: PropTypes.object.isRequired,
}

export default HousingSimulator
