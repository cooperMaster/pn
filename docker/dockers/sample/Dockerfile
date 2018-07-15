FROM ubuntu:latest
MAINTAINER WHOYIMING "WHOYIMING@GMAIL.COM"
ENV REFRESHED_AT 2018-07-07
RUN apt-get update
RUN apt-get -y -q install nginx
RUN mkdir -p /var/www/html
ADD nginx/global.conf /etc/nginx/conf.d/
ADD nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
