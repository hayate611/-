window.onload = function () {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var context2 = canvas.getContext('2d');
  var x = 0;
  var y = 0;
  var arrows = {
    up: false,
    right: false,
    down: false,
    left: false,
  };
  console.log(context);

  setInterval(function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "aqua";
  context.fillRect(x, y, 10, 10);

  if(arrows.up === y > 0) { y--;}
  if(arrows.right === x < canvas.width) { x++;}
  if(arrows.down === y < canvas.height) { y++;}
  if(arrows.left === x > 0) { x--;}
}, 1000 / 120);

 setInterval(function () {
 context2.clearRect(10, 10, canvas.width, canvas.height);
 context2.fillStyle = "red";
 context2.fillRect(x, y, 10, 10);

 if(arrows.up === y > 0) { y--;}
 if(arrows.right === x < canvas.width) { x++;}
 if(arrows.down === y < canvas.height) { y++;}
 if(arrows.left === x > 0) { x--;}
}, 1000 / 120);

document.body.addEventListener('keydown', function (event) {
  console.log(event.keyCode);
  switch (event.keyCode) {
    case 38:
      arrows.up = true;
      break;
    case 39:
      arrows.right = true;
      break;
    case 40:
      arrows.down = true;
      break;
    case 37:
      arrows.left = true;
      break;
  }
 });

document.body.addEventListener('keyup', function (event) {
  console.log(event.keyCode);
  switch (event.keyCode) {
    case 38:
      arrows.up = false;
      break;
    case 39:
      arrows.right = false;
      break;
    case 40:
      arrows.down = false;
      break;
    case 37:
      arrows.left = false;
      break;
  }
 });
}
