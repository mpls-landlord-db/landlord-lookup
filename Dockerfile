# Based on guide from https://dev.to/alex_barashkov/using-docker-for-nodejs-in-development-and-production-3cgp

FROM node:10-alpine AS builder

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN apk --no-cache add python make g++

COPY package*.json ./
RUN npm install

# The instructions for second stage
FROM node:10-alpine

WORKDIR /usr/src/app
COPY --from=builder node_modules node_modules

COPY . .

CMD [ "npm", "run", "dev" ]