FROM node:16.12.0-alpine3.12

WORKDIR /app
ADD .env ./
ADD package*.json ./
RUN npm install
ADD . ./

EXPOSE 5000

CMD ["npm", "run", "start:dev"]
