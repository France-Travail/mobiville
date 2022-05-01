import { TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { throttle } from 'lodash'

import { useCities } from '../../common/contexts/citiesContext'
import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import {COLOR_TEXT_PRIMARY} from "../../constants/colors";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  && {
    font-size: 24px;
    font-weight: 900;
    margin: 0 0 32px 0;
    color: ${COLOR_TEXT_PRIMARY};
  }
`

const Subtitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: ${COLOR_TEXT_PRIMARY};
`

const JobTextField = styled(TextField)`
  && {
    input {
      padding-left: 8px !important;
    }
  }
`

const SearchRome = ({ onNext }) => {
  const size = useWindowSize()
  const {
    isLoadingJobsMatchingCriterion,
    initializeJobsAutocomplete,
    jobsMatchingCriterions,
    onSearchJobLabels,
  } = useCities()

  const [searchedLabel, setSearchedLabel] = useState('')
  const [isAutocompleteFocused, setIsAutocompleteFocused] = useState(false)

  const throttledOnSearchJobLabels = useMemo(
    () => throttle((search) => onSearchJobLabels(search), 200),
    []
  )

  useEffect(() => {
    initializeJobsAutocomplete()
  }, [])

  useEffect(() => {
    throttledOnSearchJobLabels(searchedLabel)
  }, [searchedLabel])

  const isMobile = isMobileView(size)

  return (
    <Wrapper>
      <Title isMobile={isMobile}>
        1.Quel métier recherchez-vous ?
      </Title>
      <Subtitle>
        Mobiville est disponible uniquement pour les métiers dans lesquels le retour à l'emploi est le plus favorable.
      </Subtitle>

      <div>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={jobsMatchingCriterions}
            sx={{ backgroundColor: 'white' }}
            renderInput={(params) => <TextField {...params} label="Rechercher un métier" />}
        />
        <Autocomplete
          onInputChange={(event, newValue) => {
            if (!event) return

            setSearchedLabel(newValue)
          }}
          onChange={(event, value, reason) => {
            if (reason !== 'selectOption') return

            const job = jobsMatchingCriterions.find(
              (job) => job.key === value.key
            )
            if (!job) return

            onNext({ rome: job.key })
          }}
          inputValue={searchedLabel}
          options={jobsMatchingCriterions}
          renderInput={(inputParams) => (
            <JobTextField
              {...inputParams}
              label="Rechercher un type de métier"
              variant="filled"
              openOnFocus
            />
          )}
          noOptionsText="Pas de résultat"
          loading={isLoadingJobsMatchingCriterion}
          loadingText="Chargement…"
          filterOptions={(x) => x}
          style={{
            position: isMobile && isAutocompleteFocused ? 'fixed' : 'static',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 10,
            backgroundColor: 'white',
          }}
          onFocus={() => setIsAutocompleteFocused(true)}
          onBlur={() => setIsAutocompleteFocused(false)}
        />
      </div>

      <Link to="/rome-list" title="Accéder à la liste des métiers">
        Voir la liste des métiers disponibles sur Mobiville
      </Link>
    </Wrapper>
  )
}

SearchRome.propTypes = {
  onNext: PropTypes.func,
  values: PropTypes.object,
}

SearchRome.defaultProps = {
  onNext: () => {},
  values: {},
}

export default SearchRome
