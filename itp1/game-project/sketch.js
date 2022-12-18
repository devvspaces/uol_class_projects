/*

The Game Project

*/

var canvasWidth;
var canvasHeight;
var gameChar_x;
var gameChar_y;
var ground_y;
var ground_height;
var treePos_x;
var treePos_y;

var obj = {
	head: {
		c: "#020e21", // color
		w: 20, // width
		h: 18, // height
		d: 10, // depth
		top: 72, // top_offset
	},
	neck: {
		c: "#333",
		w: 10,
		h: 2,
		d: 5,
	},
	body: {
		c: "#05aa53",
		w: 26,
		h: 30,
		d: 15
	},
	arm: {
		c: "#1a0702 ",
		w: 5,
		h: 22,
		top: 2,
		d: 5,
	},
	leg: {
		c: "#020e21",
		w: 5,
		h: 17,
		d: 5,
		jumping: {
			h: 10
		}
	},
	foot: {
		c: "red",
		w: 8,
		h: 3,
	},
	eye: {
		c: "255",
		r: 7, // radii
		d: 4, // depth
		inner: {
			c: "red",
			top: 0.5
		},
		top: 7,
	}
};


var tree = {
	x: 0,
	y: 0,
	height: 0,
}

var canyon = {
	x_pos: 0,
	width: 0,
}

var collectible = {
	x_pos: 0,
	y_pos: 0,
	size: 0,
}

var cloud = {
	x: 0,
	y: 0,
}

var mountain = {
	x: 0,
	y: 0,
}

var sky = {
	color: "rgb(100, 155, 255)"
}

function setup()
{
	canvasWidth = window.innerWidth;
	canvasHeight = window.innerHeight;
	createCanvas(canvasWidth, canvasHeight);

	ground_y = 500
	ground_height = canvasHeight - ground_y

	gameChar_x = 0;
	gameChar_y = 0;
	
	tree = {
		x: 450,
		y: 0,
		height: 150,
	}
	treePos_x = tree.x;
	treePos_y = tree.y;

	canyon = {
		x_pos: 700,
		width: 100,
	}

	collectible = {
		x_pos: 600,
		y_pos: 100,
		size: 20,
	}


	cloud = {
		x: 400,
		y: 100,
	}

	mountain = {
		x: 1000,
		y: ground_y,
	}
}

function draw()
{
	// fill the sky blue
	background(sky.color); 
	
	noStroke();

	push();
	//draw some green ground
	fill(0, 155, 0);
	rect(0, ground_y, canvasWidth, ground_height);
	pop();

	//1. a cloud in the sky
	push();
	fill(255);
	ellipse(cloud.x, cloud.y, 80, 70);
	ellipse(cloud.x + 100, cloud.y, 70, 80);
	ellipse(cloud.x + 50, cloud.y, 90, 100);
	pop();

	//2. a mountain in the distance
	push();
	var big_r = 170
	fill("#333");
	triangle(mountain.x - big_r, ground_y, mountain.x, 100, mountain.x + big_r, ground_y)

	var small_r = 90
	fill("#5b94a8");
	triangle(mountain.x - small_r, ground_y, mountain.x, 270, mountain.x + small_r, ground_y)
	pop();

	//3. a tree
	push();
	fill("#454")
	rect(treePos_x, ground_y - tree.height, 30, tree.height)

	fill("green")
	ellipse(treePos_x + 15, ground_y - tree.height - 50, 210, 150)
	stroke("red");
	strokeWeight(15)
	point(treePos_x + 15, ground_y - tree.height - 50)
	point(treePos_x, ground_y - tree.height - 15)
	point(treePos_x - 40, ground_y - tree.height - 60)
	point(treePos_x + 70, ground_y - tree.height - 60)
	pop()

	//4. a canyon
	//NB. the canyon should go from ground-level to the bottom of the screen
	push();
	fill(sky.color)
	rect(canyon.x_pos, ground_y, canyon.width, ground_height)
	pop()

	//5. a collectable token - eg. a jewel, fruit, coins
	push();
	
	push();
	fill("brown");
	stroke("black")
	strokeWeight(3)
	rect(collectible.x_pos - collectible.size / 2, ground_y - collectible.size, collectible.size)
	pop();

	fill("255");
	ellipse(collectible.x_pos, ground_y - collectible.size / 2, collectible.size / 2)

	pop();

	// Draw the game character
	faceFront(constrain(
		gameChar_x,
		obj.body.w,
		canvasWidth - obj.body.w
	), constrain(
		gameChar_y,
		(canvasHeight - ground_height),
		canvasHeight - ground_height
	));
}


function mousePressed(){
	gameChar_x = mouseX;
	gameChar_y = mouseY;
}

function faceFront(gameChar_x, gameChar_y) {
	// head
	fill(obj.head.c)
	rect(gameChar_x - obj.head.w / 2, gameChar_y - obj.head.top, obj.head.w, obj.head.h, 2);

	fill(obj.eye.c)
	ellipse(gameChar_x, gameChar_y - obj.head.top + obj.eye.top, obj.eye.r)
	stroke(obj.eye.inner.c)
	point(gameChar_x, gameChar_y - obj.head.top + obj.eye.top + obj.eye.inner.top)
	noStroke()

	// neck
	fill(obj.neck.c)
	rect(gameChar_x - obj.neck.w / 2, gameChar_y - obj.head.top + obj.head.h, obj.neck.w, obj.neck.h)

	// body
	fill(obj.body.c)
	rect(gameChar_x - obj.body.w / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h, obj.body.w, obj.body.h, 2)

	// arms
	fill(obj.arm.c)

	// right arm
	rect(gameChar_x - obj.arm.w - 13, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top, obj.arm.w, obj.arm.h, 5, 0, 0, 0)

	// left arm
	rect(gameChar_x + 13, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top, obj.arm.w, obj.arm.h, 0, 5, 0, 0)

	// legs
	fill(obj.leg.c)

	// right leg
	rect(gameChar_x - (obj.leg.w + 3.5), gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.body.h, obj.leg.w, obj.leg.h)

	// left leg
	rect(gameChar_x + 3.5, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.body.h, obj.leg.w, obj.leg.h)

	// foot
	fill(obj.foot.c)

	// right foot
	rect(gameChar_x - (obj.leg.w / 2) - (obj.foot.w / 2) - 3.5, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.body.h + obj.leg.h, obj.foot.w, obj.foot.h, 2)

	// left foot
	rect(gameChar_x + 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.body.h + obj.leg.h, obj.foot.w, obj.foot.h, 2)

}