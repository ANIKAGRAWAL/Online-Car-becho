class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    //car3 = createSprite(500,200);
    //car4 = createSprite(700,200);
    cars = [car1, car2/*, car3, car4*/];

    car1.addImage(c1)
    car2.addImage(c2)
    //car3.addImage(c3)
    //car4.addImage(c4)
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCars();
    if(allPlayers !== undefined){
      //var display_position = 100;
      background("#4A4A4A");
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      
      if(player.distance>0 && player.distance<1000){
          player.distance +=5
          player.update();
        }
        
      else if(player.distance>1000 && player.distance<2000){
            player.distance +=15
            player.update();
          
      }else {
            player.distance +=25
            player.update();
    }  
    }
    if(player.distance>3500){
      gameState=2
      player.rank+=1
      Player.updateCars(player.rank)
    }
    drawSprites();
  }
  end(){
    console.log("gameEnded")
    console.log(player.rank)
  }
}
