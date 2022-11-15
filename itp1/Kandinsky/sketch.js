function setup()
{
	//create your canvas here
	createCanvas(500, 500);
}

function draw()
{
	//do your drawing here
	background(34);
	strokeWeight(1);
	stroke(255, 255, 255);
	fill("red");
	circle(300, 300, 60);

	line(10, 10, 400, 400);

	push();
	stroke("yellow");
	strokeWeight(5);
	line(10, 400, 400, 10);
	pop();

	push();
	noFill();
	strokeWeight(10);
	circle(201, 201, 350);
	pop();


	noStroke();
	fill(128, 0, 23, 150);
	circle(300, 100, 170);

	stroke("blue");
	strokeWeight(5);
	line(195, 50, 290, 390);
}