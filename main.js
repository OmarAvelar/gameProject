var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var interval
var frames = 0
var circles = []
var imagenes = {
  mario: "https://mbtskoudsalg.com/images/drawing-bugs-pill-bug-1.png",
  ball: "http://www.pngall.com/wp-content/uploads/2016/06/Beach-Ball.png",
  ball2: "http://1.bp.blogspot.com/-Uq-KszfMzkU/Uuk4WdF_R2I/AAAAAAAAAJk/HinNF82JwS4/s1600/2LYamDK.png"
}
var vel = 2.2;






//ctx.fillRect(0,0,300,200);
//Se genera el circulo
function Circle(color, radius,x,y, velo, width, height){
  this.x = x ? x : 50;
  this.y = y ? y : 50;
  this.width = width ? width : 0;
  this.height = height ? height : 0;
  this.radius = radius ? radius : 1;
  this.color = color ? color : "red";
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
    return this.getDistance(circle) < this.radius + circle.radius + 15;
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
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}









//cachador
function Character(link,x,y,width,height){
  this.image = new Image()
  this.image.src = link
  this.x = x || 0
  this.y = y || canvas.height -60
  this.width = width  || 40
  this.height = height || 40
  this.image.onload = function(){
    //this.draw()
  }.bind(this)
  
  this.draw = function(){
      this.boundaries()
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
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




function Pelotitas(link,x,y,width,height){
  this.image = new Image()
  this.image.src = link
  this.x = x || 0
  this.y = y || canvas.height -60
  this.width = width  || 40
  this.height = height || 40
  this.img1 = new Image()
  this.img1.src = imagenes.ball 
  this.img2 = new Image()
  this.img2.src = imagenes.ball2 

  this.image.onload = function(){
    //this.draw()
  }.bind(this)
  
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



//instancias

var circle1 = new Circle();
var circle2 = new Circle("green", 30, 100,100, 2, 0, 0);
//var circle3 = new Circle();
var mario = new Character(imagenes.mario,0,canvas.height -60,200,60);
var ball = new Pelotitas(imagenes.ball);
var circle = new Circle();

//circle1.draw();
//circle2.draw();




function start(){
  circles = []
  frames = 0
  //flappy = new Flappy()
  if(!interval) interval = setInterval(update,1000/60)
}



function update(){
  
  frames++;
  console.log(frames);
  
  ctx.clearRect(0,0,1100,300);
  //circle1.draw();
  circle2.draw(); 
  mario.draw();
  //ball.x = circle2.x - 35;
  //ball.y = circle2.y - 35;

 
  drawCircles();
  


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
    
  }


  if(mario.isTouching(circle1)){
    circle1.color = "purple";
    if(vel < 4){
      vel += 0;
    }
    circle1.toUp = !circle1.toUp
    //circle1.toLeft = !circle1.toLeft
 
  }else{
    //circle2.color = "green";
    //circle1.color = "red";
    
  }



for(var circle of circles){
  if(circle.isTouching(circle2)){
    circle.color = "brown";
    circle2.toUp = !circle2.toUp
    circle2.toLeft = !circle2.toLeft

    //circle2.toLeft = !circle2.toLeft
    circle.toUp = !circle.toUp
    circle.toLeft = !circle.toLeft
    if(vel < 4){
      vel += 0;
    }
    

  }
}

for(var circle of circles){
  if(mario.isTouching(circle)){
    circle.color = "purple";
    if(vel < 4){
      vel += 0;
    }
    circle.toUp = !circle.toUp
    //circles.pop(circle)

  }
}



for(var circle of circles){
  if(circle.y > canvas.height -10 ){
    circle.color = "yellow"
    //circles.pop(circle)
    var index = circles.indexOf(circle);
if (index > -1) {
  circles.splice(index, 1);
}

  }
}
        





}






function generateCircles(){
  if(frames%150===0) {
      //var height = Math.floor(Math.random()*400)
      circles.push(new Circle())
      
  }
  
}


function drawCircles(){
generateCircles()

circles.forEach(function(circle){
    circle.draw()
    ball.draw();
    ball.x = circle.x - 15;
    ball.y = circle.y - 15;
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
  
  
})