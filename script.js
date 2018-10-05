const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const list = document.querySelector('#list');
const box = document.querySelector('.box');
const menu = document.querySelector('.menu');
const close = document.querySelector('.close');
const inputName = document.querySelector('.name');

const menuList = document.querySelector('.menuBody');


const playButton = document.querySelector('#play');
const timeline = document.querySelector('.range');

list.addEventListener('click', function() {
  box.style.marginLeft = '-400px';
  menu.style.display = 'flex';
  menu.style.left = 'calc(50% - 150px)';
});

close.addEventListener('click', function() {
  box.style.marginLeft = '0';
  menu.style.left = 'calc(50% - 250px)';
  // menu.style.display = 'none';
});

function loadListMusic() {
  let n = 0;
  for(let s of buffer.urls) {
    let soundId = 'sound' + n;
    let str = document.createElement('div');
    let controlPanel = document.createElement('div');
    console.log(str);
    menuList.appendChild(str);
    str.id = soundId;
    str.classList.value = 'soundStr';
    // setStyles(strSoundStyle, str);
    str.innerHTML = `<p class="soundStrName">${s.slice(6)}</p>`;
    str.appendChild(controlPanel);
    controlPanel.id = n;
    controlPanel.classList.value = 'rightControlMenu';
    controlPanel.innerHTML = `<img src="img/${'play.png'}">`;
    n += 1;
    
  }
};

//Отримання елементів
function getInterfaceElements(arrNodeElements) {
  const parents = [];
  const children = [];
  const elements = arrNodeElements;
  for(let element of elements) {
    console.log(element.classList);
    let id = element.classList[1] || element.id;
    parents.push({id: id, node: element});
    for(let el of element.children) {
      children.push({id: el.id, node: el});
    }
  };
  return [parents, children];
};

//Деструктуризація масиву який повертає функція gtInterfaceElements()
const [parentInterfaseElements, childrenInterfaseElements] = getInterfaceElements(document.querySelectorAll('.el'));
// const [soundStrElements, childrenSoundStrElements] = getInterfaceElements(document.querySelectorAll('.soundStr'));
//Масив функцій для кожного елементу управління які виконуються при події event
const functions = [
  [
    () => {
      const element = childrenInterfaseElements[0].node;
      setStyles(hoverPlay, childrenInterfaseElements[0].node);
      setStyles(hoverEl1, parentInterfaseElements[0].node);
      element.childNodes[0].textContent = '';
      element.children[0].style.display = 'block';
    },
    () => {
      const element = childrenInterfaseElements[0].node;
      deleteStyles(hoverPlay, childrenInterfaseElements[0].node);
      deleteStyles(hoverEl1, parentInterfaseElements[0].node);
      element.children[0].style.display = 'none';
      element.childNodes[0].textContent = 'P';
    },
  ],
  [
    () => {
      const element = childrenInterfaseElements[1].node;
      setStyles(hoverList, childrenInterfaseElements[1].node);
      setStyles(hoverEl2, parentInterfaseElements[1].node);
      element.textContent = '';
    },
    () => {
      const element = childrenInterfaseElements[1].node;
      deleteStyles(hoverList, childrenInterfaseElements[1].node);
      deleteStyles(hoverEl2, parentInterfaseElements[1].node);
      element.textContent = 'L';
    },
  ],
  [
    () => {
      setStyles(hoverEffects, childrenInterfaseElements[2].node);
      setStyles(hoverEl3, parentInterfaseElements[2].node);
    },
    () => {
      deleteStyles(hoverEffects, childrenInterfaseElements[2].node);
      deleteStyles(hoverEl3, parentInterfaseElements[2].node);
    },
  ],
  [
    () => {
      setStyles(hoverEffects, childrenInterfaseElements[3].node);
      setStyles(hoverEl3, parentInterfaseElements[2].node);
    },
    () => {
      deleteStyles(hoverEffects, childrenInterfaseElements[3].node);
      deleteStyles(hoverEl3, parentInterfaseElements[2].node);
    },
  ],
  [
    () => {
      setStyles(hoverEffects, childrenInterfaseElements[4].node);
      setStyles(hoverEl3, parentInterfaseElements[2].node);
    },
    () => {
      deleteStyles(hoverEffects, childrenInterfaseElements[4].node);
      deleteStyles(hoverEl3, parentInterfaseElements[2].node);
    },
  ],

];

//Функція яка привязує обробник функцію з масиву functions 
function setBehavior(el, functions) {
  console.log(functions);
    el.addEventListener('mouseover', functions[0]);
    el.addEventListener('mouseout', functions[1]);
};

