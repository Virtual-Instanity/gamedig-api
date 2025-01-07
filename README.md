# GameDig API

To install dependencies:
```sh
bun install
```

To run:
```sh
bun run start
```

To dev run:
```sh
bun run dev
```

## API

### 1. **POST `/api/query`**

- **Bearer Token**: a required in header for API authentication.
- **Content-Type**: the request must have the type `application/json`.

Example query:
```json
{
  "type": "counterstrike16",
  "host": "46.174.50.62",
  "port": 27015,
  "requestPlayers": false,
  "requestRulesRequired": true
}```