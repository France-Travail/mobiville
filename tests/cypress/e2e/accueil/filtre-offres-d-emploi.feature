# language: fr
Fonctionnalité: Rechercher villes - Offres d'emploi

  Contexte:
    Etant donné que je suis sur l'accueil Mobiville
    Et que j'accepte tous les cookies
    Et que je saisis "journaliste " dans le métier
    Et que je choisis "Journalisme et information média (Journaliste, …)" dans la liste des métiers
    Et que je saisis "Boulogne" dans la ville
    Et que je choisis "Boulogne-billancourt (92100)" dans la liste des villes
    Et que je clique sur rechercher
    Et que je clique sur "Offres d’emploi" dans le fil d'ariane

  Scénario: Filtre des offres par type de contrat
    Lorsque je clique sur le filtre offre "Type de contrat" et je sélectionne "CDI"
    Alors j'affiche les offres qui correspondent aux critères

  Scénario: Filtre des offres par date de publication
    Lorsque je clique sur le filtre offre "Date de publication" et je sélectionne "Un mois"
    Alors j'affiche les offres pour lesquelles la date est inférieure au critère

  Scénario: Filtre des offres par durée hebdomadaire
    Lorsque je clique sur le filtre offre "Durée hebdomadaire" et je sélectionne "Temps plein"
    Alors j'affiche les offres qui correspondent aux critères

  Scénario: Affichage d'une offre
    Lorsque je sélectionne une offre
    Alors le détail de l'offre s'affiche