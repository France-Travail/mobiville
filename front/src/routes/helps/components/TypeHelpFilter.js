import * as React from 'react'
import {useEffect, useState} from 'react'
import styled from 'styled-components'
import PropTypes from "prop-types"
import {useHistory} from "react-router-dom"

import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'


const DivContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 40px 0px;
    
    &>div {
        margin: 0 auto;
        
        display: flex;
        background-color: #fff;
        border : solid 1px #E4E9ED;
        padding: 13px 49px;
        gap: 10px;
        
        width: 813px;
        height: 67px;
        
        border-radius: 20px;
        
        flex: none;
        order: 0;
        flex-grow: 0;
    }



    
`


const TypeHelpFilter = ({searchCriteria, onSearchParameters, params}) => {

    //const [itemName, setItemName] = React.useState([])
    const [query, setQuery] = useState("")
    const history = useHistory()

    useEffect(() => {
        if (params && params.length > 0) {
            const regex = RegExp("project=|situation=|&")
            const parameters = params.split(regex)
            let validParamsStr = ""
            parameters.forEach((parameter) => {
                const param = searchCriteria.find((item) => item.key === parameter)
                if (param) validParamsStr += param.name + ","
            })
            if (validParamsStr.length > 0) {
                validParamsStr = validParamsStr.substring(0, validParamsStr.length - 1)
                //setItemName(typeof validParamsStr === 'string' ? validParamsStr.split(',') : validParamsStr)
                setQuery(validParamsStr)
            }
        }
    }, [])

    useEffect(() => {
        if (query) {
            onSearchParameters(query)
        }
    }, [query, history])


    return (
        <DivContainer>
            <div>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button>One</Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                </ButtonGroup>
            </div>
        </DivContainer>
    )
}

TypeHelpFilter.props = {
    searchCriteria: PropTypes.array,
    onSearchParameters: PropTypes.any,
    params: PropTypes.string,
}

export default TypeHelpFilter
