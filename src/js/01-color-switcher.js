const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
let intervalId = null;

refs.stopBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

function onStartClick() {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStopClick() {
  clearInterval(intervalId);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}
