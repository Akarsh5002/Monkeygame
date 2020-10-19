var survivalTime  =0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacles, obstacleImage, forest,backgroundImage;   
var obstaclesGroup, bananaGroup;
var score, ground, background;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  backgroundImage = loadImage("background.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 forest = loadImage("forest.png");
  
}



function setup() {
  
  background = createSprite(0,0,600,400);
  background.addImage(backgroundImage);
  background.scale = 2;
  background.x = background.width / 2;
  
monkey = createSprite(80,315,20,20);
monkey.addAnimation("running",monkey_running);
monkey.scale = 0.17;
  
ground = createSprite(400,320,900,10);
 ground.addImage("ground",forest);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);

  
  bananaGroup = createGroup();
  obstaclesGroup = createGroup();
  monkey.setCollider("rectangle",0,0,400,monkey.height);
  monkey.debug = true
  score = 0;
}


function draw() {
createCanvas(600,400);
   
  if(gamestate === PLAY){
    
    
   background.velocityX = -4

    if (background.x < 0){
      background.x = background.width/2;
    }
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  
   
 B();
    O();
     
if (keyDown("space") && monkey.y >= 100) {
      monkey.velocityY = -12;
}
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score+2;
    }
  }
  else
    {
      if(obstaclesGroup.isTouching(monkey)){
        gamestate=END;
        monkey.velocityX = 0;
        obstaclesGroup.destroyEach();
        bananaGroup.destroyEach();
      obstaclesGroup.setVelocityEachX(0);
      bananaGroup.setVelocityEachX(0);
      }
    }
  drawSprites();
  stroke("white");
    textSize(20);
    fill("white");
    text("score:"+score, 500,50);
    
    stroke("orange");
    textSize(20);
    fill("orange")
    survivalTime = Math.ceil(frameCount/frameRate())
    text("survivalTime:"+ survivalTime,100,50);
  
}
function O(){
  if(World.frameCount%300===0){
    obstacles = createSprite(400,260,30,30);
   obstacles.addImage(obstacleImage);
    obstacles.scale = 0.3;
    obstacles.lifetime = 100;
    obstacles.velocityX = -7;
    obstaclesGroup.add(obstacles);
  
  }
}
function B(){
  
  if(World.frameCount%150===0){
    
    banana = createSprite(340,100,10,10);
    banana.addImage(bananaImage);
  banana.setLifetime = 80;
  banana.velocityX = -2;
    banana.scale = 0.11;
    
    bananaGroup.add(banana);
  }
}
