/*

The Game Project

2 - Game character

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the different states of your game character.

Write the code so that your character appears inside the box for each
state.

IMPORTANT: For each box the variables gameChar_x & gameChar_y are set to the bottom
center of the box. You must combine these variables with arithmetic to
determine the position of each shape that you draw. This will later allow
you to adjust the position of your game character.

Each state is worth two marks:

//standing front facing = 2
//jumping facing forwards = 2
//walking left = 2
//walking right = 2
//jumping left and jumping right = 2

0 marks = not a reasonable attempt
1 mark = attempted but it lacks detail and you didn't use gameChar_x and gameChar_y correctly
2 marks = you've used a selction of shape functions and made consistent use of gameChar_x and gameChar_y

WARNING: Do not get too carried away. Around 10-20 lines of code should work for each state of your game character.

*/

var gameChar_x = 0;
var gameChar_y = 0;

var obj = {
	head: {
		c: "grey", // color
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
		c: "#333",
		w: 5,
		h: 22,
		top: 2,
		d: 5,
	},
	leg: {
		c: "grey",
		w: 5,
		h: 17,
		d: 5,
		jumping: {
			h: 10
		}
	},
	foot: {
		c: "#333",
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

function setup() {
	createCanvas(400, 600);
}

function draw() {
	background(255);

	//Standing, facing frontwards

	stroke(100);
	noFill();
	rect(20, 60, 50, 80);
	noStroke();
	fill(0);
	text("1. standing front facing", 20, 160);

	gameChar_x = 45;
	gameChar_y = 137;
	faceFront(gameChar_x, gameChar_y);


	//Jumping facing forwards
	stroke(100);
	noFill();
	rect(220, 60, 50, 80);
	noStroke();
	fill(0);
	text("2. jumping facing forwards", 220, 160);

	gameChar_x = 245;
	gameChar_y = 137;
	jumpFaceForward(gameChar_x, gameChar_y)


	//Walking, turned left
	stroke(100);
	noFill();
	rect(20, 260, 50, 80);
	noStroke();
	fill(0);
	text("3. Walking left", 20, 360);

	gameChar_x = 45;
	gameChar_y = 337;
	walkingLeft(gameChar_x, gameChar_y)


	//Walking, turned right
	stroke(100);
	noFill();
	rect(220, 260, 50, 80);
	noStroke();
	fill(0);
	text("4. Walking right", 220, 360);

	gameChar_x = 245;
	gameChar_y = 337;
	walkingRight(gameChar_x, gameChar_y)


	//Jumping right
	stroke(100);
	noFill();
	rect(20, 460, 50, 80);
	noStroke();
	fill(0);
	text("5. Jumping to the right", 20, 560);

	gameChar_x = 45;
	gameChar_y = 537;
	jumpingRight(gameChar_x, gameChar_y)


	//Jumping to the left
	stroke(100);
	noFill();
	rect(220, 460, 50, 80);
	noStroke();
	fill(0);
	text("6. Jumping to the left", 220, 560);

	gameChar_x = 245;
	gameChar_y = 537;
	jumpLeft(gameChar_x, gameChar_y)

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


function jumpFaceForward(gameChar_x, gameChar_y) {
	// head
	fill(obj.head.c)
	rect(gameChar_x - 10, gameChar_y - obj.head.top, obj.head.w, obj.head.h, 2);

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
	rect(gameChar_x - 5 - 13, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top, obj.arm.w, obj.arm.h, 5, 0, 0, 0)

	// left arm
	rect(gameChar_x + 13, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top, obj.arm.w, obj.arm.h, 0, 5, 0, 0)

	// legs
	fill(obj.leg.c)

	// right leg
	rect(gameChar_x - 8.5, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.body.h, obj.leg.w, obj.leg.jumping.h)

	// left leg
	rect(gameChar_x + 3.5, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.body.h, obj.leg.w, obj.leg.jumping.h)

	// foot
	fill(obj.foot.c)

	// right foot
	rect(gameChar_x - 2.5 - 4 - 3.5, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.body.h + obj.leg.jumping.h, obj.foot.w, obj.foot.h, 2)

	// left foot
	rect(gameChar_x + 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.body.h + obj.leg.jumping.h, obj.foot.w, obj.foot.h, 2)

}


function walkingLeft(gameChar_x, gameChar_y) {
	// eyes
	fill(obj.eye.c)
	stroke(100)
	ellipse(gameChar_x - obj.eye.d, gameChar_y - obj.head.top + obj.eye.top, obj.eye.r)
	noStroke()

	// head
	fill(obj.head.c)
	rect(gameChar_x - obj.head.d / 2, gameChar_y - obj.head.top, obj.head.d, obj.head.h);

	// neck
	fill(obj.neck.c)
	rect(gameChar_x - obj.neck.d / 2, gameChar_y - obj.head.top + obj.head.h, obj.neck.d, obj.neck.h)

	// Right arm
	fill(obj.arm.c)
	beginShape()
	vertex(gameChar_x + obj.arm.d * 2 + obj.arm.d, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h + obj.arm.d * 0.3)
	vertex(gameChar_x + obj.arm.d * 2 + obj.arm.d, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - obj.arm.d)
	vertex(gameChar_x - obj.arm.d / 2 + obj.arm.d, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top)
	vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.d)
	endShape(CLOSE)

	// body
	fill(obj.body.c)
	rect(gameChar_x - obj.body.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h, obj.body.d, obj.body.h, 2)

	// left arm
	fill(obj.arm.c)
	beginShape()
	vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top)
	vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 10)
	vertex(gameChar_x - obj.arm.d * 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 5)
	vertex(gameChar_x - obj.arm.d * 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h)
	vertex(gameChar_x - obj.arm.d / 2 + obj.arm.d, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 8)
	vertex(gameChar_x - obj.arm.d / 2 + obj.arm.d, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top)
	vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top)
	endShape(CLOSE)

	// left leg
	fill(obj.leg.c)
	rect(gameChar_x - obj.leg.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.body.h, obj.leg.d, obj.leg.h)
	// left foot
	fill(obj.foot.c)
	rect(gameChar_x - obj.foot.w / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.body.h + obj.leg.h, obj.foot.w, obj.foot.h, 2)
}


