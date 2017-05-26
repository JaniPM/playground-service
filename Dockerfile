FROM node:7.10

# TODO to docker-dompose.yml
ENV NODE_ENV=development

WORKDIR /app

COPY package.json /app
RUN npm install

COPY index.js /app
COPY src /app/src
COPY test /app/test
