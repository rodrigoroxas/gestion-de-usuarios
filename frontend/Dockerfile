# Etapa de construcción
FROM node:16-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN cd /app && npm install
COPY . .
RUN cd /app && npm run dev

# Etapa de producción
# FROM nginx:alpine
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
