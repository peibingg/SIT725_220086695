'use strict';

// ── Render helpers ────────────────────────────────────────────────────────────

const addBooks = (items) => {
  const section = document.getElementById('book-section');
  section.innerHTML = '';
  items.forEach(item => {
    const col = document.createElement('div');
    col.className = 'col s12 m6 l4';
    col.innerHTML = `
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="${item.image}" alt="${item.title}">
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">
            ${item.title}<i class="material-icons right">more_vert</i>
          </span>
          <p><a href="#">${item.link}</a></p>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">
            ${item.title}<i class="material-icons right">close</i>
          </span>
          <p class="card-text">${item.description}</p>
        </div>
      </div>`;
    section.appendChild(col);
  });
};

// ── API calls ─────────────────────────────────────────────────────────────────

const getBooks = () => {
  fetch('/api/books')
    .then(res => res.json())
    .then(response => {
      if (response.statusCode === 200) {
        addBooks(response.data);
      }
    })
    .catch(err => console.error('Error fetching books:', err));
};

const submitForm = () => {
  const title       = document.getElementById('book-title').value.trim();
  const image       = document.getElementById('book-image').value.trim();
  const link        = document.getElementById('book-link').value.trim();
  const description = document.getElementById('book-description').value.trim();

  if (!title || !image || !link || !description) {
    M.toast({ html: 'Please fill in all fields.' });
    return;
  }

  fetch('/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, image, link, description }),
  })
    .then(res => res.json())
    .then(response => {
      if (response.statusCode === 201) {
        M.toast({ html: 'Book added!' });
        getBooks();
      } else {
        M.toast({ html: `Error: ${response.message}` });
      }
    })
    .catch(err => console.error('Error saving book:', err));
};

// ── Init ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.materialboxed').forEach(el => M.Materialbox.init(el));
  document.querySelectorAll('.modal').forEach(el => M.Modal.init(el));

  document.getElementById('formSubmit').addEventListener('click', submitForm);

  getBooks();
});
