const myCanvas = document.getElementById("canvas");
const ctx = myCanvas.getContext("2d");

import Map from "./map.js"; //importing files
import Ship from "./ship.js";
import Projectile from "./projectiles.js";
import Enemy from "./enemies.js";
import EProjectile from "./enemyP.js";
import Buff from "./buff.js";
import Terrestrial from "./Terrestrial.js";
import Rocket from "./rockets.js";
import Bomb from "./bombs.js";

const ship = new Ship(ctx, "./images/fighter.png"); //creating the object for the game
const riverOne = new Map(ctx, "./images/river.jpg", 0);
const riverTwo = new Map(ctx, "./images/river.jpg", -700);
const enemyArrayL = [];
const enemyArrayR = [];
const terrestrialArrayL = [];
const terrestrialArrayR = [];
const rocketArray=[]
const rocketArrayR=[]
const myBombs=[]



const enemyProjectileArray=[]
const buffArray =[]

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
     dropBomb()
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

function dropBomb(){
  myBombs.push(new Bomb(ctx, "./images/bombbomb.png", ship.x + 27, ship.y));


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
let terrestrialC =0

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
terrestrialArrayR.push(new Terrestrial(ctx, "./images/missiler.png", 450));
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
    for (const shot of myBombs) { //shot moving
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
   
    for (let i = rocketArray.length - 1; i >= 0; i--) { //remove rockets from game once they exit canvas
      if (rocketArray[i].y >= 700|| rocketArray[i].x >= 500|| rocketArray[i].x <=0 ) {
        rocketArray.splice(i, 1);
      }
    }
    for (let i = rocketArrayR.length - 1; i >= 0; i--) { //remove rockets from game once they exit canvas
      if (rocketArrayR[i].y >= 700|| rocketArrayR[i].x >= 500|| rocketArrayR[i].x <=0 ) {
        rocketArrayR.splice(i, 1);
      }
    }

    for (const shot of rocketArray) { //rockets shot 
      shot.move();
      shot.draw();
      if (
        shot.x < ship.x + ship.widht &&
        shot.x + 20 > ship.x &&
        shot.y < ship.y + ship.widht &&
        shot.y + 20 > ship.y
     ) {
        ship.life -= 50;
        rocketArray.splice(rocketArray.indexOf(shot), 1);
     }
    }

    for (const shot of rocketArrayR) { //rockets shot 
      shot.moveR();
      shot.draw();
      if (
        shot.x < ship.x + ship.widht &&
        shot.x + 20 > ship.x &&
        shot.y < ship.y + ship.widht &&
        shot.y + 20 > ship.y
     ) {
        ship.life -= 50;
        rocketArrayR.splice(rocketArrayR.indexOf(shot), 1);
     }
    }


   
   

   if (counter % 300 === 0) { //enemy generator
      if (enemySideC % 2 === 0)
        enemyArrayL.push(new Enemy(ctx, "./images/enemy.png", 50));
      else {
        enemyArrayR.push(new Enemy(ctx, "./images/enemy.png", 350));
      }
      if (terrestrialC === 10)
        terrestrialArrayL.push(new Terrestrial(ctx, "./images/missilel.png", 5));
      else if (terrestrialC==20) {
        terrestrialArrayR.push(new Terrestrial(ctx, "./images/missiler.png", 450));
        terrestrialC=0
      }
      terrestrialC++
      enemySideC++;
    } 

    for (const e of enemyArrayL) { //left array moving
      e.draw();
      formationOne(e);
      if(enemyShotRate%100==0)enemyProjectileArray.push(new EProjectile(ctx,"./images/bullet(1).png", e.x, e.y ))

      if (
        e.x < ship.x + ship.widht &&
        e.x + 20 > ship.x &&
        e.y < ship.y + ship.widht &&
        e.y + 20 > ship.y
     ) gameOver(interval)

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

      if (
        e.x < ship.x + ship.widht &&
        e.x + 20 > ship.x &&
        e.y < ship.y + ship.widht &&
        e.y + 20 > ship.y
     ) gameOver(interval)
      
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
        score++
        enemyArrayL.splice(i, 1);
      }
    }
    for (let i = enemyArrayR.length - 1; i >= 0; i--) {
      if (enemyArrayR[i].life <= 0) {
        score++
        enemyArrayR.splice(i, 1);
      }
    }

    for (let shot of enemyProjectileArray) { //enemy shots collision detection
      if (
        shot.x < ship.x + ship.widht &&
        shot.x + 20 > ship.x &&
        shot.y < ship.y + ship.widht &&
        shot.y + 20 > ship.y
     ) {
        ship.life -= 20;
        enemyProjectileArray.splice(enemyProjectileArray.indexOf(shot), 1);
     }
    }

    for (const t of terrestrialArrayL){
      t.draw()
      t.move()
      if(enemyShotRate%50==0)rocketArray.push(new Rocket(ctx,"./images/rocket.png", t.x, t.y ))

    }



    for (const t of terrestrialArrayR){
      t.draw()
      t.move()
      if(enemyShotRate%50==0)rocketArrayR.push(new Rocket(ctx,"./images/rocketR.png", t.x, t.y ))

    }

    if(ship.life===0)gameOver(interval)

    lifeBar()
    applyBuff()

    for(const buff of buffArray){
      buff.draw()
      buff.move()
    }

    for (let buff of buffArray) { //enemy shots collision detection
      if (
        buff.x < ship.x + ship.widht &&
        buff.x + 30 > ship.x &&
        buff.y < ship.y + ship.widht &&
        buff.y + 30 > ship.y
     ) {
        ship.life += 20;
        buffArray.splice(buffArray.indexOf(buff), 1);
     }
    }

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
}


function lifeBar(){
  ctx.font = "20px Arial";
  ctx.strokeText("YOUR LIFE", 50, 650)
  ctx.fillStyle = "red"
  if (ship.life>=100) ctx.fillRect(50, 650, 400, 20)
  else if (ship.life>=80) ctx.fillRect(50, 650, 300, 20)
  else if (ship.life>=60) ctx.fillRect(50, 650, 200, 20)
  else if (ship.life>=40) ctx.fillRect(50, 650, 100, 20)
  else if (ship.life>=20)ctx.fillRect(50, 650, 50, 30)
  else  return
}

function applyBuff(){
  if(getRandom(0,1000)<=2) buffArray.push(new Buff(ctx, "./images/buff1.png", getRandom(50,450) ))


}