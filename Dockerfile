FROM node:14.14.0-alpine
WORKDIR /app
COPY ./package*.json ./
COPY ./prisma ./
COPY ./.env ./
RUN  npm install
RUN npx prisma migrate dev
COPY . .
CMD node app.js
