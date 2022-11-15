var a;

function setup() {
  createCanvas(500, 500);
  a = 400;
}


function draw() {
  background(255)
  circle(150, a, 100)

  if ( a > 200){
    a--
  }

}