let timer;
let timeRemaining = 33 * 60 + 20; // seconds
let lapCount = 0;
let laps = []; // Store lap timestamps

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const addLapButton = document.getElementById('addLap');
const subtractLapButton = document.getElementById('subtractLap');
const resetLapButton = document.getElementById('resetLap');
const lapDisplay = document.getElementById('lapCount');
const summaryDisplay = document.getElementById('summary');

function updateTimer() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timerDisplay.textContent = minutes + ':' + seconds.toString().padStart(2, '0');
}

function countdown() {
  if (timeRemaining > 0) {
    timeRemaining--;
    updateTimer();
  } else {
    clearInterval(timer);
    summaryDisplay.innerHTML += '<br><strong>Race Finished!</strong>';
  }
}

function recordLap() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const lapTime = minutes + ':' + seconds.toString().padStart(2, '0');
  laps.push('Lap ' + lapCount + ' - ' + lapTime);
  updateLapLog();
}

function updateLapLog() {
  summaryDisplay.innerHTML = laps.join('<br>');
}

startButton.addEventListener('click', function() {
  if (timer) return;
  timer = setInterval(countdown, 1000);
});

addLapButton.addEventListener('click', function() {
  lapCount++;
  lapDisplay.textContent = lapCount;
  recordLap();
});

subtractLapButton.addEventListener('click', function() {
  if (lapCount > 0) {
    lapCount--;
    lapDisplay.textContent = lapCount;
    laps.pop(); // Remove last recorded lap
    updateLapLog();
  }
});

resetLapButton.addEventListener('click', function() {
  lapCount = 0;
  laps = [];
  lapDisplay.textContent = lapCount;
  updateLapLog();
});

updateTimer();
lapDisplay.textContent = lapCount;
