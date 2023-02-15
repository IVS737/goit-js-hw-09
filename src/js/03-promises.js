import Notiflix from 'notiflix';

const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const response = { position, delay };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldResolve ? resolve(response) : reject(response);
    }, delay);
  });
}

const submitForm = e => {
  e.preventDefault();

  let step = parseInt(stepInput.value);
  let delay = parseInt(delayInput.value);
  const amount = parseInt(amountInput.value);

  for (let i = 0; i < amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += step;
  }
};

form.addEventListener('submit', submitForm);