function walkingRight(gameChar_x, gameChar_y) {
	// eyes
	fill(obj.eye.c)
	stroke(100)
	ellipse(gameChar_x + obj.eye.d, gameChar_y - obj.head.top + obj.eye.top, obj.eye.r)
	noStroke()

	// head
	fill(obj.head.c)
	rect(gameChar_x - obj.head.d / 2, gameChar_y - obj.head.top, obj.head.d, obj.head.h);

	// neck
	fill(obj.neck.c)
	rect(gameChar_x - obj.neck.d / 2, gameChar_y - obj.head.top + obj.head.h, obj.neck.d, obj.neck.h)

	// Right arm
	fill(obj.arm.c)
	beginShape()
	vertex(gameChar_x - obj.arm.d * 2 - obj.arm.d, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h + obj.arm.d * 0.3)
	vertex(gameChar_x - obj.arm.d * 2 - obj.arm.d, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - obj.arm.d)
	vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + 3)
	vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.d + 5)
	endShape(CLOSE)

	// body
	fill(obj.body.c)
	rect(gameChar_x - obj.body.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h, obj.body.d, obj.body.h, 2)

	// left arm
	fill(obj.arm.c)
	beginShape()
	vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top)
	vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 8)
	vertex(gameChar_x + obj.arm.d * 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h)
	vertex(gameChar_x + obj.arm.d * 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 5)
	vertex(gameChar_x - obj.arm.d / 2 + obj.arm.d, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 10)
	vertex(gameChar_x - obj.arm.d / 2 + obj.arm.d, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top)
	vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top)
	endShape(CLOSE)

	// left leg
	fill(obj.leg.c)
	rect(gameChar_x - obj.leg.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.body.h, obj.leg.d, obj.leg.h)
	// left foot
	fill(obj.foot.c)
	rect(gameChar_x - obj.foot.w / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.body.h + obj.leg.h, obj.foot.w, obj.foot.h, 2)
}


