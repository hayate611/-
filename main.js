$(function () {
  var img = [new Image(),new Image(),new Image()];
  img[0].src = 'data/body.png';
  img[1].src = 'data/tama1.png';
  img[2].src = 'data/teki2.png';
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext('2d');
  const fps = 30;
  var main_character = {
    x : 170,
    y : 300,
    age : 0,
    key : {
      left: false,
      up: false,
      right: false,
      left: false,
      triger: false
    }
  }

  main_character.bx = main_character.x;
  main_character.by = main_character.y;

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

  class Enemy {
    constructor(x, y, img_name) {
      this.x = x;
      this.y = y;
      this.img = img_name;
      this.size = [20,20];
      this.move_age = 0;
    }

    display() {
      context.drawImage(this.img,this.x, this.y, this.size[0], this.size[1]);
    }

    move(x_move, y_move) {
      this.move_age++;
      this.x -= x_move;
      this.y -= y_move;
      context.drawImage(this.img, this.x , this.y, this.size[0], this.size[1]);
    }

  }

  var enemy = new Enemy (100,20,img[2]);
  var bulletList = new Array(30);
  for (var i = 0; i < bulletList.length; i++) {
    bulletList[i] = new Bullet();
  }
  var bulletCount = 0;

  var main_interval = setInterval(function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img[0],main_character.x, main_character.y, 40, 40);
    
    if (main_character.x >= main_character.bx - 20 && main_character.bx <= main_character.x + 20  && main_character.y >= main_character.by - 16 && main_character.y <= main_character.by + 16) {
      clearInterval(main_interval)
    }

    enemy.display();
    enemy.move(0,-2)

    for (var i = 0; i < bulletList.length; i++) {
      if(bulletList[i].visble){
        bulletList[i].enterframe();
      }
    }


      if(main_character.key.triger && main_character.age % 3 === 0){
          bulletList[bulletCount].shot();
          bulletCount++;
          if (bulletCount === bulletList.length - 1) {
            bulletCount = 0;
          }
      }
      if(main_character.key.right && main_character.x < canvas.width - 40){ main_character.x += 5 }
      if(main_character.key.up && main_character.y > 0){ main_character.y -= 5 }
      if(main_character.key.left && main_character.x > 0){ main_character.x -= 5}
      if(main_character.key.down && main_character.y < canvas.height - 40){ main_character.y += 5 }

      main_character.age++;
  }, 1000 / fps);



  $(window).keydown(function(event) {
    switch (event.keyCode) {
      case 37:
        main_character.key.left = true;
      break;

      case 38:
        main_character.key.up = true;
      break;

      case 39:
        main_character.key.right = true;
      break;

      case 40:
        main_character.key.down = true;
      break;

      case 90:
        main_character.key.triger = true;
      break;
    }

  })

$(window).keyup(function(event) {
    switch (event.keyCode) {
      case 37:
        main_character.key.left = false;
      break;

      case 38:
        main_character.key.up = false;
      break;

      case 39:
        main_character.key.right = false;
      break;

      case 40:
        main_character.key.down = false;
      break;

      case 90:
        main_character.key.triger = false;
      break;
    }
  })

})
