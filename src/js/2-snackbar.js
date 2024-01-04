import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const numberInput = document.querySelector('input[type="number"]');
  const numberValue = numberInput.value;

  const radioInputs = document.querySelectorAll('input[type="radio"]');
  let selectedRadioValue;
  for (const radioInput of radioInputs) {
    if (radioInput.checked) {
      selectedRadioValue = radioInput.value;
      radioInput.checked = false;
    }
  }

  const newPromise = new Promise((resolve, reject) => {
    if (selectedRadioValue === 'fulfilled') {
      setTimeout(() => {
        resolve(`Fulfilled promise in ${numberValue}ms`);
      }, numberValue);
    } else {
      setTimeout(() => {
        reject(`Rejected promise in ${numberValue}ms`);
      }, numberValue);
    }
    numberInput.value = '';
  });
  newPromise
    .then(result => {
      iziToast.show({
        message: `✅ ${result}`,
        color: 'green',
        position: 'topRight',
        close: false,
      });
    })
    .catch(error => {
      iziToast.show({
        message: `❌ ${error}`,
        color: 'red',
        position: 'topRight',
        close: false,
      });
    });
});

// function error(delay) {
//   iziToast.error({
//     title: 'Error',
//     message: `Rejected promise in ${delay}ms`,
//     messageColor: '#FAFAFB',
//     messageSize: '16px',
//     messageLineHeight: '1.5',
//     backgroundColor: '#EF4040',
//     position: 'topRight',
//     closeOnEscape: true,
//     timeout: 5000,
//   });
// }

// function success(delay) {
//   iziToast.error({
//     title: 'Error',
//     message: `Fulfilled promise in ${delay}ms`,
//     messageColor: '#FAFAFB',
//     messageSize: '16px',
//     messageLineHeight: '1.5',
//     backgroundColor: '#59A10D',
//     position: 'topRight',
//     closeOnEscape: true,
//     timeout: 5000,
//   });
// }
