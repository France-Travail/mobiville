import { Link } from "react-router-dom"
import styled from "styled-components"
import UseScrollingUp from "./UseScrollingUp"

import pictoFilterMobile from '../../../assets/images/icons/filter-mobille.svg'
import { COLOR_PRIMARY, COLOR_WHITE } from "../../../constants/colors"
import { useCallback } from "react"

const Container = styled.div`
    padding: 10px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
`

const Tag = styled.div`
    padding: 6px;
    border-radius: 22px;

    color: ${ COLOR_PRIMARY };
    background: ${ COLOR_WHITE };

    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
`

const BlocFilterMobile = styled(Link)`
    padding: 4px 6px;
    border-radius: 22px;

    display: flex;
    align-items: center;

    font-size: 16px;
    line-height: 24px;

    color: ${ COLOR_WHITE };
    background: ${ COLOR_PRIMARY };

    img {
        margin: 0 4px;
        height: 16px;
        width: 16px
    }
`

const MobileAppliedFilters = ({
    search
}) => {

    const isScrollingUp = UseScrollingUp()

    const AppliedFilters = useCallback(() => (
        <>
            {search.split('&').map(param => {
                if (param.includes("=emploi")) {
                    return (<Tag key={"emploi"}>Recherche d'emploi</Tag>)
                } else if (param.includes("=logement")) {
                    return (<Tag key={"logement"}>Recherche de logement</Tag>)
                } else if (param.includes("=déménage")) {
                    return (<Tag key={"déménage"}>Déménagement</Tag>)
                } else if (param.includes("=demandeur d'emploi")) {
                    return (<Tag key={"demandeur d'emploi"}>Demandeur d'emploi</Tag>)
                } else if (param.includes("=salarié")) {
                    return (<Tag key={"salarié"}>Salarié</Tag>)
                } else if (param.includes("=alternance")) {
                    return (<Tag key={"alternance"}>Alternance</Tag>)
                } else if (param.includes("=moins de 26 ans")) {
                    return (<Tag key={"moins de 26 ans"}>Moins de 26 ans</Tag>)
                } else if (param.includes("=plus de 26 ans")) {
                    return (<Tag key={"plus de 26 ans"}>Plus de 26 ans</Tag>)
                }
                return null
            })
            }
        </>
    ), [ search ])

    return (
        <Container className={`${isScrollingUp ? 'stickyFilterMobile' : ''}`} >
            <AppliedFilters />

            <BlocFilterMobile to={`/aides-filters` + window.location.search}>
                <img alt={''} src={pictoFilterMobile} />
                <div>Modifier</div>
            </BlocFilterMobile>
        </Container>
    )
}

export default MobileAppliedFilters