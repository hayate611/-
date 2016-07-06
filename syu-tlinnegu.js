window.onload = function() {
    var canvas = document.getElementById('screen');
    canvas.width = 640;
    canvas.height = 480;
    var ctx = canvas.getContext('2d');
    document.addEventListener("keydown", keyDownFunc);
    document.addEventListener("keyup", keyUpFunc);
    var keyDown = {};
    var key = {
        U: 38,
        L: 37,
        D: 40,
        R: 39,
        S: 32
    };
    var player = new Player(); //自機
    var pbullet = []; //自機の弾
    var enemys = []; //敵
    var ebullet = []; //敵の弾
    var explosion = []; //爆発
    var ShotBInterval = 0; //弾の有効期限
    var EInterval = 0; //敵の有効期限
    var playerdamage = 0; //自機のダメージフラグ
    var enemysdamage = 0; //敵のダメージフラグ
    // 音声ファイル
    var AUDIO_LIST = {
        "bshot": new Audio("sound/bshot.mp3"),
        "bomb": new Audio("sound/bomb.mp3"),
        "bstruck": new Audio("sound/bstruck.mp3"),
        "fall": new Audio("sound/fall.mp3"),
        "damage": new Audio("sound/damage.mp3")
    };
    aloop = setInterval(loop, 1000 / 60);

    function keyDownFunc(e) {
        keyDown[e.keyCode] = true;
    }

    function keyUpFunc(e) {
        keyDown[e.keyCode] = false;
    }
    // メイン
    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        playerDraw();
        enemyDraw();
        if(playerdamage == 0){
            playerMove();
            if (keyDown[key.S]) pBulletShot();
            pbulletDraw();
            pbulletMove();
            calcpBulletLimit();
            bulletInterval();
            enemypush();
            enemyMove();
            enemyInterval();
        }else{
            player_damage_out();
        }
        for (var i = 0; i < enemys.length; i++) {
            if (hitCheck(player.x, player.y, player,enemys[i].x, enemys[i].y, enemys[i])) {
                playerdamage = 1;
                AUDIO_LIST["damage"].play();
            }
            for (var c = 0; c < pbullet.length; c++) {
                if (hitCheck(pbullet[c].x, pbullet[c].y, pbullet[c],enemys[i].x, enemys[i].y, enemys[i])) {
                    pbullet.splice(c, 1);
                    enemys.splice(i, 1);
                    c--;
                    i--;
                    AUDIO_LIST["bstruck"].play();
                    AUDIO_LIST["bstruck"] = new Audio(AUDIO_LIST["bstruck"].src);
                    AUDIO_LIST["damage"].play();
                    AUDIO_LIST["damage"] = new Audio(AUDIO_LIST["damage"].src);
                    AUDIO_LIST["bomb"].play();
                    AUDIO_LIST["bomb"] = new Audio(AUDIO_LIST["bomb"].src);
                }
            }
        }
    }
    // 自機
    function Player() {
        this.width = 55;
        this.height = 46;
        this.x = 10;
        this.y = ((canvas.height / 2) - (this.height / 2));
        this.dx = 7; // x座標の速度
        this.dy = 7; // y座標の速度
        this.friction = 1; // 摩擦（減速率）
        this.alpha = 1; // 透明度
        this.outdy = 0; // 敵に当たった時のy座標の速度
    }

    function playerDraw() {
        // 表示
        var img = new Image();
        img.src = "img/player.png";
        /* 画像を描画 */
        ctx.drawImage(img, player.x, player.y);
        ctx.globalAlpha = player.alpha;
    }

    function playerMove() {
        // 加速
        if (keyDown[key.U] || keyDown[key.D] || keyDown[key.L] || keyDown[key.R]) {
            if (keyDown[key.U] || keyDown[key.D] && keyDown[key.L] || keyDown[key.R])
                player.friction = 0.7;
            if (keyDown[key.U]) player.y -= (player.dy * player.friction);
            if (keyDown[key.L]) player.x -= (player.dx * player.friction);
            if (keyDown[key.D]) player.y += (player.dy * player.friction);
            if (keyDown[key.R]) player.x += (player.dx * player.friction);
            if (keyDown[key.S]) player.friction *= 0.7;
            if ((canvas.width - player.width) <= player.x) {
                player.x = canvas.width - player.width;
            }
            if (player.x < 0) {
                player.x = 0;
            }
            if ((canvas.height - player.height) <= player.y) {
                player.y = canvas.height - player.height;
            }
            if (player.y < 0) {
                player.y = 0;
            }
        }
    }
    function player_damage_out(){
        player.outdy += 0.1;
        player.y += (player.outdy * 3);
        if ((canvas.height - player.height) > player.y) {
            AUDIO_LIST["fall"].play();
        }
    }
    // 弾
    function Bullet(size, x, y, speed) {
        this.width = 32;
        this.height = 15;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.friction = 0.9; // 摩擦（減速率）
        this.limit = 140;
    }

    function pBulletShot() {
        if (ShotBInterval == 0) {
            pbullet.push(new Bullet(0, player.x + (player.width / 2), player.y + (
                player.height / 2), 5));
            AUDIO_LIST["bshot"].play();
            AUDIO_LIST["bshot"] = new Audio(AUDIO_LIST["bshot"].src);
            ShotBInterval = 15;
        }
    }

    function pbulletDraw() {
        for (var i = 0; i < pbullet.length; i++) {
            ctx.beginPath();
            var img = new Image();
            img.src = "img/p_bullet.png";
            /* 画像を描画 */
            ctx.globalCompositeOperation = "destination-over";
            ctx.drawImage(img, pbullet[i].x, pbullet[i].y);
        }
    }

    function pbulletMove() {
        for (var i = 0; i < pbullet.length; i++) {
            pbullet[i].x += pbullet[i].speed * pbullet[i].friction;
        }
    }

    function calcpBulletLimit() {
        for (var i = 0; i < pbullet.length; i++) {
            if (pbullet[i].limit > 0) {
                pbullet[i].limit--;
            } else {
                pbullet.splice(i, 1);
                i--;
            }
        }
    }

    function bulletInterval() {
        if (ShotBInterval > 0) {
            ShotBInterval--;
        }
    }
    // 敵
    function Enemy() {
        this.width = 53;
        this.height = 51;
        this.x = canvas.width;
        this.y = Math.floor(Math.random() * (canvas.height - this.height));
        this.dx = 0; // x座標の速度
        this.dy = 0; // y座標の速度
        this.acceleration = 0.3; // 加速度
        this.friction = 0.9; // 摩擦（減速率）
    }

    function enemypush() {
        if (EInterval == 0) {
            enemys.push(new Enemy());
            EInterval = 45;
        }
    }

    function enemyDraw() {
        for (var i = 0; i < enemys.length; i++) {
            var img = new Image();
            img.src = "img/enemy.png";
            /* 画像を描画 */
            ctx.drawImage(img, enemys[i].x, enemys[i].y);
        }
    }

    function enemyMove() {
        for (var i = 0; i < enemys.length; i++) {
            // 加速
            enemys[i].dx += enemys[i].acceleration;
            // 減速
            enemys[i].dx = enemys[i].dx * enemys[i].friction;
            enemys[i].dy = enemys[i].dy * enemys[i].friction;
            // 移動
            enemys[i].x -= enemys[i].dx;
            enemys[i].y -= enemys[i].dy;
            if ((enemys[i].x + enemys[i].width) < 0) {
                enemys.splice(i, 1);
                i--;
            }
        }
    }

    function enemyInterval() {
        if (EInterval > 0) {
            EInterval--;
        }
    }
    // 衝突判定
    var hitCheck = function(x1, y1, obj1, x2, y2, obj2) {
        var cx1, cy1, cx2, cy2, r1, r2, d;
        // 中心座標の取得
        cx1 = x1 + obj1.width / 2;
        cy1 = y1 + obj1.height / 2;
        cx2 = x2 + obj2.width / 2;
        cy2 = y2 + obj2.height / 2;
        // 半径の計算
        r1 = (obj1.width + obj1.height) / 4;
        r2 = (obj2.width + obj2.height) / 4;
        // 中心座標同士の距離の測定
        // Math.sqrt(d) -- dのルートを返す
        // Math.pow(x, a) -- xのa乗を返す
        d = Math.sqrt(Math.pow(cx1 - cx2, 2) + Math.pow(cy1 - cy2, 2));
        // 当たっているか判定
        // ちなみに `return r1+r2 > d;` とだけ書いてもOK
        if (r1 + r2 > d) {
            // 当たってる
            return true;
        } else {
            // 当たっていない
            return false;
        }
    };
};
