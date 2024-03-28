FROM node:21-alpine3.18

WORKDIR /app/shared
COPY package*.json .
RUN npm install
COPY . .
