var multiplayer = prompt("Ingresa el número de jugadores: ")
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var interval
var counter = 0
var counterWin = 0
var counterLevel = 0
var generateLevel = 0
var frames = 0
var createSpeed = 600
var circles = []
var soundGB = new Audio('');
var soundInGame = new Audio('harbor.mp3');
var soundLevel = new Audio('GoronRace.mp3');
var soundLevelTwo = new Audio('strongKong.mp3');
var soundLose = new Audio('endingBad.mp3');
var soundWin = new Audio('Ending.mp3');


//soundGB.play();
//var randomNum = Math.floor(Math.random()*10);
var imagenes = {
  bg: "https://orig00.deviantart.net/c08a/f/2014/010/6/8/cartoon__underwater_background_by_slaterdies-d71ppab.png",
  mario: "star.png",
  ball: "marimo1.png",
  ball2: "marimo1.2.png",
  ball3: "marimo2.png",
  ball4: "marimo2.2.png",
  blowFish: "giphy.png",
  blowFish2: "giphy3.png",
  star1: "monsterSea1.png",
  star2: "monsterSea2.png",
  starPlayerTwo1: "pezPlayerTwo1.png",
  starPlayerTwo2: "pezPlayerTwo2.png",
}
var vel = 2.2;

function Board(){
  this.x = 0
  this.y = 0
  this.width = canvas.width
  this.height = canvas.height
  this.image = new Image()
  this.image.src = imagenes.bg
  //this.image.onload = ()=>this.draw()
  this.draw = function(){
      //this.x--
      //if(this.x < -this.width) this.x = 0
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
      //ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height)
  }

  this.drawScore = function(){
      ctx.font = "bold 24px Avenir"
      ctx.fillText("Score: " + counterWin, 50,50)
  }
}

//ctx.fillRect(0,0,300,200);
//Se genera el circulo
function Circle(color, radius,x,y, velo, width, height){
  Board.call(this)
  this.x = x ? x : 50;
  this.y = y ? y : 150;
  this.width = width ? width : 0;
  this.height = height ? height : 0;
  this.radius = radius ? radius : 1;
  this.color = color ? color : "green";
  this.isMoving = true;
  this.toUp = false;
  this.toLeft = false;
  //this.velo = velo ? velo : 3;
  
  this.getDistance = function(circle){
  var xD = this.x-circle.x;
  var yD = this.y-circle.y;
  return Math.sqrt(Math.pow(xD,2) + Math.pow(yD,2));
    
      
  }
  //funcion de toque
  this.isTouching = function(circle){
    return this.getDistance(circle) < this.radius + circle.radius;
  }
  
  //suma movimiento a los circulos
  this.move = function(){
    if(!this.isMoving) return;
    var rX = this.x + this.radius;
    var rY = this.y + this.radius;
    //arriba y abajo
    if(this.toUp){
      this.y-=velo ? velo : vel;
    }else{
      this.y+=velo ? velo : vel;
    }
    //izq derecha
    if(this.toLeft){
      this.x-=velo ? velo: vel;
    }else{
      this.x+=velo ? velo : vel;
    }
    
    //techo y pis
    if(rY > canvas.height){
      this.toUp = true;
      this.color = "yellow";
      
      //circles.pop(circle)

    }else if(rY < 0 + this.radius * 2 ){
      this.toUp = false;
      //circle2.color = "yellow";
    }

    



    //paredes
    if(rX > canvas.width){
      this.toLeft = true;
    }else if(rX < 0 + this.radius * 2){
      this.toLeft = false;
    }
  }
  
//
  this.draw = function(){
    this.move();
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
    //ctx.fillStyle = this.color;
    ctx.stroke();
    //ctx.fill();
    ctx.closePath();
  }
}









//cachador
function Character(link,x,y,width,height){
  this.image = new Image()
  this.image.src = link
  this.x = x || 0
  this.y = y || canvas.height -10
  this.width = width  || 80
  this.height = height || 80
  this.image.onload = function(){
    //this.draw()
  }.bind(this)
  

  this.img5 = new Image()
  this.img5.src = imagenes.star1 
  this.img6 = new Image()
  this.img6.src = imagenes.star2 


  this.draw = function(){
      this.boundaries()

      var img = this.which ? this.img5:this.img6;

    ctx.drawImage(img, this.x, this.y, this.width, this.height)
    if(frames%80===0) this.toggleWhich();
  }
    this.toggleWhich = function(){
    this.which = !this.which;
  }
  
        this.boundaries = function(){
        if(this.x+this.width > canvas.width){
          this.x = canvas.width-this.width
        }else if(this.x < 20) {
          this.x=20
        }
      }
  
      //funcion de toque de cachador
      this.isTouching = function(item){
        return (this.x < item.x + item.width) &&
        (this.x + this.width > item.x) &&
        (this.y < item.y + item.height) &&
        (this.y + this.height > item.y);
    }  
}



