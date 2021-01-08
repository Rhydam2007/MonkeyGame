var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running

var banana, bananaImage, obstacle, obstacleImage

var FoodGroup, obstacleGroup

var score = 0;
var survivaltime = 0;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");

  obstacleImage = loadImage("obstacle.png");

  
}

function setup() {
  createCanvas(400, 310);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("monkeyrunning", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 100);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);

  foodGroup = createGroup();
  obstaclesGroup = createGroup();
  

}


function draw() {

  background(200);

  fill("white");
  textSize(20);


  if (gameState === PLAY) {
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    ground.velocityX = -(4 + 3 * survivaltime / 100);

    if (keyDown("SPACE") && monkey.y >= 269) {
      monkey.velocityY = -12;
      console.log(monkey.y);
    }

    survivaltime = Math.ceil(frameCount / frameRate());

    spawnObstacle();
    spawnBanana();
    

    monkey.velocityY = monkey.velocityY + 0.5;

    

  } else if (gameState === END) {
    ground.velocityX = 0;

    monkey.velocityY = 1;

    foodGroup.destroyEach();

    obstaclesGroup.setLifetimeEach(-1);
  

    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    

  }

  monkey.collide(ground);

  drawSprites();

 
  text("Survival time : " + survivaltime, 100, 20);

}

function spawnObstacle() {
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(600, 270, 10, 10);
    obstacle.addImage("obstacles", obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -(6 + survivaltime / 100);
    obstacle.lifetime = 150;
    obstacle.setCollider("circle", 0, 0, width / 2 - 20);
    obstaclesGroup.add(obstacle);
  }
}



function spawnBanana() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(200, Math.round(random(120, 200)), 10, 10);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 100;
    foodGroup.add(banana);
  }
}

