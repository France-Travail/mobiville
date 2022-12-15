# language: fr
Fonctionnalité: Footer - Disponibilité des liens

  Contexte:
    Etant donné que je suis sur l'accueil Mobiville
    Et que j'accepte tous les cookies

  Scénario: Présence du footer
    Alors je vois le footer sur la page
    Lorsque je clique sur le bouton "Aide" sous le texte "que recherchez vous"
    Et que je clique sur rechercher
    Alors je vois le footer sur la page

  Scénario: Disponibilité des liens
  Lorsque je clique sur "<lien>" dans le footer
  Alors j'affiche la page "<url>"

  Exemples:
    | lien                         | url                                                    |
    | Questions fréquentes         | https://mobiville.beta.pole-emploi.fr/faq              |
    | Mentions légales             | https://mobiville.beta.pole-emploi.fr/mentions-legales |
    | Accessibilité : non conforme | https://mobiville.beta.pole-emploi.fr/accessibilite    |