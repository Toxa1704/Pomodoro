const minutes = document.querySelector('.minutes > input[type="text"]');
const seconds = document.querySelector('.seconds > input[type="text"]');
const startBtn = document.querySelector(".start-btn");
const setting = document.getElementById('settings');
const ring = document.querySelector(".ring");
const svgFill = document.querySelector(".ring > svg");
const pomodoro = document.querySelector('.pomodoro');
const shortBreak = document.querySelector('.short-break');
const longBreak = document.querySelector('.long-break');
const pomodoroSetting = document.getElementById('pomodoro-setting')
const shortBreakSetting = document.getElementById('short-break-setting')
const longBreakSetting = document.getElementById ('long-break-setting')

const switchColorRed = () => {
  svgFill.style.fill = "#161932"
  ring.style.stroke = "#f87070" 
}

const switchColorGreen = () => {
  svgFill.style.fill = "#161932"
  ring.style.stroke = "#70f3f8" 
}

const switchColorViolent = () => {
  svgFill.style.fill = "#161932"
  ring.style.stroke = "#d881f8" 
}

let switchBackground = ""


pomodoro.addEventListener('click', () => {
  minutes.value = pomodoroSetting.value
  pomodoro.style.background = "#F87070" 
  shortBreak.style.background = "transparent" 
  longBreak.style.background = "transparent" 
  pomodoro.style.color = "rgba(215, 224, 255, 1)"
  switchColorRed();  
});

shortBreak.addEventListener('click', () => {
  minutes.value = padNumber(Number(shortBreakSetting.value))
  shortBreak.style.background = "#70f3f8"
  longBreak.style.background = "transparent" 
  pomodoro.style.background = "transparent"
  shortBreak.style.color = "rgba(215, 224, 255, 1)"
  switchColorGreen();
});

longBreak.addEventListener('click', () => {
  minutes.value = longBreakSetting.value
  longBreak.style.background = "#d881f8" 
  shortBreak.style.background = "transparent" 
  pomodoro.style.background = "transparent"
  longBreak.style.color = "rgba(215, 224, 255, 1)"
  switchColorViolent();
})

let startTime = 0;
let timer = null;
let running = false;
let totalSeconds;
let rest = false


startBtn.addEventListener("click", () => {
  if (running&&rest) {
    restartTimer();
  } else if (!running&&!rest) {
    startTimer();
  }else{pauseTimer();}
});

const startTimer = () => {
  running = true;
  startBtn.innerText = "Pause";
  startTime = Date.now();
  const secondsValue = parseInt(seconds.value);
  const minutesValue = parseInt(minutes.value);
  totalSeconds = secondsValue + minutesValue * 60;

  timer = setInterval(() => {
    const currentTime = Date.now();
    const diff = currentTime - startTime;
    const secondsLeft = totalSeconds - Math.floor(diff / 1000);
    const minutesLeft = Math.floor(secondsLeft / 60);
    console.log(diff, minutesLeft, secondsLeft);
    minutes.value = padNumber(minutesLeft);
    seconds.value = padNumber(secondsLeft % 60);
    if (secondsLeft === 0 && minutesLeft === 0) {
      finishTimer();
    }
  }, 1000);
};
const padNumber = (numbertime) => {
  if (numbertime < 10) {
    return "0" + numbertime;
  }
  return numbertime;
};
const pauseTimer = () => {
  running = false;
  startBtn.innerText = "Start";
  clearInterval(timer);
};

const finishTimer = () => {
  clearInterval(timer);
  svgFill.style.fill = "#F87070";
  startBtn.style.color = "#d7e0ff";
  startBtn.innerText = "Restart";
  if(switchColor === "red"){
    svgFill.style.fill = "#f87070";
  }else if(switchColor === "green"){
    svgFill.style.fill = "#70f3f8";
  } else {
    svgFill.style.fill = "#d881f8";
  }

  rest = true 
};

const restartTimer = () => {
    running = false;
    minutes.value = "15";
    seconds.value = "00";
    startBtn.innerText = "Start";
    rest = false
    svgFill.style.fill = "#161932"

};
document.querySelector('.setting').addEventListener('click', ()=> {
  setting.style.display = "block"
})
document.querySelector('.close').addEventListener('click', () => {
  setting.style.display = "none"
})

const settingPomodoro = pomodoroSetting.addEventListener('blur', () => {
  if(pomodoroSetting.value < 0){
    pomodoroSetting.value = 25
  }
  minutes.value = padNumber(Number(pomodoroSetting.value));
})
const settingShortBreak = shortBreakSetting.addEventListener('blur', () => {
  if (shortBreakSetting.value < 0) {
    shortBreakSetting.value = 5
  }
  minutes.value = padNumber(Number(shortBreakSetting.value));
})
const settingLongBreak = longBreakSetting.addEventListener('blur', () => {
  if (longBreakSetting.value < 0) {
    longBreakSetting.value = 15
  }
  minutes.value = padNumber(Number(longBreakSetting.value));
})


const settingColorChoice = document.querySelector('.setting-color-choice')
settingColorChoice.addEventListener('click', () => {
  const selectRadioColor = document.querySelector('input[name="color"]:checked')
  console.log(selectRadioColor.value);
    if (selectRadioColor.value == "red") {
      document.querySelector('.color-red').style.opacity = "1"
      document.querySelector('.color-red').style.zIndex = "1"
      document.querySelector('.color-green').style.opacity = "0"
      document.querySelector('.color-green').style.zIndex = "-1"
      document.querySelector('.color-violet').style.opacity = "0"
      document.querySelector('.color-violet').style.zIndex = "-1"
    } else if(selectRadioColor.value == "green"){
      document.querySelector('.color-red').style.opacity = "0"
      document.querySelector('.color-red').style.zIndex = "-1"
      document.querySelector('.color-green').style.opacity = "1"
      document.querySelector('.color-green').style.zIndex = "1"
      document.querySelector('.color-violet').style.opacity = "0"
      document.querySelector('.color-violet').style.zIndex = "-1"
    }else if(selectRadioColor.value == "violet"){
      document.querySelector('.color-red').style.opacity = "0"
      document.querySelector('.color-red').style.zIndex = "-1"
      document.querySelector('.color-green').style.opacity = "0"
      document.querySelector('.color-green').style.zIndex = "-1"
      document.querySelector('.color-violet').style.opacity = "1"
      document.querySelector('.color-violet').style.zIndex = "1"
    };
})


document.querySelector('.apply').addEventListener('click', () => {
  const selectRadioColor = document.querySelector('input[name="color"]:checked')
    if (selectRadioColor.value == "red") {
      switchColorRed();
    } else if(selectRadioColor.value == "green"){
      switchColorGreen();
    }else if(selectRadioColor.value == "violet"){
      switchColorViolent();
    };
    const selectRadioFont = document.querySelector('input[name="font"]:checked')
    document.querySelector('.body').style.fontFamily = 'Roboto Slab'

    if (selectRadioFont.value == "kumb-font") {
      document.querySelector('.body').style.fontFamily = 'Kumbh Sans'
    } else if(selectRadioFont.value == "Roboto Slab"){
      document.querySelector('.body').style.fontFamily = 'Roboto Slab'
    } else if(selectRadioFont.value == "space-font"){
      document.querySelector('.body').style.fontFamily = 'Space Mono'
    }
    setting.style.display = "none"
})