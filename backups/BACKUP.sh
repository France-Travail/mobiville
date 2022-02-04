#!/bin/bash

#NOTE: dans le docker compose monter le répertoire du projet /home/docker/[nom du projet] <- doit respecter cette nomenclature

if [ "$ENV_TYPE" = "developpement" ];
then
	exit 0;
fi

DAY=`date +%d`;
WEEKDAY=`date +%A`;
NICE="/usr/bin/nice -n 15";
PROJECT="mobiville"

DATABASENAME="${PROJECT}${ENV_TYPE}_${DAY}.sql.bz2";
DOCKERNAME="docker${ENV_TYPE}_${WEEKDAY}.tar.bz2";
DIR="/";

# en recette, et preprod backup tous les jours et trimestre (11 sauvegardes)
if [ "$ENV_TYPE" = "recette" ] || [ "$ENV_TYPE" = "preprod" ]
then
	QUARTER=`date +%q`;
	DATABASENAME="${PROJECT}${ENV_TYPE}_${WEEKDAY}.sql.bz2"
	DATABASENAME_QUARTER="${PROJECT}${ENV_TYPE}_Q${QUARTER}.sql.bz2"
	DOCKERNAME_QUARTER="docker${ENV_TYPE}_Q${QUARTER}.tar.bz2"
	DIR="${ENV_TYPE}/";
	mkdir -p /mnt/backups/${ENV_TYPE};
fi

#backup bdd (NOTE si erreur sur mysql.proc faire un mysql_upgrade -u root -p{passowrd} dans le conteneur de BDD)
$NICE mysqldump -R --opt --single-transaction -h$DB_HOST -u$DB_USER -p$DB_PASSWORD $DB_NAME | \
        bzip2 -cq5 | \
            tee /backups/$DATABASENAME /mnt/backups/$DIR$DATABASENAME >/dev/null;

#backup docker
$NICE tar --exclude=db/* --exclude=*.bz2 --exclude=*.gz -jcPf - /home/docker/$PROJECT | \
    tee /backups/$DOCKERNAME /mnt/backups/$DIR$DOCKERNAME >/dev/null;

# sauvegarde tous les trimestres pour la partie recette
if [ "$QUARTER" != "" ];
then
	$NICE cat /backups/$DATABASENAME | tee /backups/$DATABASENAME_QUARTER /mnt/backups/$DIR$DATABASENAME_QUARTER >/dev/null;
	$NICE cat /backups/$DOCKERNAME | tee /backups/$DOCKERNAME_QUARTER /mnt/backups/$DIR$DOCKERNAME_QUARTER >/dev/null;
fi
