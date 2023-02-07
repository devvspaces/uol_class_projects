
var myPoint;
var myPoints;
var pos;
var move;


function setup() {

    createCanvas(500, 500);

    myPoint = createVector(0, -450)
    myPoint.mult(0.5)

    myPoints = [];

    for (let i = 0; i < 100; i++) {
        var point = createVector(
            random(-width / 2, width / 2),
            random(-height / 2, height / 2)
        )
        point.normalize()
        point.mult(20)
        myPoints.push(point)
    }

    pos = 1;
    move = 0.001;

}

function draw() {

    background(0, 0, 0);

    translate(width / 2, height / 2);

    if (pos > 1 || pos < 0) move *= -1;

    pos += move;

    var v = p5.Vector.mult(myPoint, pos)

    fill(255)
    ellipse(v.x, v.y, 50)

    stroke(255)
    line(0, 0, myPoint.x, myPoint.y)
    myPoint.rotate(0.01)

    push()
    myPoints.forEach(value => {
        stroke('red')
        value.mult(1.001)
        value.rotate(random(0, 2 * PI))
        line(0, 0, value.x, value.y)
    })
    pop()

}

function keyPressed() {

}


