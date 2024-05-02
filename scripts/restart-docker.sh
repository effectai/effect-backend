#!/usr/bin/env bash

function print() {
  echo ""; echo $1; echo ""
}

print "(Re)starting..."
if docker-compose down && docker-compose up -d db; then
  print "Installing dependencies..."
  docker-compose run --rm backend bun install
  print "Starting all containers..."
  docker-compose up -d --build
  print "Running migrations..."
  docker-compose run backend bun prisma migrate dev
  print "Running seed..."
  docker-compose run --rm backend bun run prisma:seed
  print "Done!"
fi
