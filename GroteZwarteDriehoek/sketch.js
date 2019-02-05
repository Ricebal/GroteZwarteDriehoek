var bbt;
var destination = {
  position: 0
}


function setup() {
  createCanvas(900, 900);
  destination.position = createVector(450, 450);
  bbt = new BigBlackTriangle(100, 600);
}

function draw() {
  background('#ffffff');
  circle(destination.position.x, destination.position.y, 5);
  bbt.update();
}

function mouseClicked() {
  destination.position = createVector(mouseX, mouseY);
}