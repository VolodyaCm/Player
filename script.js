let analyser, canvas, ctx, random = Math.random, circles = [];

//Отримання елементів взаємодії з плеєром
const elementsOfinteraction = (function() {
  let arr = new Map();
  let perents = new Map();
  const elements = document.querySelectorAll('.el');
  for(let element of elements) {
    perents.set(element.classList[1], element);
    for(let el of element.children) {
      arr.set(el.id, el);
    }
  };
  
  return [arr, perents];
})();

//Деструктуруємо масив елементів взаємодії та їхніх батьків в окремі мапи. 
let [childrenElements, perentsElements] = elementsOfinteraction;

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


//Функція надання поведінки елементам взаємодії
function setBehavior(elements, element, element2, styles, styles2, content) {
  let saveData = {};
  elements.forEach((el, i) => {
    if(element == i) {
      el.addEventListener('mouseover', () => {
          setStyles(styles, el);
          saveData[i] = el.textContent;
          el.textContent = content ? String.fromCharCode(content) : el.textContent;
          setStyles(styles2, element2);

      });
      el.addEventListener('mouseout', () => {
        deleteStyles(styles, el);
        el.textContent = saveData[i];
        deleteStyles(styles2, element2);
      });
      el.addEventListener('click', () => {
        if(i == 'effects') {
          let e = document.querySelector('.menu');
          e.style.display = 'flex';
        }
      });
    };
  });
  
};

//
setBehavior(childrenElements, 'play', perentsElements.get('el1'), hoverPlay, hoverEl1, '0x25B8');
setBehavior(childrenElements, 'list', perentsElements.get('el2'), hoverList, hoverEl2, null);
setBehavior(childrenElements, 'effects', perentsElements.get('el3'), hoverEffects, hoverEl3, null);
setBehavior(childrenElements, 'analayser', perentsElements.get('el3'), hoverEffects, hoverEl3, null);
setBehavior(childrenElements, 'you', perentsElements.get('el3'), hoverEffects, hoverEl3, null);



//Функціонал елементів взаємодії


let i = false;
let idAnimation;

function draw() {
  idAnimation = requestAnimationFrame(draw);
  var freqByteData = new Uint8Array(sound.analyser.frequencyBinCount);
  sound.analyser.getByteFrequencyData(freqByteData);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (var i = 1; i < circles.length; i++) {
      circles[i].radius = freqByteData[i]* 100;
      circles[i].y = circles[i].y > canvas.height ? 0 : circles[i].y + 1;
      circles[i].draw();
  }
  
  for (var i = 1; i < freqByteData.length; i += 1){
      // ctx.fillStyle = 'rgb(' + getRandomColor() + ',' + getRandomColor() + ',' + getRandomColor() + ')';
      let grd = ctx.createLinearGradient(1500,50,10,1000);
grd.addColorStop(0,"#1f4037");
grd.addColorStop(1,"#99f2c8");

      ctx.fillStyle = '#222';
      ctx.fillRect(i -100, canvas.height - freqByteData[i] * 1, 1, canvas.height);
      // ctx.strokeRect(i + 300, canvas.height - freqByteData[i] * 1.5, 1, canvas.height);
  }
}


window.onload = function() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
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
        console.log(buffer);
        if(index == thisBuffer.urls.length-1) {
          thisBuffer.loaded();
        }       
      });

      setTimeout(function() {
        i = true;
      }, 3000); 
      
    };
    request.send();
    
  };

  loadAll() {
    this.urls.forEach((url, index) => {
      this.loadSound(url, index);
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

  

  play() {
    this.init();
    this.source.start(this.context.currentTime);
    this.createAnalyser();
    draw();
  }

  stop() {
    this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.5);
    this.source.stop(this.context.currentTime + 0.5);
    cancelAnimationFrame(idAnimation);
  }

};

let context = new (window.AudioContext || window.webkitAudioContext)();
let urlsAudio = ['music/Starset – My Demons.mp3', 'music/Blackbear – Idfc.mp3', 'music/Extreme_Music-Bring_Me_Back_To_Life.mp3', 'music/Zedd_feat._Jon_Bellion_-_Beautiful_Now_(Prime-Music.net).mp3', 'music/Alan Walker – Faded.mp3'];

let buffer = new Buffer(context, urlsAudio);
let t = buffer.loadAll();
setTimeout(function() {
  window.sound = new Sound(context, buffer.getSoundByIndex(3));
  sound.play();
}, 10000);
let pl = document.getElementById('play');
// pl.type = 'button';
// pl.value = 'play';
// document.body.appendChild(pl);
let v = false;
// pl.onclick = function() {
//   if(i) {
    
//     console.log(i);
//     if(!v) {
//       // sound = new Sound(context, buffer.getSoundByIndex(3));
//       sound.play();
//       console.log(sound);
//       v = true;
//     }else {
//       sound.stop();
//       // sound = new Sound(context, buffer.getSoundByIndex(3));
//       v = false;
//     }
    
//   }else {
//     console.log(false);
//   }
  
// };


pl.onclick = function() {
  if(sound.context.state === 'running') {
    sound.context.suspend()
  } else if(sound.context.state === 'suspended') {
    sound.context.resume()
  }
}


console.log(i);




