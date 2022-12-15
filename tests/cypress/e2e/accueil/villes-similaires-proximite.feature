# language: fr
Fonctionnalité: Rechercher villes - Villes similaires ou a proximité

  Contexte:
    Etant donné que je suis sur l'accueil Mobiville
    Et que j'accepte tous les cookies
    Et que je saisis "boulanger" dans le métier
    Et que je choisis "Boulangerie - viennoiserie (Aide-boulanger / Aide-boulangère, …)" dans la liste des métiers
    Et que je saisis "Lille" dans la ville
    Et que je choisis "Lille (59000/59160/59260/59777/59800)" dans la liste des villes
    Et que je clique sur rechercher
    Et que je clique sur "Villes similaires ou à proximité" dans le fil d'ariane

  Scénario: Présence des villes similaires ou a proximité
    Alors j'affiche les villes similaires et les villes à proximité

  Scénario: Affichage du métier de la première ville similaire
    Lorsque je clique sur une ville similaire
    Alors j'affiche la page de la ville similaire pour le métier

  Scénario: Affichage du métier de toutes les villes similaires
    Lorsque je clique sur le bouton "Voir toutes les villes similaires"
    Alors j'affiche la page de résultats avec une à plusieurs villes similaires

  Scénario: Affichage du métier de toutes les villes a proximité
    Lorsque je clique sur le bouton "Voir toutes les villes à proximité"
    Alors j'affiche la page de résultats avec une à plusieurs villes proches