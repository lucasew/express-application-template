FROM node:12

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn

COPY . .
RUN yarn knex:migrate
RUN yarn knex:seed

EXPOSE 3000

ENTRYPOINT yarn start
