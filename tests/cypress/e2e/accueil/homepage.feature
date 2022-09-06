# language: fr
Fonctionnalité: Homepage - Moteur de recherche

  Contexte:
    Etant donné que je suis sur l'accueil Mobiville
    Et que j'accepte tous les cookies

  Scénario: Recherche du métier dans les villes d'une région
    Lorsque je saisis "<metier>" dans le métier
    Et que je choisis "<proposition>" dans la liste des métiers
    Et que je choisis "<region>" dans la liste des régions
    Et que je clique sur rechercher
    Alors j'affiche la page de résultats avec une à plusieurs villes correspondantes

  Exemples:
      | metier            | proposition                                                                         | region              |
      | commis de cuisine | Personnel de cuisine (Commis de cuisine tournant / Commise de cuisine tournante, …) | Occitanie           |
      | coach             | Éducation en activités sportives (Coach sportif, …)                                 | Grand Est           |
      | minérallurgiste   | Études géologiques (Minérallurgiste, …)                                             | Nouvelle-Aquitaine  |

  Scénario: Recherche du métier dans une ville
    Lorsque je saisis "marin-pêcheur" dans le métier
    Et que je choisis "Équipage de la pêche (Marin-pêcheur, …)" dans la liste des métiers
    Et que je saisis "Albi" dans la ville
    Et que je choisis "Albi (81000)" dans la liste des villes
    Et que je clique sur rechercher
    Alors j'affiche la page de la ville pour le métier

  Scénario: Affichage des opportunités, des offres d'emploi et du nombre d'habitants de la ville d'une région recherchée
    Lorsque je saisis "boulanger" dans le métier
    Et que je choisis "Boulangerie - viennoiserie (Aide-boulanger / Aide-boulangère, …)" dans la liste des métiers
    Et que je choisis "Bretagne" dans la liste des régions
    Et que je clique sur rechercher
    Alors j'affiche les informations sur le métier dans la page des villes correspondantes

  Scénario: Recherche des aides par projet, situation et ou âge
    Lorsque je clique sur le bouton "Aide" sous le texte "que recherchez vous"
    Et que je sélectionne "<premier choix>" dans les liste de aides
    Et que je sélectionne "<deuxieme choix>" dans les liste de aides
    Et que je sélectionne "<troisieme choix>" dans les liste de aides
    Et que je clique sur rechercher
    Alors j'affiche les aides correspondantes

  Exemples:
      | premier choix             | deuxieme choix           | troisieme choix        |
      | Je déménage prochainement |                          |                        |
      | Je déménage prochainement | Je recherche un logement |                        |
      | Je déménage prochainement | Je recherche un logement | Je recherche un emploi |
      | Je recherche un emploi    | J'ai moins de 26 ans     |                        |
      | Je déménage prochainement | Je suis salarié          | J'ai plus de 26 ans    |
      | Je suis alternant         | J'ai plus de 26 ans      |                        |
 
  Scénario: Retour à la recherche des villes après l'aide
    Lorsque je clique sur le bouton "Aide" sous le texte "que recherchez vous"
    Alors j'affiche les filtres aide
    Lorsque je clique sur le bouton "Ville" sous le texte "que recherchez vous"
    Alors j'affiche les filtres métier endroit