FROM ubuntu:latest
MAINTAINER WHOYIMING WHOYIMING@GMAIL.COM
ENV REFRESHED_AT 20180707
RUN apt-get update
RUN apt-get -y install redis-server redis-tools
EXPOSE 6379
ENTRYPOINT ["/usr/bin/redis-server"]
CMD []
