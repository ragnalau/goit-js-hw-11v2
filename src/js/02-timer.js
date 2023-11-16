import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const timerContainer = document.querySelector('.timer');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notiflix.alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

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

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}
function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}
function startTimer(endTime) {
  const updateInterval = 1000;

  const update = () => {
    const currentTime = new Date();
    const timeDifference = endTime - currentTime;

    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      Notiflix.Notify.success('Countdown finished!');
    } else {
      updateTimer(timeDifference);
    }
  };

  const timerInterval = setInterval(update, updateInterval);
  startButton.disabled = true;
}
startButton.addEventListener('click', () => {
  const selectedDate = flatpickr.parseDate(dateTimePicker.value);
  if (selectedDate) {
    startTimer(selectedDate);
  } else {
    Notiflix.Notify.failure('Please select a valid date');
  }
});
