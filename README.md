# Express Checkpoint

A three-page website for Maverick Studio, built with Express and plain HTML/CSS.

## Run

Install Node.js 20 or newer. In the VS Code terminal, inside this project folder:

```bash
npm install
npm start
```

Open http://localhost:3000. Stop the server with Ctrl+C.

## Pages

- `/` — Home
- `/services` — Our Services
- `/contact` — Contact us

Every page includes navigation links. The sample contact email uses example.com and is a placeholder.

## Working-hours middleware

`middleware/working-hours.js` checks the time of every page request. Pages are available Monday–Friday from 09:00 inclusive until 17:00 exclusive, in the `Africa/Lagos` time zone (West Africa Time). Outside that window, the server responds with HTTP 503 and a styled closed-hours page. CSS remains accessible to style that message. The time zone is explicit so deployment in another country does not change the opening hours.

## Checks

```bash
npm test
```

Tests cover opening and closing boundaries, weekends, all three pages and their navigation, the 404 response, closed-hours responses, and stylesheet availability. Tests use a controlled clock; the running website always uses the actual time.
