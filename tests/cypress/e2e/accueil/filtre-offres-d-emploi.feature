# language: fr
Fonctionnalité: Rechercher villes - Offres d'emploi

  Contexte:
    Etant donné que je suis sur l'accueil Mobiville
    Et que j'accepte tous les cookies
    Et que je saisis "boulanger" dans le métier
    Et que je choisis "Boulangerie - viennoiserie (Aide-boulanger / Aide-boulangère, …)" dans la liste des métiers
    Et que je saisis "Lille" dans la ville
    Et que je choisis "Lille (59000/59160/59260/59777/59800)" dans la liste des villes
    Et que je clique sur rechercher
    Et que je clique sur "Offres d’emploi" dans le fil d'ariane

  Scénario: Filtre des offres par distance
    Lorsque je clique sur le filtre offre "Distance" et je sélectionne "5 km"
    Alors j'affiche les offres de la ville

  Scénario: Filtre des offres par date de publication
    Lorsque je clique sur le filtre offre "Date de publication" et je sélectionne "Un mois"
    Alors j'affiche les offres pour lesquelles la date est inférieure au critère

  Scénario: Filtre des offres par type de contrat
    Lorsque je clique sur le filtre offre "Type de contrat" et je sélectionne "CDI"
    Alors j'affiche les offres qui correspondent aux critères

  Scénario: Filtre des offres par expérience
    Lorsque je clique sur le filtre offre "Expérience" et je sélectionne "Moins de 1 an"
    Alors j'affiche les offres de la ville

  Scénario: Filtre des offres par durée hebdomadaire
    Lorsque je clique sur le filtre offre "Durée hebdomadaire" et je sélectionne "Temps plein"
    Alors j'affiche les offres qui correspondent aux critères

  Scénario: Filtre des offres avec des opportunités
    Lorsque je clique sur le filtre offre "Offres avec plus d'opportunités" et je sélectionne "Offres avec plus d'opportunités"
    Alors j'affiche les offres pour lesquelles il y a des opportunités

  Scénario: Filtre des offres avec plusieurs critères
    Lorsque je clique sur le filtre offre "Date de publication" et je sélectionne "Un mois"
    Alors j'affiche les offres pour lesquelles la date est inférieure au critère
    Lorsque je clique sur le filtre offre "Type de contrat" et je sélectionne "CDI"
    Alors j'affiche les offres qui correspondent aux critères

  Scénario: Affichage des offres avec des opportunités
    Alors j'affiche les informations sur l'offre avec des opportunités
    
  Scénario: Affichage d'une offre
    Lorsque je sélectionne la deuxième offre
    Alors le détail de l'offre s'affiche
    Et le descriptif de l'offre s'affiche