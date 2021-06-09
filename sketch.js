var player, playerRunning;
var path, pathImage;
var leftBoundary, rightBoundary;
var obs, bombImg, coinImg, edImg, powerImg;
var coinGroup, edGroup, powerGroup, bombGroup;
var score = 0;
var lives = 3;

function preload() {
  playerRunning = loadAnimation("Runner-1.png", "Runner-2.png");
  pathImage = loadImage("path.png");
  coinImg = loadImage("coin.png");
  edImg = loadImage("energyDrink.png");
  bombImg = loadImage("bomb.png");
  powerImg = loadImage("power.png");
}

function setup() {
  createCanvas(400, 400);

  path = createSprite(200, 200);
  path.addImage(pathImage);
  path.velocityY = 4;
  path.scale = 1.2;

  player = createSprite(200, 350, 20, 20);
  player.addAnimation("pr", playerRunning);
  player.scale = 0.08;

  leftBoundary = createSprite(10, 0, 10, 800);
  leftBoundary.visible = false;
  rightBoundary = createSprite(390, 0, 10, 800);
  rightBoundary.visible = false;

  coinGroup = new Group();
  edGroup = new Group();
  powerGroup = new Group();
  bombGroup = new Group();
}

function draw() {

  background(220);
  drawSprites();

  if (path.y > 400) {
    path.y = height / 4;
  }
  player.x = mouseX;
  player.collide(leftBoundary);
  player.collide(rightBoundary);

  if (frameCount % 80 == 0) {
    spawnObstacles();
  }

  if (player.isTouching(coinGroup)) {
    score = score + 2;
    coinGroup.destroyEach();
  }
  if (player.isTouching(edGroup)) {
    score = score + 2;
    edGroup.destroyEach();
  }
  if (player.isTouching(powerGroup)) {
    score = score + 2;
    powerGroup.destroyEach();
  }
  if (player.isTouching(bombGroup)) {
    score = score - 5;
    lives = lives - 1;
    bombGroup.destroyEach();
  }

  if (lives == 0) {
    background("black");
    textSize(50);
    fill("yellow");
    text("Game Over", 80, 200);
  } else {
    text("Score : " + score, 300, 20);
    text("Lives : " + lives, 60, 20);
  }



}

function spawnObstacles() {
  var r = Math.round(random(1, 4));
  obs = createSprite(100, 100);
  switch (r) {
    case 1:
      obs.addImage(coinImg);
      obs.scale = 0.5;
      coinGroup.add(obs);
      break;
    case 2:
      obs.addImage(edImg);
      obs.scale = 0.15;
      edGroup.add(obs);
      break;
    case 3:
      obs.addImage(bombImg);
      obs.scale = 0.1;
      bombGroup.add(obs)
      break;
    case 4:
      obs.addImage(powerImg);
      obs.scale = 0.25;
      powerGroup.add(obs);
      break;
  }
  obs.x = Math.round(random(100, 300));
  obs.y = Math.round(random(100, 300));
  obs.velocityY = 2;
}

