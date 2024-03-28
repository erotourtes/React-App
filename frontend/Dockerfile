FROM tasks-shared

RUN cd /app/shared && npm run build:es

WORKDIR /app/frontend
COPY package*.json .
RUN npm install
COPY . .

RUN npm run build

EXPOSE 4173
CMD ["npm", "run", "start:cont"]
