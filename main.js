$(function () {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext('2d');

/*============================================================================//
// ■ Main_data
//----------------------------------------------------------------------------//
//  ゲームで使う変数や画像の登録、弾の準備など必要なものを全て揃えるクラス
//============================================================================*/

  class Main_data {
    constructor() {
      this.img = {
        main : new Image(),
        enemy : [
          new Image(),
          new Image()
        ],
        shot : [
          new Image()
        ]
      }
      this.fps = 30;
      this.img.main.src = 'data/body.png';
      this.img.enemy[0].src = 'data/teki2.png';
      this.img.shot[0].src = 'data/tama1.png';
      bulletList = new Array(30);
      main_character = new Main_character ();
      for (var i = 0; i < bulletList.length; i++) {
        bulletList[i] = new Bullet();
      }
      bulletCount = 0;

    }
  }

/*============================================================================//
// ■ Main_game
//----------------------------------------------------------------------------//
//  ゲーム実行時に使用するcanvasの設定を一括で行うクラス
//============================================================================*/
  class Main_game {

    main() {

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(main_data.img.main,main_character.x, main_character.y, main_character.size[0], main_character.size[1]);

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

      if (enemy !== []){
        for (var i = 0; i < enemy.length; i++){
          enemy[i].move(0,-2);
          enemy[i].display();
        }
        for (var i = 0; i < bulletList.length; i++){
          for (var j = 0; j < enemy.length; j++){
            if ((bulletList[i].x <= enemy[j].x && bulletList[i].x + bulletList[i].width >= enemy[j].x) || (bulletList[i].x <= enemy[j].x - enemy[j].size[0] && bulletList[i].x + bulletList[i].width >= enemy[j].x - enemy[j].size[0])){
              if ((bulletList[i].y <= enemy[j].y && bulletList[i].y + bulletList[i].height >= enemy[j].y) || (bulletList[i].y <= enemy[j].y + enemy[j].size[1] && bulletList[i].y + bulletList[i].height >= enemy[j].y + enemy[j].size[1])){
                bulletList[i] = new Bullet();
                enemy[j].hp -= 1;
              }
            }
          }
        }
      }

      main_character.age++;
      main_game.enemy_assignment();
    }

    move() {

            if(main_character.key.right && main_character.x < canvas.width - main_character.size[0]){ main_character.x += main_character.speed }
            if(main_character.key.up && main_character.y > 0){ main_character.y -= main_character.speed }
            if(main_character.key.left && main_character.x > 0){ main_character.x -= main_character.speed}
            if(main_character.key.down && main_character.y < canvas.height - main_character.size[1]){ main_character.y += main_character.speed }

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
    }

    enemy_assignment() {
      for (var i = 0; i < enemy.length; i++){
        if (enemy[i].y >= 640){
          enemy.splice(i,1);
        }else if (enemy[i].x >= 401){
          enemy.splice(i,1);
        }
      }

      if (main_character.age == 10){
        enemy.push(new Enemy(20,0,main_data.img.enemy[0]));
      }else if (main_character.age == 100){
        enemy.push(new Enemy(30,0,main_data.img.enemy[0]));
        enemy.push(new Enemy(100,0,main_data.img.enemy[0]));
      }
    }
  }

/*============================================================================//
// ■ Main_character
//----------------------------------------------------------------------------//
//  ゲーム上の操作キャラの変数を作るクラス
//============================================================================*/
  class Main_character {
    constructor() {
      this.x = 170;
      this.y = 300;
      this.age = 0;
      this.speed = 5;
      this.key = {
        left : false,
        up : false,
        right : false,
        down : false,
        triger : false
      }
      this.size = [50,31];
      this.bx = this.x;
      this.by = this.y;
    }
  }

/*============================================================================//
// ■ Bullet
//----------------------------------------------------------------------------//
//  ゲームで使う弾の変数・移動・表示まで行うクラス
//============================================================================*/
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

    shot_move() {
      context.drawImage(main_data.img.shot[0],this.x + 17.5,this.y,this.width, this.height);
    }

    enterframe() {
      this.y -= 10;
      this.shot_move();
      if(this.x < 0){
        this.init();
      }
    }
  }

/*============================================================================//
// ■ Enemy
//----------------------------------------------------------------------------//
//  ゲームに登場する敵キャラの変数・移動・表示まで行うクラス
//============================================================================*/
  class Enemy {
    constructor(x, y, img_name) {
      this.x = x;
      this.y = y;
      this.img = img_name;
      this.size = [img_name.width-20,img_name.height-20];
      this.move_age = 0;
      this.mhp = 20;
      this.hp = 20;

    }

    display() {
      if (this.hp > 0){
        context.drawImage(this.img,this.x, this.y, this.size[0], this.size[1]);
      }else if (this.hp < 0){
        this.y = 6000;
      }
    }

    move(x_move, y_move) {
      this.move_age++;
      this.x; //+= Math.cos(this.move_age * 100) * 5; //x_move;
      this.y += Math.sin(this.move_age * 100) * 5 - y_move;
    }

  }
/*============================================================================//
// ■ 開始処理
//----------------------------------------------------------------------------//
//  ゲームを開始するための処理
//============================================================================*/
  var enemy = [], bulletList, main_character, bulletCount, enemy_id;
  var main_data = new Main_data();
  var main_game = new Main_game();

  var main_interval = setInterval(function() {
    main_game.main();
    main_game.move();
  }, 1000 / main_data.fps);

})
