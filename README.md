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
Il faut s'assurer d'etre sous **node 12.18.4**
Avec [nvm](https://github.com/nvm-sh/nvm) pour Windows et un poste PE il faut ouvrir un cmd en self élévation:
```bash
nvm install 12.18.4
nvm use 12.18.4
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
- **old_regions** contient les informations de régions selon l’ancien format, et une correspondance avec le nouveau format. Cette table est nécessaire car de nombreuses données insee font encore référence à l’ancien format et à ses identifiants
- **regions_tensions_criterions** contient un json permettant au front d’afficher les informations de régions en tension par code rome, et les critères associés.
- **rome_codes** contient tous les codes romes et leurs libellés
- **romeogrs** contient tous les code OGR et libellés des métiers, et leurs codes romes associés
- **romeskills** contient la liste des compétences associée à chaque code rome
- **socialhousings** contient les informations de logement social disponible par région (ces données devraient être mergées à new_regions)
- **tensions** contient les informations de tensions par code rome et territoire. C’est notamment à partir de cette table qu’est généré le json présent dans regions_tensions_criterions

## Génération de migration

Dans le répertoire `~/api/src/db`, exécuter `npx sequelize-cli migration:generate --name migration-skeleton`

## Notes sur la génération des equiments
Les données sont issu de [l'insee](https://www.insee.fr/fr/statistiques/3568638?sommaire=3568656), celle géolocalisé sont utilisé c'est à dire une ligne une entrée sequelize fait la somme pour nous
En utilisant les outils [csvkit](https://csvkit.readthedocs.io/), on peut fusionner les 3 fichiers :
```bash
# unzip bpe20_ensemble_xy_csv.zip bpe20_enseignement_xy_csv.zip bpe20_sport_Loisir_xy_csv.zip
csvstack -d ";" bpe20_ensemble_xy_csv.csv bpe20_enseignement_xy_csv.csv bpe20_sport_Loisir_xy_csv.csv | csvformat -D ";" > bpe2020.csv
```
bpe2020.csv est a placé dans le répertoire `api/src/assets/datas`
En lancant le script `api/src/scripts/equipments-file-builder.js` (avec node) on converti le csv en json 

il faut ensuite le comprésser `gzip BPE2020-tweaked.json` et renommé en bpe-2020-light.json.gz
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
Pour un environnement de production (sinon le prefixe du fichier sera mobivillerecette_*):
On récupere le backup de la veille: `export BACKUP_FILE_NAME=mobivilleproduction_$(date -d 'yesterday' +'%d')`
```bash
cp /home/docker/mobiville/backups/$BACKUP_FILE_NAME.sql.bz2 ~/
bzip2 -d $BACKUP_FILE_NAME.sql.bz2
docker cp ./BACKUP_FILE_NAME.sql mobiville_db_1:/

docker exec -it mobiville_db_1 mariadb -u $MOBIVILLE_USER -p$MOBIVILLE_PASS mobiville -e "DROP DATABASE mobiville"
docker exec -it mobiville_db_1 mariadb -u $MOBIVILLE_USER -p$MOBIVILLE_PASS -e "CREATE DATABASE mobiville"
docker exec -it mobiville_db_1 bash -c "mysql -u $MOBIVILLE_USER -p$MOBIVILLE_PASS mobiville < "$BACKUP_FILE_NAME".sql"
```
TADA !