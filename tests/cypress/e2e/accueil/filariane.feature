# language: fr
Fonctionnalité: Rechercher villes - Affichage fil d'ariane

  Contexte:
    Etant donné que je suis sur l'accueil Mobiville
    Et que j'accepte tous les cookies
    Et que je saisis "Management du personnel d'étage" dans le métier
    Et que je choisis "Management du personnel d'étage (Gouvernant / Gouvernante d'étage, …)" dans la liste des métiers
    Et que je saisis "Lille" dans la ville
    Et que je choisis "Lille (59000/59160/59260/59777/59800)" dans la liste des villes
    Et que je clique sur rechercher

  Scénario: Présence du fil d'ariane
    Alors je vois le fil d'ariane sur la page

  Scénario: Disponibilité des liens
    Lorsque je clique sur "<lien>" dans le fil d'ariane
    Alors j'affiche la page sélectionnée
    Et je vois le fil d'ariane sur la page
    Lorsque je clique sur "Emploi et logement" dans le fil d'ariane
    Alors j'affiche la page de la ville pour le métier

  Exemples:
    | lien                             |
    | Offres d’emploi                  |
    | Services de la ville             |
    # | Villes similaires ou à proximité |