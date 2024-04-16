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
  docker-compose run backend bun prisma generate
  #print "Running seeds..."
  #docker-compose run --rm backend npm run knex:seed:run
  print "Done!"
fi
