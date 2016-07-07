window.onload = function() {
  var img = [new Image(),new Image()];
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
  var main_character = {
    x : 170,
    y : 300,
    age : 0
  }
  img[0].src = './body.png';
  img[1].src = './tama1.png';
  img.onload = function () {
    //context.drawImage(img,this.x,this.y);
    console.log(img.src);
  };
  /*function draw() {
    var canvas = document.getElementById('SimpleCanvas');
    context.drawImage(img, 128, 40);

    if (!canvas || !canvas.getContext) {
      return false;
    }
  }*/

  main_character.bx = main_character.x;
  main_character.by = main_character.y;
  var arrows = {
    left: false,
    up: false,
    right: false,
    left: false,
    triger: false
  }

  var color = ["red", "blue", "green", "yellow"];

  class Bullet {
    constructor() {
      this.width = 15;
      this.height = 15;
      this.init();
    }

    init() {
      this.visble = false;
    }

    shot() {
      this.x = main_character.x;
      this.y = main_character.y;
      this.visble = true;
      this.color = color[bulletCount % 4];
    }

    draw() {
      context.fillStyle = this.color;
      context.drawImage(img[1],this.x + 14.5,this.y,this.width, this.height);

    }

    enterframe() {
      this.y -= 10;
      this.draw();
      if(this.x < 0){
        this.init();
      }
    }
  }

  var bulletList = new Array(30);
  for (var i = 0; i < bulletList.length; i++) {
    bulletList[i] = new Bullet();
  }
  var bulletCount = 0;
  console.log(bulletList);

  setInterval(function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    //context.drawImage(img,10,10);
    context.fillStyle = "red";
    //context.fillRect(main_character.x, main_character.y, 40, 40);
    context.drawImage(img[0],main_character.x, main_character.y, 40, 40);


    for (var i = 0; i < bulletList.length; i++) {
      if(bulletList[i].visble){
        bulletList[i].enterframe();
      }
    }


      if(arrows.triger && main_character.age % 3 === 0){
          bulletList[bulletCount].shot();
          bulletCount++;
          if (bulletCount === bulletList.length - 1) {
            bulletCount = 0;
          }
      }
      if(arrows.right && main_character.x < canvas.width - 40){ main_character.x += 5 }
      if(arrows.up && main_character.y > 0){ main_character.y -= 5 }
      if(arrows.left && main_character.x > 0){ main_character.x -= 5}
      if(arrows.down && main_character.y < canvas.height - 40){ main_character.y += 5 }

      main_character.age++;
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
      break;
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
