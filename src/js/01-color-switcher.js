const startRef = document.querySelector('[data-start]');
const stopRef = document.querySelector('[data-stop]');
const bodyRef = document.body;

startRef.addEventListener('click', onStartChangeColor);
stopRef.addEventListener('click', onStopChangeColor);

let checkStartRef = true;
let timerId = null;

function onStartChangeColor() {
  if (checkStartRef === false) {
    return;
  }
  checkStartRef = false;

  timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
  console.log('click on start');
}

function onStopChangeColor() {
  clearInterval(timerId);
  checkStartRef = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
