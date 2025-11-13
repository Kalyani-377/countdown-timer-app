//Getting the buttons from HTML and assigning to a variable 
const countdownEl = document.getElementById("countdown"); 
    const playBtn = document.getElementById("play");
    const pauseBtn = document.getElementById("pause");
    const resetBtn = document.getElementById("reset");
    const inputDate = document.getElementById("custom-datetime");
    const setDateBtn = document.getElementById("set-date");
//Inital time , starting time
    let time = 0, startingTime = 0, intervalId = null, isPaused = true;

    //update countdown every second
    function updateCountdown() {
      if (!isPaused && time > 0) {
        time--;   // decrease time by 1 second
        updateDisplay(); // update the display   
      } else if (!isPaused && time <= 0) {
        clearInterval(intervalId); //Stop timer
        countdownEl.textContent = "Time's Up!"; //show Message
      }
    }
// Show time in days, hours, minutes, seconds
    function updateDisplay() {
      const days = Math.floor(time / 86400);
      const hours = Math.floor((time % 86400) / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
      countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
//start the timer
    function startTimer() {
      if (!intervalId) intervalId = setInterval(updateCountdown, 1000);
      isPaused = false;
    }
//pause the timer
    function pauseTimer() {
       isPaused = true; 
      }

// Reset timer to starting value
    function resetTimer() {
      isPaused = true;
      clearInterval(intervalId);
      intervalId = null;
      time = startingTime;
      updateDisplay();
    }
//Set custom target date and start countdown
    function setDate() {
      const target = new Date(inputDate.value);
      if (!isNaN(target.getTime())) {
        const diff = Math.floor((target - new Date()) / 1000);// time left in seconds
        if (diff > 0) {
          time = diff;
          startingTime = diff;
          resetTimer();
          startTimer(); // auto start after setting
        }
      }
    }
//Add event listeners to buttons
    playBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);
    setDateBtn.addEventListener("click", setDate);
// show initial display
    updateDisplay();
 