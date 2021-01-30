var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;
var c1,c2,c3,c4;
var track;

function preload(){
  c1=loadImage("images/Santara2.png");
  c2=loadImage("images/Santara3.png");
  c3=loadImage("images/Santara9.png");
  c4=loadImage("images/Santara10.png");
  track=loadImage("images/track.jpg");

}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
