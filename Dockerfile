#syntax=docker/dockerfile:1.4

# Stage 1: Build the SPA
FROM node:24-alpine AS build

WORKDIR /app

COPY --link package.json package-lock.json ./
RUN npm ci

COPY --link . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine AS production

COPY --link nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1

EXPOSE 80
