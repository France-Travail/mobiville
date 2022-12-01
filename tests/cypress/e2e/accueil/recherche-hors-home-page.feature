# language: fr
Fonctionnalité: Rechercher villes ou aides - Moteur de recherche

  Contexte:
    Etant donné que je suis sur l'accueil Mobiville
    Et que j'accepte tous les cookies

  Scénario: Recherche d'une ville à partir d'une page liste des résultats
    Lorsque je saisis "boulanger" dans le métier
    Et que je choisis "Boulangerie - viennoiserie (Aide-boulanger / Aide-boulangère, …)" dans la liste des métiers
    Et que je choisis "Bretagne" dans la liste des régions
    Et que je clique sur rechercher
    Et que je clique sur "Rechercher une ville" dans le header
    Alors j'affiche la page de recherche de ville avec le moteur de recherche 

  Scénario: Recherche d'une ville à partir d'une page résultat
    Lorsque je saisis "marin-pêcheur" dans le métier
    Et que je choisis "Équipage de la pêche (Marin-pêcheur, …)" dans la liste des métiers
    Et que je saisis "Albi" dans la ville
    Et que je choisis "Albi (81000)" dans la liste des villes
    Et que je clique sur rechercher
    Et que je clique sur "Rechercher une ville" dans le header
    Alors j'affiche la page de recherche de ville avec le moteur de recherche

  Scénario: Recherche d'une ville à partir d'une page d'aide
    Lorsque je clique sur le bouton "Aide" sous le texte "que recherchez vous"
    Et que je sélectionne "Je déménage prochainement" dans les liste de aides
    Et que je clique sur rechercher
    Et que je clique sur "Rechercher une ville" dans le header
    Alors j'affiche la page de recherche de ville avec le moteur de recherche

  Scénario: Recherche d'une aide à partir d'une page liste des résultats
    Lorsque je saisis "boulanger" dans le métier
    Et que je choisis "Boulangerie - viennoiserie (Aide-boulanger / Aide-boulangère, …)" dans la liste des métiers
    Et que je choisis "Bretagne" dans la liste des régions
    Et que je clique sur rechercher
    Lorsque je clique sur "Rechercher des aides" dans le header
    Alors j'affiche la page avec toutes les aides avec le moteur de recherche

  Scénario: Recherche d'une aide à partir d'une page résultat
    Lorsque je saisis "marin-pêcheur" dans le métier
    Et que je choisis "Équipage de la pêche (Marin-pêcheur, …)" dans la liste des métiers
    Et que je saisis "Albi" dans la ville
    Et que je choisis "Albi (81000)" dans la liste des villes
    Et que je clique sur rechercher
    Lorsque je clique sur "Rechercher des aides" dans le header
    Alors j'affiche la page avec toutes les aides avec le moteur de recherche

  Scénario: Recherche d'une aide à partir d'une page d'aide
    Lorsque je clique sur le bouton "Aide" sous le texte "que recherchez vous"
    Et que je sélectionne "Je déménage prochainement" dans les liste de aides
    Et que je clique sur rechercher
    Lorsque je clique sur "Rechercher des aides" dans le header
    Alors j'affiche la page avec toutes les aides avec le moteur de recherche