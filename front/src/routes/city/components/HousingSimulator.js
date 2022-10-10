import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { COLOR_OTHER_GREEN, COLOR_PRIMARY } from '../../../constants/colors'

import Euro from '@mui/icons-material/Euro'
import { TextInput } from '../../../components'
import { formatNumber } from '../../../utils/utils'

const Container = styled.div`
  max-width: 440px;
  padding: 56px;
  padding-bottom: 0;
  border-radius: 4px;

  display: flex;
  flex-direction: column;

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

  margin: ${({ $isVisible }) => ($isVisible ? '16px 0' : '0')};
  line-height: 36px;
`

const ResultText = styled.p`
  margin: 0;

  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};

  font-size: 18px;
  font-weight: 700;
`

const Result = styled.p`
  margin: 0;

  font-size: 36px;
  font-weight: bold;
`

const HR = styled.hr`
  height: 0;
  border: 1px solid ${COLOR_PRIMARY};
  width: 100%;
`

const HousingSimulator = ({ city }) => {
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
            <SubTitle>
              Calculer votre budget pour un achat
              <br />
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
                  Votre pouvez occuper un logement de
                </ResultText>
                {squareMeters ? (
                  <Result>
                    <span data-automation-id="housing-square-meters">{formatNumber(squareMeters)}</span>
                    m2
                  </Result>
                ) : null}
              </ResultContainer>
            </div>
          )}

          {!!city?.average_houserent && !!city?.average_houseselled && <HR />}

          {!!city?.average_houseselled && (
            <div>
              <InputLabel>Pour un achat de logement</InputLabel>
              <InputGroup>
                <TextInput
                  placeholder="Renseigner la surface en m2"
                  type="number"
                  onChange={(event) => calculateHousingCost(event.target.value)}
                ></TextInput>
                <InputAdornment>m2</InputAdornment>
              </InputGroup>
              <ResultContainer $isVisible={!!housingCost}>
                <ResultText $isVisible={!!housingCost}>
                  Votre logement va vous coûter
                </ResultText>
                {housingCost ? (
                  <Result>
                    <span data-automation-id="housing-cost">
                      {formatNumber(housingCost)}
                    </span>
                    <Euro fontSize="large" />
                  </Result>
                ) : null}
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
