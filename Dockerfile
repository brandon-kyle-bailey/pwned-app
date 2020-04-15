FROM node:latest

WORKDIR app/

COPY . .

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install react-scripts --silent
RUN npm install --silent

cmd ["npm","start"]

