let idAnimation;
let idAnimation2;


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const list = document.querySelector('#list');
const box = document.querySelector('.box');
const menu = document.querySelector('.menu');
const close = document.querySelector('.close');
const inputName = document.querySelector('.name');


const menuList = document.querySelector('.menuBody');
const openSoundList = document.querySelector('.openSoundList');
const buttonPrevious = document.querySelector('.previous');
const buttonNext = document.querySelector('.next');
const volume = document.querySelector('.volume');

const playButton = document.querySelector('#play');
const timeline = document.querySelector('.range');


const blocks = document.querySelectorAll('.blocks');
const load = document.querySelector('.load');

//Прелоадер
function moveRightToLeft() {
  let n = 40;
  let t = 500;
  let tId;
  for(let el of blocks) {
      tId = setTimeout(function () {
      el.style.transition = '0.7s';
      el.style.right = `- ${n}px`;
      el.style.opacity = 1;
    },t);
    n += 20;
    t += 250;
  }
};

function moveDUD() {
  let n = 380;
  let t = 200;
  for(let el of blocks) {
    tId = setTimeout(function() {
      el.style.transition = '0.5s';
      el.style.top = `-45px`;
      // el.style.boxShadow = '0 100px 50px 1px #151515'
      el.style.transform = 'rotate(-90deg)';
      setTimeout(function() {
        el.style.transition = '0.2s';
        el.style.top = `35px`;
        el.style.opacity = 0;
        // el.style.boxShadow = '0 20px 10px 1px #151515';
        setTimeout(function() {el.style.transform = 'rotate(90deg)';}, 800);
      }, 300); 
    }, t)
    t += 250;
  }
}

function startAnimation() {
  moveRightToLeft();
  setTimeout(function() {
    moveDUD();
  }, 1500);
  setTimeout(function() {
    for(let el of blocks) {
      el.style.top = 0;
      el.style.opacity = 0;
      // el.style.right = 0;
    }
  }, 3100); 
}

function startGlobalAnimation() {
  let i = 0;
  let tId = setTimeout(function tick() {
    startAnimation();
    if(i >= 5) {
      i = 0;
      load.style.opacity = 0;
      clearTimeout(tId);
      setTimeout(function() {
        load.style.display = 'none';
      }, 500);
      return;
    };
    i += 1;
    tId = setTimeout(tick, 3000);
  }, 100);
};

//Запускаємо прелоадер при завантаженні сторінки 
window.onload = function() {
  startGlobalAnimation();
};

openSoundList.addEventListener('click', function() {
  box.style.marginLeft = '-400px';
  menu.style.display = 'flex';
  menu.style.left = 'calc(50% - 150px)';
});

close.addEventListener('click', function() {
  box.style.marginLeft = '0';
  menu.style.left = 'calc(50% - 250px)';
  // menu.style.display = 'none';
});

//Відображення треків в списку
function loadListMusic() {
  let n = 0;
  for(let s of buffer.urls) {
    let soundId = 'sound' + n;
    let str = document.createElement('div');
    let controlPanel = document.createElement('div');
    menuList.appendChild(str);
    str.id = soundId;
    str.classList.value = 'soundStr';
    // setStyles(strSoundStyle, str);
    str.innerHTML = `<p class="soundStrName" id = '${n}'>${s.slice(6)}</p>`;
    str.appendChild(controlPanel);
    controlPanel.id = n;
    controlPanel.classList.value = 'rightControlMenu';
    n += 1;
    
  }
};

//Отримання елементів
function getInterfaceElements(arrNodeElements) {
  const parents = [];
  const children = [];
  const elements = arrNodeElements;
  for(let element of elements) {
    let id = element.classList[1] || element.id;
    parents.push({id: id, node: element, state: ''});
    for(let el of element.children) {
      children.push({id: el.id, node: el});
    }
  };
  return [parents, children];
};

