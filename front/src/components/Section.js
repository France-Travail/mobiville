import styled from "styled-components"
import { COLOR_PRIMARY } from "../constants/colors"

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  background-color: ${({ background }) => (background ?? '')};
  max-width: 1040px;
  width: ${({ isMobileFullWidth, isMobile }) => ((isMobileFullWidth && isMobile) ? '100%' : 'auto' )};
  margin: 8px auto 0 auto;
  padding: ${({ isMobileFullWidth, isMobile }) => ((isMobileFullWidth && isMobile) ? '0' : '0 20px' )};
  border-radius: ${({ isMobileFullWidth, isMobile }) => ((isMobileFullWidth && isMobile) ? '0' : '4px' )};
`

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: 900;
  color: ${COLOR_PRIMARY};
`

export { Section, SectionTitle }