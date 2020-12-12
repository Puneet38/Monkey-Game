
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score
var ground,invisible_ground;
var PLAY=0;
var END=1;
var gameState=PLAY;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}

function setup() {
  createCanvas(600,200);
  
  monkey = createSprite(40,140,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(300,180,1200,5);
  foodGroup=new Group();
  obstaclesGroup=new Group();
}

function draw() {
    
  background("white");
  monkey.collide(ground);
  
  if(gameState===PLAY) {
     ground.velocityX=-6;
    
     
    if(ground.x<0) {
      ground.x=ground.width/2
    }
    
    if(keyDown("space") && monkey.y>120) {
      monkey.velocityY=-10;
    }
    
    monkey.velocityY=monkey.velocityY+0.5;
    score=Math.round(frameCount/frameRate());
    
    if(monkey.isTouching(foodGroup)) {
     foodGroup.destroyEach();
    }
    
    
    food();
    obstacles();
  }
  else if(gameState===END) {
    monkey.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    ground.velocityX=0;
    foodGroup.destroyEach();
    monkey.velocityY=0;
  }
  
  if(obstaclesGroup.isTouching(monkey)) {
    gameState=END;
  }
  
    ground.shapeColor="black";

    drawSprites();
  
    fill("black");
    text("Survival times : " + score,480,30);
 
}

function food() {
  if(frameCount%80===0) {
    banana=createSprite(600,random(20,100),10,10);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-6;
    banana.lifetime=100;
    foodGroup.add(banana);
  }
}

function obstacles() {
  if(frameCount%300===0) {
    obstacle=createSprite(600,157,10,10);
    obstacle.velocityX=-6;
    obstacle.scale=0.1;
    obstacle.addImage(obstacleImage);
    obstaclesGroup.add(obstacle);
  }
}