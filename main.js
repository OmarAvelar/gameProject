var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var interval
var frames = 0
var imagenes = {
  mario: "https://mbtskoudsalg.com/images/drawing-bugs-pill-bug-1.png",
}
var vel = 2.2;


//ctx.fillRect(0,0,300,200);
//Se genera el circulo
function Circle(color, radius,x,y, velo, width, height){
  this.x = x ? x : 50;
  this.y = y ? y : 50;
  this.width = width ? width : 0;
  this.height = height ? height : 0;
  this.radius = radius ? radius : 10;
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
  
//lo dibuja
  this.draw = function(){
    this.move();
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    
  }
}

var circle1 = new Circle();
var circle2 = new Circle("green", 30, 100,100, 2, 0, 0);
var mario = new Character(imagenes.mario)

//circle1.draw();
//circle2.draw();


//cachador
function Character(link,x,y){
  this.image = new Image()
  this.image.src = link
  this.x = x || 0
  this.y = y || canvas.height -60
  this.width = 200
  this.height = 60
  this.image.onload = function(){
    this.draw()
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

//instancias
//var goomba = new Character(imagenes.goomba,0,100)
/*addEventListener('mousemove', function(e){
  console.log(e)
  mario.x = e.clientX;
  mario.y = e.clientY;
});*/
//funcion principal







/*addEventListener('mousemove', function(e){
  console.log(e)
  mario.x = e.clientX;
  mario.y = e.clientY;
});*/

var interval;

interval = setInterval(function(){
  frames++
  console.log(frames)
  ctx.clearRect(0,0,1100,300);
  circle1.draw();
  circle2.draw();
  //mario.x = circle2.x - 50; //Para ponerle imagen
  //mario.y = circle2.y - 50;
  mario.draw()



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
  
   
  
  
}, 1000/60);





addEventListener('keydown', function(e){
  if(e.keyCode === 81){
    clearInterval(interval)
  }else if(e.keyCode === 13){
    if(!interval) update()
  }
  if(e.keyCode === 40){
    mario.x += 50
  }
  if(e.keyCode === 38){
    mario.x-=50
  }
  
  
})





  
