import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

Notify.init({
  width: '400px',
  position: 'right-top',
  distance: '20px',
  rtl: true,
  timeout: 3000,
  clickToClose: true,
  fontSize: '20px',
  cssAnimationStyle: 'zoom',
});

function onFormSubmit(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;
  let currentDelay = Number(delay.value);
  for (let i = 1; i <= Number(amount.value); i += 1) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    currentDelay += Number(step.value);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
