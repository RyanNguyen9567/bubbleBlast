var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   

  heading=createElement("h1")
  

  scoreboard=createElement("h1")
  

}

function draw() {
  background("#BDA297");

  //display Score and number of lifes
  heading.html("Life: "+life)
  heading.style('color:red')
  heading.position(200,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red')
  scoreboard.position(width-200,20)

  if(gameState===1){
    gun.y=mouseY  
    
    if(keyDown("space")){
      shootBullet()
    }
    
    if (frameCount % 100 == 0) {
      drawRedBubble()
    }  

    if (frameCount % 80 == 0) {
      drawBlueBubble()
    }

    if (blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup)
      
    }

    if (redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup)
    }

    if (blueBubbleGroup.collide(backBoard)){
      handleGameOver(blueBubbleGroup)
    }

    if (redBubbleGroup.collide(backBoard)){
      handleGameOver(redBubbleGroup)
    }

    drawSprites();
  }
  if (life===0){
    gameState=2
    swal({
      title: 'Game Over',
      text:"Oops you lost the game....!!!",
      text: "your Score is"+score,
      imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize:"100x100",
      confirmButtonText:"Thanks For Playing"
    })
  }
     
}
S
function shootBullet(){
  var bullet= createSprite(700, 100, 60, 10)
  bullet.addImage(bulletImg);
  bullet.x = 40;
  bullet.y=gun.y;
  bullet.velocityX = 4;
  bullet.lifetime = 150;
  bullet.scale = 0.3;
  bulletGroup.add(bullet);
}

function drawBlueBubble(){
  var blueBubble = createSprite(800,Math.round(random(20, 780)), 10, 10);
 blueBubble.addImage(blueBubbleImg);
 blueBubble.velocityX = -3;
 blueBubble.lifetime = 250;
 blueBubble.scale = 0.1;
blueBubbleGroup.add(blueBubble);

}

function drawRedBubble(){
  var redBubble = createSprite(800,Math.round(random(20, 780)), 10, 10);
 redBubble.addImage(redBubbleImg);
 redBubble.velocityX = -3;
 redBubble.lifetime = 250;
 redBubble.scale = 0.1;
 redBubbleGroup.add(redBubble);

}

function handleBubbleCollision(bubbleGroup){
  if(life>0){
    score=score+1
    var blast= createSprite(700,100, 60, 10)
    //x=bullet.x
    //y=bullet.y
    blast.addImage(blastImg);
    blast.lifetime = 20;
    blast.scale = 0.3;
    bulletGroup.destroyEach()
    bubbleGroup.destroyEach()
  }
}

function handleGameOver(bubbleGroup){
  life=life-1
  bubbleGroup.destroyEach()

}
