const str = `
.skin * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
  
.skin *::before,
.skin *::after {
  box-sizing: border-box;
}
    
.skin {
  position: relative;
  background-color: #ffe600;
  min-height: 50vh;
}

.nose {
  border: 10px solid black;
  border-color: black transparent transparent;
  border-bottom: none;
  width: 0px;
  height: 0px;
  position: absolute;
  left: 50%;
  top: 145px;
  margin-left: -10px;
  z-index: 10;
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }
  33% {
    transform: rotate(5deg);
  }
  66% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-5deg);
  }
}

.nose:hover {
  transform-origin: 50% 100%;
  animation: wave infinite 500ms linear;
}

.nose .circle {
  position: absolute;
  top: -16px;
  left: -10px;
  width: 20px;
  height: 6px;
  border-radius: 6px 6px 0 0;
  background-color: black;
}

.eye {
  border: 2px solid #000;
  width: 64px;
  height: 64px;
  position: absolute;
  left: 50%;
  top: 100px;
  margin-left: -32px;
  background-color: #2e2e2e;
  border-radius: 50%;
}

.eye::before {
  content: "";
  display: block;
  border: 3px solid #000;
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 50%;
  position: relative;
  left: 4px;
  top: 2px;
}

.eye.left {
  transform: translateX(-100px);
}

.eye.right {
  transform: translateX(+100px);
}

.mouth {
  width: 200px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 170px;
  margin-left: -100px;
}

.mouth .up {
  position: relative;
  top: -10px;
}

.mouth .up .lip {
  height: 30px;
  width: 100px;
  border-bottom: 3px solid black;
  position: relative;
  position: absolute;
  z-index: 1;
  background-color: #ffe600;
}

.mouth .up .lip.left {
  border-left: 3px solid black;
  border-bottom-left-radius: 50px;
  transform: rotate(-15deg);
  left: 50%;
  margin-left: -50%;
}

.mouth .up .lip.right {
  border-right: 3px solid black;
  border-bottom-right-radius: 50px;
  transform: rotate(15deg);
  right: 50%;
  margin-right: -50%;
  top: 1px;
}

.mouth .down {
  width: 100%;
  height: 180px;
  position: absolute;
  overflow: hidden;
}

.mouth .down .circle1 {
  border: 3px solid black;
  width: 180px;
  height: 1000px;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -90px;
  border-radius: 100px/450px;
  background-color: #9b000a;
  overflow: hidden;
}

.mouth .down .circle2 {
  width: 200px;
  height: 300px;
  position: absolute;
  background-color: #ff485f;
  bottom: -160px;
  left: 50%;
  margin-left: -100px;
  border-radius: 100px;
}

.electrode {
  position: absolute;
  left: 50%;
  border: 3px solid black;
  width: 88px;
  height: 88px;
  top: 200px;
  margin-left: -44px;
  z-index: 2;
  border-radius: 50%;
  background-color: #f00;
}

.electrode img {
  position: absolute;
  top: 50%;
  left: 50%;
}

.electrode.left {
  transform: translateX(-180px);
}

.electrode.left img {
  transform: rotateY(180deg);
  transform-origin: 0 0;
}

.electrode.right {
  transform: translateX(180px);
}

`;

const player = {
  id: undefined,
  n: 1,
  interval: 100,
  ui: {
    demo: document.querySelector("#demo"),
    demo2: document.querySelector("#demo2"),
  },
  events: {
    "#btnPause": "pause",
    "#btnPlay": "play",
    "#btnSlow": "slow",
    "#btnNormal": "normal",
    "#btnFast": "fast",
  },
  init: () => {
    player.ui.demo.innerText = str.substring(0, player.n);
    player.ui.demo2.innerHTML = str.substring(0, player.n);
    player.bindEvents();
    player.play();
  },
  bindEvents: () => {
    for (let key in player.events) {
      if (player.events.hasOwnProperty(key)) {
        document.querySelector(key).onclick = player[player.events[key]];
      }
    }
  },
  run: () => {
    player.n += 1;
    if (player.n > str.length) {
      window.clearInterval(player.id);
      return;
    }
    player.ui.demo.innerText = str.substring(0, player.n);
    player.ui.demo2.innerHTML = str.substring(0, player.n);
    player.ui.demo.scrollTop = player.ui.demo.scrollHeight;
  },
  play: () => {
    player.id = setInterval(player.run, player.interval);
  },
  pause: () => {
    console.log(player.id);
    window.clearInterval(player.id);
  },
  slow: () => {
    player.pause();
    player.interval = 300;
    player.play();
  },
  normal: () => {
    player.pause();
    player.interval = 100;
    player.play();
  },
  fast: () => {
    player.pause();
    player.interval = 0;
    player.play();
  },
};

player.init();
