# Build the optimised react app.
FROM node:9.9.0-alpine AS build
RUN mkdir -p /src/app
WORKDIR /src/app
COPY package.json /src/app/
RUN npm install
COPY . /src/app
ARG GITHUB_KEY
ENV REACT_APP_GITHUB_KEY=$GITHUB_KEY
RUN npm run build

# Copy build to nginx for serving.
FROM nginx:1.13.10-alpine
COPY --from=build /src/app/build/ /usr/share/nginx/html