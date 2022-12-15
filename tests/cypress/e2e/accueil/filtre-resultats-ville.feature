# language: fr
Fonctionnalité: Rechercher villes - filtre des résultats

  Contexte:
    Etant donné que je suis sur l'accueil Mobiville
    Et que j'accepte tous les cookies
    Lorsque je saisis "boulanger" dans le métier
    Et que je choisis "Boulangerie - viennoiserie (Aide-boulanger / Aide-boulangère, …)" dans la liste des métiers
    Et que je choisis "Ile-de-France" dans la liste des régions
    Et que je clique sur rechercher
    Et que j'affiche la page de résultats avec une à plusieurs villes correspondantes

  Scénario: Filtre des villes avec peu d'opportunités
    Lorsque je clique sur le filtre ville "Opportunités" et je sélectionne "Peu d'opportunités d'emploi"
    Alors j'affiche les villes qui correspondent aux critères

  Scénario: Filtre des villes avec des opportunités
    Lorsque je clique sur le filtre ville "Opportunités" et je sélectionne "Opportunités d'emploi"
    Alors j'affiche les villes qui correspondent aux critères