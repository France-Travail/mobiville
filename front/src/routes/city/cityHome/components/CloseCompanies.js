import styled, { css } from 'styled-components'

import { useCities } from '../../../../common/contexts/citiesContext'
import { useWindowSize } from '../../../../common/hooks/window-size'
import {
  COLOR_PRIMARY,
  COLOR_VERT_MOBIVILLE,
  COLOR_WHITE,
} from '../../../../constants/colors'
import { isMobileView } from '../../../../constants/mobile'
import { capitalize, wordsCapitalize } from '../../../../utils/utils'

const Container = styled.div`
  max-width: 1040px;
  width: ${({ $isMobile }) => ($isMobile ? '' : '100%')};
  margin: ${({ $isMobile }) => ($isMobile ? '0 16px' : 'auto')};

  color: ${COLOR_PRIMARY};
`

const Wrapper = styled.div`
  margin: auto;
  width: ${({ $isMobile }) => ($isMobile ? '100%' : 'fit-content')};
`

const CardsContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  gap: 16px;

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      flex-direction: column;
      justify-content: stretch;
    `};
`

const Card = styled.div`
  ${({ $isMobile }) =>
    !$isMobile &&
    css`
      max-width: calc((100vw / 2) - 8px);
    `};

  width: ${({ $isMobile }) => ($isMobile ? '100%' : '512px')};
  padding: 24px 16px;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  gap: 14px;

  background-color: ${COLOR_WHITE};
`

const BlockCompanyName = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
`

const BlockCompanyCity = styled.span`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
`

const BlockCompanyDataFrom = styled.div`
  width: fit-content;
  margin: 10px 0 0 auto;

  color: ${COLOR_VERT_MOBIVILLE};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  > a {
    color: inherit;
    text-decoration: underline;
  }
`
const Lien = styled.a`
text-decoration: underline;
`

const CloseCompanies = () => {
  const isMobile = isMobileView(useWindowSize())
  const { closeCompanies } = useCities()

  return (
    <Container $isMobile={isMobile}>
      <Wrapper $isMobile={isMobile}>
        <CardsContainer $isMobile={isMobile}>
          <Card $isMobile={isMobile}>
            {closeCompanies?.slice(0, 5).map((company, index) => (
              <Lien key={index} href={company.url} target="_blank">
                <BlockCompanyName>
                  {wordsCapitalize(company.name)}
                </BlockCompanyName>{' '}
                <BlockCompanyCity>{capitalize(company.city)}</BlockCompanyCity>
              </Lien>
            ))}
          </Card>

          {closeCompanies?.length >= 10 ? (
            <Card $isMobile={isMobile}>
              {closeCompanies?.slice(5, 10).map((company, index) => (
                <Lien key={index} href={company.url} target="_blank">
                  <BlockCompanyName>
                    {wordsCapitalize(company.name)}
                  </BlockCompanyName>{' '}
                  <BlockCompanyCity>
                    {capitalize(company.city)}
                  </BlockCompanyCity>
                </Lien>
              ))}
            </Card>
          ) : null}
        </CardsContainer>
        <BlockCompanyDataFrom>
          (Données issues de{' '}
          <a
            target="_blank"
            href="https://labonneboite.pole-emploi.fr/"
            onClick={() => {
              window.smartTag({
                name: 'acces_entreprise',
                type: 'exit',
                chapters: ['city', 'labonneboite'],
              })
            }}
          >
            La Bonne Boite
          </a>
          )
        </BlockCompanyDataFrom>
      </Wrapper>
    </Container>
  )
}

CloseCompanies.propTypes = {}

export default CloseCompanies
