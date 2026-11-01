# GameDig API
A very simple API for querying game server information using [GameDig](https://www.npmjs.com/package/gamedig) and [Bun](https://bun.sh).

## Supported games

A full list of supported games and their unique identifiers can be found in the [GameDig documentation](https://github.com/gamedig/node-gamedig#games-list).

## Requirements

[Bun](https://bun.sh) installed on your system.

## Run

Clone the project using git:
```sh
git clone https://github.com/Virtual-Instanity/gamedig-api.git
```

Move to GameDig API directory:
```sh
cd gamedig-api
```

install dependencies:
```sh
bun install
```

Run:
```sh
bun run start
```

Run dev
```sh
bun run dev
```

## Run in Docker

Build and start the container (in background):
```sh
docker compose up -d --build
```

The container reads `API_TOKEN` and `APP_PORT` from the same `.env` file (or from system environment variables). Without `APP_PORT` the server uses port 3000. Stop with:
```sh
docker compose down
```

## Environment Variables

You can configure the environment variables in two ways:
1. Copy `.env.example.` to `.env`: 
    ```sh
    cp .env.example .env
    ```
2. Set the required variables directly in your system's environment.


### Variables

- `API_TOKEN`: Secret token for authenticating API requests. **Required.**
- `APP_PORT`: The port on which the API will run. Default: `3000`.
- `RATE_LIMIT_MAX`: Max requests per IP per window. Default: `30`.
- `RATE_LIMIT_WINDOW_SEC`: Rate limit window length, seconds. Default: `60`.
- `MAX_CONCURRENT_QUERIES`: Max simultaneous game server queries. Default: `5`.

## API

### 1. **POST `/api/query`**

- **Bearer Token**: a required in header for API authentication.
- **Content-Type**: the request must have the type `application/json`. Invalid bodies return `422` with validation details.
- **Rate limiting**: requests are limited per client IP (`RATE_LIMIT_MAX` per `RATE_LIMIT_WINDOW_SEC`), implemented with [elysia-rate-limit](https://github.com/rayriffy/elysia-rate-limit). Exceeding the limit returns `429` with `Retry-After` and standardized `RateLimit-*` headers. This also applies to requests with an invalid token, and no more than `MAX_CONCURRENT_QUERIES` game server queries run at the same time — extra requests get `429`. Request bodies larger than 64 KB are rejected with `413`.

Example query:
```sh
curl -X POST http://127.0.0.1:3000/api/query \
  -H "Authorization: Bearer your_api_token" \
  -H "Content-Type: application/json" \
  -d '{"type": "counterstrike16", "host": "127.0.0.1", "port": 27015}'
```

Other examples:
- [Using C#](examples/example-csharp.md)

Example JSON Response:
```json
{
  "name": "Counter-Strike 1.6",
  "map": "de_dust2",
  "password": false,
  "raw":
  {
    "protocol": 48,
    "folder": "cstrike",
    "game": "Counter-Strike",
    "appId": 10,
    "numplayers": 1,
    "numbots": 0,
    "listentype": "d",
    "environment": "l",
    "secure": 0,
    "version": "1.1.2.7/Stdio"
  },
  "maxplayers": 16,
  "players":
  [
    {
      "name": "ufame",
      "raw":
      {
        "score": 0,
        "time": 144.923828125
      }
    }
  ],
  "bots": [],
  "connect": "127.0.0.1:27015",
  "ping": 0
}