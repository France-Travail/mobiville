import React from 'react'
import styled from 'styled-components'
import _Accordion from '@mui/material/Accordion'
import _AccordionSummary from '@mui/material/AccordionSummary'
import _AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { useWindowSize } from '../../common/hooks/window-size'
import { isMobileView } from '../../constants/mobile'
import MainLayout from '../../components/MainLayout'
import { COLOR_TEXT_PRIMARY } from '../../constants/colors'
import SubHeader from '../../components/SubHeader'

const BASE_ACCORDION_DATA = [
  {
    question: 'Faut-il être inscrit à Pôle emploi pour utiliser Mobiville ?',
    answer: (
      <>
        Non. Le service cible les personnes qui envisagent d’élargir le
        périmètre de recherche d’emploi vers une autre ville en France. Il
        s’adresse aux demandeurs d’emploi, salariés, étudiants…
      </>
    ),
    isOpen: false,
  },
  {
    question:
      'Je ne trouve pas mon métier dans la liste proposée, c’est normal?',
    answer: (
      <>
        Le service cible en priorité les métiers{' '}
        dans lesquels il y a des difficultés de recrutement, de nouveaux métiers
        seront intégrés progressivement.
      </>
    ),
    isOpen: false,
  },
  {
    question:
      'La région qui m’intéresse n’est pas dans la liste proposée, c’est normal ?',
    answer: (
      <>
        Le service valorise des villes où les difficultés de recrutement sont
        fortes. Si une région ne comporte aucune ville en difficulté de
        recrutement, elle n’apparaîtra pas.
      </>
    ),
    isOpen: false,
  },
  {
    question: 'Quelles sont les villes proposées par Mobiville ?',
    answer: (
      <>
        Mobiville se base sur un listing de bassins d’emploi en tension.
        <br />
        C’est à dire des bassins dans lesquels:
        <ul>
          <li>les entreprises ont dû mal à recruter</li>
          <li>
            il n’y a pas suffisamment de main d’oeuvre qualifiée sur le
            territoire
          </li>
        </ul>
        Grâce à la prise en compte de ce listing + les critères individuels
        renseignés par la personne, Mobiville suggère des villes.
      </>
    ),
    isOpen: false,
  },
  {
    question:
      'Je cherche une ville précise dans Mobiville mais je ne la trouve pas, comment faire ?',
    answer: (
      <>Pour l’instant, cette fonctionnalité n’existe pas dans Mobiville</>
    ),
    isOpen: false,
  },
  {
    question: 'D’où viennent les données utilisées par le service ?',
    answer: (
      <>
        Les sources de données de Mobiville sont:
        <ul>
          <li>
            les données publiques de Pôle emploi, via l’Emploi Store
            Développeurs
          </li>
          <li>les données publiques de l’Insee</li>
          <li>les données publiques présentes sur Data.gouv.fr</li>
          <li>les données fournies par Action Logement</li>
        </ul>
      </>
    ),
    isOpen: false,
  },
  {
    question:
      'Si je suis inscrit comme demandeur d’emploi et que je fais une recherche via Mobiville, cela aura-t-il un impact sur mon dossier ?',
    answer: (
      <>
        Non, il n’y a pas d’impact sur votre dossier Pôle emploi à moins que
        vous décidiez d’informer votre conseiller de votre projet de mobilité
      </>
    ),
    isOpen: false,
  },
  {
    question:
      'J’ai identifié une ville dans Mobiville, et j’ai envie d’y partir. C’est quoi la suite?',
    answer: (
      <>
        Nous vous avons préparé un guide pour identifier les prochaines étapes
        pour votre projet. Téléchargez-le{' '}
        <a target="_blank" href="/pdf/je-demenage.pdf">
          ici
        </a>
      </>
    ),
    isOpen: false,
  },
]

