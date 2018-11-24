FROM node:6-alpine
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install && npm cache clean --force
COPY src /usr/src/app/src
CMD [ "npm", "start" ]