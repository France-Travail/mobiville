# language: fr
Fonctionnalité: Rechercher villes - Informations de la ville

  Contexte:
    Etant donné que je suis sur l'accueil Mobiville
    Et que j'accepte tous les cookies
    Et que je saisis "boulanger" dans le métier
    Et que je choisis "Boulangerie - viennoiserie (Aide-boulanger / Aide-boulangère, …)" dans la liste des métiers
    Et que je saisis "Lille" dans la ville
    Et que je choisis "Lille (59000/59160/59260/59777/59800)" dans la liste des villes
    Et que je clique sur rechercher
    Et que j'affiche la page de la ville pour le métier

  Scénario: Présence des offres d'emploi qui ont le moins de candidature
    Alors j'affiche les offres d'emploi qui ont le moins de candidature
    Lorsque je clique sur Voir toutes les offres d’emploi
    Alors j'affiche les offres d'emploi de la ville pour le métier

  Scénario: Présence des entreprises à proximité
    Alors j'affiche la liste des entreprises à proximité

  Scénario: Présence des 3 aides d'accompagnement dans mon projet
    Alors j'affiche les trois aides pour m'accompagner dans mon projet
    Lorsque je clique sur le premier des trois liens Découvrir l'aide
    Alors j'affiche le détail de l'aide

  Scénario: Affichage de toutes les aides
    Lorsque je clique sur Voir tous les aides
    Alors j'affiche la page avec toutes les aides
    
  Scénario: Présence des services de la ville
    Alors j'affiche la découverte des services de la ville
    Lorsque je clique sur Voir tous les services
    Alors j'affiche les services de la ville

  Scénario: Affichage des informations sur la culture, les loisirs, les transports, l'environnement ...
    Lorsque je clique sur Voir tous les services
    Alors j'affiche les informations correspondantes des services de la ville

  Scénario: Affichage message aux élus locaux
    Lorsque je clique sur Voir tous les services
    Alors j'affiche le message aux élus locaux