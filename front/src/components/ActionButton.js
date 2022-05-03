import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {COLOR_PRIMARY} from "../constants/colors";


const ACTION_BUTTON_STYLE = `
  text-decoration: none;
  background-color: ${COLOR_PRIMARY};
  height: 50px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 205px;
`

const ActionButtonContainer = styled.div`
  display: flex;
  margin-top: ${({isMobile}) => (isMobile ? '0px' : '16px')};
  margin-bottom: ${({isMobile}) => (isMobile ? '12px' : '0px')};
  justify-content: ${({isMobile}) => (isMobile ? 'center' : 'flex-start')};
  ${({isMobile}) => (isMobile ? 'max-width: 365px;' : '')}
  a {
    text-align: center;
    max-width: ${({isMobile}) => (isMobile ? '231px' : '327px')};
    font-weight: 700;
  }
`

const ActionButtonElement = styled(Link)`
  ${ACTION_BUTTON_STYLE}
  ${({isBlue}) => (isBlue ? '' : 'border : solid 2px '+COLOR_PRIMARY+' !important;')}
  color: ${({isBlue}) => (isBlue ? '#fff' : COLOR_PRIMARY)};
  background-color: ${({isBlue}) => (isBlue ? COLOR_PRIMARY : 'inherit')};
  ${({isWhite}) => (isWhite ? 'background-color: #fff;' : '')}
  ${({buttonWidth}) => (buttonWidth ? 'width: '+buttonWidth+'px !important;max-width: '+buttonWidth+'px !important;' : '')}
  padding:12px;
  :active {
    background:  ${({isBlue}) => (isBlue ? COLOR_PRIMARY : 'inherit')};
    color: ${({isBlue}) => (isBlue ? '#fff' : COLOR_PRIMARY)};
  }
  :focus {
    background: ${({isBlue}) => (isBlue ? COLOR_PRIMARY : '#E4E9ED')};
    color: ${({isBlue}) => (isBlue ? '#fff' : COLOR_PRIMARY)};
  }
  :hover {
    color: ${({isBlue}) => (isBlue ? '#fff' : COLOR_PRIMARY)};
    background: ${({isBlue}) => (isBlue ? COLOR_PRIMARY : '#E4E9ED')};
    opacity: 0.9;
  }
  :disabled {
    background: #e4e9ed;
  }
`

const ActionButton = ({path, libelle, libelleSecondaire, isMobile, isBlue, isWhite, buttonWidth}) => (
    <>
        <ActionButtonContainer isMobile={isMobile} >
            <ActionButtonElement to={path} isBlue={isBlue} isWhite={isWhite} buttonWidth={buttonWidth}>
                {libelle} {isMobile && <br/>}{libelleSecondaire}
            </ActionButtonElement>
        </ActionButtonContainer>
    </>
)

ActionButton.props = {
    path: PropTypes.string,
    libelle: PropTypes.string,
    libelleSecondaire: PropTypes.string,
    isMobile: PropTypes.bool,
    isBlue: PropTypes.bool,
    isWhite: PropTypes.bool,
    buttonWidth: PropTypes.number,
}

export default ActionButton
