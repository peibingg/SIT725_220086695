/* global io */

const topicList = document.getElementById('topicList');
const connStatus = document.getElementById('connStatus');
const voteHint = document.getElementById('voteHint');
const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const nameAck = document.getElementById('nameAck');
const tipBox = document.getElementById('tipBox');
const feed = document.getElementById('feed');

const socket = io();

function setConnected(ok) {
  connStatus.textContent = ok ? 'Live socket' : 'Reconnecting…';
  connStatus.className = `status ${ok ? 'ok' : 'warn'}`;
}

socket.on('connect', () => setConnected(true));
socket.on('disconnect', () => setConnected(false));

socket.on('board:state', (payload) => {
  topicList.innerHTML = '';
  (payload.topics || []).forEach((t) => {
    const li = document.createElement('li');
    li.className = 'topic-row';
    li.innerHTML = `
      <div>
        <span>${escapeHtml(t.label)}</span>
        <small>${escapeHtml(t.id)}</small>
      </div>
      <span class="count" aria-label="votes">${t.votes}</span>
      <button type="button" data-topic="${escapeAttr(t.id)}">Vote +1</button>
    `;
    topicList.appendChild(li);
  });

  topicList.querySelectorAll('button[data-topic]').forEach((btn) => {
    btn.addEventListener('click', () => {
      voteHint.hidden = true;
      socket.emit('topic:vote', { topicId: btn.getAttribute('data-topic') });
    });
  });

  const n = typeof payload.connected === 'number' ? payload.connected : 0;
  document.title = `Sprint focus (${n} online)`;
});

socket.on('vote:reject', (msg) => {
  voteHint.textContent = msg && msg.reason ? msg.reason : 'Vote not applied';
  voteHint.hidden = false;
});

socket.on('profile:ack', (msg) => {
  nameAck.textContent = msg && msg.name ? `Showing as “${msg.name}”.` : '';
});

socket.on('tip:broadcast', (msg) => {
  if (msg && msg.text) tipBox.textContent = msg.text;
});

socket.on('feed:line', (msg) => {
  if (!msg || !msg.text) return;
  const li = document.createElement('li');
  li.textContent = msg.text;
  feed.prepend(li);
  while (feed.children.length > 40) feed.removeChild(feed.lastChild);
});

nameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('profile:name', { name: nameInput.value });
});

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/'/g, '&#39;');
}
