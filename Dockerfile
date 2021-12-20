FROM node:14.17.6-alpine3.12

RUN apk add --no-cache bash

RUN mkdir /app

WORKDIR /app

COPY --chown=root package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

RUN chmod +x ./scripts/entrypoint.sh

ENTRYPOINT ["./scripts/entrypoint.sh"]