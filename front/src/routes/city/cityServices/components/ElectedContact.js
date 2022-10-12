import styled from 'styled-components'
import { useWindowSize } from '../../../../common/hooks/window-size'
import {
  COLOR_OTHER_GREEN,
  COLOR_PRIMARY,
  COLOR_WHITE,
} from '../../../../constants/colors'
import { isMobileView } from '../../../../constants/mobile'

const Container = styled.div`
  width: 100%;
  max-width: 1030px;
  margin: 42px auto;
  padding: 47px;
  border-radius: 4px;

  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  align-items: center;
  justify-content: center;
  gap: 10px;

  text-align: center;
  background: ${COLOR_OTHER_GREEN};
`

const TextContainer = styled.div`
  line-height: 22px;
`

const Title = styled.p`
  font-size: 24px;
  font-weight: 900;
  margin: 0;
`

const Description = styled.p`
  font-size: 20px;
  font-weight: 400;
  margin: 0;
`

// todo
const CustomButton = styled.a`
  padding: 16px 28px;
  border-radius: 20px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background: ${COLOR_PRIMARY};
  color: ${COLOR_WHITE};

  font-weight: 700;
  font-size: 16px;

  &:hover {
    color: ${COLOR_WHITE};
    background: ${COLOR_PRIMARY};
    opacity: 0.9;
  }
`

const ElectedContact = () => {
  const isMobile = isMobileView(useWindowSize())

  return (
    <Container $isMobile={isMobile}>
      <TextContainer>
        <Title>Vous êtes élus, élues locaux ?</Title>
        <Description>
          Vous souhaitez signaler une information erronée,
          <br />
          enrichir les données de votre ville ?
        </Description>
      </TextContainer>
      <CustomButton href="mailto:contact@mobiville.pole-emploi.fr">
        Nous contacter
      </CustomButton>
    </Container>
  )
}

export default ElectedContact
