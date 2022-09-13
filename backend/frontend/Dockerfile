FROM node:13.12.0-alpine

RUN mkdir /app

WORKDIR /app

COPY . .

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent
