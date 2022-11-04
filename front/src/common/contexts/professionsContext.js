import {orderBy} from 'lodash'
import React, {useState, useCallback, useDebugValue, useEffect} from 'react'
import {
    searchProfessions,
    searchInfosTravail,
    searchProfessionsCountList
} from '../../api/professions.api'

const ProfessionsContext = React.createContext()

export function ProfessionsProvider(props) {
    const [professions, _setProfessions] = useState([])
    const [professionsCandidatsManquants, _setProfessionsCandidatsManquants] = useState([])
    const [isLoading, _setIsLoading] = useState(false)
    const [professionsCountList, _setProfessionsCountList] = useState([])
    const [totalOffres, _setTotalOffres] = useState(null)
    const [totalOffresCandidatsManquants, _setTotalOffresCandidatsManquants] = useState(null)
    const [bassinTensionIndT, _setBassinTensionIndT] = useState(null)

    const onSearch = useCallback((params) => {
        _setIsLoading(true)

        return searchProfessions(params)
            .then((jobsData) => {
                if(params.offresManqueCandidats) {
                    _setProfessionsCandidatsManquants(orderBy(jobsData.resultats, ['dateCreation'], ['desc']))
                    _setTotalOffresCandidatsManquants(jobsData.totalOffres)
                } else {
                    _setProfessions(orderBy(jobsData.resultats, ['dateCreation'], ['desc']))
                    _setTotalOffres(jobsData.totalOffres)
                }
            })
            .then(() => _setIsLoading(false))
    }, [])

    const onSearchInfosTravail = useCallback(
        (params) => searchInfosTravail(params)
            .then((res) => {
                _setBassinTensionIndT(res.bassinTensionIndT)
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

    return (
        <ProfessionsContext.Provider
            {...props}
            value={{
                professions,
                professionsCandidatsManquants,
                isLoading,
                professionsCountList,
                totalOffres,
                totalOffresCandidatsManquants,
                bassinTensionIndT,
                // function
                onSearch,
                onSearchInfosTravail,
                onSearchCountList
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
