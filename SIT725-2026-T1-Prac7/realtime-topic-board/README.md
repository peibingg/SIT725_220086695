# SIT725 Prac 7 — Real-time topic board

Express application with **Socket.IO** for live updates. It follows the Workshop 7 pattern (`http.createServer(app)` + Socket.IO on the same HTTP server + static files under `public/`), but implements a **different use case** than the workshop demo: collaborative voting on sprint-focus topics, an activity feed, display names, rotating tips, and server-side validation.

## Prerequisites

- **Node.js** 18 or newer  
- **npm** (bundled with Node)

## Install and run

```bash
cd realtime-topic-board
npm install
npm start
```

Then open the URL printed in the terminal (defaults to **http://localhost:3000**).

If `3000` is busy and you did **not** set `PORT`, the server automatically tries **3001**, **3002**, … up to **3099** and logs which port it chose.

To force a specific port (recommended if another tool already uses 3000):

```bash
PORT=3107 npm start
```

## Project layout

| Path | Role |
|------|------|
| `server.js` | Express app, HTTP server, Socket.IO server, in-memory vote state |
| `public/index.html` | Page shell; loads `/socket.io/socket.io.js` before client code |
| `public/board.js` | Browser Socket.IO client: listeners and UI updates |
| `public/styles.css` | Layout and styling |

## Socket events (overview)

- **`board:state`** — Server → clients: topic labels, vote counts, connected client count.  
- **`topic:vote`** — Client → server: `{ topicId }` to add a vote (allow-listed IDs, short cooldown).  
- **`feed:line`** — Server → clients: short activity line when someone votes.  
- **`tip:broadcast`** — Server → clients: rotating engineering tips on an interval.  
- **`profile:name`** / **`profile:ack`** — Client sets a display name; server acknowledges.  
- **`vote:reject`** — Server → client: vote ignored (unknown topic or throttled).

## Submission note

This is an **original variation**: different events, payloads, UI, and behaviour from the workshop’s single-event random-number example. Use this README and the code comments when documenting your submission if required.
