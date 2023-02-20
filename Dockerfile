FROM node:18-alpine AS builder-deps
WORKDIR /home/app

COPY ./package*.json ./

RUN npm ci

COPY . .

FROM builder-deps AS builder
RUN npm run build

FROM node:18-alpine AS runtime
WORKDIR /home/app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app

COPY ./package*.json ./
COPY ./swagger.json ./

RUN npm ci

USER app

COPY --from=builder /home/app/dist ./src

EXPOSE 5000

CMD ["node", "./src/infrastructure/server/server.js"]
