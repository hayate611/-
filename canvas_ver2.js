window.onload = function() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var x = 0, y = 0;
  var arrows = {
    left: false,
    up: false,
    right: false,
    left: false
  };
//   setInterval(function() {
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     context.fillStyle = "#48D1CC"
//     context.fillRect(x, y, 10, 10);
//     if(arrows.right && x < canvas.width - 10){x += 190;}
//     if(arrows.up && y > 0){y -= 170;}
//     if(arrows.left && x > 0){x -= 190;}
//     if(arrows.down && y < canvas.height - 10){y += 170;}
//   }, 1000 / 30);
// ​
​
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
    }
  })
}
