FROM node:7.10

ENV NODE_ENV=development

WORKDIR /app

COPY package.json /app
RUN npm install

COPY index.js /app
COPY src /app/src
COPY test /app/test

EXPOSE 80

CMD ["npm", "start"]
