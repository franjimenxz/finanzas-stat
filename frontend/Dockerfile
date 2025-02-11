# Usar Node.js para construir el frontend
FROM node:20 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Copiar el build al volumen compartido con Nginx
RUN mkdir -p /app/build
RUN cp -r /app/build /app/build_output

CMD ["echo", "Frontend build listo"]
