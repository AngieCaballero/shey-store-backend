# Usa una imagen base de Node.js 18
FROM node:18-alpine

WORKDIR /home/app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm rebuild bcrypt

EXPOSE 3000

CMD ["pnpm", "run", "start:dev"]