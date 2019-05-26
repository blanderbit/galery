FROM node:lts-alpine as builder
RUN apk update && apk upgrade && apk add --no-cache bash git openssh
RUN apk add --update python krb5 krb5-libs gcc make g++ krb5-dev
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm i -g npm@latest
# Install app dependencies
COPY . /usr/src/app/
COPY package.json package.json
RUN npm install
# RUN apk --no-cache --virtual build-dependencies add \
#     python \
#     make \
#     g++ \
#     && npm install \
#     && npm audit fix \
#     && apk del build-dependencies
# Copy app source code
# COPY . .
#Expose port and start application
ENV DOCKER_DB=mongo
EXPOSE 2000
CMD [ "npm", "start" ]