FROM node:7.10

WORKDIR /app

COPY package.json /app
RUN npm install

COPY index.js /app
COPY src /app/src
COPY test /app/test
