import React from 'react'
import styled, { css } from 'styled-components'
import { useWindowSize } from '../../common/hooks/window-size'
import { BackButton, MainLayout } from '../../components'
import { isMobileView } from '../../constants/mobile'

const Container = styled.div`
  ${({ $isMobile }) => $isMobile && css`
    padding-top: 96px;
  `}

  > .wrapper {
    max-width: 1040px;
    ${({ $isMobile }) => $isMobile && css`
      padding: 0 16px;
    `}
  }
`

const Legal = () => {
  const isMobile = isMobileView(useWindowSize())

  const onOpenTC = () => {
    window.tC.privacyCenter.showPrivacyCenter()
    return false
  }

  return (
    <MainLayout topMobileMenu>
      <Container $isMobile={isMobile}>
        <BackButton />
        <div className="wrapper">
          <h2>Conditions générales d’utilisation</h2>

          <p>
            L’utilisateur du service doit respecter ces conditions générales
            d’utilisation. Elles peuvent être modifiées par Pôle emploi et
            s’imposent à l’utilisateur dès leur mise en ligne. L’utilisateur est
            donc invité à consulter régulièrement la dernière version mise à
            jour.
          </p>
          <p>Dernière modification : 4 mars 2021</p>
          <h3>1. Mentions légales</h3>
          <p>
            Le directeur de la publication et l’éditeur du site est M. Jean
            Bassères, directeur général de Pôle emploi, dont le siège est situé
            au 1, avenue du Docteur Gley, 75020 Paris. Tél : 33(0)140306000
          </p>
          <p>
            L’hébergeur du service est OVH (2 rue Kellermann 59100 Roubais – 09
            72 10 10 07)
          </p>
          <h3>2. Objet du service</h3>
          <p>
            Le site internet mobiville.pole-emploi.fr propose un service d’aide
            à la décision pour orienter les candidats à la mobilité vers les
            bassins d’emploi qui recrutent afin de saisir des opportunités dans
            de nouveaux territoires. Cette solution permet d’accompagner les
            publics qui souhaitent déménager dans l’identification du territoire
            jugé le plus favorable à leur retour à l’emploi, et à leurs attentes
            en termes de qualité de vie.{' '}
          </p>
          <p>
            Cette solution a également vocation à centraliser et à valoriser les
            aides à disposition pour faciliter la mobilité et l’installation
            dans un nouveau territoire.{' '}
          </p>
          <h3>3. Création de compte</h3>
          <p>
            Vous pouvez vous identifier sur le site mobiville.pole-emploi.fr des
            deux façons suivantes :
          </p>
          <ul>
            <li>
              Utilisez vos identifiants Pôle emploi pour vous identifier sur
              Mobiville comme sur pole-emploi.fr à l’aide de Pôle emploi
              connect.
            </li>
            <li>
              Créez un compte sur Mobiville en fournissant les informations
              suivantes : identité (nom, prénom), mail
            </li>
          </ul>
          <p>
            L’authentification sur le service Mobiville vous donne accès aux
            fonctionnalités suivantes :
          </p>
          <ul>
            <li>accès à l’historique des recherches réalisées sur Mobiville</li>
            <li>
              possibilité de mettre des villes en favoris, de s’abonner aux
              offres d’emploi
            </li>
          </ul>
          <p>
            L’utilisateur doit veiller à la confidentialité du mot de passe et
            de l’identifiant et demander la modification du mot de passe
            lorsqu’ils ont été divulgués à une personne non autorisée.
          </p>
          <p>
            En cas d’oubli de vos identifiants, rendez-vous sur pole-emploi.fr.
          </p>
          <h3>4. Fonctionnement du service</h3>
          <p>
            Le site internet mobiville.pole-emploi.fr vous permet d’effectuer
            une recherche à partir de sa page d’accueil en inscrivant les
            critères de votre mobilité (Métier, région, cadre de vie) et affiche
            en résultat les villes correspondantes.{' '}
          </p>
          <p>
            Les villes qui vous sont proposées en résultat le sont en fonction
            d’un indice de tension établit par la direction des statistiques,
            des études et de l’évaluation de Pôle emploi qui dépend du métier
            sélectionné par l’utilisateur : cet indice prend en compte les
            difficultés de recrutement anticipées par les employeurs, le rapport
            entre les offres diffusées et les demandes d’emploi ainsi qu’un
            indicateur de sortie du chômage des demandeurs d’emploi. Les villes
            appartenant à des bassins d’emploi et métiers identifiées par cet
            indicateur de tension sont proposés aux utilisateurs de Mobiville
            lorsqu’une inadéquation géographique entre offres et demandes
            d’emploi est avérée.
          </p>
          <p>
            Les pages des villes affichées en résultat vous présentent des
            informations issues de plusieurs API open source :
          </p>
          <ul>
            <li>
              L’API de l’INSEE permet d’afficher la liste des équipements pour
              chaque ville de France
            </li>
            <li>
              Les API de l’emploi-store-dev.fr de Pôle emploi (API Offres
              d’emploi et infotravail) permettent d’afficher des offres et des
              statistiques sur le marché du travail
            </li>
            <li>
              L’API de data.gouv.fr permet d’afficher les informations liées au
              logement, à la tension immobilière et aux prix de l’immobilier.
            </li>
            <li>
              L’API de Wikipédia permet l’affichage de l’image et du descriptif
              de la ville
            </li>
            <li>
              L’API d’Action Logement permet d’afficher le nombre de logements
              sociaux et leur délai d’attribution.
            </li>
          </ul>
          <p>
            Le site internet mobiville.pole-emploi.fr permet également
            d’accéder, en fonction des critères de l’utilisateur, aux différents
            aides à disposition pour faciliter la mobilité.{' '}
          </p>
          <h3>5. Protection des données à caractère personnel</h3>
          <p>
            Pôle emploi utilise vos données pour délivrer le service décrit à
            l’article 2.
          </p>
          <p>
            Au titre de la licéité du traitement exigée par l’article 6 du
            règlement général (UE) sur la protection des données n°2016/679 du
            27 avril 2016 (RGPD), le fondement juridique du traitement est la
            mission de service public de Pôle emploi relatif à l’accompagnement
            des personnes à la recherche d’un emploi que le service permet
            d’exécuter en application de l’article L. 5312-1 du code du travail.
          </p>
          <p>
            Les données traitées pour assurer l’authentification de
            l’utilisateur dans le cadre du site mobiville.pole-emploi.fr (Nom,
            prénom, adresse email) sont supprimées après 2 ans d’inactivité du
            compte utilisateur.
          </p>
          <p>
            Les données collectées dans le cadre du formulaire de contact (nom,
            prénom, adresse mail, numéro de téléphone, ville intéressant
            l’usager) sont conservées pour une durée de 13 mois. Ces données
            sont uniquement destinées à l’équipe projet dédiée.
          </p>
          <p>
            Conformément aux articles 12 à 23 du règlement général (UE) sur la
            protection des données n°2016/679 du 27 avril 2016 et à la loi
            Informatique et libertés n°78-17 du 6 janvier 1978 modifiée, vous
            bénéficiez notamment d’un droit d’accès, de rectification, de
            limitation du traitement, le droit de définir des directives sur le
            sort des données après votre mort. Pour exercer vos droits, vous
            pouvez contacter l’équipe dédiée par courriel à l’adresse suivante :
            mobiville@pole-emploi.fr. Pour exercer vos droits, vous pouvez
            également vous adresser au délégué à la protection des données de
            Pôle emploi par courrier postal (1 avenue du Docteur Gley, 75987
            Paris cedex 20) ou par courriel (Courriers-cnil@pole-emploi.fr).{' '}
          </p>
          <p>
            Si vous estimez, après nous avoir contactés, que vos droits «
            Informatique et Libertés » ne sont pas respectés, vous avez la
            possibilité d’adresser une réclamation à la CNIL.
          </p>
          <h3>6. Cookies et autres traceurs</h3>
          <h4>6.1 Qu’est-ce qu’un cookie ?</h4>
          <p>
            Un cookie est un petit fichier texte déposé sur le terminal des
            utilisateurs (par exemple un ordinateur, une tablette, un «
            Smartphone», etc.) lors de la visite d’un site internet.
          </p>
          <p>
            Il contient plusieurs données : le nom du serveur qui l’a déposé, un
            identifiant sous forme de numéro unique, et une date d’expiration.
            Les cookies ont différentes fonctionnalités. Ils ont pour but
            d’enregistrer les paramètres de langue d’un site, de collecter des
            informations relatives à votre navigation sur les sites, d’adresser
            des services personnalisés, etc.
          </p>
          <p>
            Seul l’émetteur d’un cookie est susceptible de lire, enregistrer ou
            de modifier les informations qui y sont contenues.
          </p>
          <h4>6.2 Les cookies déposés sur le site</h4>
          <p>
            Sous réserve du choix de l’utilisateur, plusieurs cookies peuvent
            être utilisés sur le site internet mobiville.pole-emploi.fr. Les
            différentes finalités de ces cookies sont décrites ci-dessous.{' '}
          </p>
          <p>
            <b>Cookies strictement nécessaires au fonctionnement du site</b>
          </p>
          <p>
            Des cookies sont utilisés sur le site mobiville.pole-emploi.fr pour
            permettre le bon fonctionnement du site internet et l’utilisation
            des principales fonctionnalités du site.{' '}
          </p>
          <p>
            Ces cookies ne sont pas soumis au consentement de l’utilisateur.
            Sans ces cookies, l’utilisation du site peut être dégradée et
            l’accès à certains services être rendu impossible. Il est
            déconseillé de les désactiver.{' '}
          </p>
          <p>
            L’utilisateur peut cependant s’opposer à leur dépôt en suivant les
            indications données au point 6.3. Ces cookies sont exclusivement
            déposés par Pôle emploi.{' '}
          </p>
          <p>
            <b>Cookies statistiques ou de mesure d’audience </b>
          </p>
          <p>
            Des cookies sont utilisés sur le site mobiville.pole-emploi.fr afin
            d’effectuer de la mesure d’audience, des analyses statistiques dans
            le but d’améliorer l’expérience utilisateur et la performance du
            site internet. Ces cookies sont déposés par des tiers pour le compte
            de Pôle emploi.{' '}
          </p>
          <p>
            Concernant le dépôt des cookies Google Analytics, la société Google
            collecte par l’intermédiaire de ce cookie des données pour son
            propre compte dans les conditions définies dans sa politique de
            confidentialité accessible par le lien suivant :
            https://policies.google.com/technologies/partner-sites?gl=fr{' '}
          </p>
          <p>
            L’utilisateur peut paramétrer le dépôt des cookies en suivant les
            indications données au point 6.3. Le fait de refuser la mise en
            œuvre de tels cookies n’a pas d’incidence sur la navigation sur le
            site.
          </p>
          <p>
            Pour plus d’informations sur les cookies notamment sur le type de
            cookies déposés ainsi que leurs finalités précises, vous pouvez
            consulter la plateforme de gestion du consentement,{' '}
            <a href="#/" onClick={onOpenTC}>
              disponible ici
            </a>
          </p>
          <h4>6.3 Accepter ou refuser les cookies</h4>
          <p>
            L’utilisateur dispose de différents moyens pour gérer ses choix en
            matière de cookies. Les modalités de gestion diffèrent selon que le
            cookie est soumis ou non à consentement préalable. L’utilisateur
            peut modifier ses choix à tout moment. Pour information, le
            paramétrage des cookies est susceptible de modifier les conditions
            de navigation sur le site internet mobiville.pole-emploi.fr, ainsi
            que les conditions d’accès à certains services et d’entrainer des
            dysfonctionnements de certaines fonctionnalités.
          </p>
          <p>
            <b>La plateforme de gestion du consentement </b>
          </p>
          <p>
            Pour les cookies donnant lieu à consentement préalable,
            l’utilisateur peut accepter ou refuser le dépôt de tout ou partie
            des cookies, à tout moment, en formulant des choix sur la plateforme
            de gestion du consentement{' '}
            <a href="#/" onClick={onOpenTC}>
              via ce lien dédié
            </a>
            .
          </p>
          <p>
            <b>Le paramétrage du navigateur</b>
          </p>
          <p>
            L’utilisateur peut accepter ou refuser le dépôt de tout ou partie
            des cookies, à tout moment, en modifiant les paramètres de son
            navigateur (consulter la fonction « Aide » du navigateur pour en
            savoir plus) ou en se rendant sur l’une des pages suivantes, selon
            le navigateur utilisé :
          </p>
          <ul>
            <li>
              Google Chrome :
              (https://support.google.com/chrome/answer/95647?hl=fr){' '}
            </li>
            <li>
              Internet Explorer :
              (https://support.microsoft.com/fr-fr/help/17442)
            </li>
            <li>
              Mozilla Firefox :
              (https://support.mozilla.org/fr/kb/activer-desactiver-cookies)
            </li>
            <li>
              Safari :
              (https://support.apple.com/fr-fr/guide/safari/sfri11471/mac )
            </li>
          </ul>
          <p>
            Pour information, la plupart des navigateurs acceptent par défaut le
            dépôt de cookies. L’utilisateur peut modifier ses choix en matière
            de cookies à tout moment. Le paramétrage des cookies est susceptible
            de modifier les conditions de navigation sur le site internet, ainsi
            que les conditions d’accès à certains services, et d’entrainer des
            dysfonctionnements de certaines fonctionnalités.
          </p>
          <p>
            Pour plus d’informations sur les cookies et les moyens permettant
            d’empêcher leur installation, l’utilisateur peut se rendre sur la
            page dédiée sur le site internet de la CNIL :
            https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser.
          </p>
          <h3>7. Usages non autorisés</h3>
          <p>
            L’utilisateur ne doit pas utiliser le service dans un autre but que
            celui fixé à l’article 2 ou de façon contraire aux conditions
            générales d’utilisation.
          </p>
          <p>
            Pôle emploi peut bloquer l’accès au compte de l’utilisateur en cas
            de violation de ces dispositions.
          </p>
          <h3>8. Responsabilité</h3>
          <p>
            L’utilisateur ne peut prétendre à aucune indemnité en cas
            d’impossibilité d’accéder au service ou en cas de dommages de toute
            nature, directs ou indirects, résultant de l’utilisation du service.
          </p>
          <h3>9. Propriété intellectuelle</h3>
          <p>
            Les marques Pôle emploi, Mobi’ville et Action Logement sont
            protégées au titre des articles L.712-1 et suivants du code de la
            propriété intellectuelle. Toute représentation, reproduction ou
            diffusion, intégrale ou partielle de la marque Pôle emploi et
            Mobi’ville sur quelque support que ce soit, sans l’autorisation
            expresse et préalable de Pôle emploi constitue un acte de
            contrefaçon, sanctionné en application des articles L.716-1 du même
            code.{' '}
          </p>
          <p>
            Par ailleurs, le site mobiville.pole-emploi.fr contient des contenus
            sur lesquels des tiers détiennent des droits de propriété
            intellectuelle (dessin, graphisme, marque, etc.) ou un droit à
            l’image (photo, visuel mettant en scène une personne physique,
            vidéo, etc.). Les internautes ne sont pas autorisés à réutiliser ces
            contenus en l’absence de l’autorisation préalable et expresse de ces
            tiers.
          </p>
          <p>
            Les autres contenus constituent des informations publiques librement
            réutilisables sous réserve du respect de la licence ouverte pour la
            réutilisation d’informations publiques consultable à l’adresse
            suivante : https://www.etalab.gouv.fr/licence-ouverte-open-licence.
          </p>
        </div>
      </Container>
    </MainLayout>
  )
}
export default Legal
