var lines;
var car;
var padding;

function setup() {
  createCanvas(400, 400);
  // lines = [0]
  lines = [0, 200, 400, 600]
  padding = 10
  car = {
    x: constrain(100 + 10, 100 + 10, 300 - 10),
    w: 25,
    h: 40,
    speed: 2,
    action: {
      left: false,
      right: false,
      accelerating: false
    }
  }
}

function draw() {
  noStroke()
  background(0);
  
  fill(150)
  rect(100, 0, 200, height);
  
  stroke(255)
  lines.forEach((_line, index) => {
    line(width / 2, _line, width / 2, 75 + _line)
  
    lines[index] += car.speed;

    if (lines[index] >= height){
      lines[index] = -200;
    }
  })
  
  fill("red")
  rect(constrain(car.x, 100 + padding, 300 - car.w - padding), height - car.h - padding , car.w, car.h)
  
  if (car.action.left) {
    car.x -= 3
  }
  
  if (car.action.right) {
    car.x += 3
  }
  
  if (car.action.accelerating){
    car.speed *= 1.01
  } else {
    car.speed *= 0.99
  }

  car.speed = constrain(car.speed, 1, 10)
}

function keyPressed(){
  if (key == "ArrowLeft"){
    car.action.left = true
  }
  if (key == "ArrowRight"){
    car.action.right = true
  }
  if (key == "ArrowUp"){
    car.action.accelerating = true;
  }
}

function keyReleased(){
  car.action.left = false;
  car.action.right = false;
  car.action.accelerating = false;
}