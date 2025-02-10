let timeLeft;
let workTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let isWorkTime = true;
let timerId = null;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');

console.log('Elements found:', {
    minutesDisplay,
    secondsDisplay,
    startButton,
    pauseButton,
    resetButton,
    modeText
});

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? workTime : breakTime;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    updateDisplay();
}

function startTimer() {
    console.log('Start button clicked');
    console.log('Current timerId:', timerId);
    console.log('Current timeLeft:', timeLeft);
    
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = workTime;
        }
        timerId = setInterval(() => {
            console.log('Timer tick, timeLeft:', timeLeft);
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            }
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                switchMode();
                startTimer();
            }
        }, 1000);
        console.log('Timer started, new timerId:', timerId);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = workTime;
    modeText.textContent = 'Work Time';
    updateDisplay();
    
    // Only add flash effect if this isn't the initial page load
    if (document.readyState === 'complete') {
        document.body.classList.add('psychedelic-flash');
        setTimeout(() => {
            document.body.classList.remove('psychedelic-flash');
        }, 1000);
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize display
resetTimer(); 