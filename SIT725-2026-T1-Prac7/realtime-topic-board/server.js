const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: { origin: false }
});

app.use(express.static(`${__dirname}/public`));

const TOPIC_IDS = ['testing', 'ux', 'apis', 'realtime', 'a11y'];

const state = {
  votes: Object.fromEntries(TOPIC_IDS.map((id) => [id, 0])),
  labels: {
    testing: 'Test automation',
    ux: 'UX research',
    apis: 'REST design',
    realtime: 'Real-time UX',
    a11y: 'Accessibility'
  },
  tips: [
    'Name Socket.IO events like verbs or domains: topic:vote, not msg.',
    'Throttle client-triggered broadcasts to keep rooms fair under load.',
    'Prefer server authority: validate IDs and scores server-side.',
    'Reconnect flows: replay last board:state after socket.io reconnect.',
    'Horizontal scale needs a shared adapter — single Node is fine for prac.'
  ],
  tipIndex: 0,
  lastVoteAt: new Map()
};

function boardPayload() {
  return {
    topics: TOPIC_IDS.map((id) => ({
      id,
      label: state.labels[id],
      votes: state.votes[id]
    })),
    connected: io.engine.clientsCount
  };
}

function safeNickname(raw) {
  const s = typeof raw === 'string' ? raw.trim() : '';
  if (!s) return 'Guest';
  return s.slice(0, 24).replace(/[<>]/g, '');
}

io.on('connection', (socket) => {
  let nickname = `Guest-${socket.id.slice(-4)}`;

  io.emit('board:state', boardPayload());
  socket.emit('tip:broadcast', { text: state.tips[state.tipIndex] });

  socket.on('profile:name', (payload) => {
    nickname = safeNickname(payload && payload.name);
    socket.emit('profile:ack', { name: nickname });
  });

  socket.on('topic:vote', (payload) => {
    const id = payload && payload.topicId;
    if (!TOPIC_IDS.includes(id)) {
      socket.emit('vote:reject', { reason: 'Unknown topic' });
      return;
    }
    const now = Date.now();
    const last = state.lastVoteAt.get(socket.id) || 0;
    if (now - last < 450) {
      socket.emit('vote:reject', { reason: 'Slow down a little' });
      return;
    }
    state.lastVoteAt.set(socket.id, now);
    state.votes[id] += 1;

    io.emit('board:state', boardPayload());
    io.emit('feed:line', {
      ts: now,
      text: `${nickname} voted for “${state.labels[id]}”`
    });
  });

  socket.on('disconnect', () => {
    state.lastVoteAt.delete(socket.id);
    setImmediate(() => io.emit('board:state', boardPayload()));
  });
});

setInterval(() => {
  state.tipIndex = (state.tipIndex + 1) % state.tips.length;
  io.emit('tip:broadcast', { text: state.tips[state.tipIndex] });
}, 14000);

const envRaw = process.env.PORT;
const fixedPort =
  envRaw != null && String(envRaw).trim() !== ''
    ? Number.parseInt(String(envRaw).trim(), 10)
    : NaN;
const lockPort = Number.isInteger(fixedPort) && fixedPort > 0;

function listenOn(port) {
  httpServer.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      if (lockPort) {
        console.error(
          `Port ${port} is already in use. Free that port or run with another, e.g.:\n  PORT=${port + 1} npm start`
        );
        process.exit(1);
      }
      const next = port + 1;
      if (next > 3099) {
        console.error('Could not find a free port between 3000 and 3099. Set PORT explicitly.');
        process.exit(1);
      }
      console.warn(`Port ${port} is in use, trying ${next}…`);
      listenOn(next);
      return;
    }
    console.error(err);
    process.exit(1);
  });

  httpServer.listen(port, () => {
    const addr = httpServer.address();
    const p = addr && typeof addr === 'object' ? addr.port : port;
    console.log(`Topic board live on http://localhost:${p}`);
  });
}

listenOn(lockPort ? fixedPort : 3000);
