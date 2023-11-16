import * as Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const firstDelay = parseInt(formData.get('delay'));
      const step = parseInt(formData.get('step'));
      const amount = parseInt(formData.get('amount'));

      for (let i = 1; i <= amount; i++) {
        const position = i;
        const delay = firstDelay + (position - 1) * step;

        createPromise(position, delay)
          .then(({ position, delay }) => {
            Notiflix.Notify.Success(
              `✅ Fulfilled promise ${position} in ${delay}ms`
            );
          })
          .catch(({ position, delay }) => {
            Notiflix.Notify.Failure(
              `❌ Rejected promise ${position} in ${delay}ms`
            );
          });
      }
    });

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
  }
});
