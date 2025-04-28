let timer;
let timeRemaining = 33 * 60 + 20; // seconds
let lapCount = 0;

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
  timerDisplay.textContent = \`\${minutes}:\${seconds.toString().padStart(2, '0')}\`;
}

function countdown() {
  if (timeRemaining > 0) {
    timeRemaining--;
    updateTimer();
  } else {
    clearInterval(timer);
    summaryDisplay.innerHTML = \`<strong>Race Finished!</strong><br>You ran <strong>\${lapCount}</strong> laps (~\${(lapCount * 0.4).toFixed(2)} km)\`;
  }
}

startButton.addEventListener('click', () => {
  if (timer) return;
  timer = setInterval(countdown, 1000);
});

addLapButton.addEventListener('click', () => {
  lapCount++;
  lapDisplay.textContent = lapCount;
});

subtractLapButton.addEventListener('click', () => {
  if (lapCount > 0) lapCount--;
  lapDisplay.textContent = lapCount;
});

resetLapButton.addEventListener('click', () => {
  lapCount = 0;
  lapDisplay.textContent = lapCount;
});

updateTimer();
lapDisplay.textContent = lapCount;