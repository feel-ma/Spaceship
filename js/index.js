const myCanvas = document.getElementById("canvas");
const ctx = myCanvas.getContext("2d");

import Map from "./map.js"; //importing files
import Ship from "./ship.js";
import Projectile from "./projectiles.js";
import Enemy from "./enemies.js";
import EProjectile from "./enemyP.js";

const ship = new Ship(ctx, "./images/fighter.png"); //creating the object for the game
const riverOne = new Map(ctx, "./images/river.jpg", 0);
const riverTwo = new Map(ctx, "./images/river.jpg", -700);
const enemyArrayL = [];
const enemyArrayR = [];
const enemyProjectileArray=[]

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
      side++;
      break;
    case 2:
      console.log("right click");
  }
});

function getRandom(min, max) {
  // auxilliary random generation function with min and max
  return Math.random() * (max - min) + min;
}

const myShots = []; //shots array and side selector
let side = 0;

function shotRocket() {
  if (side % 2 === 0)
    myShots.push(new Projectile(ctx, "./images/pro.png", ship.x + 27, ship.y));
  else myShots.push(new Projectile(ctx, "./images/pro.png", ship.x, ship.y));
}

for(let shot of myShots){
  if (shot.y=0) myShots.shift()
  
}



let score = 0;
let c = 0;

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
};

let formationC = 0;
let enemySideC = 0;
let counter = 0;
let enemyShotRate=0 

function formationOne(x) {
  if (formationC <= 150) {
    x.moveD();
    formationC++;
  } else if (formationC > 150 && formationC <= 250) {
    x.moveR();
    formationC++;
  } else if (formationC > 250 && formationC <= 330) {
    x.moveU();
    formationC++;
  } else if (formationC > 330 && formationC <= 400) {
    x.moveL();
    formationC++;
  } else formationC = 0;
}

function formationOneR(x) {
  if (formationC <= 150) {
    x.moveD();
    formationC++;
  } else if (formationC > 150 && formationC <= 250) {
    x.moveL();
    formationC++;
  } else if (formationC > 250 && formationC <= 330) {
    x.moveU();
    formationC++;
  } else if (formationC > 330 && formationC <= 400) {
    x.moveR();
    formationC++;
  } else formationC = 0;
}
enemyArrayL.push(new Enemy(ctx, "./images/enemy.png", 50));
enemyArrayR.push(new Enemy(ctx, "./images/enemy.png", 350));

function startGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const interval = setInterval(() => {
    counter++;
    enemyShotRate++
    riverOne.draw();
    riverOne.scroll();
    riverTwo.draw();
    riverTwo.scroll();
    if (riverOne.y == 700) riverOne.y = -700;
    if (riverTwo.y == 700) riverTwo.y = -700;

    ship.draw();

    for (const shot of myShots) { //shot moving
      shot.move();
      shot.draw();
    }

    for (let i = myShots.length - 1; i >= 0; i--) { //remove shots from game once they exit canvas
      if (myShots[i].y <= 0) {
        myShots.splice(i, 1);
      }
    }
    for (const shot of enemyProjectileArray) { //Enemy shot 
      shot.move();
      shot.draw();
    }

    for (let i = enemyProjectileArray.length - 1; i >= 0; i--) { //remove shots from game once they exit canvas
      if (enemyProjectileArray[i].y >= 700) {
        enemyProjectileArray.splice(i, 1);
      }
    }
    //console.log(enemyProjectileArray.length)
    //console.log(ship.x, ship.y, ship.width, ship.height);



   

   if (counter % 300 === 0) { //enemy generator
      if (enemySideC % 2 === 0)
        enemyArrayL.push(new Enemy(ctx, "./images/enemy.png", 50));
      else {
        enemyArrayR.push(new Enemy(ctx, "./images/enemy.png", 350));
      }
      enemySideC++;
    } 

    for (const e of enemyArrayL) { //left array moving
      e.draw();
      formationOne(e);
      if(enemyShotRate%100==0)enemyProjectileArray.push(new EProjectile(ctx,"./images/bullet(1).png", e.x, e.y ))

    for (let shot of myShots) { //left array collision detection
      if (
        ((shot.x > e.x && shot.x < e.x + e.widht) ||
          (shot.x < e.x && shot.x + 20 > e.x + e.widht) ||
          (shot.x + 20 > e.x && shot.x + 20 < e.x + e.widht)) &&
        ((shot.y > e.y && shot.y < e.y + e.height) ||
          (shot.y + 20 > e.y && shot.y + 20 < e.y + e.height) ||
          (shot.y < e.y && shot.y + 20 > e.y + e.height))
      )
     { console.log("HIT LEFT", e.life)
        e.life -= 20;
        myShots.splice(myShots.indexOf(shot), 1); //remove shot from the game
      }
    }

    }
    for (const e of enemyArrayR) { // right array
      e.draw();
      formationOneR(e);
      if(enemyShotRate%100==0)enemyProjectileArray.push(new EProjectile(ctx,"./images/bullet(1).png", e.x, e.y ))
      
    for (let shot of myShots) {
      if (
        ((shot.x > e.x && shot.x < e.x + e.widht) ||
          (shot.x < e.x && shot.x + 20 > e.x + e.widht) ||
          (shot.x + 20 > e.x && shot.x + 20 < e.x + e.widht)) &&
        ((shot.y > e.y && shot.y < e.y + e.height) ||
          (shot.y + 20 > e.y && shot.y + 20 < e.y + e.height) ||
          (shot.y < e.y && shot.y + 20 > e.y + e.height))
      ){
       console.log("HIT RIGHT", e.life)
        e.life -= 20;
        myShots.splice(myShots.indexOf(shot), 1);
      }
    }
    }

    for (let i = enemyArrayL.length - 1; i >= 0; i--) { //check the life of the enemie and remove the dead one
      if (enemyArrayL[i].life <= 0) {
        enemyArrayL.splice(i, 1);
      }
    }
    for (let i = enemyArrayR.length - 1; i >= 0; i--) {
      if (enemyArrayR[i].life <= 0) {
        enemyArrayR.splice(i, 1);
      }
    }

    //console.log('Ship:', ship.x, ship.y);
    //console.log('Projectile:', enemyProjectileArray[0].x, enemyProjectileArray[0].y);
   // console.log(enemyProjectileArray.length)

    for (let shot of enemyProjectileArray) { //left array collision detection
      //console.log('Ship:', ship.x, ship.y);
      //console.log('Projectile:', enemyProjectileArray[0].x, enemyProjectileArray[0].y);
  
     
      if (
        shot.x < ship.x + ship.widht &&
        shot.x + 20 > ship.x &&
        shot.y < ship.y + ship.widht &&
        shot.y + 20 > ship.y
     ) {
        console.log('Collision detected');
        ship.life -= 20;
        enemyProjectileArray.splice(enemyProjectileArray.indexOf(shot), 1);
     }
    }

    if(ship.life===0)gameOver(interval)

  

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
