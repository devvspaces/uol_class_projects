function setup()
{
	//create a canvas for the robot
	createCanvas(500, 500);
}

let r = 120;
let g = 112;
let b = 201;

function mouseClicked() {
	r = random(255);
	g = random(255);
	b = random(255);
}

function draw()
{
	strokeWeight(7);

	//robots head
	fill(r, g, b);
	rect(100, 100, 300, 300, 10);


	//robots antenna
	fill(250, 250, 0);
	ellipse(250, 70, 60, 60);

	fill(200, 0, 200);
	rect(210, 80, 80, 30);

	//robots eyes
	fill(255);
	ellipse(175, 200, 80, 80);

	noFill();
	arc(127, 200, 80, 80, -(HALF_PI + radians(-45)), (HALF_PI - radians(45)));
	arc(220, 200, 80, 80, (HALF_PI + radians(35)), (PI + radians(50)));

	fill(255);
	ellipse(325, 200, 80, 80);

	noFill();
	arc(277, 200, 80, 80, -(HALF_PI + radians(-45)), (HALF_PI - radians(45)));
	arc(370, 200, 80, 80, (HALF_PI + radians(35)), (PI + radians(50)));


	//robots nose
	fill(255, 0, 0);
	triangle(250, 300, 220, 250, 280, 250);

	//robots ears
	rect(80, 180, 30, 100);
	rect(390, 180, 30, 100);

	//robots mouth
	noFill();
	beginShape();
	vertex(175, 340);
	vertex(200, 370);
	vertex(225, 340);
	vertex(250, 370);
	vertex(275, 340);
	vertex(300, 370);
	vertex(325, 340);
	endShape();

	
	if (mouseIsPressed) {
		fill(0);
		point(mouseX, mouseY);
	}
}