function CharacterDos(link,x,y,width,height){
  this.image = new Image()
  this.image.src = link
  this.x = x || 0
  this.y = y || 10;
  this.width = width  || 80
  this.height = height || 80
  this.image.onload = function(){
    //this.draw()
  }.bind(this)
  

  this.img7 = new Image()
  this.img7.src = imagenes.starPlayerTwo1
  this.img8 = new Image()
  this.img8.src = imagenes.starPlayerTwo2


  this.draw = function(){
      this.boundaries()

      var img = this.which ? this.img7:this.img8;

    ctx.drawImage(img, this.x, this.y, this.width, this.height)
    if(frames%80===0) this.toggleWhich();
  }
    this.toggleWhich = function(){
    this.which = !this.which;
  }
  
        this.boundaries = function(){
        if(this.x+this.width > canvas.width){
          this.x = canvas.width-this.width
        }else if(this.x < 20) {
          this.x=20
        }
      }
  
      //funcion de toque de cachador
      this.isTouching = function(item){
        return (this.x < item.x + item.width) &&
        (this.x + this.width > item.x) &&
        (this.y < item.y + item.height) &&
        (this.y + this.height > item.y);
    }  
}






function Pelotitas(){
  //this.image = new Image()
  //this.image.src = link
  this.x =  0
  this.y =  canvas.height -60
  this.width =  55
  this.height =  55

 var randomNum = Math.floor(Math.random()*10)
if(randomNum < 5){
  this.img1 = new Image()
  this.img1.src = imagenes.ball 
  this.img2 = new Image()
  this.img2.src = imagenes.ball2 
}else {
  this.img1 = new Image()
  this.img1.src = imagenes.ball3 
  this.img2 = new Image()
  this.img2.src = imagenes.ball4 
}
  console.log("########################" + randomNum)

  
  
  this.draw = function(){
      this.boundaries()
      var img = this.which ? this.img1:this.img2;

    ctx.drawImage(img, this.x, this.y, this.width, this.height)

    if(frames%20===0) this.toggleWhich();
      }
        this.toggleWhich = function(){
        this.which = !this.which;
      }
  
        this.boundaries = function(){
        if(this.x+this.width > canvas.width){
          this.x = canvas.width-this.width
        }else if(this.x < 20) {
          this.x=20
        }
      }
  
      //funcion de toque de cachador
      this.isTouching = function(item){
        return (this.x < item.x + item.width) &&
        (this.x + this.width > item.x) &&
        (this.y < item.y + item.height) &&
        (this.y + this.height > item.y);
    }  
}



function Pelotota(){
  //this.image = new Image()
  //this.image.src = link
  this.imga = new Image()
  this.imga.src = imagenes.blowFish
  this.x =  0
  this.y =  canvas.height -60
  this.width =  125
  this.height =  125

  this.img3 = new Image()
  this.img3.src = imagenes.blowFish 
  this.img4 = new Image()
  this.img4.src = imagenes.blowFish2 


  this.draw = function(){
      this.boundaries()
      var img = this.which ? this.img3:this.img4;


    ctx.drawImage(img, this.x, this.y, this.width, this.height)
    if(frames%20===0) this.toggleWhich();
  }
    this.toggleWhich = function(){
    this.which = !this.which;
  }
  
  
        this.boundaries = function(){
        if(this.x+this.width > canvas.width){
          this.x = canvas.width-this.width
        }else if(this.x < 20) {
          this.x=20
        }
      }
  
      //funcion de toque de cachador
      this.isTouching = function(item){
        return (this.x < item.x + item.width) &&
        (this.x + this.width > item.x) &&
        (this.y < item.y + item.height) &&
        (this.y + this.height > item.y);
    }  
}





//instancias

var circle1 = new Circle();
var circle2 = new Circle("yellow", 30, 100,100, 6, 0, 0);
//var circle3 = new Circle();
var mario = new Character(imagenes.mario,0,canvas.height -80,200,100);
var marioDos = new CharacterDos(imagenes.mario,0,0,200,100);
var ball = new Pelotitas();
var circle = new Circle();
var ballota = new Pelotota();
var bg = new Board()

//circle1.draw();
//circle2.draw();




