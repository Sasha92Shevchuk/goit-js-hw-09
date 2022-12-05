import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputRef = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');

const todayDate = new Date();
let startTime = null;

const daysRef = document.querySelector('.field [data-days]');
const hoursRef = document.querySelector('.field [data-hours]');
const minutesRef = document.querySelector('.field [data-minutes]');
const secondsRef = document.querySelector('.field [data-seconds]');

class Timer {
  constructor({ onTick }) {
    this.isActive = false;
    this.onTick = onTick;
  }
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      if (deltaTime <= 0) {
        clearInterval(this.intervalId);
        return;
      }
      const time = this.convertMs(deltaTime);
      console.log(time);
      //   updateTime(time); - це є теж саме, що onTick
      this.onTick(time);
    }, 1000);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const diff = selectedDates[0] - todayDate;

    if (diff < 0) {
      Notify.failure('Please choose a date in the future');
      //   window.alert('Please choose a date in the future');
    }
    startTime = selectedDates[0];
  },
};

const timer = new Timer({
  onTick: updateTime,
});

btnStart.addEventListener('click', timer.start.bind(timer));

function updateTime({ days, hours, minutes, seconds }) {
  daysRef.textContent = days;
  hoursRef.textContent = hours;
  minutesRef.textContent = minutes;
  secondsRef.textContent = seconds;
}

flatpickr(inputRef, options);

// Початкова версія

// const inputRef = document.querySelector('#datetime-picker');
// const btnStart = document.querySelector('button[data-start]');

// const todayDate = new Date();
// let startTime = null;

// const daysRef = document.querySelector('.field [data-days]');
// const hoursRef = document.querySelector('.field [data-hours]');
// const minutesRef = document.querySelector('.field [data-minutes]');
// const secondsRef = document.querySelector('.field [data-seconds]');

// btnStart.addEventListener('click', () => {
//   timer.start();
// });

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//     const diff = selectedDates[0] - todayDate;

//     if (diff < 0) {
//       window.alert('Please choose a date in the future');
//     }
//     startTime = selectedDates[0];
//   },
// };

// const timer = {
//   isActive: false,
//   start() {
//     if (this.isActive) {
//       return;
//     }

//     this.isActive = true;
//     const intervalId = setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = startTime - currentTime;
//       if (deltaTime <= 0) {
//         clearInterval(intervalId);
//         return;
//       }
//       const time = convertMs(deltaTime);
//       console.log(time);
//       updateTime(time);
//     }, 1000);
//   },
// };

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = addLeadingZero(Math.floor(ms / day));
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   const seconds = addLeadingZero(
//     Math.floor((((ms % day) % hour) % minute) / second)
//   );

//   return { days, hours, minutes, seconds };
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// function updateTime({ days, hours, minutes, seconds }) {
//   daysRef.textContent = days;
//   hoursRef.textContent = hours;
//   minutesRef.textContent = minutes;
//   secondsRef.textContent = seconds;
// }

// flatpickr(inputRef, options);