//Деструктуризація масиву який повертає функція gtInterfaceElements()
const [parentInterfaseElements, childrenInterfaseElements] = getInterfaceElements(document.querySelectorAll('.el'));

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
      element.childNodes[0].textContent = '';
      openSoundList.style.display = 'flex';
      buttonNext.style.display = 'flex';
      buttonPrevious.style.display = 'flex';
    },
    () => {
      const element = childrenInterfaseElements[1].node;
      deleteStyles(hoverList, childrenInterfaseElements[1].node);
      deleteStyles(hoverEl2, parentInterfaseElements[1].node);
      element.childNodes[0].textContent = 'L'
      openSoundList.style.display = 'none';
      buttonNext.style.display = 'none';
      buttonPrevious.style.display = 'none';
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

//Функція яка генерує 2 події для елемента el і привязує обробник події з масиву functions 
function setBehavior(el, functions) {
    el.addEventListener('mouseover', functions[0]);
    el.addEventListener('mouseout', functions[1]);
};

//Функція яка викликає setBehavior для кожного елемента childrenInterfaseElements. 
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

//Візуалізація мелодії. 
function draw() {
  //requestAnimationFrame для створення анімації еквалайзера
  idAnimation = requestAnimationFrame(draw);
  var freqByteData = new Uint8Array(sound.analyser.frequencyBinCount);
  sound.analyser.getByteFrequencyData(freqByteData);
  //Очищення canvas перед візуалізацією наступного кадру анімації
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Цикл для відображення на полотні вертикальних ліній 
  for (var i = 1; i < freqByteData.length; i += 1){
      ctx.fillStyle = '#222';
      ctx.fillRect(i -100, canvas.height - freqByteData[i] * 1, 1, canvas.height);
      // ctx.strokeRect(i - 100, canvas.height - freqByteData[i] * 1.5, 2, canvas.height);
  };
};


//Клас Buffer містить методи для завантаження та отримання мелодій  
class Buffer {
  constructor(context, urls) {  
    this.context = context;
    this.urls = urls;
    this.buffer = [];
  }

  //Завантаження мелодії використовуючи AJAX  
  loadSound(url, index) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    let thisBuffer = this;
    request.onload = function() {
      thisBuffer.context.decodeAudioData(request.response, function(buffer) {
        thisBuffer.buffer[index] = buffer;
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
      setTimeout(resolve, 1000);
    });
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
    this.gainNode.gain.setValueAtTime(0.2, sound.currentTime);
    this.gainNode.connect(this.context.destination);
  }

  createAnalyser() {
    this.analyser = this.context.createAnalyser();
    this.source.connect(this.analyser);
    this.analyser.connect(this.context.destination);
  }

  //
  checkMusicInTheList() {
    soundStrElements.forEach(el => {
      if(el.node.tagName == 'DIV') {
        el.state = '';
        el.node.style.border = 'none';
        el.node.style.background = '#ebebeb';
      };

      childrenSoundStrElements.forEach(el2 => {
        if(el2.node.textContent == sound.name.slice(6)) {
          el2.node.parentNode.style.background = 'silver';
        };
        if(el.id.slice(5) == sound.soundIndex) {
          el.state = 'plaing';
        }
      });

    });
  }
  
  //Метод для відтворення мелодії. 
  play(tm) {
    sound.soundName();
    sound.checkMusicInTheList();
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
      this.source.start(0);
      this.createAnalyser();
      draw();
    };
    
    //Виклик метода sound.nextSound() після завершення відтворення поточної мелодії 
    sound.source.onended = function() {
      setTimeout(function() {
        if(sound.timerId == 'end') {
          sound.nextSound();
        }
      }, 2000);
    };
  }

  //Відтворює мелодію за індексом id
  playSoundForIndex(id) {
    sound.currentTime = 0;
    if(buffer.buffer[+id]) {
      cancelAnimationFrame(idAnimation);
      sound.stop();
      this.buffer = buffer.buffer[+id];
      sound.soundIndex = +id;
      sound.soundName();
      this.init();
      this.source.start(0);
      this.createAnalyser();
      setSoundOnTimeline();
      draw();
      sound.source.onended = function() {
        setTimeout(function() {
          if(sound.timerId == 'end') {
              sound.nextSound();
          }
        }, 2000);
        console.log('end');
      };
    };
    sound.checkMusicInTheList();
  }

  //Зупиняє відтворення мелодії
  stop() {
    cancelAnimationFrame(idAnimation);
    cancelAnimationFrame(idAnimation2);
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.5);
    this.source.stop(this.context.currentTime + 0.5);
  }

  //Приватний метод для перевірки стану мелодії. Використовується в nextSound() та подібних методах для встановлення стану поточної мелодії використовуючи стан попередньої.
  [Symbol.for('condition')]() {
    if(sound.context.state == 'running') {
      sound.play();
      sound.context.resume();
    }else {
      sound.play();
      sound.context.suspend();
    }
  }

  //Відтворює наступну мелодію 
  nextSound() {
    cancelAnimationFrame(idAnimation);
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

  //Відтворює попередню мелодію
  previousSound() {
    cancelAnimationFrame(idAnimation);
    sound.soundName();
    if(sound.timerId == 'end') {
      sound.musicTimer();
    };
    sound.stop();
    if(buffer.buffer[sound.soundIndex - 1]) {
      sound = new Sound(context, buffer.buffer[sound.soundIndex - 1]);
      sound.soundIndex -= 1;
      sound.soundIndex = buffer.buffer.indexOf(sound.buffer);
      sound[Symbol.for('condition')]();
    }else {
      sound = new Sound(context, buffer.buffer[buffer.buffer.length-1]);
      sound.soundIndex = buffer.buffer.length - 1;
      sound[Symbol.for('condition')]();
    };
    sound.currentTime = 0;
    
  }

  //Таймер який записує поточний час відтворення у властивість sound.currentTime
  musicTimer() {
    if(sound.context.state == 'running') {
        sound.timerId = setTimeout(function run(){
        if(sound.currentTime <= sound.buffer.duration && sound.context.state == 'running') {
          sound.currentTime += 1;
          sound.timerId = setTimeout(run, 1000);
        }else if(sound.currentTime >= sound.buffer.duration) {
          clearTimeout(sound.timerId);
          sound.timerId = 'end';
        }else{
          console.log('pause');
          clearTimeout(sound.timerId);
          sound.timerId = 'pause';
        };
      }, 1000); 
    }else {
      clearTimeout(sound.timerId);
      sound.timerId = 0;
    }
  }

  //Визначає ім'я мелодії опираючись на її розташуванні. Записує в sound.name та inputName
  soundName() {
    sound.name = urlsAudio[sound.soundIndex];
    inputName.innerHTML = sound.name.slice(6);
  }

};

