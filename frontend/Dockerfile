# Etapa 1: Construcción del frontend
FROM node:20 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . . 
RUN npm run build

# Etapa 2: Servir la aplicación con `serve`
FROM node:20 AS production
WORKDIR /app
COPY --from=build /app/build ./build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]

