import styled from 'styled-components'

import { useWindowSize } from "../../../common/hooks/window-size"
import { isMobileView } from "../../../constants/mobile"

import mobilityHomepagePic from '../../../assets/images/mobility-guide.png'
import { ActionButton, Section } from '../../../components'
import { COLOR_PRIMARY } from '../../../constants/colors'

const Container = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  justify-content: space-between;
  align-items: center;

  padding: ${({ isMobile }) => (isMobile ? '20px' : '60px 20px')};

  background: #c3e9e9;
  border-radius: inherit;
`

const H2 = styled.h2`
  font-size: 24px;
  font-weight: 900;
  line-height: 28px;
  margin-block-start: unset;
  margin-block-end: unset;
  color: ${COLOR_PRIMARY};
`

const Text = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  margin-block-start: 5px;
  margin-block-end: unset;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  background-color: white;
  padding: 32px;
  border-radius: 16px;
`

const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
  }
`

const MobilityGuideBanner = () => {
    const windowsSize = useWindowSize()
    const isMobile = isMobileView(windowsSize)

    return (
      <Section isMobileFullWidth={true} isMobile={isMobile}>
        <Container isMobile={isMobile}>
          <ImageContainer>
            <img src={mobilityHomepagePic} alt="" />
          </ImageContainer>
          <TextContainer>
            <H2 isMobile={isMobile}>Des conseils et astuces</H2>
            <Text isMobile={isMobile}>Par où commencer ?... Où aller ?... Comment faire ?...</Text>
            <Text>Les réponses se trouvent dans notre guide à la mobilité</Text>
            <ActionButton
              path={'/conseils-et-astuces'}
              libelle={'Consulter notre guide sur la mobilité'}
              isMobile={isMobile}
              isBlue={true}
              style={{
                marginTop: 16,
                marginRight: 'auto',
                lineHeight: '21px'
              }}
            />
          </TextContainer>
        </Container>
      </Section>
    )
}

export default MobilityGuideBanner