FROM tasks-shared

RUN cd /app/shared && npm run build

WORKDIR /app/backend
COPY package*.json .
RUN npm install
COPY . .

RUN npm run build
CMD ["npm", "run", "start:prod"]
