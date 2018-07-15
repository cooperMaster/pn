FROM jenkins
MAINTAINER who@example.com
ENV REFRESHED_AT 2018-07-08

USER root
RUN apt-get -qq update && apt-get install -qq sudo
RUN echo "jenkins ALL=NOPASSWD: ALL" >> /etc/sudoers
RUN wget http://get.docker.com/builds/Linux/x86_64/docker-latest.tgz
RUN tar -xvzf docker-latest.tgz
RUN mv docker/* /usr/bin/

