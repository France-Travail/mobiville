import styled from 'styled-components'

import { useWindowSize } from "../../../common/hooks/window-size"
import { isMobileView } from "../../../constants/mobile"
import { COLOR_PRIMARY } from '../../../constants/colors'
import { Section } from '../../../components'

import heroHomepagePic from '../../../assets/images/hero-homepage.png'
import WelcomeSearchForm from './WelcomeSearchForm'

const Container = styled.section`
  background: linear-gradient(180deg, #ddddea 0%, #c3e9e9 100%);
  padding-bottom: ${({ $isMobile }) => ($isMobile ? '40px' : '80px')};
  border-radius: 0;
`

// === TITLE BLOCK ===

const TitleContainer = styled.div`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row') };
  align-items: start;
  justify-content: space-between;
  gap: ${({ $isMobile }) => ($isMobile ? '32px' : '0') };

  margin-top: ${({ $isMobile }) => ($isMobile ? '102px' : '30px') };
`

const TitleWrapper = styled.div`
  flex: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-top: 22px;
`

const Title = styled.h1`
  font-size: 36px;
  margin: 0;
  font-weight: 900;
  color: ${COLOR_PRIMARY};
`

const SubTitle = styled.h2`
  font-weight: 400;
  line-height: 27px;
  margin: 0;
`

const HeroImage = styled.img`
  align-self: center;

  padding-right: 64px;
`


const Welcome = () => {
  const isMobile = isMobileView(useWindowSize())

  return (
    <Container $isMobile={isMobile}>
      <Section>

        <TitleContainer $isMobile={isMobile}>
          <TitleWrapper>
            <Title>Trouvez l’emploi et la ville qui va avec !</Title>
            <SubTitle>
              Décrochez l’emploi dans la ville qui vous correspond<br />
              et identifiez les aides pour votre projet de mobilité
            </SubTitle>
          </TitleWrapper>

          <HeroImage src={heroHomepagePic} alt="" />
        </TitleContainer>

        <WelcomeSearchForm></WelcomeSearchForm>
          
      </Section>
    </Container>
  )
}

export default Welcome