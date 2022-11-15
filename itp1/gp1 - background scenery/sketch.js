/*

The Game Project

1 - Background Scenery

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the scenery as set out in the code comments. The items
should appear next to the text titles.

Each bit of scenery is worth two marks:

0 marks = not a reasonable attempt
1 mark = attempted but it's messy or lacks detail
2 marks = you've used several shape functions to create the scenery

I've given titles and chosen some base colours, but feel free to
imaginatively modify these and interpret the scenery titles loosely to
match your game theme.

WARNING: Do not get too carried away. If you're shape takes more than 15 lines of code to draw then you've probably over done it.


*/

function setup()
{
	createCanvas(1024, 576);
}

function draw()
{
	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(0,155,0);
	var ground_y = 432
	rect(0, ground_y, 1024, 144); //draw some green ground

	//1. a cloud in the sky
	//... add your code here
	fill(255);
	ellipse(200, 150, 80, 70);
	ellipse(300, 150, 80, 80);
	ellipse(250, 150, 90, 100);

	noStroke();
	fill(255);
	text("cloud", 200, 100);

	//2. a mountain in the distance
	//... add your code here
	var big_x = 600
	var big_r = 120
	fill("#333");
	triangle(big_x - big_r, ground_y, big_x, 100, big_x + big_r, ground_y)

	var small_x = 550
	var small_r = 70
	fill("#553");
	triangle(small_x - small_r, ground_y, small_x, 270, small_x + small_r, ground_y)

	noStroke();
	fill(255);
	text("mountain", 500, 256);

	//3. a tree
	//... add your code here
	fill("#454")
	var tree_height = 150
	rect(850, ground_y - tree_height, 30, tree_height)

	fill("green")
	ellipse(850 + 15, ground_y - tree_height - 50, 210, 150)
	stroke("red");
	strokeWeight(15)
	point(850 + 15, ground_y - tree_height - 50)
	point(850, ground_y - tree_height - 15)
	point(810, ground_y - tree_height - 60)
	point(920, ground_y - tree_height - 60)

	noStroke();
	fill(255);
	text("tree", 800, 346);

	//4. a canyon
	//NB. the canyon should go from ground-level to the bottom of the screen
	fill("#112")
	quad(50, ground_y, 250, ground_y, 200, 576, 100, 576)
	quad(80, ground_y, 200, ground_y, 220, 576, 50, 576)

	//... add your code here

	noStroke();
	fill(255);
	text("canyon", 100, 480);

	//5. a collectable token - eg. a jewel, fruit, coins
	//... add your code here
	fill("brown");
	stroke("black")
	strokeWeight(3)
	rect(370, ground_y - 50, 30, 50, 30, 0, 30, 0)

	noStroke();
	fill(255);
	text("collectable item", 400, 400);
}
