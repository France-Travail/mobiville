import * as React from 'react'
import { useEffect, useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import styled from 'styled-components'
import { makeStyles } from "@mui/styles"
import { COLOR_VERT_MOBIVILLE } from "../../../constants/colors"
import PropTypes from "prop-types"
import { useHistory } from "react-router-dom"
import { isMobileView } from "../../../constants/mobile"
import { useWindowSize } from '../../../common/hooks/window-size'


const DivFormControl = styled.div`
  display: inline-grid;
  background-color: #fff;
  border: solid 1px #e4e9ed;
  border-radius: 20px;
  padding: 17px 16px;
  gap: 10px;
  width: ${({ globalWidth }) => globalWidth}px;
  height: 73px;

  div {
    right: 12px;
    width: ${({ globalWidth }) => globalWidth - 50}px;
    min-width: ${({ globalWidth }) => globalWidth - 50}px;
    max-width: ${({ globalWidth }) => globalWidth - 50}px;
    background: none !important;
    padding-right: 0px;
  }

  div > svg {
    right: 0px;
    left: ${({ globalWidth }) => globalWidth + 15 - 50}px;
    top: 10px;
  }

  div > fieldset {
    border: none;
  }
`

const SelectLabel = styled.label`
  position: absolute;
  bottom: 40px;
  z-index: 1;
  margin-left: ${({globalWidth}) => Math.floor(globalWidth / 100)}px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #23333e;
  top: -3px;
  left: -1px;
`

const styleCheckBox = makeStyles({
    root: {
        "margin-left": "40px",
        "color" : "#E5E5E5",
        "&$checked": {
            color: COLOR_VERT_MOBIVILLE
        }
    },
    checked: {}
})


const useStyle = makeStyles({
    text: {
        fontFamily: 'Roboto',
        fontStyle: "normal;",
        fontWeight: '700',
        fontSize: "16px",
        lineHeight: "19px",
        display: "flex;",
        alignItems: "center;",
        color: "#191970",
        '& > span' : {
            fontFamily: 'Roboto',
            fontStyle: "normal;",
            fontWeight: '700',
            fontSize: "16px",
            lineHeight: "19px",
            display: "flex;",
            alignItems: "center;",
            color: "#191970",
        },
    }
})


const styleLineBoxSelected = {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "padding": "8px",
    "gap": "10px",
    "margin": "20px 10px",
    "borderRadius": "8px",
    "background": "#C3E9E9",
}

const styleLineBoxUnSelected = {
    "display": "flex",
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "padding": "8px",
    "gap": "10px",
    "margin": "20px 10px",
    "borderRadius": "8px",
    "border": "1px solid #e7ebef",
    "background": "#fff",
}

const CheckmarksSelect = ({searchCriteria, title, onSearchParameters, params}) => {
    const isMobile = isMobileView(useWindowSize())
    const globalWidth = isMobile ? 350 : 371

    const [itemName, setItemName] = React.useState([])
    const [query, setQuery] = useState("")
    const history = useHistory()

    useEffect(() => {
        setItemName([""])
        if (params && params.length > 0) {
            const regex = RegExp("project=|situation=|&")
            const parameters = params.split(regex)
            let validParamsStr = ""
            parameters.forEach((parameter) => {
                const param = searchCriteria.find((item) => item.key === parameter)
                if (param) validParamsStr += param.name + ","
            })
            if(validParamsStr.length > 0) {
                validParamsStr = validParamsStr.substring(0, validParamsStr.length - 1)
                setItemName(typeof validParamsStr === 'string' ? validParamsStr.split(',') : validParamsStr)
                setQuery(validParamsStr)
            }
        }
    }, [])

    useEffect(() => {
        if (query) {
            onSearchParameters(query)
        }
    }, [query, history])

    const handleChange = (event) => {
        const {
            target: { value },
        } = event
        setItemName(typeof value === 'string' ? value.split(',') : value)
        setQuery(value)
    }

    const replaceLast = (str, pattern, replacement) => {
        const match =
            typeof pattern === 'string'
                ? pattern
                : (str.match(new RegExp(pattern.source, 'g')) || []).slice(-1)[0]
        if (!match) return str
        const last = str.lastIndexOf(match)
        return last !== -1
            ? `${str.slice(0, last)}${replacement}${str.slice(last + match.length)}`
            : str
    }

    const classes = useStyle()
    const classeCheckBox = styleCheckBox()

    function countOccurences(string, word) {
        return string.split(word).length - 1
    }

    // recursif
    const changeTextSelected = (text) => {
        const count = countOccurences(text,"Je recherche")
        if(count > 1) {
            text = replaceLast(text, "Je recherche", "" )
            return changeTextSelected(text)
        } else {
            return text
        }
    }

    return (
        <DivFormControl globalWidth={globalWidth}>
            <FormControl sx={{m: 1, width: globalWidth}}>
                <SelectLabel globalWidth={globalWidth}>{title}</SelectLabel>
                <Select 
                    labelId="project-multiple-checkbox-label"
                    id="project-multiple-checkbox"
                    multiple
                    value={itemName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag"/>}
                    renderValue={(selected) => {
                        if (itemName.length === 1 && itemName[0] === "") {
                            return <em>Recherche d'emploi, logement, déménagement</em>
                        }

                        let text = ""+ selected.filter((item) =>
                            item != null && item !== ""
                        ).join(', ')

                        text = changeTextSelected(text)

                        return "J"+text.toLowerCase().substring(1)
                    }}
                >
                    {Object.keys(searchCriteria).map((key) => (
                        <MenuItem key={key} value={searchCriteria[key].name} class={!isMobile && "desktop"}
                                  style={itemName.indexOf(searchCriteria[key].name) > -1 ? styleLineBoxSelected : styleLineBoxUnSelected} >
                            <Checkbox checked={itemName.indexOf(searchCriteria[key].name) > -1}
                                      classes={{root: classeCheckBox.root, checked: classeCheckBox.checked}} />
                            <ListItemText className={classes.text} primary={searchCriteria[key].name}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </DivFormControl>
    )
}

CheckmarksSelect.props = {
    searchCriteria: PropTypes.array,
    title: PropTypes.string,
    onSearchParameters: PropTypes.any,
    params: PropTypes.string,
}

export default CheckmarksSelect
