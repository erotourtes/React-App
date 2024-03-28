# Tasks
## Run an application using Docker
```bash
docker compose --file ./docker-compose.local.yml up --build
```

## Installation
```bash
git clone git@github.com:erotourtes/React-App.git && cd React-App

# Build shared
npm --prefix shared install && npm --prefix shared run build

# Install backend
npm --prefix backend install

# Install frontend
npm --prefix frontend install
```
> [!TIP]
> You can copy `git clone git@github.com:erotourtes/React-App.git && cd React-App && npm --prefix shared install && npm --prefix shared run build && npm --prefix backend install && npm --prefix frontend install` and paste it in your terminal.

## Development mode
```bash
# Setup database
docker compose --file ./docker-compose.dev.yml up --build

npm --prefix backend run start:dev
npm --prefix frontend run start:dev
```
