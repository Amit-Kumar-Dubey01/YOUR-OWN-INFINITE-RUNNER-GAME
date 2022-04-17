var PLAY = 1;
var END = 0;
var gameState = PLAY;

var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;

var restart, restartImg;
var gameOver, gameOverImg;

//var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-standing.png", "ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");




}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,300);
  ghost.addAnimation("ghostImg", ghostImg);
  ghost.scale = 0.5;
 
  doorsGroup = new Group();

  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  

  gameOver.visible = false;
  restart.visible = false;
    
  
}

function draw() {
  background(200);
  
  if(gameState === PLAY){

  

  if(tower.y > 400){
      tower.y = 300
    }


  if(keyDown("space") ){
    ghost.velocityY = -5;
   // spookySound.play();
   
  }

  if(keyDown("left")){
  ghost.x = ghost.x - 5;
  }

  if(keyDown("right")){
    ghost.x = ghost.x + 5;
  }



  ghost.velocityY = ghost.velocityY + 0.5;

   spawnDoors(); 

   if(ghost.isTouching(doorsGroup)){
     gameState = END;
   }
  }

  else if (gameState === END){

    tower.velocityY = 0;
    doorsGroup.setVelocityYEach(0);
    doorsGroup.setLifetimeEach(-1);

    gameOver.visible = true;
    restart.visible = true;

    ghost.velocityY = 0;
    


  } 

  drawSprites();  
}

function spawnDoors(){

if(frameCount % 240 === 0 ){
  var door = createSprite(300, 0, 10, 10);
  door.addImage(doorImg);
  door.velocityY = 1;
  door.x = random(100, 500);

  door.lifetime = 600;
  doorsGroup.add(door);




}



}


function reset(){
  gamestate = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  doorsGroup.destroyEach();

  ghost.changeAnimation();

  score = 0;

}

