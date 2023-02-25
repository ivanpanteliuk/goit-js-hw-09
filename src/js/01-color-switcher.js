const refs = {
  startBtnEl: document.querySelector('[data-start]'),
  stopBtnEl: document.querySelector('[data-stop]'),
  onStartBtnElDisabled(boolean) {
    this.startBtnEl.disabled = boolean;
  },
  onStoptBtnElDisabled(boolean) {
    this.stopBtnEl.disabled = boolean;
  },
};
let intervalId = null;

refs.onStoptBtnElDisabled(true);
refs.startBtnEl.addEventListener('click', onStartClick);
refs.stopBtnEl.addEventListener('click', onStopClick);

function onStartClick() {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.onStartBtnElDisabled(true);
  refs.onStoptBtnElDisabled(false);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStopClick() {
  clearInterval(intervalId);
  refs.onStartBtnElDisabled(false);
  refs.onStoptBtnElDisabled(true);
}
