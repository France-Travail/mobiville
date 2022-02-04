FROM ubuntu:bionic

RUN echo "LANG=\"fr_FR.UTF-8\"\nLANGUAGE=\"fr_FR:fr\"\nLC_NUMERIC=\"fr_FR.UTF-8\"\nLC_TIME=\"fr_FR.UTF-8\"\nLC_MONETARY=\"fr_FR.UTF-8\"\nLC_PAPER=\"fr_FR.UTF-8\"\nLC_IDENTIFICATION=\"fr_FR.UTF-8\"\nLC_NAME=\"fr_FR.UTF-8\"\nLC_ADDRESS=\"fr_FR.UTF-8\"\nLC_TELEPHONE=\"fr_FR.UTF-8\"\nLC_MEASUREMENT=\"fr_FR.UTF-8\"" >>/etc/default/locale

RUN export DEBIAN_FRONTEND=noninteractive && \
    apt-get update && \
    apt-get -y install cron mariadb-client && \
    apt-get -y install cron && \
    apt-get -y install bzip2 tar language-pack-fr vim tzdata rsyslog

# Mise à l'heure française
ARG TIMEZONE=${TIMEZONE:-Europe/Paris}
ENV TZ $TIMEZONE
RUN echo "$TIMEZONE" >/etc/timezone; \
    ln -sf /usr/share/zoneinfo/$TIMEZONE /etc/localtime; \
    dpkg-reconfigure -f noninteractive tzdata;

ARG ENV_TYPE=${ENV_TYPE:-developpement}
ENV ENV_TYPE=${ENV_TYPE}
ENV LANG=fr_FR.UTF-8

RUN echo "0 2 * * * root ENV_TYPE=${ENV_TYPE} /bin/bash /backups/BACKUP.sh /backups >/dev/null 2>&1" >>/etc/cron.d/backups;

WORKDIR /backups

CMD touch /etc/crontab /etc/cron.*/*; \
    service cron start; \
    service rsyslog start; \
    sleep infinity;


