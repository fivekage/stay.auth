# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080
CMD ["node", "index.js"]