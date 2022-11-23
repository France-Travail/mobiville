import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  COLOR_PRIMARY,
  COLOR_VERT_MOBIVILLE,
  COLOR_WHITE,
} from '../../constants/colors'
import { isMobileView } from '../../constants/mobile'
import { useWindowSize } from '../../common/hooks/window-size'

const computeButtonBorder = (index, lastIndex) => {
  if (index === 0) {
    return 'border-radius: 8px 0 0 8px'
  } else if (index === lastIndex) {
    return 'border-radius: 0 8px 8px 0'
  }
}

const Button = styled.button`
  flex: ${({ $isMobile }) => $isMobile ? 'auto' : 'none'};
  text-decoration: none;
  cursor: pointer;
  border: none;
  margin: 0px; // désactive la marge par défaut sur safari
  color: ${COLOR_PRIMARY};
  font-size: 18px;

  background: ${({ selected, $isMobile }) =>
    selected && !$isMobile ? COLOR_VERT_MOBIVILLE : COLOR_WHITE};
  font-weight: ${({ selected, $isMobile }) =>
    selected && !$isMobile ? 'bold' : ''};

  ${({ index, lastIndex }) => computeButtonBorder(index, lastIndex)};

  border: ${({ $isMobile }) =>
    $isMobile ? `1px solid ${COLOR_PRIMARY}` : 'none'};

  display: flex;
  column-gap: 10px;
  align-items: center;
  padding: 10px;
  justify-content: ${({ $isMobile }) => $isMobile ? 'center' : 'start'};

  p {
    margin: 0;
  }
`

const Container = styled.div`
  width: 100%;
  display: flex;
  border-radius: 6px;
`

const ButtonGroup = ({
  defaultSelected,
  children,
  onChange = () => {},
  onClick = () => {},
}) => {
  const [selected, setSelected] = useState(
    defaultSelected ?? children[0]?.props?.id ?? null
  )

  const isMobile = isMobileView(useWindowSize())

  const handleButtonClick = (buttonId) => {
    setSelected(buttonId)
    onClick(buttonId)
  }

  useEffect(() => {
    onChange(selected)
  }, [selected])

  return (
    <Container>
      {children.map((child, index) => (
        <Button
          {...child.props}
          index={index}
          lastIndex={children.length - 1}
          key={index}
          onClick={() => {
            handleButtonClick(child.props.id)
          }}
          selected={selected === child.props.id}
          $isMobile={isMobile}
        >
          {child.props.children}
        </Button>
      ))}
    </Container>
  )
}

ButtonGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  defaultSelected: PropTypes.string,
  onChange: PropTypes.func,
}

export default ButtonGroup
