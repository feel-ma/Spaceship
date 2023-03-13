const myCanvas = document.getElementById("canvas");
const ctx = myCanvas.getContext("2d");

import Map from "./map.js";
import Ship from "./ship.js";


const riverOne = new Map(ctx, "./images/river.jpg", 0)
const riverTwo = new Map(ctx, "./images/river.jpg", -700)


document.addEventListener("mousemove", getMousePos, false);

myCanvas.style.cursor = "none";
myCanvas.oncontextmenu = function (e) {
  e.preventDefault();
};

function getMousePos( evt) {
  var rect = myCanvas.getBoundingClientRect();
  console.log(evt)
  car.x= evt.clientX - rect.left -25
  car.y=evt.clientY- rect.top -35
}

const blocks = [];

/* river.onload = () => {
  ctx.drawImage(river, 0, 0, 500, 700);
};
 window.onload = () => {
  ctx.drawImage(carImg, car.x, car.y, 50, 70);
}; */


let carImg = new Image();
carImg.src = "./images/fighter.png";

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

class blocksC {
  constructor() {
    this.x = 30+getRandom(10,400);
    this.y = 0;
    this.widht = getRandom(50,200);
    this.height = getRandom(10, 80);
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.widht, this.height);
  }

  move() {
    this.y += 1;
  }
}

let score=0 
let c = 0;



class carC {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    ctx.drawImage(carImg, this.x, this.y, 50, 70);
  }

  moveLeft() {
    this.x -= 8;
  }
  moveRight() {
    this.x += 4;
  }
}

let car = new carC(225, 600);
//let block = new blocksC(100, 50,)
blocks.push(new blocksC(100, 50));

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
};

let counter = 0;

document.addEventListener("mousedown", (key) => {
  switch (key.button) {
    case 0:
      console.log("left click")
      break
    case 2:
      console.log("right click")
  }
});

function startGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const interval = setInterval(() => {
    counter++;
    riverOne.draw()
    riverOne.scroll()
    riverTwo.draw()
    riverTwo.scroll()
    if(riverOne.y==700)riverOne.y=-700
    if(riverTwo.y==700)riverTwo.y=-700
    
    car.draw();
    /* if (Math.random() * 1000 <= level) {
      blocks.push(new blocksC(100, 50));
    }
    for (bb of blocks) {
      bb.move();
      bb.draw();

      if (
        (
          car.x > bb.x && car.x < bb.x + bb.widht ||
          car.x < bb.x && car.x + 50 > bb.x + bb.widht ||
          car.x + 50 > bb.x && car.x + 50 < bb.x + bb.widht
        )&&(
          (car.y > bb.y && car.y < bb.y + bb.height) ||
            (car.y + 70 > bb.y && car.y + 70 < bb.y + bb.height) ||
            (car.y < bb.y && car.y + 70 > bb.y + bb.height)
        ) 
      ) {
        console.log("HIT HIT HIT");
        gameOver(interval)
      
      }
      if (car.x<=30 ||car.x+50 >=465) {
        gameOver(interval)
        
        }
      if (c % 100000 == 0) {
        level++
      }
      if (c % 1000 == 0) {
        score++
      }

    } */
    c++;
    ctx.fillStyle = 'orange';
    ctx.font = '40px Arial';  
    ctx.strokeText("Your score is " +score, 150, 50)

    let x = Math.floor(Math.random() * 100 + 1);

    //if(x%3==0)
  }, 1000 / 60);
}

function gameOver(interval){
  ctx.fillStyle ='black'
  ctx.fillRect(0,0 , 500, 700)
  ctx.fillStyle ='purple'
  

  ctx.fillText("You failed as usual!!", 50, 350)
  clearInterval(interval)
  blocks=[1,2,3]


}

/* 
const imageURL = ["./images/road.png","./images/car.png"];
const images = [];
let imageCount = 2;

function allLoaded(){
    // all images have loaded and can be rendered
    ctx.drawImage(images[1],0,0, 500, 700); // draw background
    ctx.drawImage(images[0],0,0, 500, 700); // draw foreground
}

// iterate each image URL, create, load, and add it to the images array
imageURL.forEach(src => {  // for each image url
     const image = new Image();
     image.src = src;
     image.onload = ()=>{ 
         imageCount += 1;
         if(imageCount === imageURL.length){ 
             allLoaded(); 
         }
     }
     images.push(image); 

}); */