function jumpLeft(gameChar_x, gameChar_y) {
	// eyes
	fill(obj.eye.c)
	stroke(100)
	ellipse(gameChar_x - obj.eye.d, gameChar_y - obj.head.top + obj.eye.top, obj.eye.r)
	noStroke()

	// head
	fill(obj.head.c)
	rect(gameChar_x - obj.head.d / 2, gameChar_y - obj.head.top, obj.head.d, obj.head.h);

	// neck
	fill(obj.neck.c)
	rect(gameChar_x - obj.neck.d / 2, gameChar_y - obj.head.top + obj.head.h, obj.neck.d, obj.neck.h)

	// Right arm
	fill(obj.arm.c)
	beginShape()
	vertex(gameChar_x + obj.arm.d * 2 + obj.arm.d, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h + obj.arm.d * 0.3)
	vertex(gameChar_x + obj.arm.d * 2 + obj.arm.d, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - obj.arm.d)
	vertex(gameChar_x - obj.arm.d / 2 + obj.arm.d, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top)
	vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.d)
	endShape(CLOSE)

	// body
	fill(obj.body.c)
	rect(gameChar_x - obj.body.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h, obj.body.d, obj.body.h, 2)

	// left arm
	fill(obj.arm.c)
	beginShape()
	vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top)
	vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 10)
	vertex(gameChar_x - obj.arm.d * 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 5)
	vertex(gameChar_x - obj.arm.d * 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h)
	vertex(gameChar_x - obj.arm.d / 2 + obj.arm.d, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 8)
	vertex(gameChar_x - obj.arm.d / 2 + obj.arm.d, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top)
	vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top)
	endShape(CLOSE)

	// left leg
	fill(obj.leg.c)
	rect(gameChar_x - obj.leg.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.body.h, obj.leg.d, obj.leg.jumping.h)
	// left foot
	fill(obj.foot.c)
	rect(gameChar_x - obj.foot.w / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.body.h + obj.leg.jumping.h, obj.foot.w, obj.foot.h, 2)
}


function jumpingRight(gameChar_x, gameChar_y) {
	// eyes
	fill(obj.eye.c)
	stroke(100)
	ellipse(gameChar_x + obj.eye.d, gameChar_y - obj.head.top + obj.eye.top, obj.eye.r)
	noStroke()

	// head
	fill(obj.head.c)
	rect(gameChar_x - obj.head.d / 2, gameChar_y - obj.head.top, obj.head.d, obj.head.h);

	// neck
	fill(obj.neck.c)
	rect(gameChar_x - obj.neck.d / 2, gameChar_y - obj.head.top + obj.head.h, obj.neck.d, obj.neck.h)

	// Right arm
	fill(obj.arm.c)
	beginShape()
	vertex(gameChar_x - obj.arm.d * 2 - obj.arm.d, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h + obj.arm.d * 0.3)
	vertex(gameChar_x - obj.arm.d * 2 - obj.arm.d, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - obj.arm.d)
	vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + 3)
	vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.d + 5)
	endShape(CLOSE)

	// body
	fill(obj.body.c)
	rect(gameChar_x - obj.body.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h, obj.body.d, obj.body.h, 2)

	// left arm
	fill(obj.arm.c)
	beginShape()
	vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top)
	vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 8)
	vertex(gameChar_x + obj.arm.d * 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h)
	vertex(gameChar_x + obj.arm.d * 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 5)
	vertex(gameChar_x - obj.arm.d / 2 + obj.arm.d, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top + obj.arm.h - 10)
	vertex(gameChar_x - obj.arm.d / 2 + obj.arm.d, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top)
	vertex(gameChar_x - obj.arm.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.arm.top)
	endShape(CLOSE)

	// left leg
	fill(obj.leg.c)
	rect(gameChar_x - obj.leg.d / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.body.h, obj.leg.d, obj.leg.jumping.h)
	// left foot
	fill(obj.foot.c)
	rect(gameChar_x - obj.foot.w / 2, gameChar_y - obj.head.top + obj.head.h + obj.neck.h + obj.body.h + obj.leg.jumping.h, obj.foot.w, obj.foot.h, 2)
}
