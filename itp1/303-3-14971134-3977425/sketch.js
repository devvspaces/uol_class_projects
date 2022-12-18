/*

Officer: 3977425
CaseNum: 303-3-14971134-3977425

Case 303 - The Case of the Crooked Attorney
Stage 4 - The Courthouse

Torvalds has his final safe in his courthouse chambers. Luckily there is a court case proceeding.
You can sneak into his chambers whilst he makes his closing statement.

Crack the safe by doing the following:

	When the mouse button is released:
	- Use the 'map' function to scale mouseX to values ranging from 2 to 18.
	- Assign the output to SecretLockerKey_a

	Whilst the mouse is moving:
	- Use the 'map' function to scale mouseX to values ranging from 1 to 10.
	- Assign the output to SecretLockerKey_b

	When any key is released:
	- Make SecretLockerKey_c equal to the value of 'keyCode'

	When the mouse button is released:
	- Use the 'map' function to scale mouseX to values ranging from 11 to 67.
	- Assign the output to SecretLockerKey_d

	When the mouse button is pressed:
	- Use the 'map' function to scale mouseY to values ranging from 12 to 73.
	- Assign the output to SecretLockerKey_e

	Whilst the mouse is moving:
	- Use the 'map' function to scale mouseX to values ranging from 17 to 76.
	- Assign the output to SecretLockerKey_f



This time you'll need to create the relevant event handlers yourself.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

	- The assignment operator aka. the equals sign !
	- mouseX, mouseY
	- key, keyCode
	- random
	- map

*/

//declare the variables

var SecretLockerKey_a;
var SecretLockerKey_b;
var SecretLockerKey_c;
var SecretLockerKey_d;
var SecretLockerKey_e;
var SecretLockerKey_f;


function preload()
{
	//IMAGES WILL BE LOADED HERE

}

function setup()
{
	createCanvas(512,512);

	//initialise the variables
	SecretLockerKey_a = 0;
	SecretLockerKey_b = "";
	SecretLockerKey_c = "";
	SecretLockerKey_d = 0;
	SecretLockerKey_e = 0;
	SecretLockerKey_f = 0;

}

///////////////////EVENT HANDLERS///////////////////

//Create event handlers here to open the safe ...
function mouseReleased(){
	SecretLockerKey_a = map(mouseX, 0, width, 2, 18, true);
	SecretLockerKey_d = map(mouseX, 0, width, 11, 67, true);
}

function mousePressed(){
	SecretLockerKey_e = map(mouseY, 0, width, 12, 73, true);
}

function mouseMoved(){
	SecretLockerKey_b = map(mouseX, 0, width, 1, 10, true);
	SecretLockerKey_f = map(mouseX, 0, width, 17, 76, true);
}

function keyReleased(){
	SecretLockerKey_c = keyCode
}


///////////////DO NOT CHANGE CODE BELOW THIS POINT///////////////////

function draw()
{

	//Draw the safe door
	background(70);
	noStroke();
	fill(29,110,6);
	rect(26,26,width-52,width-52);

	//Draw the combination dial
	push();
	translate(256,180);
	drawDial(170,SecretLockerKey_a,20);
	pop();

	//Draw the spinners
	push();
	translate(206,280);
	drawSpinner(3, SecretLockerKey_b);
	pop();

	push();
	translate(306,280);
	drawSpinner(3, SecretLockerKey_c);
	pop();

	//Draw the levers
	push();
	translate(125,356);
	drawLever(SecretLockerKey_d);
	pop();

	push();
	translate(250,356);
	drawLever(SecretLockerKey_e);
	pop();

	push();
	translate(375,356);
	drawLever(SecretLockerKey_f);
	pop();

}

function drawDial(diameter,num,maxNum)
{
	//the combination lock

	var r = diameter * 0.5;
	var p = r * 0.6;

	stroke(0);
	fill(255,255,200);
	ellipse(0,0,diameter,diameter);
	fill(100);
	noStroke();
	ellipse(0,0,diameter*0.66,diameter*0.66);
	fill(150,0,0);
	triangle(
		-p * 0.4,-r-p,
		p * 0.4,-r-p,
		0,-r-p/5
	);

	noStroke();

	push();
	var inc = 360/maxNum;

	rotate(radians(-num * inc));
	for(var i = 0; i < maxNum; i++)
	{
		push();
		rotate(radians(i * inc));
		stroke(0);
		line(0,-r*0.66,0,-(r-10));
		noStroke();
		fill(0);
		text(i,0,-(r-10));
		pop();
	}

	pop();
}

function drawLever(rot)
{
	push();
	rotate(radians(-rot))
	stroke(0);
	fill(100);
	rect(-10,0,20,100);
	ellipse(0,0,50,50);
	ellipse(0,100,35,35);
	pop();
}

function drawSpinner(numSpinners, val)
{
	var sw = 20;
	var ow = (sw + 5) * numSpinners + 5;
	stroke(0);
	fill(100);
	rect(-ow/2,0,ow,35);
	if(typeof(val) == "number")
	{
		val = floor(val).toString(); //convert to string
	}
	var d = numSpinners - val.length;

	for(var d = numSpinners - val.length; d > 0; d--)
	{
		val = "-" + val;
	}

	for(var i = 0; i < numSpinners; i++)
	{
		stroke(0);
		fill(255,255,200);
		rect(-ow/2 + i * (sw + 5) + 5,5,20,25);
		fill(0);
		noStroke();
		text(val[i],-ow/2 + sw/2 + i * (sw +5),25);
	}

}
