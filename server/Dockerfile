FROM node:latest

RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server

COPY package.json /usr/src/server/package.json
RUN npm install

COPY . /usr/src/server