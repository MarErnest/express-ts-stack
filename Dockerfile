FROM node:11.8.0

WORKDIR '/backendapp'

COPY package.json package.json

COPY package-lock.json package-lock.json

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000 9229