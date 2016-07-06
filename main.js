window.onload = function() {
  var img = new Image();
  var canvas = document.getElementById("canvas");

  console.log(img);
  img.onload = function onImageLoad() {
    img.src = 'IMG_1342.PNG';

  }
  var context = canvas.getContext('2d');

  function draw() {
    var canvas = document.getElementById('SimpleCanvas');
    context.drawImage(img, 128, 40);

    if (!canvas || !canvas.getContext) {
      return false;
    }
  }


  var context = canvas.getContext("2d");
  //var context2 = canvas.getContext("2d");
  var x = 30, y = 300;
  var bx = x;
  var by = y;
  var age = 0;
/*  var ctx = canvas.getContext('2d');
  var img = new Image();*/

  var arrows = {
    left: false,
    up: false,
    right: false,
    left: false,
    triger: false
  }

  var color = ["red", "blue", "green", "yellow"];
  /*img.onload = function() {
    　　　ctx.drawImage(img, x, y);
  　　　}*/
  function Bullet(){
    this.width = 5;
    this.height = 5;
    this.init();
  }

  Bullet.prototype.init = function(){
    this.visble = false;
  }
  Bullet.prototype.shot = function(){
      this.x = x;
      this.y = y;
      this.visble = true;
      this.color = color[bulletCount % 4];
  };
  Bullet.prototype.draw = function(){
    context.fillStyle = this.color;
    context.fillRect(this.x + 2.5, this.y + 2.5, this.width, this.height);
  };
  Bullet.prototype.enterframe = function(){
      this.y -= 10;
      this.draw();
      if(this.x < 0){
        this.init();
      }
  };

  var bulletList = new Array(30);
  for (var i = 0; i < bulletList.length; i++) {
    bulletList[i] = new Bullet();
  }
  var bulletCount = 0;
  console.log(bulletList);

  setInterval(function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    //context.fillStyle = "#48D1CC"
    context.fillStyle = "red";
    context.fillRect(x, y, 10, 10);


    for (var i = 0; i < bulletList.length; i++) {
      if(bulletList[i].visble){
        bulletList[i].enterframe();
      }
    }


      if(arrows.triger && age % 3 === 0){
          bulletList[bulletCount].shot();
          bulletCount ++;
          if (bulletCount === bulletList.length - 1) {
            bulletCount = 0;
          }
      }
      if(arrows.right && x < canvas.width - 20){ x += 5 }
      if(arrows.up && y > 0){ y -= 5 }
      if(arrows.left && x > 0){ x -= 5}
      if(arrows.down && y < canvas.height - 20){ y += 5 }

      age++;
  }, 1000 / 30);





  document.body.addEventListener("keydown", function(event) {
    switch (event.keyCode) {
      case 37:
      arrows.left = true;
      break;
      case 38:
      arrows.up = true;
      break;
      case 39:
      arrows.right = true;
      break;
      case 40:
      arrows.down = true;
      break;
      case 90:
      arrows.triger = true;
    }

  })

  document.body.addEventListener("keyup", function(event) {
    switch (event.keyCode) {
      case 37:
      arrows.left = false;
      break;
      case 38:
      arrows.up = false;
      break;
      case 39:
      arrows.right = false;
      break;
      case 40:
      arrows.down = false;
      break;
      case 90:
      arrows.triger = false;
    }
  })
 }



  // document.body.addEventListener("keydown", function(event) {
  //   context.fillStyle = "red";
  //   context.fillRect(bx, by, 5, 5);
  // });
//document.body.addEventListener("keyup", function(event) {
