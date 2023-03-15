# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM node:lts-alpine as production-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY --from=build-stage /app/dist/ ./dist/
COPY --from=build-stage /app/.env ./
EXPOSE 3000
CMD [ "node", "dist/main.js" ]