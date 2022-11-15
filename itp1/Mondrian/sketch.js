function setup()
{
	//create a large square canvas
	createCanvas(800, 800);
}

function draw()
{

	

	//set the fill colour to red
	fill(255, 0, 0);

	let xOffset = 12;
	let yOffset = 50;

	//set a thick stroke weight for the black lines
	strokeWeight(12);

	//draw the red rectangle 
	rect(100, yOffset, 600, 600);

	//set the fill colour to white
	fill(255);
	rect(-xOffset, yOffset, 100 + xOffset, 300);
	rect(-xOffset, 300 + yOffset, 100 + xOffset, 300);

	// set the fill colour to blue
	fill(0, 0, 255);
	rect(-xOffset, 600 + yOffset, 100 + xOffset, 200);

	//set the fill colour to blue
	fill(0, 0, 255);
	rect(700, yOffset, 100 + xOffset, 200);

	//set the fill colour to sun yellow
	fill(255, 255, 0);
	rect(700, 200 + yOffset, 100 + xOffset, 400);

	//set the fill colour to green
	fill(0, 255, 0);
	rect(700, 600 + yOffset, 100 + xOffset, 200);


	//set the fill colour to white
	fill(255);
	rect(100, 600 + yOffset, 600, 50);
	rect(100, 720 + yOffset, 600, 50);

	//set the fill colour to yellow
	fill(255, 255, 0);
	rect(100, 600 + yOffset + 50, 300, 70);

	
	//set the fill colour to blue

	if (mouseIsPressed === true){
		fill(0, 0, 255);
		ellipse(mouseX, mouseY, 100);
	}

}