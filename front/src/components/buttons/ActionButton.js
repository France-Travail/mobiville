import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { COLOR_PRIMARY } from '../../constants/colors'

const Container = styled.div`
  display: flex;
  justify-content: ${({ $isMobile }) => ($isMobile ? 'center' : 'flex-start')};

  border-radius: 20px;

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      max-width: 80vw;
    `}

  ${({ $centered }) =>
    $centered &&
    css`
      width: fit-content;
      margin: auto;
    `}
`

const ButtonStyles = css`
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
  line-height: 18px;

  cursor: pointer;

  color: ${({ $isBlue }) => ($isBlue ? '#fff' : COLOR_PRIMARY)};
  ${({ $isBlue }) =>
    $isBlue ? '' : 'border : solid 2px ' + COLOR_PRIMARY + ' !important;'}
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

const ActionButtonElement = styled(Link)`
  ${ButtonStyles}
`

const ExternalLinkButton = styled.a`
  ${ButtonStyles}
`

const ActionButton = ({
  path,
  libelle = 'Rechercher',
  isWelcomeCitySearch = false,
  isWelcomeHelpSearch = false,
  isMobile = false,
  isBlue = true,
  isWhite = false,
  centered = false,
  style = {},
  buttonProps = {},
}) => {
  const isHttpMatched = (str) =>
    !!str?.match(new RegExp('^(http|https)://'))?.length

  const isExternalLink =
    (!!path &&
      typeof path == 'object' &&
      path.hasOwnProperty('pathname') &&
      isHttpMatched(path.pathname)) ||
    (typeof path == 'string' && isHttpMatched(path))

  return (
    <Container $isMobile={isMobile} $centered={centered} style={{ ...style }}>
      {!!isExternalLink ? (
        <ExternalLinkButton
          {...buttonProps}
          data-automation-id={
            isWelcomeCitySearch || isWelcomeHelpSearch
              ? 'search-action'
              : undefined
          }
          href={path}
          $isBlue={isBlue}
          $isWhite={isWhite}
          target="_blank"
        >
          {libelle}
        </ExternalLinkButton>
      ) : (
        <ActionButtonElement
          {...buttonProps}
          data-automation-id={
            isWelcomeCitySearch || isWelcomeHelpSearch
              ? 'search-action'
              : undefined
          }
          to={path}
          $isBlue={isBlue}
          $isWhite={isWhite}
        >
          {libelle}
        </ActionButtonElement>
      )}
    </Container>
  )
}

ActionButton.propTypes = {
  path: PropTypes.string.isRequired,
  libelle: PropTypes.string,
  isMobile: PropTypes.bool,
  isWelcomeCitySearch: PropTypes.bool,
  isWelcomeHelpSearch: PropTypes.bool,
  isBlue: PropTypes.bool,
  isWhite: PropTypes.bool,
  centered: PropTypes.bool,
  style: PropTypes.object,
  buttonProps: PropTypes.object,
}

export default ActionButton