function start(){
  soundLose.pause();
  soundWin.pause();
  soundLevel.pause();
  soundLevelTwo.pause();
  soundInGame.play();
  vel = 2.2;
  circles = []
  frames = 0
  counter = 0
  counterWin = 0
  counterLevel = 0
  //flappy = new Flappy()
  if(!interval) interval = setInterval(update,1000/60)
}



function update(){
  
 
  frames++;
  console.log(frames);
  
  ctx.clearRect(0,0,1100,400);
  bg.draw();
  bg.drawScore()

  //circle1.draw();
  //if (counter > 2){circle2.draw();ballota.draw();}
  if(counterLevel >= 2 && counterLevel <= 7){
    circle2.draw();
    ballota.draw()
    ballota.x = circle2.x - 55;
    ballota.y = circle2.y - 55;
  }
  ////circle2.draw(); 
  mario.draw();
  /////
  if(multiplayer > 1){
    marioDos.draw();
  }
  
  ////ballota.draw()
  ////ballota.x = circle2.x - 55;
  ////ballota.y = circle2.y - 55;
  //ball.x = circle2.x - 35;
  //ball.y = circle2.y - 35;

 
  drawCircles();
  

  if(counterLevel >= 2 && counterLevel <= 7){
    if(circle1.isTouching(circle2)){
      circle2.color = "peru";
      circle1.color = "peru";
      if(vel < 5){
        vel += 0;
      }
      circle2.toUp = !circle2.toUp
      //circle2.toLeft = !circle2.toLeft
      circle1.toUp = !circle1.toUp
      circle1.toLeft = !circle1.toLeft
      if(velo < 5){
        velo += 0;
      }
    }else{
      //circle2.color = "green";
      //circle1.color = "red";
    }
  
    if(mario.isTouching(circle2)){
      circle2.color = "purple";
   
      circle2.toUp = !circle2.toUp
      //circle2.toLeft = !circle2.toLeft
      if(velo < 4){
        velo += 0;
      }
    }else{
      //circle2.color = "green";
      //circle1.color = "red";
      
    }
  }


/*////
  if(circle1.isTouching(circle2)){
    circle2.color = "peru";
    circle1.color = "peru";
    if(vel < 5){
      vel += 0;
    }
    circle2.toUp = !circle2.toUp
    //circle2.toLeft = !circle2.toLeft
    circle1.toUp = !circle1.toUp
    circle1.toLeft = !circle1.toLeft
    if(velo < 5){
      velo += 0;
    }
  }else{
    //circle2.color = "green";
    //circle1.color = "red";
  }

  if(mario.isTouching(circle2)){
    circle2.color = "purple";
 
    circle2.toUp = !circle2.toUp
    //circle2.toLeft = !circle2.toLeft
    if(velo < 4){
      velo += 1;
    }
  }else{
    //circle2.color = "green";
    //circle1.color = "red";
    
  }*/


  if(mario.isTouching(circle1)){
    circle1.color = "purple";
    if(vel < 3){
      vel += 0;
    }
    circle1.toUp = !circle1.toUp
    //circle1.toLeft = !circle1.toLeft
 
  }else{
    //circle2.color = "green";
    //circle1.color = "red";
    
  }



for(var circle of circles){

//pez gordo
  if(counterLevel >= 2 && counterLevel <= 7){
    if(circle.isTouching(circle2)){
      circle.color = "brown";
      circle2.toUp = !circle2.toUp
      circle2.toLeft = !circle2.toLeft
  
      //circle2.toLeft = !circle2.toLeft
      circle.toUp = !circle.toUp
      circle.toLeft = !circle.toLeft
      if(circle.vel < 5){
        circle.vel += 1;
      }
      
  
    }

  }


  
  /*////if(circle.isTouching(circle2)){
    circle.color = "brown";
    circle2.toUp = !circle2.toUp
    circle2.toLeft = !circle2.toLeft

    //circle2.toLeft = !circle2.toLeft
    circle.toUp = !circle.toUp
    circle.toLeft = !circle.toLeft
    if(vel < 4){
      vel += 0;
    }
    

  }*/
}

for(var circle of circles){
  if(mario.isTouching(circle)){
    circle.color = "green";
    if(vel < 4){
      vel += 0;
    }
    circle.toUp = !circle.toUp
    //circles.pop(circle)
    circle.toUp = !circle.toUp
    circle.toUp = !circle.toUp

  }
}

for(var circle of circles){
  if(marioDos.isTouching(circle)){
    circle.color = "green";
    if(vel < 4){
      vel += 0;
    }
    circle.toUp = !circle.toUp
    //circles.pop(circle)
    circle.toUp = !circle.toUp
    circle.toUp = !circle.toUp

  }
}




for(var circle of circles){
  if(circle.y > canvas.height -10 ){
    circle.color = "yellow"
    //circles.pop(circle)
    var index = circles.indexOf(circle);
if (index > -1) {
  counter++
  circles.splice(index, 1);
}
console.log("se han muerto " + counter + " marimos")
if (counter >= 15){
  soundInGame.pause();
  soundLevel.pause();
  soundLevelTwo.pause();
  soundLose.play();
  gameOver();
}
  }

  if(multiplayer > 1){
    if(circle.y < 10 ){
      circle.color = "yellow"
      //circles.pop(circle)
      var index = circles.indexOf(circle);
  if (index > -1) {
    counter++
    circles.splice(index, 1);
  }
  console.log("se han muerto " + counter + " marimos")
  if (counter > 10){
    console.log("se han muerto los marimos")
    clearInterval(interval)
  }
    }

  }





  if(circle.x > canvas.width -30){
    //circles.pop(circle)
    var index = circles.indexOf(circle);
if (index > -1) {
  circles.splice(index, 1);
}
counterWin++;
generateLevel++;
console.log("se han salvado " + counterWin + " marimos")
console.log("counter level : " + counterLevel)
  if (counterWin%2===0){
    counterLevel++;
  }

if (counterWin >= 14){
  console.log("Ganaste!");
  soundLose.pause();
  soundLevel.pause();
  soundLevelTwo.pause();
  soundInGame.pause();
  soundWin.play();
  gameWon();
  clearInterval(interval)}
  }
}
        
}


