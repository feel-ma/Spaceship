const myCanvas = document.getElementById("canvas");
const ctx = myCanvas.getContext("2d");

import Map from "./map.js"; //importing files
import Ship from "./ship.js";
import Projectile from "./projectiles.js";

const ship = new Ship(ctx, "./images/fighter.png"); //creating the object for the game
const riverOne = new Map(ctx, "./images/river.jpg", 0);
const riverTwo = new Map(ctx, "./images/river.jpg", -700);

myCanvas.style.cursor = "none"; //deactivating right mouse click on canvas
myCanvas.oncontextmenu = function (e) {
  e.preventDefault();
};

document.addEventListener("mousemove", getMousePos, false); //mouse over position to ship
function getMousePos(evt) {
  var rect = myCanvas.getBoundingClientRect();
  console.log(evt);
  ship.x = evt.clientX - rect.left - 25;
  ship.y = evt.clientY - rect.top - 35;
}

document.addEventListener("mousedown", (key) => {
  //click functions
  switch (key.button) {
    case 0:
      shotRocket();
      side++
      break;
    case 2:
      console.log("right click");
  }
});

function getRandom(min, max) {
  // auxilliary random generation function with min and max
  return Math.random() * (max - min) + min;
}

const myShots = [];

let side=0

function shotRocket() {
  if (side%2===0) myShots.push(new Projectile(ctx, "./images/pro.png", ship.x+27, ship.y));
  else myShots.push(new Projectile(ctx, "./images/pro.png", ship.x, ship.y));
}

let score = 0;
let c = 0;

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
};

let counter = 0;

function startGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const interval = setInterval(() => {
    counter++;
    riverOne.draw();
    riverOne.scroll();
    riverTwo.draw();
    riverTwo.scroll();
    if (riverOne.y == 700) riverOne.y = -700;
    if (riverTwo.y == 700) riverTwo.y = -700;

    ship.draw();

     for (const shot of myShots){
      shot.move();
      shot.draw();
    } 

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
    ctx.fillStyle = "orange";
    ctx.font = "40px Arial";
    ctx.strokeText("Your score is " + score, 150, 50);

    let x = Math.floor(Math.random() * 100 + 1);

    //if(x%3==0)
  }, 1000 / 60);
}

function gameOver(interval) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 500, 700);
  ctx.fillStyle = "purple";

  ctx.fillText("You failed as usual!!", 50, 350);
  clearInterval(interval);
  blocks = [1, 2, 3];
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
