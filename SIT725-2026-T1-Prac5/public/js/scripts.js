'use strict';

const bookList = document.getElementById('book-list');
const errorMsg = document.getElementById('error-msg');
const modalOverlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

const renderBooks = (books) => {
  bookList.innerHTML = '';
  books.forEach((book) => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View details for ${book.title}`);
    card.innerHTML = `
      <div class="book-card-info">
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
      </div>
      <div class="book-card-meta">
        <span class="book-year">${book.year}</span>
        <span class="book-genre">${book.genre}</span>
      </div>
    `;
    card.addEventListener('click', () => openModal(book));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openModal(book);
    });
    bookList.appendChild(card);
  });
};

const openModal = (book) => {
  modalContent.innerHTML = `
    <div class="modal-title">${book.title}</div>
    <div class="modal-author">by ${book.author}</div>
    <div class="modal-badges">
      <span class="badge">${book.genre}</span>
      <span class="badge">${book.year}</span>
    </div>
    <p class="modal-summary">${book.summary}</p>
  `;
  modalOverlay.classList.remove('hidden');
};

const closeModal = () => {
  modalOverlay.classList.add('hidden');
};

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

const loadBooks = async () => {
  try {
    const res = await fetch('/api/books');
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to load books');
    renderBooks(json.data);
  } catch (err) {
    errorMsg.textContent = `Error: ${err.message}`;
    errorMsg.classList.remove('hidden');
  }
};

document.addEventListener('DOMContentLoaded', loadBooks);
