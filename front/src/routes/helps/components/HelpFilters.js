import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import CheckmarksSelect from './CheckmarksSelect'
import CheckmarksSelectSituation from './CheckmarksSelectSituation'
import {isMobileView} from "../../../constants/mobile"
import {useWindowSize} from "../../../common/hooks/window-size"
import pictoReset from '../../../assets/images/icons/reset.svg'

const SearchBloc = styled.div`
  display: inline-grid;
  align-items: center;
  margin: 0px 5px !important;
  vertical-align: bottom;

  ${(props) =>
    props.isMobile &&
    `
    padding: 5px 0px;
    
    div {
        margin: 0px auto;
      }
    
  `}
`

const SearchButton = styled(Link)`
  width: ${({ isMobile }) => (isMobile ? '350px' : '184px')};
  height: 73px;
  display: flex;
  border-radius: 20px;
  display: inline-grid;
  padding: 17px 16px;
  gap: 10px;
  background: #191970;
  color: #eee;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  &:hover {
    color: #eee;
    background:#494289;
  }
`

const SearchReset = styled(Link)`
  display: flex !important;
  width: 350px;
  height: 73px;
  display: flex;
  display: inline-grid;
  padding: 0px 115px 0px;
  gap: 10px;
  background: #FFF;
  color: #191970;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
`

const EmptyDiv = styled.div`
  display: inline-grid;
  background-color: #fff;
  border: solid 1px #e4e9ed;
  border-radius: 20px;
  padding: 17px 16px;
  gap: 10px;
  width: 350px;
  height: 73px;
`

const HelpFilters = ({CATEGORIES, SITUATIONS, removeBodyClassFunction}) => {
    const isMobile = isMobileView(useWindowSize())

    const [wholeUrlParameters, setWholeUrlParameters] = useState('')
    const [searchParametersCategories, setSearchParametersCategories] = useState('')
    const [searchParametersSituations, setSearchParametersSituations] = useState('')
    const [searchParametersSituationsAge, setSearchParametersSituationsAge] = useState('')

    const [isReset, setReset] = useState(false)

    const useRemoveBodyClassFunction = () => {
        if(removeBodyClassFunction) removeBodyClassFunction()
    }

    const onSearchParametersCategories = function (parameter) {
        let listParameter = parameter.toString().replaceAll(',', '&project=')
        CATEGORIES.forEach(
            (categorie) =>
                (listParameter = listParameter.replaceAll(
                    categorie.name,
                    categorie.key
                ))
        )
        if (listParameter.length === 0) setSearchParametersCategories('')
        else setSearchParametersCategories('project=' + listParameter)
    }
    const onSearchParametersSituations = function (parameter) {
        if (parameter === 'empty') {
            setSearchParametersSituations('')
            return
        }
        let listParameter = parameter.toString().replaceAll(',', '&situation=')
        SITUATIONS.forEach(
            (situation) =>
                (listParameter = listParameter.replaceAll(
                    situation.name,
                    situation.key
                ))
        )
        setSearchParametersSituations('situation=' + listParameter)
    }
    const onSearchParametersSituationsAge = function (parameter) {
        if (parameter === 'empty') {
            setSearchParametersSituationsAge('')
            return
        }
        let listParameter = parameter.toString().replaceAll(',', '&situation=')
        SITUATIONS.forEach(
            (situation) =>
                (listParameter = listParameter.replaceAll(
                    situation.name,
                    situation.key
                ))
        )
        setSearchParametersSituationsAge('situation=' + listParameter)
    }

    const updateQueryParameter = function () {
        const urlParameters =
            '?' +
            searchParametersCategories +
            '&' +
            searchParametersSituations +
            '&' +
            searchParametersSituationsAge
        if (
            !urlParameters.includes('situation') &&
            !urlParameters.includes('project')
        ) {
            setWholeUrlParameters('')
        } else {
            setWholeUrlParameters(urlParameters)
        }
    }

    const resetQueryParameter = function () {
        window.history.pushState("","",window.location.url)
        // Reset des composants par destruction / reconstruction dans le DOM. Pas très beau mais fonctionne bien
        setReset(true)
        setTimeout(() => {
            setReset(false)
        }, 1)
        setWholeUrlParameters('')
    }

    const params = decodeURIComponent(window.location.search)

    useEffect(() => {
        updateQueryParameter()
    }, [
        searchParametersCategories,
        searchParametersSituations,
        searchParametersSituationsAge,
    ])

    return (
        <div>
            <SearchBloc isMobile={isMobile}>
                {!isReset && (
                <CheckmarksSelect
                    searchCriteria={CATEGORIES}
                    title={'Quel est votre projet ?'}
                    onSearchParameters={onSearchParametersCategories}
                    params={params}
                />
                )}
                {isReset && (
                    <EmptyDiv></EmptyDiv>
                )}
            </SearchBloc>
            <SearchBloc isMobile={isMobile}>
                {!isReset && (
                <CheckmarksSelectSituation
                    searchCriteria={SITUATIONS.slice(0, 3)}
                    title={'Votre situation'}
                    onSearchParameters={onSearchParametersSituations}
                    params={params}
                    placeholder={"Demandeur d'emploi, salarié"}
                    selectId={'situation-simple-checkbox'}
                />
                )}
                {isReset && (
                    <EmptyDiv></EmptyDiv>
                )}
            </SearchBloc>
            <SearchBloc isMobile={isMobile}>
                {!isReset && (
                <CheckmarksSelectSituation
                    searchCriteria={SITUATIONS.slice(-2)}
                    title={'Votre âge'}
                    onSearchParameters={onSearchParametersSituationsAge}
                    params={params}
                    placeholder={'Moins de 26 ans, plus de 26 ans'}
                    selectId={'age-simple-checkbox'}
                />
                )}
                {isReset && (
                    <EmptyDiv></EmptyDiv>
                )}
            </SearchBloc>
            <SearchBloc isMobile={isMobile}>
                <SearchButton
                    isMobile={isMobile}
                    to={`/aides${wholeUrlParameters}`}
                    onClick={useRemoveBodyClassFunction}
                >
                    Rechercher
                </SearchButton>
            </SearchBloc>
            {(isMobile && wholeUrlParameters !== "" ) && (
                <SearchBloc isMobile={isMobile}>
                    <SearchReset
                        isMobile={isMobile}
                        onClick={() => resetQueryParameter()}
                        to={`/aides-filters`}
                    >
                        <img alt={''} src={pictoReset} />
                        <span>Réinitialiser</span>
                    </SearchReset>
                </SearchBloc>
            )}
        </div>
    )
}

HelpFilters.propTypes = {
    CATEGORIES: PropTypes.array,
    SITUATIONS: PropTypes.array,
    removeBodyClassFunction: PropTypes.any
}

export default HelpFilters
