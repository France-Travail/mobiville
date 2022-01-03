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

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  && {
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 32px 0;
  }
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
        Quel métier ou compétences recherchez-vous ?
      </Title>
      <p>
        Pour le moment, le service est disponible uniquement pour{' '}
        <Link to="/rome-list" title="Accéder à la liste des métiers">
          certains métiers.
        </Link>
      </p>

      <div>
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
            backgroundColor: '#f9f9f9',
          }}
          onFocus={() => setIsAutocompleteFocused(true)}
          onBlur={() => setIsAutocompleteFocused(false)}
        />
      </div>
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
