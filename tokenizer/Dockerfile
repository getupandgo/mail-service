FROM node:latest

RUN mkdir -p /usr/src/tokenizer
WORKDIR /usr/src/tokenizer

COPY package.json /usr/src/tokenizer/package.json
RUN npm install

COPY . /usr/src/tokenizer