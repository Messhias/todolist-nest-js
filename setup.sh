# !bin/bash

cp .env.sample .env &&
docker compose up -d --build &&
yarn mikro-orm migration:create &&
yarn mikro-orm migration:up
