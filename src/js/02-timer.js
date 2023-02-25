import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtnEl: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  inputDateEl: document.querySelector('#datetime-picker'),

  onStartBtnElDisabled(boolean) {
    this.startBtnEl.disabled = boolean;
  },
  onInputDateElDisabled(boolean) {
    this.inputDateEl.disabled = boolean;
  },
};

let selectedDateMs = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  position: 'below center',
  onClose(selectedDates) {
    const selectedDate = new Date(selectedDates[0]);
    selectedDateMs = selectedDate.getTime();
    if (selectedDateMs <= Date.now()) {
      refs.onStartBtnElDisabled(true);
      Notify.failure('Please choose a date in the future');
    } else refs.onStartBtnElDisabled(false);
  },
};

flatpickr('#datetime-picker', options);

Notify.init({
  width: '400px',
  position: 'right-top',
  distance: '20px',
  rtl: true,
  timeout: 2000,
  backOverlay: true,
  backOverlayColor: 'rgba(0,0,0,0.1)',
  clickToClose: true,
  fontSize: '20px',
  cssAnimationStyle: 'zoom',
});

refs.onStartBtnElDisabled(true);
refs.startBtnEl.addEventListener('click', onBtnClick);

function onBtnClick() {
  refs.onStartBtnElDisabled(true);
  refs.onInputDateElDisabled(true);

  const timerInterval = setInterval(() => {
    const deltaTime = selectedDateMs - Date.now();
    if (deltaTime >= 0) updateClockface(convertMs(deltaTime));
    else {
      clearInterval(timerInterval);
      refs.secondsEl.textContent = '00';
      refs.onInputDateElDisabled(false);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = `${days}`;
  refs.hoursEl.textContent = `${hours}`;
  refs.minutesEl.textContent = `${minutes}`;
  refs.secondsEl.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
