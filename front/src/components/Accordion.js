import { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { ReactComponent as RightChevronIcon } from '../assets/images/icons/right_chevron.svg'
import { COLOR_OTHER_GREEN, COLOR_PRIMARY } from '../constants/colors'

// === PANE ===

const PaneContainer = styled.div`
  padding: 22px 34px;

  border-top: 1px solid ${COLOR_OTHER_GREEN};

  &:last-child {
    border-bottom: 1px solid ${COLOR_OTHER_GREEN};
  }
`

const TitleContainer = styled.div`
  padding: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
`

const Title = styled.p`
  margin: 0;

  color: ${COLOR_PRIMARY};
  font-weight: 700;
  font-size: 16px;
`

const Content = styled.div`
  margin: 22px 10px 10px 10px;
`

const ChevronIcon = styled(RightChevronIcon)`
  transform: ${({ $isOpened }) =>
    $isOpened ? 'rotate(90deg)' : 'rotate(-90deg)'};
`

const Pane = ({ title, isOpened, onClick, children }) => (
  <PaneContainer>
    <TitleContainer onClick={onClick}>
      <Title>{title}</Title>
      <ChevronIcon $isOpened={isOpened} />
    </TitleContainer>
    {isOpened ? <Content>{children}</Content> : null}
  </PaneContainer>
)

Pane.props = {
  title: PropTypes.string,
  isOpened: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ])
}

// === ACCORDION ===

const AccordionContainer = styled.div``

const Accordion = ({ children }) => {
  const [openedPane, setOpenedPane] = useState(
    new Array(children.length).fill(false)
  )

  const onTogglePane = (id) => {
    setOpenedPane((prev) => prev.map((v, i) => (i === id ? !v : v)))
  }

  return (
    <AccordionContainer>
      {children.map((child, index) => ({
        ...child,
        props: {
          ...child.props,
          onClick: () => onTogglePane(index),
          isOpened: openedPane[index],
        },
      }))}
    </AccordionContainer>
  )
}

Accordion.props = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.instanceOf(Pane)),
    PropTypes.instanceOf(Pane),
  ])
}

export { Accordion, Pane }
