let startTime;
let elapsedTime = 0;
let timerInterval;

const display = document.querySelector('.clock');
const lapsContainer = document.querySelector('.laps');

function printTime() {
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = elapsedTime % 1000;
    display.textContent = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds, 3)}`;
}

function padTime(value, digits = 2) {
    return value.toString().padStart(digits, '0');
}

function startTimer() {
    if (!startTime) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            printTime();
        }, 10);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    startTime = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    startTime = null;
    elapsedTime = 0;
    printTime();
    lapsContainer.innerHTML = '';
}

function lapTime() {
    const lapTime = elapsedTime;
    const listItem = document.createElement('li');
    listItem.textContent = display.textContent;
    lapsContainer.appendChild(listItem);
}

document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('lapBtn').addEventListener('click', lapTime);