function behaviorToElement() {
  let i = 0;
  for(let el of childrenInterfaseElements) {
      setBehavior(el.node ,functions[i]);
      i += 1;
  }
};

behaviorToElement();




//Функція встановлення стилів
function setStyles(styles, obj2) {
  for(let key in styles) {
    obj2.style[key] = styles[key]; 
  }
};

//Функція видалення стилів
function deleteStyles(styles, obj2) {
  for(let key in styles) {
    obj2.style[key] = ''; 
  }
};

let idAnimation;
let analyserData = {color: '#222',setColor() {return this.color}};

//Візуалізація мелодії. 
function draw() {
  idAnimation = requestAnimationFrame(draw);
  var freqByteData = new Uint8Array(sound.analyser.frequencyBinCount);
  sound.analyser.getByteFrequencyData(freqByteData);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (var i = 1; i < freqByteData.length; i += 1){
      let grd = ctx.createLinearGradient(1500,50,10,1000);
      grd.addColorStop(0,"#1f4037");
      grd.addColorStop(1,"#99f2c8");

      ctx.fillStyle = analyserData.setColor();
      ctx.fillRect(i -100, canvas.height - freqByteData[i] * 1, 1, canvas.height);
      // ctx.strokeRect(i - 100, canvas.height - freqByteData[i] * 1.5, 2, canvas.height);
  };
};





class Buffer {
  constructor(context, urls) {  
    this.context = context;
    this.urls = urls;
    this.buffer = [];
  }

  loadSound(url, index) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    let thisBuffer = this;
    request.onload = function() {
      thisBuffer.context.decodeAudioData(request.response, function(buffer) {
        thisBuffer.buffer[index] = buffer;
        if(index == thisBuffer.urls.length-1) {
          thisBuffer.loaded();
        };
        if(thisBuffer.buffer.indexOf(buffer) == 0) {
          window.sound.buffer = thisBuffer.buffer[0];
          sound.play();
          sound.context.suspend();
        }
      });
    };
    request.send();
    
  };

  loadAll() {
    let th = this;
    return new Promise(function(resolve, reject) {
      th.urls.forEach((url, index) => {
      th.loadSound(url, index);
      });
      setTimeout(resolve, 10000);
    });
  }

  loaded() {
    // what happens when all the files are loaded
  }

  getSoundByIndex(index) {
    return this.buffer[index];
  }

  getBuffer() {
    this.urls.forEach((url, index) => {
      this.loadSound(url, index);
    })
  }
  

};


class Sound {

  constructor(context, buffer) {
    this.context = context;
    this.buffer = buffer;
    this.soundIndex = 0;
    this.currentTime = 0;
    this.timerId = 0;
    this.name = '';
  }

  init() {
    this.gainNode = this.context.createGain();
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
  }

  createAnalyser() {
    this.analyser = this.context.createAnalyser();
    this.source.connect(this.analyser);
    this.analyser.connect(this.context.destination);
  }
  
  play(tm) {
    sound.soundName();
    if(tm || tm == 0) {
      cancelAnimationFrame(idAnimation);
      // sound.context.suspend();
      sound.stop();
      sound = new Sound(context, buffer.buffer[buffer.buffer.indexOf(sound.buffer)]);
      sound.soundIndex = this.soundIndex;
      sound.init();
      sound.createAnalyser();
      sound.source.start(0, tm);
      sound.context.resume();
      draw();
    }else {
      this.init();
      this.source.start(0, sound.currentTime);
      this.createAnalyser();
      draw();
    };
    sound.source.onended = function() {
      setTimeout(function() {
        if(sound.timerId == 'end') {
          sound.nextSound();
        }
      }, 2000);
      console.log('end');
    };
  }

  playSoundForIndex(id) {
    sound.currentTime = 0;
    if(buffer.buffer[+id]) {
      sound.stop();
      this.buffer = buffer.buffer[+id];
      sound.soundIndex = +id;
      sound.soundName();
      this.init();
      this.source.start(0);
      this.createAnalyser();
      draw();
      sound.source.onended = function() {
        setTimeout(function() {
          if(sound.timerId == 'end') {
              sound.nextSound();
          }
        }, 2000);
        console.log('end');
      };
    }
  }

