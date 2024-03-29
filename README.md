# Tasks
## Run an application using Docker
```bash
docker compose --file docker-compose.local.yml up --build
```

## Installation
```bash
git clone git@github.com:erotourtes/React-App.git && cd React-App

## Build
npm run build
```

## Development mode
```bash
# Setup database
docker compose --file ./docker-compose.dev.yml up --build

npm start
```
