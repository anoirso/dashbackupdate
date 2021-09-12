FROM node:14.14.0-alpine
WORKDIR /app
ENV DATABASE_URL=postgresql://postgres:15111996@34.88.199.236:5432/kendra?schema=public

COPY ./package*.json ./
COPY ./prisma ./
RUN  npm install
RUN npx prisma migrate dev
COPY . .
CMD node app.js
