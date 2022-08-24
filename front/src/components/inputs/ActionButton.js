import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { COLOR_PRIMARY } from '../../constants/colors'

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: ${({ isMobile }) => (isMobile ? 'center' : 'flex-start')};
  
  border-radius: 20px;
`

const ActionButtonElement = styled(Link)`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  padding: 14px 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
  text-align: center;

  cursor: pointer;

  color: ${({ $isBlue }) => ($isBlue ? '#fff' : COLOR_PRIMARY)};
  ${({ $isBlue }) => $isBlue ? '' : 'border : solid 2px ' + COLOR_PRIMARY + ' !important;'}
  background-color: ${({ $isBlue }) => ($isBlue ? COLOR_PRIMARY : 'inherit')};
  ${({ $isWhite }) => ($isWhite ? 'background-color: #fff;' : '')}

  :active {
    background: ${({ $isBlue }) => ($isBlue ? COLOR_PRIMARY : 'inherit')};
    color: ${({ $isBlue }) => ($isBlue ? '#fff' : COLOR_PRIMARY)};
  }

  :focus {
    background: ${({ $isBlue }) => ($isBlue ? COLOR_PRIMARY : '#E4E9ED')};
    color: ${({ $isBlue }) => ($isBlue ? '#fff' : COLOR_PRIMARY)};
  }

  :hover {
    color: ${({ $isBlue }) => ($isBlue ? '#fff' : COLOR_PRIMARY)};
    background: ${({ $isBlue }) => ($isBlue ? COLOR_PRIMARY : '#E4E9ED')};
    opacity: 0.9;
  }

  :disabled {
    background: #e4e9ed;
  }
`

const ActionButton = ({
  path,
  libelle = "Rechercher",
  isMobile = false,
  isBlue = true,
  isWhite = false,
  style = {},
}) => {

  const isHttpMatched = (str) => !!str?.match(new RegExp('^(http|https)://'))?.length

  const isExternalLink =
    !!path &&
    typeof path == 'object' &&
    path.hasOwnProperty('pathname') &&
    isHttpMatched(path.pathname)

  return (
    <ActionButtonContainer
      isMobile={isMobile}
      style={{ ...style }}
    >
      <ActionButtonElement
        to={path}
        $isBlue={isBlue}
        $isWhite={isWhite}
        target={isExternalLink ? '_blank' : undefined}
      >
        {libelle}
      </ActionButtonElement>
    </ActionButtonContainer>
  )
}

ActionButton.propTypes = {
  path: PropTypes.string.isRequired,
  libelle: PropTypes.string,
  isMobile: PropTypes.bool,
  isBlue: PropTypes.bool,
  isWhite: PropTypes.bool,
  style: PropTypes.object,
}

export default ActionButton
