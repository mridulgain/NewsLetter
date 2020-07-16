FROM node:14
WORKDIR /usr/src/NewsLetter
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
cmd ["node", "app.js"]
