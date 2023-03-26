# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /app/dist .
COPY ./frontend/data/nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]