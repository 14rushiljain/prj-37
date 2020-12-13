var dog, happyDog, database, foodS, foodStock;
var feedPet, addFood;
var fedTime, lastFed;
var foodObj;
var changeState, readState;
var bedroom, garden, washroom;
var gameState = "Hungry";
var scale = 0.5;

function preload() {

  dogImg = loadImage("images/Dog.png");
  happyDogImg = loadImage("images/happydog.png");
  sadDogImg = loadImage("images/dogImg.png");
  bedroom = loadImage("images/virtualPetImages/Bed Room.png");
  garden = loadImage("images/virtualPetImages/Garden.png");
  washroom = loadImage("images/virtualPetImages/Wash Room.png");
}

function setup() {
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  console.log("foodS ", foodStock);

  readState = database.ref('gameState');
  readState.on("value", (data) => {
    gameState = data.val();
  });

  createCanvas(500, 500);
  dog = createSprite(250, 250, 10, 10);
  dog.scale = 0.1;
  happyDog = createSprite(250, 250, 10, 10);
  happyDog.scale = 0.1;

  foodObj = new Food();

  // creating button
  feedPet = createButton("Feed the Dog");
  feedPet.position(600, 95);
  feedPet.mousePressed(feedDog);

  addFood = createButton("add Food");
  addFood.position(700, 95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(rgb(46, 139, 87));
  foodObj.display();
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data) {
    lastFed = data.val();
  })
  if (gameState != "Hungry") {
    feedPet.hide();
    addFood.hide();
    dog.remove();
  } else {
    feedPet.show();
    addFood.show();
    dog.addImage(dogImg);
  }

  fill(255, 255, 254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Feed : " + lastFed % 12 + " PM", 350, 30);
  } else if (lastFed == 0) {
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : " + lastFed + " AM", 350, 30);
  }
  textSize(20);
  fill("white");
  text("Food remaining : ", 150, 180);
  if (foodS) {
    fill("yellow");
    text(foodS, 310, 180);
  }
  if (foodS === 0) {
    textSize(20);
    fill("red");
    text(foodS, 310, 180);
    textSize(50);
    fill("blue");
    text("Game Over!!!", 100, 350);
    dog.addImage(dogImg);
  }
  currentTime = hour();
  if (currentTime === (lastFed + 1)) {
    console.log("playing");
    update("Playing");
    foodObj.garden();
  } else if (currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)) {
    console.log("Bathing");
    update("Bathing");
    foodObj.washroom();
  } else if (currentTime == (lastFed + 2)) {
    console.log("Sleeping");
    update("Sleeping");
    foodObj.bedroom();
  } else {
    console.log("Hungry");
    update("Hungry");
    foodObj.display();
  }


  drawSprites();
}

function update(state) {
  database.ref('/').update({
    gameState: state
  })
}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog() {
  dog.addImage(happyDogImg);
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  });
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
