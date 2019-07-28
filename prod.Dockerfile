# Stage 1: Build src
FROM node:11.8.0 as build

WORKDIR '/backendapp'

RUN mkdir logs

COPY package.json package.json

COPY package-lock.json package-lock.json

RUN npm install

COPY . .

RUN npm run build

# Step 2: Run src
FROM node:11.8.0

COPY package.json package.json
COPY --from=build /backendapp/dist ./dist
COPY --from=build /backendapp/node_modules ./node_modules
COPY --from=build /backendapp/example.env .env
COPY --from=build /backendapp/ormconfig.js ormconfig.js

EXPOSE 3001

# CMD ["pm2", "start", "dist/index.js"]
# docker build --rm -f "server/prod.Dockerfile" -t smartsavings/server-prod:[TAG] server