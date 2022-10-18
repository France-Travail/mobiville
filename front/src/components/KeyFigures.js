import styled from 'styled-components'
import { useWindowSize } from '../common/hooks/window-size'
import { COLOR_PRIMARY } from '../constants/colors'
import { isMobileView } from '../constants/mobile'

const Container = styled.div`
  margin: 20px auto;
  width: 100%;

  display: flex;
  flex-direction: row;
  gap: ${({ $isMobile }) => ($isMobile ? '30px' : '40px')};
  justify-content: center;
  flex-wrap: wrap;

  color: ${COLOR_PRIMARY};

  & p {
    margin: 0;
  }
`

const Figure = styled.div`
  min-width: 80px;

  display: flex;
  flex-direction: column;
  align-items: center;

  & svg {
    height: 48px;
  }
`

const Data = styled.p`
  height: 42px;

  display: flex;
  justify-content: end;
  flex-direction: column;

  color: ${COLOR_PRIMARY};
  font-size: 24px;
  font-weight: bold;
`

const Label = styled.p`
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  max-width: 100px;
`

const KeyFigures = ({ figures }) => {
  const isMobile = isMobileView(useWindowSize())

  return (
    <Container $isMobile={isMobile}>
      {figures.map((figure) => (
        <Figure key={figure.label}>
          {figure.icon}
          <Data>{figure.data}</Data>
          <Label>{figure.label}</Label>
        </Figure>
      ))}
    </Container>
  )
}

export default KeyFigures
