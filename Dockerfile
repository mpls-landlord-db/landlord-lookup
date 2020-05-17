# Based on guide from https://dev.to/alex_barashkov/using-docker-for-nodejs-in-development-and-production-3cgp


FROM node:10-alpine AS builder

COPY package*.json ./

RUN npm install


# # # The instructions for second stage
FROM node:10-alpine

WORKDIR /usr/src/app

COPY . .

COPY --from=builder node_modules node_modules

CMD ["npm", "run", "dev"]