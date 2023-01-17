import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  Accordion,
  Button,
  CheckboxInput,
  FiltersButton,
  LittleSelect,
  Modale,
  Pane,
  RadioGroup,
  ResetButton,
} from '../../../../components'
import { useMemo, useState } from 'react'
import { isMobileView } from '../../../../constants/mobile'
import { useWindowSize } from '../../../../common/hooks/window-size'
import { isDirty } from '../../../../utils/utils'

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

const ButtonsContainer = styled.div`
  padding: 34px 50px;
`

const CustomButton = styled(Button)`
  height: 50px;
`

const JobsFilters = ({ filters, onFiltersChange, onReset }) => {
  const isMobile = isMobileView(useWindowSize())
  const [showMobileFilters, setShowMobileFilters] = useState(false)

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

  const opportunities = {
    OPPORTUNITIES: "Offres avec plus d'opportunités",
    ALL_OFFERS: 'Toutes les offres',
  }

  const showReset = useMemo(
    () => isDirty(filters),
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

  const handleFiltersChange = (name, key) => {
    onFiltersChange({
      [name]: key,
    })
  }

  const handleRadioButtonClick = (name, key) => {
    const tagsNames = {
      distance: 'distance',
      date: 'date_publication',
    }
    if (!!tagsNames[name]) {
      window.smartTag({
        name: tagsNames[name],
        type: 'action',
        chapters: ['city-offres', 'filtres'],
      })
    }
  }

  if (isMobile) {
    return (
      <>
        <FiltersButton
          libelle={`Filtrer par critères ${
            numbersOfSelectedFilters > 0 ? `(${numbersOfSelectedFilters})` : ''
          }`}
          onClick={handleFiltersClick}
          style={{ margin: 'auto' }}
        />

        <Modale
          title="Filtrer"
          show={showMobileFilters}
          onClose={() => setShowMobileFilters(false)}
        >
          <Accordion>
            <Pane title={`Distance ${filters?.distance !== '' ? '(1)' : ''}`}>
              <RadioGroup
                name="distance"
                values={distances}
                selectedButton={filters.distance}
                onChange={handleFiltersChange}
                onClick={handleRadioButtonClick}
              />
            </Pane>
            <Pane
              title={`Date de publication ${filters?.date !== '' ? '(1)' : ''}`}
            >
              <RadioGroup
                name="date"
                values={datesPublication}
                selectedButton={filters.date}
                onChange={handleFiltersChange}
                onClick={handleRadioButtonClick}
              />
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
                  onClick={() => {
                    window.smartTag({
                      name: 'type_contrat',
                      type: 'action',
                      chapters: ['city-offres', 'filtres'],
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
                  onClick={() => {
                    window.smartTag({
                      name: 'experience',
                      type: 'action',
                      chapters: ['city-offres', 'filtres'],
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
                        ? filters.duration.filter(
                            (duration) => duration !== key
                          )
                        : [...filters.duration, key],
                    })
                  }}
                  onClick={() => {
                    window.smartTag({
                      name: 'duree_hebdomadaire',
                      type: 'action',
                      chapters: ['city-offres', 'filtres'],
                    })
                  }}
                  checked={filters.duration.includes(key)}
                />
              ))}
            </Pane>
            <Pane title={'Opportunités'}>
              <RadioGroup
                name="opportunity"
                values={opportunities}
                selectedButton={filters.opportunity}
                onChange={handleFiltersChange}
              />
            </Pane>
          </Accordion>

          <ButtonsContainer>
            <CustomButton fullWidth onClick={() => setShowMobileFilters(false)}>
              Valider
            </CustomButton>

            <ResetButton style={{ margin: 'auto' }} show={showReset} onClick={onReset} />
          </ButtonsContainer>
        </Modale>
      </>
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
          onClickTag={() => {
            window.smartTag({
              name: 'distance',
              type: 'action',
              chapters: ['city-offres', 'filtres'],
            })
          }}
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
          onClickTag={() => {
            window.smartTag({
              name: 'date_publication',
              type: 'action',
              chapters: ['city-offres', 'filtres'],
            })
          }}
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
          onClickTag={() => {
            window.smartTag({
              name: 'type_contrat',
              type: 'action',
              chapters: ['city-offres', 'filtres'],
            })
          }}
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
          onClickTag={() => {
            window.smartTag({
              name: 'experience',
              type: 'action',
              chapters: ['city-offres', 'filtres'],
            })
          }}
        />

        <ResetButton show={showReset} onClick={onReset} />
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
          onClickTag={() => {
            window.smartTag({
              name: 'duree_hebdomadaire',
              type: 'action',
              chapters: ['city-offres', 'filtres'],
            })
          }}
        />

        {/* Opportunités */}
        <LittleSelect
          label="Offres avec plus d'opportunités"
          values={opportunities}
          selectedValue={filters.opportunity}
          onChange={(value) =>
            onFiltersChange({
              opportunity: value,
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
