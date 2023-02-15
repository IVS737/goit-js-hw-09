const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let intervalId;

const getRandomHexColor = () =>
  `#${Math.floor(Math.random() * Math.pow(256, 3)).toString(16)}`;

const setBodyBackground = () => (body.style.background = getRandomHexColor());

startButton.addEventListener('click', () => {
  intervalId = setInterval(setBodyBackground, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
});

stopButton.addEventListener('click', () => {
  if (intervalId) clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;
});
