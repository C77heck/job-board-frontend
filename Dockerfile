FROM node:16-alpine

WORKDIR /var/www

COPY . .

RUN apk update
RUN apk add --no-cache python3 py3-pip
RUN apk add --no-cache make
RUN apk add --no-cache g++
RUN apk add --no-cache nginx
RUN npm install
RUN npm run build

RUN rm -rf node_modules src

CMD nginx -c $(pwd)/nginx.conf -g "pid /var/run/nginx.pid; daemon off;"
