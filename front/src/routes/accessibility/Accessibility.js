import React from 'react'
import styled, { css } from 'styled-components'
import { useWindowSize } from '../../common/hooks/window-size'
import { BackButton, MainLayout } from '../../components'
import { isMobileView } from '../../constants/mobile'

const Container = styled.div`
  > .wrapper {
    max-width: 1040px;
    ${({ $isMobile }) => $isMobile && css`
      padding: 0 16px;
    `}
  }
`

const AccessibilityPage = () => {
  const isMobile = isMobileView(useWindowSize())

  return (
    <MainLayout topMobileMenu>
      <Container $isMobile={isMobile}>
        <BackButton />
        <div className="wrapper">
          <h1>Accessibilité</h1>
          <h2>Introduction</h2>
          <p>
            L’article 47 de la loi n° 2005-102 du 11 février 2005 pour l’égalité
            des droits et des chances, la participation et la citoyenneté des
            personnes handicapées fait de l’accessibilité une exigence pour tous
            les services de communication publique en ligne de l’État, les
            collectivités territoriales et les établissements publics qui en
            dépendent.
          </p>
          <p>
            Il stipule que les informations diffusées par ces services doivent
            être accessibles à tous.
          </p>
          <p>
            Le référentiel général d’accessibilité pour les administrations
            (RGAA) rendra progressivement accessible l’ensemble des informations
            fournies par ces services.
          </p>
          <p>
            Le site Mobiville est en cours d’optimisation afin de le rendre
            conforme au RGAA v3. La déclaration de conformité sera publiée
            ultérieurement.
          </p>

          <h2>Nos engagements</h2>
          <p>
            Audit de mise en conformité (en cours) pour nous aider à détecter
            les potentiels oublis d'accessibilité
          </p>
          <p>
            Déclaration d'accessibilité (en cours) pour expliquer en toute
            transparence notre démarche.
            <br />
            Mise à jour de cette page pour vous tenir informé de notre
            progression.
            <br />
            Nos équipes ont ainsi travaillé sur les contrastes de couleur, la
            présentation et la structure de l’information ou la clarté des
            formulaires.
          </p>
          <p>Des améliorations vont être apportées régulièrement.</p>

          <h2>Améliorations et contact</h2>
          <p>
            L'équipe Mobiville reste à votre écoute et entière disposition, si
            vous souhaitez nous signaler le moindre défaut de conception. Vous
            pouvez nous aider à améliorer l’accessibilité du site en nous
            signalant les problèmes éventuels que vous rencontrez.
          </p>
        </div>
      </Container>
    </MainLayout>
  )
}
export default AccessibilityPage
