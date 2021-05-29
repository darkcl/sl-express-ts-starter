FROM node:14 as builder

WORKDIR /build

COPY package.json package.json
COPY yarn.lock yarn.lock
COPY tsconfig.json tsconfig.json

RUN yarn install --production false

COPY . .
RUN yarn build

FROM node:14-alpine

COPY --from=builder /build/package.json package.json
COPY --from=builder /build/yarn.lock yarn.lock

RUN yarn install --production true
COPY --from=builder /build/dist/ .

CMD [ "node", "server.js" ]
