# Tasks
> [!NOTE]
> There is no backend CI/CD pipeline for this project. Therefore, the hosted site might be outdated and it is better to use [Docker](#run-an-application-using-docker).

## Run an application using Docker
```bash
# Clone the repository
git clone git@github.com:erotourtes/React-App.git && cd React-App

docker compose up --build
```
Open [http://localhost:8080/React-App/](http://localhost:8080/React-App/) in your browser.

## Installation
```bash
git clone git@github.com:erotourtes/React-App.git && cd React-App

npm install
```

## Development mode
```bash
# Setup database
docker compose up --build db

# Build shared packages first
npx turbo run build --filter="@packages/types" && npm start
```
