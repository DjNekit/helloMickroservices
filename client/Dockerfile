FROM node:alpine

ENV CI=true

WORKDIR /usr/app

COPY ./package.json ./

RUN npm i

COPY ./ ./

CMD ["npm", "start"]