# language: fr
Fonctionnalité: Rechercher villes - Affichage simulateur

  Contexte:
    Etant donné que je suis sur l'accueil Mobiville
    Et que j'accepte tous les cookies
    Et que je saisis "boulanger" dans le métier
    Et que je choisis "Boulangerie - viennoiserie (Aide-boulanger / Aide-boulangère, …)" dans la liste des métiers
    Et que je saisis "Lille" dans la ville
    Et que je choisis "Lille (59000/59160/59260/59777/59800)" dans la liste des villes
    Et que je clique sur rechercher
    Et que j'affiche le simulateur de logement

  Scénario: Affichage de la surface de logement à partir d'un budget pour une location
    Lorsque je saisis un budget de 1000 euros pour une location
    Alors la surface de logement que je peux occuper s'affiche

  Scénario: Affichage du prix d'un logement à partir de la surface pour un achat
    Lorsque je saisis la surface de 100 m² pour un achat
    Alors le prix que le logement va me coûter s'affiche