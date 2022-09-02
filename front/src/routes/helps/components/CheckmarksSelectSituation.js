import * as React from 'react'
import { useEffect, useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import styled from 'styled-components'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { isMobileView } from '../../../constants/mobile'
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
  margin-left: ${({ globalWidth }) => Math.floor(globalWidth / 100)}px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #23333e;
  top: -3px;
  left: -1px;
`

const useStyle = makeStyles({
  text: {
    fontFamily: 'Roboto',
    fontStyle: 'normal;',
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '19px',
    display: 'flex;',
    alignItems: 'center;',
    color: '#191970',
    '& > span': {
      fontFamily: 'Roboto',
      fontStyle: 'normal;',
      fontWeight: '700',
      fontSize: '16px',
      lineHeight: '19px',
      display: 'flex;',
      alignItems: 'center;',
      color: '#191970',
    },
  },
})

const styleLineBoxSelected = {
  display: 'grid',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px',
  gap: '10px',
  margin: '20px 10px',
  borderRadius: '8px',
  background: '#C3E9E9',
}

const styleLineBoxUnSelected = {
  display: 'grid',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px',
  gap: '10px',
  margin: '20px 10px',
  borderRadius: '8px',
  border: '1px solid #e7ebef',
  background: '#fff',
}

const CheckmarksSelectSituation = ({
  searchCriteria,
  title,
  onSearchParameters,
  params,
  placeholder,
  selectId,
}) => {
  const isMobile = isMobileView(useWindowSize())
  const globalWidth = isMobile ? 350 : 232

  const [itemName, setItemName] = React.useState('')
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setItemName('empty')
    if (params && params.length > 0) {
      const regex = RegExp('project=|situation=|&')
      const parameters = params.split(regex)
      let validParamsStr = ''
      parameters.forEach((parameter) => {
        const param = searchCriteria.find((item) => item.key === parameter)
        if (param) validParamsStr += param.name + ','
      })
      if (validParamsStr.length > 0) {
        validParamsStr = validParamsStr.substring(0, validParamsStr.length - 1)
        setItemName(
          typeof validParamsStr === 'string'
            ? validParamsStr.split(',')
            : validParamsStr
        )
        setQuery(validParamsStr)
      }
    }
  }, [])

  useEffect(() => {
    if (query) {
      onSearchParameters(query)
    }
  }, [query, navigate])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    if (
      typeof itemName === 'string'
        ? value === itemName
        : value === itemName.toString()
    ) {
      setItemName('empty')
      setQuery('empty')
    } else {
      setItemName(typeof value === 'string' ? value.split(',') : value)
      setQuery(value)
    }
  }

  const classes = useStyle()

  return (
    <DivFormControl globalWidth={globalWidth}>
      <FormControl sx={{ m: 1, width: globalWidth }}>
        <SelectLabel globalWidth={globalWidth}>{title}</SelectLabel>
        <Select
          labelId="simple-checkbox-label"
          id={selectId}
          value={itemName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => {
            if (itemName === '' || itemName === 'empty') {
              return <em>{placeholder}</em>
            }

            return selected.join(', ')
          }}
        >
          {Object.keys(searchCriteria).map((key) => (
            <MenuItem
              key={key}
              value={searchCriteria[key].name}
              class={!isMobile && 'desktop'}
              style={
                itemName.indexOf(searchCriteria[key].name) > -1
                  ? styleLineBoxSelected
                  : styleLineBoxUnSelected
              }
            >
              <Checkbox
                checked={itemName.indexOf(searchCriteria[key].name) > -1}
                style={{ display: 'none' }}
              />
              <ListItemText
                className={classes.text}
                primary={searchCriteria[key].name}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </DivFormControl>
  )
}

CheckmarksSelectSituation.props = {
  searchCriteria: PropTypes.array,
  title: PropTypes.string,
  onSearchParameters: PropTypes.any,
  params: PropTypes.string,
  placeholder: PropTypes.string,
  selectId: PropTypes.string,
}

export default CheckmarksSelectSituation
