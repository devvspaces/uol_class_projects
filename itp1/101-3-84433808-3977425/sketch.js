/*

Officer: 3977425
CaseNum: 101-3-84433808-3977425

Case 101 - The Case of Anna Lovelace
Stage 4 - The Plaza Hotel

Okay this place is more Anna’s style. Now’s our chance to find out the root of all
of this. Lets see who is Anna meeting.

Identify Anna by drawing a Maroon filled rectangle with a Lime Green outline.
She’s the woman in the red dress of course.

Identify the man with the monocle smoking the cigar by drawing a Dark Red filled
rectangle with a Yellow outline around him.

Identify the man reading the newspaper by drawing a Brown filled rectangle
with a Purple outline around him.

Identify the woman with the dog by drawing a Medium Aquamarine filled rectangle with a
Medium Slate Blue outline around her. Make sure you include the dog too.

The rectangles should cover the targets as accurately as possible without
including anything else.

Use X11 colours. You can find a reference table at https://www.w3.org/TR/css3-iccprof#numerical.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  rect()
  fill() Use r,g,b values between 0 and 255. Set alpha to 100 for some opacity.
  stroke() Use r,g,b values between 0 and 255.

*/

var img;

function preload()
{
	img = loadImage('img.jpg');
}

function setup()
{
	createCanvas(img.width,img.height);
	strokeWeight(2);
}

function draw()
{
	image(img,0,0);

	//Write your code below here ...

	// Anna
	fill(128,0,0);
	stroke(50,205,50);
	rect(35, 302, 155, 307);


	// man with the monocle smoking
	fill(139,0,0);
	stroke(255,255,0);
	rect(1670, 442, 195, 260);

	// the man reading the newspaper
	fill(165,42,42);
	stroke(128,0,128);
	rect(1295, 379, 245, 485);

	// the woman with the dog
	fill(102,205,170);
	stroke(123,104,238);
	rect(570, 278, 145, 315);



	//A helpful mouse pointer
	push();
		fill(0);
		noStroke();
		text(mouseX + "," + mouseY, mouseX,mouseY);
	pop();


}
