import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { throttle } from 'lodash'

import { TextSearchInput } from '../../components'
import { useCities } from '../../common/contexts/citiesContext'
import { useLocation } from 'react-router-dom'

const JobSelect = ({
    onSelect,
    defaultValue
}) => {

    const { search } = useLocation()
    const {
        initializeJobsAutocomplete,
        jobsMatchingCriterions,
        onSearchJobLabels,
        // isLoadingJobsMatchingCriterion
    } = useCities()

    const [ value, setValue ] = useState(null)

    useEffect(() => {
        if (!!search && !!jobsMatchingCriterions) {
            const entries = new URLSearchParams(search).entries()

            for (let entry of entries) {
                const [key, value] = entry

                if (key === 'codeRome') {
                    const foundJob = jobsMatchingCriterions.find(job => job.key === value)
                    if (!!foundJob) {
                        setValue(foundJob)
                    }
                }
            }
        }
    }, [search, jobsMatchingCriterions])

    useEffect(() => {
        onSelect(value)
    }, [ value ])
    
    useEffect(() => {
        initializeJobsAutocomplete()
    }, [])

    const throttledOnSearchJobLabels = useMemo(
        () => throttle((value) => (onSearchJobLabels(value)), 200),
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
        setValue(value)
    }

    return (
        <TextSearchInput
            label="Votre métier"
            placeholder="Saisissez votre métier"
            value={value}
            groupLabel="Métiers"
            options={jobsMatchingCriterions ?? []}
            isOptionEqualToValue={(option, value) => option.key === value.key}
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
    onSelect: PropTypes.func.isRequired
}

export default JobSelect