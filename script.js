const timePlus = document.querySelector("#time-plus");
const timeMinus = document.querySelector("#time-minus");
let timeSet = document.querySelector("#time-set");
let timeSetInt = parseInt(timeSet.innerText, 10)

const breakPlus = document.querySelector("#break-plus");
const breakMinus = document.querySelector("#break-minus");
let breakSet = document.querySelector("#break-set");
let breakSetInt = parseInt(breakSet.innerText, 10)

const timeCounter = document.querySelector("#time-counter");
let message = document.querySelector("#message");

let currentTimer;
let isPlay;
let isPause;
let isBreakTime;
let workInterval;

const playBtn = document.querySelector("#play");
const pauseBtn = document.querySelector("#pause")
const stopBtn = document.querySelector("#stop");

const startBell = document.querySelector("#startBell");
const pauseBell = document.querySelector("#pauseBell")


playBtn.addEventListener("click", () => {
    playBtn.disabled = true;
    let timerMinutes = parseInt(timeSetInt * 60);
    isPlay = true;
    WorkTimer(timerMinutes);
})


function WorkTimer(timerMinutes) {
    startBell.play();
    message.innerText = "Time to work!";
    let timer = timerMinutes;
    workInterval = setInterval( () => {
        if(isPause){
            timer = currentTimer;
            isPause = false;
        }  
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timeCounter.textContent = minutes + ":" + seconds;
    --timer;
    currentTimer = timer;
        if(currentTimer == 0){
            clearInterval(workInterval);
            let breakMinutes = parseInt(breakSetInt * 60);
            isBreakTime = true;
            breakTimer(breakMinutes);
        }
    return workInterval, timer;
    }, 1000);
}


function breakTimer(breakMinutes) {
    pauseBell.play();
    message.innerText = "Take a break!"
        if(isBreakTime){
            playBtn.disabled = true;
            pauseBtn.disabled = true;
        }  
    let timer = breakMinutes;
    breakInterval = setInterval( () => {
        if(isPause){
            timer = currentTimer;
            isPause = false;
        }
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timeCounter.textContent = minutes + ":" + seconds;
    timeTitle = timeCounter.textContent;
    --timer;
    currentTimer = timer;
        if(currentTimer == 0){
            clearInterval(breakInterval);
            message.innerText = "";
            playBtn.disabled = false;
            pauseBtn.disabled = false;
            if(timeSetInt < 10){
                timeCounter.innerText = "0" + timeSetInt + ":00"
            } else {
                timeCounter.innerText = timeSetInt + ":00";
            }  
        }
    return breakInterval, timer;
}, 1000);

}


pauseBtn.addEventListener("click", () => {
    isPause = true;
    isPlay = false;
    playBtn.disabled = false;
})

stopBtn.addEventListener("click", () => {
    playBtn.disabled = false;
    pauseBtn.disabled = false;
        if(timeSetInt < 10){
            timeCounter.innerText = "0" + timeSetInt + ":00"
        } else {
            timeCounter.innerText = timeSetInt + ":00";
        }   
    message.innerText = "";
    clearInterval(workInterval)
    clearInterval(breakInterval);
})

timePlus.addEventListener("click", () => {
    timeSetInt += 1;
        if(timeSetInt > 1){timeMinus.disabled = false;}
    timeSet.innerText = timeSetInt;
    if(timeSetInt < 10){
        timeCounter.innerText = "0" + timeSetInt + ":00"
    } else {
        timeCounter.innerText = timeSetInt + ":00";
    }  
})

timeMinus.addEventListener("click", () => {
    timeSetInt -= 1;
    if(timeSetInt == 1){timeMinus.disabled = true;} 
    timeSet.innerText = timeSetInt;

    if(timeSetInt < 10){
        timeCounter.innerText = "0" + timeSetInt + ":00"
    } else {
        timeCounter.innerText = timeSetInt + ":00";
    }   

})

breakPlus.addEventListener("click", () => {
    breakSetInt += 1;
        if(breakSetInt > 0){breakMinus.disabled = false;}
    breakSet.innerText = breakSetInt;
})

breakMinus.addEventListener("click", () => {
    breakSetInt -= 1;
        if(breakSetInt == 1){breakMinus.disabled = true;}
    breakSet.innerText = breakSetInt;
})