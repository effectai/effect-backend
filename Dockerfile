FROM imbios/bun-node:latest

# Create app directory
WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY ./src src
COPY ./prisma prisma
COPY ./tsconfig.json .

ENV NODE_ENV production

CMD ["bun", "run", "start:prod"]

EXPOSE 3000