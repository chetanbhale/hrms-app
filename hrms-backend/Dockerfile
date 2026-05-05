# ---------- BUILD STAGE ----------
FROM node:20 AS builder

WORKDIR /app

ENV NODE_ENV=development

COPY package*.json ./

RUN npm install

RUN npm install -g typescript

COPY . .

RUN npm run build


# ---------- RUNTIME STAGE ----------
FROM node:20

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package*.json ./

RUN npm install --omit=dev

EXPOSE 5000

CMD ["node", "dist/server.js"]