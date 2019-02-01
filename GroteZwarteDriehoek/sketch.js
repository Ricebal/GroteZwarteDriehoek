var bbt;
var destination = {
  x: 450,
  y: 450
}


function setup() {
  createCanvas(900, 900);
  bbt = new BigBlackTriangle(100, 600);
}

function draw() {
  background('#ffffff');
  circle(destination.x, destination.y, 5);
  bbt.update();
  bbt.draw();
}