let context = new (window.AudioContext || window.webkitAudioContext)();
let urlsAudio = ['music/Zedd_featJon_Bellion_BeautifulNow.mp3','music/Starset – My Demons.mp3', 'music/BMTH – can you feel my heart.mp3', 'music/Extreme_Music-Bring_Me_Back_To_Life.mp3', 'music/Alan Walker – Faded.mp3', 'music/08 - Linkin Park - Hybrid Theory - In The End.mp3', 'music/bring-me-the-horizon-throne_.mp3'];



  window.buffer = new Buffer(context, urlsAudio);
  buffer.loadAll().then(function() {
    loadListMusic();
    const [soundStrElements, childrenSoundStrElements] = getInterfaceElements(document.querySelectorAll('.soundStr'));
    window.soundStrElements = soundStrElements;
    window.childrenSoundStrElements = childrenSoundStrElements;
    addEventOnArrElements(soundStrElements, 'click', whatSoundPlay);
    addEventOnArrElements(soundStrElements, 'mouseover', soundStrOver);
    addEventOnArrElements(soundStrElements, 'mouseout', soundStrOut);
  });
  window.sound = new Sound(context);
  

function soundStrOver(el) {
  el.node.style.cursor = 'pointer';
  if(!el.state) {
    el.node.style.background = '#d3d3d3';
  }
};

function soundStrOut(el) {
  if(!el.state) {
    el.node.style.background = '#ebebeb';
  }
};

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
    cancelAnimationFrame(idAnimation);
    cancelAnimationFrame(idAnimation2);
    sound.context.suspend();
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
  soundStrElements.forEach(el => {
    el.state = '';
  });
  element.state = 'plaing';
  if(element.id.slice(5) == sound.soundIndex) {
    playSound();
  }else {
    sound.playSoundForIndex(element.id.slice(5));
  }
}

playButton.onclick = playSound;

function addEventOnArrElements(arr, event, fn, ...args) {
  arr.forEach(el => {
    el.node.addEventListener(event,() => fn(el, args));
  });
};

buttonNext.addEventListener('click', sound.nextSound);
buttonPrevious.addEventListener('click', sound.previousSound);

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

volume.addEventListener('input', () => {
  let v = ((volume.value * 100)/ 2.4) - 100/2.4;
  sound.gainNode.gain.value = -(volume.value);
  volume.style.background = `-webkit-linear-gradient(left, #222 0%, #222 ${v}%, #fff ${v}%, #fff 100%)`;
});