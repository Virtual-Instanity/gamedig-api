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

## Environment Variables

You can configure the environment variables in two ways:
1. Copy `.env.example.` to `.env`: 
    ```sh
    cp .env.example .env
    ```
2. Set the required variables directly in your system's environment.


### Required variables 

- `API_TOKEN`: Secret token for authenticating API requests.
- `APP_PORT`: The port on which the API will run.

## API

### 1. **POST `/api/query`**

- **Bearer Token**: a required in header for API authentication.
- **Content-Type**: the request must have the type `application/json`.

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