FROM node:18-bullseye as builder

RUN apt-get update; apt install -y curl

RUN mkdir /app
WORKDIR /app

ENV NODE_ENV production

COPY . .

RUN npm install

FROM node:18-bullseye

RUN apt-get update
RUN apt-get install sqlite3

LABEL fly_launch_runtime="nodejs"

COPY --from=builder /app /app

WORKDIR /app
ENV NODE_ENV production

CMD [ "npm", "run", "start" ]
