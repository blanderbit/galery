FROM node:lts-alpine as angular-built
RUN apk update && apk upgrade && apk add --no-cache bash git openssh
RUN apk add --update python krb5 krb5-libs gcc make g++ krb5-dev
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm i -g npm@latest
RUN npm i -g @angular/cli
COPY . /usr/src/app/
COPY package.json package.json
RUN npm install
RUN npm rebuild node-sass
EXPOSE 4200
CMD [ "ng", "s" ]
# RUN apk --no-cache --virtual build-dependencies add \
#   python \
#   make \
#   g++ \
#   && npm install \
#   && apk del build-dependencies
# COPY . .
# RUN ng build --prod --build-optimizer

# FROM nginx:alpine
# LABEL author="John Papa"
# COPY --from=angular-built /usr/src/app/dist/frontend /usr/share/nginx/html
# EXPOSE 80 443
# CMD [ "nginx", "-g", "daemon off;" ]
