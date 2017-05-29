FROM node:latest

RUN mkdir -p /usr/src/mail_sender
WORKDIR /usr/src/mail_sender

COPY package.json /usr/src/mail_sender/package.json
RUN npm install

COPY . /usr/src/mail_sender