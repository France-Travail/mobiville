import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  Accordion,
  Button,
  CheckboxInput,
  CloseButton,
  FiltersButton,
  LittleSelect,
  Pane,
  RadioInput,
  ResetButton,
} from '../../../../components'
import { COLOR_PRIMARY, COLOR_WHITE } from '../../../../constants/colors'
import { useEffect, useMemo, useState } from 'react'
import { isMobileView } from '../../../../constants/mobile'
import { useWindowSize } from '../../../../common/hooks/window-size'
import { useScroll } from '../../../../common/hooks/use-scroll'

const Container = styled.div`
  max-width: 1040px;
  width: 100%;
  margin: 0 auto;

  display: grid;
  place-content: center;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const Modale = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  min-height: 100vh;

  overflow-y: scroll;

  background: ${COLOR_WHITE};
  color: ${COLOR_PRIMARY};
`

const Title = styled.p`
  margin: 36px 16px 16px 16px;

  font-size: 36px;
  font-weight: 900;
`

const ButtonsContainer = styled.div`
  padding: 34px 50px;
`

const CustomButton = styled(Button)`
  height: 50px;
`

const JobsFilters = ({ filters, onFiltersChange, onReset }) => {
  const isMobile = isMobileView(useWindowSize())
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const { toggleBodyScroll } = useScroll()

  const datesPublication = {
    ONE_DAY: 'Un jour',
    THREE_DAY: 'Trois jours',
    ONE_WEEK: 'Une semaine',
    TWO_WEEKS: 'Deux semaines',
    ONE_MONTH: 'Un mois',
    ALL_TIME: 'Toutes les offres',
  }

  const distances = {
    5: '5 km',
    10: '10 km',
    30: '30 km',
  }

  const typeContrats = {
    CDI: 'CDI',
    CDD: 'CDD',
    MIS: 'Intérim',
    OTHERS: 'Autres',
  }

  const experiences = {
    D: 'Moins de 1 an',
    '1-3': 'De 1 à 3 ans',
    '3+': 'Plus de 3 ans',
    'N/A': 'Non renseignée',
  }

  const durations = {
    FULL_TIME: 'Temps plein',
    PART_TIME: 'Temps partiel',
    'N/A': 'Non renseignée',
  }

  useEffect(() => {
    toggleBodyScroll(!showMobileFilters)
  }, [showMobileFilters])

  const showReset = useMemo(
    () =>
      Object.values(filters).reduce((prev, currFilter) => {
        if (typeof currFilter === 'string') return prev || currFilter !== ''
        if (Array.isArray(currFilter)) return prev || currFilter?.length > 0
        return prev || !!currFilter
      }, false),
    [filters]
  )

  const numbersOfSelectedFilters = useMemo(() => {
    return Object.values(filters).reduce((prev, currFilter) => {
      if (typeof currFilter === 'string' && currFilter !== '') return prev + 1
      if (Array.isArray(currFilter) && currFilter?.length > 0)
        return prev + currFilter.length
      return prev
    }, 0)
  }, [filters])

  const handleFiltersClick = () => {
    setShowMobileFilters(true)
  }

  const handleClose = () => {
    setShowMobileFilters(false)
  }

  const handleSubmitFilters = () => {
    setShowMobileFilters(false)
  }

  if (isMobile) {
    if (!showMobileFilters) {
      return (
        <FiltersButton
          libelle={`Filtrer par critères ${
            numbersOfSelectedFilters > 0 ? `(${numbersOfSelectedFilters})` : ''
          }`}
          onClick={handleFiltersClick}
          style={{ margin: 'auto' }}
        />
      )
    }

    return (
      <Modale>
        <CloseButton onClick={handleClose} />
        <Title>Filtrer</Title>

        <Accordion>
          <Pane title={`Distance ${filters?.distance !== '' ? '(1)' : ''}`}>
            {Object.entries(distances).map(([key, value]) => (
              <RadioInput
                key={key}
                name="distance"
                value={value}
                onChange={() =>
                  onFiltersChange({
                    distance: key,
                  })
                }
                checked={filters.distance === key}
              />
            ))}
          </Pane>
          <Pane
            title={`Date de publication ${filters?.date !== '' ? '(1)' : ''}`}
          >
            {Object.entries(datesPublication).map(([key, value]) => (
              <RadioInput
                key={key}
                name="date"
                value={value}
                onChange={() =>
                  onFiltersChange({
                    date: key,
                  })
                }
                checked={filters.date === key}
              />
            ))}
          </Pane>
          <Pane
            title={`Type de contrat ${
              filters?.type?.length > 0 ? `(${filters?.type?.length})` : ''
            }`}
          >
            {Object.entries(typeContrats).map(([key, value]) => (
              <CheckboxInput
                key={key}
                name="type"
                value={value}
                onChange={() => {
                  onFiltersChange({
                    type: filters.type.includes(key)
                      ? filters.type.filter((type) => type !== key)
                      : [...filters.type, key],
                  })
                }}
                checked={filters.type.includes(key)}
              />
            ))}
          </Pane>
          <Pane
            title={`Expérience ${
              filters?.experience?.length > 0
                ? `(${filters?.experience?.length})`
                : ''
            }`}
          >
            {Object.entries(experiences).map(([key, value]) => (
              <CheckboxInput
                key={key}
                name="experience"
                value={value}
                onChange={() => {
                  onFiltersChange({
                    experience: filters.experience.includes(key)
                      ? filters.experience.filter(
                          (experience) => experience !== key
                        )
                      : [...filters.experience, key],
                  })
                }}
                checked={filters.experience.includes(key)}
              />
            ))}
          </Pane>
          <Pane
            title={`Durée hebdomadaire ${
              filters?.duration?.length > 0
                ? `(${filters?.duration?.length})`
                : ''
            }`}
          >
            {Object.entries(durations).map(([key, value]) => (
              <CheckboxInput
                key={key}
                name="duration"
                value={value}
                onChange={(e) => {
                  onFiltersChange({
                    duration: !e.target.checked
                      ? filters.duration.filter((duration) => duration !== key)
                      : [...filters.duration, key],
                  })
                }}
                checked={filters.duration.includes(key)}
              />
            ))}
          </Pane>
          {/* <Pane title={"Opportunités"}>
            {Object.entries(opportunities).map(([ key, value ]) => (
              <CheckboxInput
                name="opportunity"
                value={value}
                onClick={() => {
                  onFiltersChange({
                    opportunity: (filters.opportunity.includes(key))
                      ? filters.opportunity.filter(opportunity => opportunity !== key)
                      : [ ...filters.opportunity, key ]
                  })
                }}
              />
            ))}
          </Pane> */}
        </Accordion>

        <ButtonsContainer>
          <CustomButton fullWidth onClick={handleSubmitFilters}>
            Valider
          </CustomButton>

          {showReset ? (
            <ResetButton style={{ margin: 'auto' }} onClick={onReset} />
          ) : null}
        </ButtonsContainer>
      </Modale>
    )
  }

  return (
    <Container>
      <Row>
        {/* Distance */}
        <LittleSelect
          label="Distance"
          values={distances}
          selectedValue={filters.distance}
          onChange={(value) =>
            onFiltersChange({
              distance: value,
            })
          }
        />

        {/* Date de publication */}
        <LittleSelect
          label="Date de publication"
          values={datesPublication}
          selectedValue={filters.date}
          onChange={(value) =>
            onFiltersChange({
              date: value,
            })
          }
        />

        {/* Type de contrat */}
        <LittleSelect
          multiple
          label="Type de contrat"
          values={typeContrats}
          selectedValue={filters.type}
          onChange={(value) =>
            onFiltersChange({
              type: value,
            })
          }
        />

        {/* Expérience */}
        <LittleSelect
          multiple
          label="Expérience"
          values={experiences}
          selectedValue={filters.experience}
          onChange={(value) =>
            onFiltersChange({
              experience: value,
            })
          }
        />

        {showReset ? <ResetButton onClick={onReset} /> : null}
      </Row>

      <Row>
        {/* Durée hebdomadaire */}
        <LittleSelect
          multiple
          label="Durée hebdomadaire"
          values={durations}
          selectedValue={filters.duration}
          onChange={(value) =>
            onFiltersChange({
              duration: value,
            })
          }
        />
      </Row>
    </Container>
  )
}

JobsFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onFiltersChange: PropTypes.func,
  onReset: PropTypes.func,
}

export default JobsFilters