const ELECTED_OFFICIALS_ACCORDION_DATA = [
  {
    question: 'D’où viennent les données sur ma commune ?',
    answer: (
      <>
        <p>Les données sur les villes, proviennent de </p>
        <ul>
          <li>Wikipédia pour la photo et le descriptif, </li>
          <li>de l’Insee pour les éléments liés au cadre de vie, </li>
          <li>d’Action Logement pour les données liées au logement. </li>
          <li>
            Les données liées au marché du travail ainsi que les offres d’emploi
            proviennent de Pôle emploi.
          </li>
        </ul>
      </>
    ),
    isOpen: false,
  },
  {
    question: 'Puis-je les modifier, les contester ?',
    answer: (
      <>
        <p>
          Pour modifier les données, vous pouvez contacter le fournisseur des
          données concernées.
        </p>
        <p>
          Par exemple, pour modifier la photo de la ville, il suffit de modifier
          la photo sur Wikipédia. La nouvelle photo sera automatiquement
          intégrée sur Mobiville.
        </p>
      </>
    ),
    isOpen: false,
  },
  {
    question:
      'Puis-je les enrichir, rajouter l’adresse de redirection de mon site municipal ?',
    answer: (
      <>
        Cette fonctionnalité n’est pas encore disponible mais il est prévu
        effectivement qu’un élu ou un membre de son équipe puisse rajouter des
        informations comme: l’url du site municipal ou d’une plateforme
        d’attractivité, des témoignages d’habitants, les coordonnées d’une
        personne en charge de l’accueil et l’installation de nouveaux habitants,
        les aides locales ou régionales pour faciliter l’installation sur le
        territoire…
      </>
    ),
    isOpen: false,
  },
  {
    question:
      'Puis-je accéder aux données de consultation de la fiche de ma commune ?',
    answer: (
      <>
        Cette fonctionnalité n’est pas encore disponible: nous étudions le sujet
        afin d’identifier quelles données peuvent vous être utiles. Si vous
        souhaitez participer à la réflexion, écrivez-nous à l’adresse{' '}
        <a href="mailto:contact@mobiville.pole-emploi.fr">
          contact@mobiville.pole-emploi.fr
        </a>
      </>
    ),
    isOpen: false,
  },
  {
    question:
      'Je transmets mes offres d’emploi à Pôle emploi mais je ne les vois pas affichées sur Mobiville, y a t-il un problème ?',
    answer: (
      <>
        Les offres d’emploi affichées sont synchronisées avec les offres
        d’emploi diffusées sur www.pole-emploi.fr <br />
        Si votre offre est bien disponible sur le site Pôle emploi.fr, elle sera
        également visible sur Mobiville.
      </>
    ),
    isOpen: false,
  },
]

const WIDTH = 600

const Container = styled.div`
  margin: 0 auto;
  max-width: ${WIDTH}px;
  padding: 16px;
`

const H2 = styled.h2`
  font-size: 14px;
`

const Accordion = styled(_Accordion)`
  margin-bottom: 16px;

  & {
    border: 1px solid #e4e9ed !important;
    box-shadow: none !important;

    &:before {
      background: transparent !important;
    }
  }
`
const AccordionSummary = styled(_AccordionSummary)`
  font-weight: 500;
`
const AccordionDetails = styled(_AccordionDetails)``

const HelpMore = styled.div`
  margin-top: 16px;
  text-align: center;
  font-size: 12px;
  line-height: 14px;
  color: ${COLOR_TEXT_PRIMARY};
`

const HelpMoreLink = styled.a`
  color: ${COLOR_TEXT_PRIMARY};
  text-decoration: underline;
  font-weight: 500;
`

const Faq = () => {
  const size = useWindowSize()
  const isMobile = isMobileView(size)

  return (
    <MainLayout footer>
      <SubHeader
        backLink="/"
        title="FAQ : Foire Aux Questions"
        desktopTitleWidth={WIDTH}
        isMobile={isMobile}
      />
      <Container>
        <H2>Questions générales :</H2>
        {BASE_ACCORDION_DATA.map(({ question, answer, isOpen }, index) => (
          <Accordion key={index}>
            <AccordionSummary
              key={question}
              expandIcon={<ExpandMoreIcon />}
              id={`${index}-header`}
              aria-controls={`${index}-content`}
            >
              {question}
            </AccordionSummary>
            <AccordionDetails>{answer}</AccordionDetails>
          </Accordion>
        ))}

        <H2>Pour les élus :</H2>

        {ELECTED_OFFICIALS_ACCORDION_DATA.map(
          ({ question, answer, isOpen }, index) => (
            <Accordion key={index}>
              <AccordionSummary
                key={question}
                expandIcon={<ExpandMoreIcon />}
                id={`${index}-header`}
                aria-controls={`${index}-content`}
              >
                {question}
              </AccordionSummary>
              <AccordionDetails>{answer}</AccordionDetails>
            </Accordion>
          )
        )}

        <HelpMore>
          Vous n’avez trouvé votre réponse ?
          <br />
          Contactez nous :
          <br />
          <br />
          <HelpMoreLink href="mailto:contact@mobiville.pole-emploi.fr">
            contact@mobiville.pole-emploi.fr
          </HelpMoreLink>
        </HelpMore>
      </Container>
    </MainLayout>
  )
}

export default Faq
