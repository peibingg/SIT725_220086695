'use strict';

const TEXTS = ['Text 1', 'Text 2', 'Text 3', 'Text 4', 'Text 5'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function changeText() {
  const index = getRandomInt(0, TEXTS.length - 1);
  document.getElementById('heading').textContent = TEXTS[index];
}
