FROM ubuntu:latest
MAINTAINER WHOYIMING "whyiming@gmail.com"
ENV REFRESHED_AT 20180707

RUN apt-get update && apt-get -y install ruby ruby-dev build-essential redis-tools
RUN gem install --no-rdoc --no-ri sinatra json redis

RUN mkdir -p /opt/webapp

EXPOSE 4567

CMD [ "/opt/webapp/bin/webapp" ]