  stop() {
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.5);
    this.source.stop(this.context.currentTime + 0.5);
  }

  [Symbol.for('condition')]() {
    if(sound.context.state == 'running') {
      sound.play();
      sound.context.resume();
    }else {
      sound.play();
      sound.context.suspend();
    }
  }

   nextSound() {
    sound.soundName();
    if(sound.timerId == 'end') {
      sound.musicTimer();
    };
    sound.stop();
    if(buffer.buffer[sound.soundIndex + 1]) {
      sound = new Sound(context, buffer.buffer[sound.soundIndex + 1]);
      sound.soundIndex += 1;
      sound.soundIndex = buffer.buffer.indexOf(sound.buffer);
      sound[Symbol.for('condition')]();
    }else {
      sound = new Sound(context, buffer.buffer[0]);
      sound.soundIndex = 0;
      sound[Symbol.for('condition')]();
    };
    sound.currentTime = 0;
    
  }

  musicTimer() {
    if(sound.context.state == 'running') {
        sound.timerId = setTimeout(function run(){
        if(sound.currentTime <= sound.buffer.duration && sound.context.state == 'running') {
          sound.currentTime += 1;
          sound.timerId = setTimeout(run, 1000);
        }else if(sound.currentTime >= sound.buffer.duration) {
          console.log('_---------------------sd');
          clearTimeout(sound.timerId);
          sound.timerId = 'end';
        }else{
          console.log('pause');
          clearTimeout(sound.timerId);
          sound.timerId = 'pause';
        };
      }, 1000); 
    }else {
      console.log('---------------sdsd');
      clearTimeout(sound.timerId);
      sound.timerId = 0;
    }
  }

  soundName() {
    sound.name = urlsAudio[sound.soundIndex];
    inputName.innerHTML = sound.name.slice(6);
  }

};

let context = new (window.AudioContext || window.webkitAudioContext)();
let urlsAudio = ['music/Zedd_featJon_Bellion_BeautifulNow.mp3','music/Starset – My Demons.mp3', 'music/Blackbear – Idfc.mp3', 'music/Extreme_Music-Bring_Me_Back_To_Life.mp3', 'music/Alan Walker – Faded.mp3', 'music/08 - Linkin Park - Hybrid Theory - In The End.mp3', 'music/bring-me-the-horizon-throne_.mp3'];


  window.buffer = new Buffer(context, urlsAudio);
  buffer.loadAll().then(function() {
    loadListMusic();
    const [soundStrElements, childrenSoundStrElements] = getInterfaceElements(document.querySelectorAll('.soundStr'));
    addEventOnArrElements(childrenSoundStrElements, 'click', whatSoundPlay);
  });
  window.sound = new Sound(context);
  


let idAnimation2;
function setSoundOnTimeline() {
  idAnimation2 = requestAnimationFrame(setSoundOnTimeline);
  let duration = sound.buffer.duration;
  let currentTime = sound.currentTime;
  let result = (currentTime * 100) / duration;
  progress(result);
  timeline.value = result;
};


function playSound() {
  if(sound.context.state === 'running') {
    cancelAnimationFrame(idAnimation2);
    sound.context.suspend();
    cancelAnimationFrame(idAnimation);
    playButton.children[0].src = 'img/play.svg';
  } else if(sound.context.state === 'suspended') {
    playButton.children[0].src = 'img/pause.svg';
    sound.soundName();
    sound.context.resume();
    setSoundOnTimeline();
    draw();
    setTimeout(function() {
      sound.musicTimer();
    }, 1000);
  }
}

function whatSoundPlay(element) {
  if(+element.id == sound.soundIndex) {
    playSound();
  }else {
    sound.playSoundForIndex(element.id);
  }
}

playButton.onclick = playSound;

function addEventOnArrElements(arr, event, fn) {
  arr.forEach(el => {
    console.log(el);
    if(el.node.tagName == 'DIV') el.node.addEventListener(event,() => fn(el));
  });
};






// addEventOnArrElements(childrenSoundStrElements, 'onclick', playSound);



function progress(v) {
  timeline.style.background = `-webkit-linear-gradient(left, #222 0%, #222 ${v}%, #fff ${v}%, #fff 100%)`;
};


timeline.addEventListener('input', () => {
  if(sound.timerId == 'end') {
    sound.musicTimer();
  };
  cancelAnimationFrame(idAnimation2);
  let t = (timeline.value * sound.buffer.duration)/100;
  progress(timeline.value);
  if(sound.context.state === 'running') sound.play(t);
  // console.log(sound.context.state);
  sound.soundName();
});
timeline.addEventListener('mouseup', () => {
  let t = (timeline.value * sound.buffer.duration)/100;
  if(sound.timerId == 'end') {
    sound.musicTimer();
  };
  sound.currentTime = t;
  setSoundOnTimeline();
  sound.soundName();
});


