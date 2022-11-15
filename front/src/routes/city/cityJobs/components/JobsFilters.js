import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Button } from '@mui/material'
import { LittleSelect } from '../../../../components'
import { ReactComponent as ResetFilterIcon } from '../../../../assets/images/icons/reset.svg'
import { COLOR_PRIMARY } from '../../../../constants/colors'
import { useMemo } from 'react'

const Container = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const ResetButton = styled(Button)`
  margin: 0;

  display: flex;
  justify-content: center;
  gap: 4px;
`

const ResetFilterLabel = styled.span`
  color: ${COLOR_PRIMARY};
  font-size: 14px;
  font-weight: 700;
  line-height: 1em;
  text-transform: none;
`

const JobsFilters = ({ filters, onFiltersChange, onReset }) => {
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

  //   const experiences = {
  //     moins1: 'Moins de 1 an',
  //     '1a3': 'De 1 à 3 ans',
  //     plus3: 'Plus de 3 ans',
  //     'N/A': 'Non renseignée',
  //   }

  const experiences = {
    D: 'Débutant accepté',
    E: 'Expérience exigée',
    S: 'S ????',
    'N/A': 'Non renseignée',
  }

  const durations = {
    FULL_TIME: 'Temps plein',
    PART_TIME: 'Temps partiel',
    'N/A': 'Non renseignée',
  }

  const showReset = useMemo(() => Object.values(filters).reduce((prev, currFilter) => {
      if (typeof currFilter === 'string') return prev || currFilter !== ''
      if (Array.isArray(currFilter)) return prev || currFilter?.length > 0
      return prev || !!currFilter
    }, false),
    [ filters ])

  return (
    <Container>
      {/* Distance */}
      <LittleSelect
        label="Distance"
        values={distances}
        selectedValue={filters.distance}
        onChange={(value) => onFiltersChange({
          distance: value,
        })}
      />

      {/* Date de publication */}
      <LittleSelect
        label="Date de publication"
        values={datesPublication}
        selectedValue={filters.date}
        onChange={(value) => onFiltersChange({
          date: value,
        })}
      />

      {/* Type de contrat */}
      <LittleSelect
        multiple
        label="Type de contrat"
        values={typeContrats}
        selectedValue={filters.type}
        onChange={(value) => onFiltersChange({
            type: value,
        })}
      />

      {/* Expérience */}
      <LittleSelect
        multiple
        label="Expérience"
        values={experiences}
        selectedValue={filters.experience}
        onChange={(value) => onFiltersChange({
          experience: value,
        })}
      />

      {/* Durée hebdomadaire */}
      <LittleSelect
        multiple
        label="Durée hebdomadaire"
        values={durations}
        selectedValue={filters.duration}
        onChange={(value) => onFiltersChange({
          duration: value,
        })}
      />

      {showReset
        ? (<ResetButton
          onClick={onReset}
        >
          <ResetFilterIcon />
          <ResetFilterLabel>Réinitialiser</ResetFilterLabel>
        </ResetButton>)
        : null}

    </Container>
  )
}

JobsFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onFiltersChange: PropTypes.func
}

export default JobsFilters
