
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivaltime ;
var ground ,invisibleground;
var obstacle,food;
var score=0;
var gameState=0;
var gameState=1;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  
 
  
  //creating ground
   ground=createSprite(300,350,600,20)
  ground.velocityX=-7;
 ground.visible=false;
  
  //creating invisible ground
  invisibleground=createSprite(300,350,600,20);
  
  //creating obstacle group
  obstacleGroup=createGroup();
  
  //creating food group
  foodGroup=createGroup();
  
  survivaltime=0;
  //creating monkey
  monkey=createSprite(50,310,30,30);
  monkey.addAnimation("best monkey",monkey_running);
  monkey.scale=0.1;
  
  
}


function draw() {
background("lightgreen")
  
 
  


 //  console.log(monkey.y);
  
 
  
 
  
  
  
  if(gameState===1){
    
    
    
    
    
     //giving scrolling effect
 if(ground.x<0){
    ground.x=ground.width/2
  }  
    
    if(keyDown("space")&&monkey.y>305){
  monkey.velocityY=-15;
    }
    
      //giving gravity
  monkey.velocityY=monkey.velocityY + 0.8;
  
    
  //adding obstacles
  spawnObstacless();
  
  //adding food
  spawnfood();
    
     survivaltime=Math.round(survivaltime+getFrameRate()/60);
    
    
    
     
    
  }
  
  if(gameState===0){
    
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    
    survivaltime=0;
    
    stroke("red");
    textSize(20);
    text("GameOver press'enter' to restart",100,200)
           
  }
  
  if(monkey.isTouching(obstacleGroup)){
     monkey.velocityY=2
    gameState=0;
    
  }
  
  if(keyWentDown("enter")&&gameState===0){
   
    gameState=1;
  }
 
  
  
  if(monkey.isTouching(foodGroup)){
    score=score+1;
          
     foodGroup.destroyEach();
  }
   if(score%5===0 && score>0){
     background("black");
     
   }
  
  
  textSize(13);
  fill("blue");
  text("Survival Time:" + survivaltime,280,30);
text("score:"+score,280,50);
  
 monkey.collide(ground);
  
  
  
 // console.log(getFrameRate())
drawSprites();
}

function spawnObstacless(){
  if(frameCount%180===0){
  obstacle=createSprite(398,323,20,20);
  obstacle.addImage(obstaceImage);
  obstacle.scale=0.1;
  obstacle.velocityX=-(6+survivaltime/90);
obstacle.lifetime=120;
    
    
    
    
    obstacleGroup.add(obstacle);
  }
}

function spawnfood(){
  
  if(frameCount%80===0){
   
    food=createSprite(395,300,30,30);
    food.addImage(bananaImage);
    food.scale=0.1;
    food.velocityX=-5;
    food.lifetime=120;
    food.y=Math.round(random(120,200));
    
    foodGroup.add(food);
  }
  
  
}


