FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

COPY config.json ./config.json

EXPOSE 3001

CMD ["npm", "run", "start"]