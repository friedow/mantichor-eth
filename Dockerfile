FROM node:alpine AS builder
WORKDIR /usr/src/mantichor-share
COPY . .
RUN npm install && \
    npm run build && \
    mkdir ./builder && \
    mv ./build ./builder/build && \
    mv ./tsconfig.json ./builder/tsconfig.json && \
    mv ./package.json ./builder/package.json

FROM node:alpine
WORKDIR /usr/src/mantichor-share
COPY --from=builder /usr/src/mantichor-share/builder .
RUN npm install --production
CMD npm run production
