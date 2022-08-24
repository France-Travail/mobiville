import { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { throttle } from 'lodash'

import { TextSearchInput } from '../../../components'
import { useCities } from '../../../common/contexts/citiesContext'

const JobSelect = ({ onSelect, defaultValue }) => {

    const {
        initializeJobsAutocomplete,
        jobsMatchingCriterions,
        onSearchJobLabels,
        // isLoadingJobsMatchingCriterion
    } = useCities()

    useEffect(() => {
        initializeJobsAutocomplete()
    }, [])

    const throttledOnSearchJobLabels = useMemo(
        () => throttle((search) => onSearchJobLabels(search), 200),
        []
    )

    // trigger when text input has been updated
    const onInputChange = (_, value) => {
        if (!!value) {
            throttledOnSearchJobLabels(value)
        }
    }

    // trigger when an option is selected
    const onChange = (_, value) => {
        onSelect(value)
    }

    return (
        <TextSearchInput
            label="Votre métier"
            placeholder="Saisissez votre métier"
            groupLabel="Métiers"
            options={jobsMatchingCriterions ?? []}
            // loading={isLoadingJobsMatchingCriterion}
            onInputChange={onInputChange}
            onChange={onChange}
            defaultValue={defaultValue}
            openThreshold={2}
            showEndAdornment={false}
        ></TextSearchInput>
    )
}

JobSelect.propTypes = {
    defaultValue: PropTypes.any,
    onSelect: PropTypes.func.isRequired,
}

export default JobSelect