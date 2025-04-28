let timer;
let timeRemaining = 33 * 60 + 20; // seconds
let lapCount = 0;
let laps = [];

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const addLapButton = document.getElementById('addLap');
const subtractLapButton = document.getElementById('subtractLap');
const lapDisplay = document.getElementById('lapCount');
const summaryDisplay = document.getElementById('summary');

// Setup audio
const airhorn = new Audio('airhorn.mp3');

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
    finishRace();
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

function finishRace() {
  summaryDisplay.innerHTML += '<br><strong>Race Finished!</strong>';
  launchConfetti();
  airhorn.play();
}

function launchConfetti() {
  // Tiny confetti effect using basic emojis
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    // Create a confetti emoji element
    const emoji = document.createElement('div');
    emoji.textContent = '🎉';
    emoji.style.position = 'fixed';
    emoji.style.top = Math.random() * 100 + 'vh';
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.fontSize = '2rem';
    emoji.style.opacity = '0.8';
    document.body.appendChild(emoji);

    // Remove after 1 sec
    setTimeout(() => {
      emoji.remove();
    }, 1000);

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
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

updateTimer();
lapDisplay.textContent = lapCount;
