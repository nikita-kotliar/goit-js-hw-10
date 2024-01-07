import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        messageColor: '#FAFAFB',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#EF4040',
        position: 'topRight',
        closeOnEscape: true,
        timeout: 5000,
      });
    } else {
      button.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const input = document.querySelector('#datetime-picker');
const datePickr = flatpickr(input, options);
const button = document.querySelector('[data-start]');
button.disabled = true;

const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

// input.addEventListener('focus', () => {
//   datePickr.config.defaultDate = new Date();
// });

let intervalId;

button.addEventListener('click', () => {
  input.classList.add('not-clickable');
  button.disabled = true;
  clearInterval(intervalId);
  const nowDate = new Date().getTime();
  const userDate = userSelectedDate.getTime();
  let interval = userDate - nowDate;

  intervalId = setInterval(() => {
    if (interval > 0) {
      const convertedTime = convertMs(interval);
      interval = interval - 1000;

      daysTimer.textContent = addLeadingZero(convertedTime.days);
      hoursTimer.textContent = addLeadingZero(convertedTime.hours);
      minutesTimer.textContent = addLeadingZero(convertedTime.minutes);
      secondsTimer.textContent = addLeadingZero(convertedTime.seconds);
    } else {
      clearInterval(intervalId);
      input.classList.remove('not-clickable');
    }
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
