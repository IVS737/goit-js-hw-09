import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date(selectedDates[0]) <= new Date()) {
      startButton.disabled = true;

      return Notiflix.Notify.failure('Please choose a date in the future');
    }

    startButton.disabled = false;
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
flatpickr('#datetime-picker', options);

const addLeadingZero = value => value.toString().padStart(2, '0');

const updateDateText = () => {
  const timeInMilliseconds = new Date(input.value).getTime();

  const convertedDate = convertMs(timeInMilliseconds - Date.now());

  spanDays.textContent = addLeadingZero(convertedDate.days);
  spanHours.textContent = addLeadingZero(convertedDate.hours);
  spanMinutes.textContent = addLeadingZero(convertedDate.minutes);
  spanSeconds.textContent = addLeadingZero(convertedDate.seconds);
};

let intervalId;

startButton.addEventListener('click', evt => {
  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(updateDateText, 1000);
});
