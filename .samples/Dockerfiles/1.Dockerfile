# Multiple images example
#
# VERSION               0.1

FROM ubuntu:latest AS base_image
RUN echo foo > bar
# Will output something like ===> 907ad6c2736f

FROM ubuntu
RUN echo moo > oink
# Will output something like ===> 695d7793cbe4

# You'll now have two images, 907ad6c2736f with /bar, and 695d7793cbe4 with
# /oink.

---

FROM ubuntu
MAINTAINER Joe Brown

RUN apt-get install -y python-software-properties python python-setuptools ruby rubygems
RUN add-apt-repository ppa:chris-lea/node.js
RUN echo "deb http://us.archive.ubuntu.com/ubuntu/ precise universe" >> /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y nodejs 

RUN apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
RUN echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" | tee -a /etc/apt/sources.list.d/10gen.list
RUN apt-get -y update
RUN apt-get -y install mongodb-10gen

RUN easy_install supervisor
RUN echo_supervisord_conf > /etc/supervisord.conf
RUN printf "[include]\nfiles = /var/www/Supervisorfile\n" >> /etc/supervisord.conf

ADD . /var/www

RUN cd /var/www ; npm install 

CMD ["/usr/local/bin/supervisord", "-n", "-c", "/etc/supervisord.conf"] 

---

FROM komljen/ubuntu:3.15
MAINTAINER Jane Doe

ENV USER root
ENV PASS aiPeekai0AeZ2meephoolais7doo1thu

RUN \
  apt-get update && \
  apt-get -y install \
          mysql-server-5.5 && \
  rm -rf /var/lib/apt/lists/*

COPY my.cnf /etc/mysql/my.cnf
COPY start.sh start.sh

VOLUME ["/var/lib/mysql"]

RUN rm /usr/sbin/policy-rc.d
CMD ["/start.sh"]

EXPOSE 3306