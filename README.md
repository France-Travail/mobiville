# Mobiville

## Présentation

Mobiville est un outil d’aide à la décision pour orienter les candidats à la mobilité vers les bassins d’emploi qui recrutent afin de saisir des opportunités dans de nouveaux territoires.

## Stack technique

- une api (back) en node.js
- un site web (front) en react, derrière un serveur nginx
- une base de données (MariaDB)

## Installation

Pré-requis: [docker, docker-compose](https://www.docker.com/get-started) et [yarn](https://yarnpkg.com/getting-started/install)

### Version de nodeJS
Il faut s'assurer d'etre sous **node 16.16.0**
Avec [nvm](https://github.com/nvm-sh/nvm) pour Windows et un poste PE il faut ouvrir un cmd en self élévation:
```bash
nvm install 16.16.0
nvm use 16.16.0
``` 

### Construire et démarrer les conteneurs
1. Remplir les données .env (exemple voir .env.exemple dans le repo)
2. `yarn build` (toute modification du .env demandera un nouveau build)
3. `yarn start`

## API alimenter/synchroniser la base de données

Entrer dans le container api
`docker exec -it mobiville_api_1 /bin/bash`

Et exécuter les commandes de synchronisation suivantes, dans l’ordre :

```
yarn sync:regions # almost instantaneous. Run this first.
yarn sync:cities # 1 minutes long
yarn sync:professionsInTension # 1 minutes long
yarn sync:helps # almost instantaneous
yarn sync:equipments # This will take a few minutes minutes
yarn sync:equipmentsSpecial # almost instantaneous, needs to be run after the previous script
yarn sync:romeOgrs # almost instantaneous
yarn sync:romeSkills # almost instantaneous
yarn sync:tensionsPCS # almost instantaneous
yarn sync:regionsTensionsCriterions # Takes about 5 minutes
```

## Structure de données

Les tables suivantes sont présentes dans la base :

- **bassins** contenant les informations sur les différents bassins d’emploi
- **cities** contenant les informations sur les différetes villes
- **cities_jobs** contient les informations sur le nombre d’emploi par ville et par code rome.
- **equipments** contient les informations sur le nombre de chaque type d’équipements présents dans chaque ville (page « cadre de vie ») [source de 2020](https://www.insee.fr/fr/statistiques/3568638?sommaire=3568656)
- **helps** contient les informations sur les différentes aides proposées par pôle-emploi
- **migrations** contient les informations de migration de base de données
- **new_regions** contient les informations de régions selon le nouveau format (réforme de 2015)
- ~~**old_regions** contient les informations de régions selon l’ancien format, et une correspondance avec le nouveau format. Cette table est nécessaire car de nombreuses données insee font encore référence à l’ancien format et à ses identifiants~~
- **regions_tensions_criterions** contient un json permettant au front d’afficher les informations de régions en tension par code rome, et les critères associés.
- **rome_codes** contient tous les codes romes et leurs libellés
- **romeogrs** contient tous les code OGR et libellés des métiers, et leurs codes romes associés
- **romeskills** contient la liste des compétences associée à chaque code rome
- ~~**socialhousings** contient les informations de logement social disponible par région (ces données devraient être mergées à new_regions)~~
- **tensions** contient les informations de tensions par code rome et territoire. C’est notamment à partir de cette table qu’est généré le json présent dans regions_tensions_criterions

## Génération de migration

Dans le répertoire `~/api/src/db`, exécuter `npx sequelize-cli migration:generate --name migration-skeleton`

## Notes sur la génération des equiments
Les données sont issu de [l'insee](https://www.insee.fr/fr/statistiques/3568638?sommaire=3568656), celle géolocalisé sont utilisé c'est à dire une ligne une entrée sequelize fait la somme pour nous
`bpe21_xy.csv` est a placé dans le répertoire `api/src/assets/datas`
En lancant le script : `node api/src/scripts/equipmentsFileBuilder` on converti le csv en json,
il faut ensuite le compresser `gzip BPE2021-tweaked.json`

## Construire les images

Créer et sauver les images docker à pousser sur le serveur

```
yarn build:recette // création et sauvegarde des images de recette
scp images-docker // et copie sur le serveur cible
```

## Logs des containers

```
yarn log:api
yarn log:front
```

## Données et sources de données

- Liste des villes -> Importé depuis le fichier `cities-france.csv`. Le fichier `cities-france.csv` est issue du site data.gouv.fr et est mis à jours tous les ans.
- Liste des villes en tensions -> Importée depuis le fichier `cities-tension-utf8.csv`
- Liste des villes <-> bassins -> Importée depuis le fichier `lexique-bassins.csv`
- Liste des regions, nouvelle nomenclature -> Importé depuis le fichier `anciennes-nouvelles-regions.json`

## API externes

Mobiville appelle plusieurs API de [pole-emploi.io](https://pole-emploi.io/)

API Offre d'emploi, pour afficher la liste des offres pour une ville et un métier
API Info travail, pour afficher la tranche de salaire d'une region et d'un métier sur la fiche ville
API métiers
Les photos des villes ainsi que leurs descriptions sont importées de Wikipedia

## Déploiement

### Workflow

Le déploiement se fait avec la pipeline de gitlab.

Une image versionnée est produite pour l'API si un commit de code de l'API est poussé sur la branche de reccette ou de production. De même qu'une archive versionnée est créée en cas de commit sur la branche de recette ou de production. L'image et/ou l'archive sont ensuite déployées sur les environements concernés.

```plantuml
 left to right direction

  state "commit d3a2370" as ci
  ci : branche\ndevelop ou master
  state "build & publish" as build {
    state file <<choice>>
    state "build package" as p
    p : front-master-latest.tar.gz\nfront-master-d3a2370.tar.gz
    state "build image" as i
    i : api-master-latest\napi-master-d3a2370
    state "publication" as r
    r : registry
    file --> p : si code front change
    file --> i : si code api change
    p --> r
    i --> r
  }


  [*] --> ci
  ci --> build :si commit sur master
  build --> test
  test --> deploy :action manuelle
```

### Rollback

Pour faire un rollback de l'api et/ou du front suivre la procédure suivante:

1. récupérer le hash raccourci du commit sur lequel on veut faire le rollback et s'assurer que l'image ou l'archive correspondant à ce commit existe bien.

2. Dans le gitlab > CI/CD > Pipelines actionner _Run pipeline_

3. Choisir la branche correspondante à l'environement surlequel le rollback doit être fait

4. Renseigner les variables suivantes : `FORCE_VERSION: {hash commit de la version à rollbacker}

5. valider les étapes manuellement pour ce rollback

Si besoin de déployer depuis une autre branche que celle de recette ou de production dans ce cas, se positionner sur la branche et renseigner `FORCE_DEPLOY: true` si aucun paquet ou image n'existe encore pour cette branche alors ne pas renseigner de version de commit, l'image ou le paquet sera créé en fonction du dernier commit de cette même branche cible.

### Typologie des fichiers de livraisons

- Pour le front : gitlab > Packages & registry > Package registry > front >

`mobiville.{branche}-latest.tar.gz`
`mobiville.{branche}-{hash commit raccourci}.tar.gz`

- Pour l'API : gitlab > Packages & registry > Image registry > Root image

`api-{branch}-latest`
`api-{branch}-{hash commit taccourci}`

### Renouvellement certificat

1. Suivre la procédure indiquée dans le [wiki](https://wiki.beta.pole-emploi.fr/memento-dev/securite/certificat-ssl-tls/)
2. Puis copié/coller le nouveau certificat dans la variable CI/CD `SSL_mobiville_pole_emploi_fr_crt`
3. Dans CI/CD > Pipeline > bouton 'Run pipeline' se mettre sur la branche master, puis `FORCE_DEPLOY = install` et `RENEW_TLS = YES`
4. bouton 'Run pipeline' pour lancer le deploiement

### Installation from scratch

Il est possible de réinstaller from scratch avec la pipeline.

1. "Run pipelines"
   2 Renseigner les champs suivant: - branche pour laquelle le pipeline sera lancée - mettre l'IP du serveur de PRODUCTION - PROD_BRANCH: doit correspondre à la branche selectionnée - FORCE_DEPLOY : install - FORCE_INSTALL: {branche des images à déployer} (master, develop ou autre en latest)
2. Lancer l'installation

## Architecture

```plantuml
node "OVH" {

stack "mobiville" {
  [Docker NGINX]
  [Docker API]
  [Docker Database]

  package Data {
collections "fichiers de données"
file "mobiville_bassin_offre_full_xxx.bz2" as datalakefile
}
}
  [Docker Backup]


}

node "gitlab" {
   [Pipeline]
}

node "OVH datalake" {
   [backup]
   [datalake]
}


cloud {
  [Internet]
  [Wikipedia]
}

[Docker NGINX] -d--> [Internet]
[Docker API] <-> [Docker Database]
[Docker API] <-> [Docker NGINX]
[Wikipedia] --> [Docker API]
[Pipeline] -u--> [Docker API]
[Pipeline] -u--> [Docker NGINX]
[Docker Backup] -d--> [backup]
mobiville --> [Docker Backup]
Data --> [Docker API]
[datalake] -l--> datalakefile
```
### Comment récuperer et appliquer un backup de bdd ?
##### Récupération du backup 
Pour télécharger le backup avec le nom `mobivillerecette_dimanche` :
Sur le serveur distant :
- `docker cp mobiville-backup:/backups/mobivillerecette_dimanche.sql.bz2 /tmp/`

Sur son poste ensuite :
- `scp $USER@$IP_DU_SERVEUR_DISTANT:/tmp/mobivillerecette_dimanche.sql.bz2 ./`

##### Procedure de restore
Pour un environnement de recette (sinon le prefixe du fichier sera mobivilleproduction_*):
On récupere le backup de la veille: `export BACKUP_FILE_NAME=mobivillerecette_$(LC_ALL="fr_FR.utf8" date -d 'yesterday' +'%A')`
```bash
cp /home/docker/mobiville/backups/$BACKUP_FILE_NAME.sql.bz2 ~/
bzip2 -d $BACKUP_FILE_NAME.sql.bz2
docker cp ./BACKUP_FILE_NAME.sql mobiville_db_1:/

docker exec -it mobiville_db_1 mariadb -u $MYSQL_USER -p$MYSQL_PASSWORD mobiville -e "DROP DATABASE mobiville"
docker exec -it mobiville_db_1 mariadb -u $MYSQL_USER -p$MYSQL_PASSWORD -e "CREATE DATABASE mobiville"
docker exec -it mobiville_db_1 bash -c "mysql -u $MYSQL_USER -p$MYSQL_PASSWORD mobiville < "$BACKUP_FILE_NAME".sql"
```
TADA !

##### Test E2E

:warning: pour executer la tache yarn/npm cypress:run sans erreur et avoir les resultats de test, il faut installer un (formatteur)[https://github.com/cucumber/json-formatter] dans le PATH de sa machine

Sous Windows : `mkdir %USERPROFILE%\Bin & curl https://github.com/cucumber/json-formatter/releases/download/v19.0.0/cucumber-json-formatter-windows-amd64 >  %USERPROFILE%\Bin\cucumber-json-formatter.exe `

Sous Linux : `curl https://github.com/cucumber/json-formatter/releases/download/v19.0.0/cucumber-json-formatter-linux-amd64 > ~/bin/cucumber-json-formatter`