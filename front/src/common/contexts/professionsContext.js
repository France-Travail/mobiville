import {orderBy} from 'lodash'
import React, {useState, useCallback, useMemo} from 'react'
import {
    searchProfessions,
    searchInfosTravail,
    searchProfessionsCountList
} from '../../api/professions.api'
import { distance } from '../../utils/utils'

const ProfessionsContext = React.createContext()

export function ProfessionsProvider(props) {
    const [professions, _setProfessions] = useState([])
    const [isLoading, _setIsLoading] = useState(false)
    const [professionsCountList, _setProfessionsCountList] = useState([])
    const [totalOffres, _setTotalOffres] = useState(null)
    const [infosTravail, _setInfosTravail] = useState({
        bassinTensionIndT: null,
        hiringRate: null
    })

    const onSearch = useCallback((params) => {
        _setIsLoading(true)

        return searchProfessions(params)
            .then((jobsData) => {
                _setProfessions(orderBy(jobsData.resultats, ['dateCreation'], ['desc']))
                _setTotalOffres(jobsData.totalOffres)
            })
            .then(() => _setIsLoading(false))
    }, [])

    const onSearchInfosTravail = useCallback(
        (params) => searchInfosTravail(params)
            .then((res) => {
                _setInfosTravail(prev => ({
                    ...prev,
                    ...res
                }))
            }),
        []
    )

    const onSearchCountList = useCallback((params) => {
        _setIsLoading(true)

        return searchProfessionsCountList(params)
            .then((response) => {
                _setProfessionsCountList(prev => ([
                    ...prev,
                    ...response.filter(newItem => !prev.find(prevItem => prevItem.insee.includes(newItem.insee[0])))
                ]))
            })
            .then(() => _setIsLoading(false))
    }, [])

    const isMissingApplicants = (job) => (job.offresManqueCandidats)

    const formatTypeContrat = (job) => (
        job.typeContrat === 'CDI' || job.typeContrat === 'CDD'
            ? job.typeContrat
            : job.typeContratLibelle
    )

    const sortByDistanceFromCity = (city) => {
        return (a, b) => ((distance(city.geo_point_2d_x, city.geo_point_2d_y, a.lieuTravail.latitude, a.lieuTravail.longitude) < distance(city.geo_point_2d_x, city.geo_point_2d_y, b.lieuTravail.latitude, b.lieuTravail.longitude)) ? -1 : 1)
    }

    const jobsMissingApplicant = useMemo(
        () => professions.filter(job => isMissingApplicants(job)),
        [ professions ]
    )

    return (
        <ProfessionsContext.Provider
            {...props}
            value={{
                professions,
                jobsMissingApplicant,
                isLoading,
                professionsCountList,
                totalOffres,
                infosTravail,
                // api fetchers
                onSearch,
                onSearchInfosTravail,
                onSearchCountList,
                // utils
                isMissingApplicants,
                formatTypeContrat,
                sortByDistanceFromCity
            }}
        />
    )
}

export const useProfessions = () => {
    const context = React.useContext(ProfessionsContext)
    if (!context)
        throw new Error('useProfessions must be used in ProfessionsContext')

    return context
}