function gameOver(){
  clearInterval(interval)
  interval = null
  ctx.fillStyle = "red"
  ctx.font = "bold 80px Arial"
  ctx.fillText("GAME OVER", 50,200)
  ctx.fillStyle = "black"
  ctx.font = "bold 40px Arial"
  ctx.fillText("Tu score: " + counterWin, 200,300)
  ctx.font = "bold 20px Arial"
  ctx.fillText("Presiona 'Return' para reiniciar", 50,350)
}


function gameWon(){
  clearInterval(interval)
  interval = null
  ctx.fillStyle = "red"
  ctx.font = "bold 80px Arial"
  ctx.fillText("Ganaste!!", 50,200)
  ctx.fillStyle = "black"
  ctx.font = "bold 40px Arial"
  ctx.fillText("Tu score: " + counterWin, 200,300)
  ctx.font = "bold 20px Arial"
  ctx.fillText("Presiona 'Return' para reiniciar", 50,350)
}


function drawCover(){
  var img = new Image()
  img.src = imagenes.mario
  img.onload = function(){
      bg.draw()
      ctx.drawImage(img, 50,50,300,300)
      ctx.font = "bold 24px Avenir"
      ctx.fillText("Presiona la tecla 'Return' para comenzar", 50,300)
  }
}


function generateCircles(){
  
  //if (counter > 2){createSpeed = 100;}else{createSpeed=750;}

switch (counterLevel){

  case 0: createSpeed = 400; break;
  case 1: createSpeed = 400; vel=4;  break;
  case 2: createSpeed = 100; vel=2; soundInGame.pause(); soundLevel.play(); break;
  case 3: createSpeed = 400; vel=5;  break;
  case 4: createSpeed = 300; vel=4;  break;
  case 5: createSpeed = 300; vel=3;  soundLevel.pause(); soundLevelTwo.play(); break;
  case 6: createSpeed = 200; vel=4;  break;
  case 7: createSpeed = 400; vel=4;  break;

  default: createSpeed = 400; break;
}

  if(frames%createSpeed===0) {
      //var height = Math.floor(Math.random()*400)
      circles.push(new Circle())
      soundGB.play();
  }
  
}


function drawCircles(){
generateCircles()

circles.forEach(function(circle){
    circle.draw()
    ball.draw();
    //ballota.draw();
    ball.x = circle.x - 25;
    ball.y = circle.y - 25;
    
    
})
}





addEventListener('keydown', function(e){
  if(e.keyCode === 81){
    clearInterval(interval)
  }else if(e.keyCode === 13){
    return start()
  }
  if(e.keyCode === 39){
    mario.x += 50
  }
  if(e.keyCode === 37){
    mario.x-=50
  }

  if(e.keyCode === 68){
    marioDos.x += 50
  }
  if(e.keyCode === 65){
    marioDos.x -=50
  }
  
})

drawCover()
