FROM node:16-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json yarn.lock .
RUN yarn
COPY . .
EXPOSE ${NODE_PORT}
CMD ["yarn", "start"]