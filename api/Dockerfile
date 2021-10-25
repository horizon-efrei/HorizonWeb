FROM node:16.12.0-alpine3.12

WORKDIR /app
ADD package.json /app/package.json
RUN npm install

ADD . /app

EXPOSE 5000

CMD ["npm", "run", "start:dev"]