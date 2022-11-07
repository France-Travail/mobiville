import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { useWindowSize } from '../common/hooks/window-size'
import { isMobileView } from '../constants/mobile'

const BlockContainerOffers = styled.div`
  max-width: 1040px;
  margin: ${({ $isMobile }) => ($isMobile ? '16px 0' : '16px auto')};

  display: flex;
  flex-direction: column;

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      overflow-x: scroll;
    `};

  /* disable horizontal scroll bar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`

const BlockContentOffers = styled.div`
  min-width: 100%;
  margin: auto;

  display: flex;
  flex-direction: row;
  justify-content: stretch;
  gap: 16px;

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      padding: 0 16px;
    `}
`

const HorizontalScrollableSection = ({ children }) => {
  const isMobile = isMobileView(useWindowSize())

  return (
    <BlockContainerOffers $isMobile={isMobile}>
      <BlockContentOffers $isMobile={isMobile}>{children}</BlockContentOffers>
    </BlockContainerOffers>
  )
}

HorizontalScrollableSection.props = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default HorizontalScrollableSection
