/*

Officer: 3977425
CaseNum: 202-3-50798664-3977425

Case 202 - The case of Bob and Daisy - stage 4

Here’s the final letter from Daisy (aka. Woz). Decode it to uncover the
final details about Woz and Job’s dastardly plan.

Discover the hidden code by commenting out all text commands except
those which produce Indigo filled text with a Fire Brick outline in RonsFont font (see https://www.w3.org/TR/css3-iccprof#numerical).
Only comment out text commands - leave fill & stroke, push and pop commands uncommented.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  // comments are all that are needed for this case.
  Do NOT add any new lines of code.

*/

var letterFont;

function preload()
{
	Ballpointprint = loadFont('Ballpointprint.ttf');
	Melissa = loadFont('Melissa.otf');
	Diggity = loadFont('Diggity.ttf');
	RonsFont = loadFont('RonsFont.ttf');
}

function setup()
{
	createCanvas(565,390);
	textSize(24);
}

function draw()
{
	background(255);

	fill(64,224,208);
	stroke(255,255,0);
	textFont(RonsFont);
	// text("short", 474,72);
	fill(255,255,0);
	stroke(255,215,0);
	textFont(Diggity);
	// text("our", 32,151);
	fill(218,165,32);
	stroke(220,20,60);
	textFont(RonsFont);
	// text("The", 354,177);
	push();
	fill(219,112,147);
	stroke(178,34,34);
	textFont(Melissa);
	// text("send", 199,96);
	pop();
	fill(148,0,211);
	textFont(Diggity);
	// text("go", 177,124);
	fill(255,165,0);
	stroke(0,0,139);
	textFont(Melissa);
	// text("much", 135,177);
	push();
	fill(220,20,60);
	stroke(128,0,0);
	textFont(Diggity);
	// text("you", 326,96);
	pop();
	stroke(46,139,87);
	textFont(Diggity);
	// text("Bob,", 104,24);
	fill(173,216,230);
	stroke(255,215,0);
	// text("uarded", 349,151);
	push();
	fill(0,255,255);
	stroke(0,128,128);
	textFont(Melissa);
	// text("should", 132,124);
	pop();
	stroke(139,0,139);
	// text("me", 442,96);
	fill(106,90,205);
	stroke(0,255,255);
	// text("s.", 485,151);
	fill(139,0,0);
	stroke(0,139,139);
	textFont(RonsFont);
	// text("If", 70,96);
	fill(135,206,250);
	stroke(0,100,0);
	textFont(Ballpointprint);
	// text("rhaps", 44,124);
	push();
	fill(135,206,235);
	stroke(0,250,154);
	// text("Pe", 19,124);
	pop();
	stroke(107,142,35);
	// text("away", 202,124);
	fill(75,0,130);
	stroke(178,34,34);
	textFont(RonsFont);
	text("cash", 234,96);
	text("break", 306,124);
	fill(255,165,0);
	stroke(32,178,170);
	textFont(Melissa);
	// text("of", 531,72);
	fill(255,69,0);
	stroke(139,0,139);
	// text("secrets,", 390,177);
	fill(0,250,154);
	stroke(0,128,0);
	textFont(Diggity);
	// text("you", 439,72);
	fill(25,25,112);
	stroke(25,25,112);
	textFont(Ballpointprint);
	// text("Daisy", 6,273);
	fill(0,191,255);
	stroke(0,0,128);
	textFont(Diggity);
	// text("?", 217,151);
	push();
	fill(138,43,226);
	stroke(178,34,34);
	textFont(Ballpointprint);
	// text("for", 254,124);
	pop();
	fill(250,128,114);
	stroke(0,206,209);
	// text("sort", 406,124);
	fill(0,0,128);
	stroke(0,100,0);
	textFont(Ballpointprint);
	// text("relationship", 67,151);
	fill(123,104,238);
	stroke(255,255,0);
	// text("ntinual", 278,72);
	fill(34,139,34);
	stroke(199,21,133);
	textFont(Melissa);
	// text("?", 474,96);
	push();
	fill(184,134,11);
	stroke(139,0,0);
	textFont(Diggity);
	// text("sure", 50,177);
	pop();
	fill(144,238,144);
	// text("out.", 515,124);
	fill(107,142,35);
	stroke(128,0,0);
	textFont(Ballpointprint);
	// text("more", 172,177);
	fill(135,206,235);
	stroke(0,128,0);
	textFont(RonsFont);
	// text("My", 13,24);
	fill(0,0,139);
	stroke(184,134,11);
	textFont(Melissa);
	// text("yours,", 65,225);
	push();
	fill(244,164,96);
	stroke(128,0,0);
	textFont(Diggity);
	// text("this", 449,124);
	pop();
	stroke(165,42,42);
	textFont(Diggity);
	// text("and", 369,124);
	fill(0,0,205);
	stroke(139,0,139);
	textFont(Melissa);
	// text("Forever", 10,225);
	fill(139,0,0);
	stroke(218,165,32);
	textFont(Ballpointprint);
	// text("take", 277,177);
	fill(0,128,0);
	stroke(46,139,87);
	textFont(RonsFont);
	// text("I", 10,72);
	fill(238,130,238);
	stroke(25,25,112);
	// text("I", 222,177);
	fill(50,205,50);
	stroke(127,255,0);
	textFont(Diggity);
	// text("You", 235,151);
	fill(0,0,139);
	stroke(255,165,0);
	textFont(Melissa);
	// text("money", 6,96);
	fill(124,252,0);
	stroke(0,250,154);
	textFont(RonsFont);
	// text("are", 272,151);
	push();
	fill(72,209,204);
	stroke(0,128,128);
	textFont(Ballpointprint);
	// text("delays.", 339,72);
	pop();
	stroke(255,165,0);
	textFont(Ballpointprint);
	// text("so", 315,151);
	fill(30,144,255);
	stroke(124,252,0);
	textFont(Diggity);
	// text("da", 48,24);
	push();
	fill(255,99,71);
	stroke(0,0,128);
	// text("longer", 92,72);
	pop();
	stroke(32,178,170);
	textFont(RonsFont);
	// text("all", 486,124);
	push();
	fill(124,252,0);
	stroke(107,142,35);
	textFont(Melissa);
	// text("a", 292,124);
	pop();
	fill(218,112,214);
	stroke(0,0,128);
	textFont(Melissa);
	// text("I'm", 505,151);
	fill(64,224,208);
	stroke(128,128,0);
	textFont(Diggity);
	// text("ime", 461,151);
	fill(106,90,205);
	stroke(32,178,170);
	textFont(Ballpointprint);
	// text("co", 264,72);
	fill(233,150,122);
	stroke(0,191,255);
	textFont(Diggity);
	// text("Is", 12,151);
	push();
	fill(165,42,42);
	stroke(0,0,205);
	textFont(Ballpointprint);
	// text("can", 162,96);
	pop();
	stroke(160,82,45);
	textFont(RonsFont);
	// text("can", 30,72);
	push();
	fill(0,0,128);
	stroke(0,128,128);
	textFont(Melissa);
	// text("no", 71,72);
	pop();
	fill(255,105,180);
	stroke(139,0,139);
	textFont(Diggity);
	// text("g", 342,151);
	fill(0,255,127);
	stroke(218,165,32);
	textFont(Melissa);
	// text("Are", 410,72);
	fill(255,127,80);
	stroke(128,128,0);
	textFont(Diggity);
	// text("nce.", 512,177);
	fill(65,105,225);
	stroke(0,139,139);
	textFont(Ballpointprint);
	// text("how", 94,177);
	fill(148,0,211);
	stroke(255,165,0);
	textFont(Diggity);
	// text("somet", 414,151);
	fill(138,43,226);
	stroke(153,50,204);
	// text("rling", 67,24);
	fill(75,0,130);
	stroke(178,34,34);
	textFont(RonsFont);
	text("safe", 169,151);
	text("ignore", 144,72);
	fill(128,0,0);
	stroke(0,128,128);
	textFont(Ballpointprint);
	// text("avoiding", 361,96);
	fill(0,250,154);
	stroke(255,0,255);
	textFont(Diggity);
	// text("sile", 491,177);
	fill(186,85,211);
	stroke(0,128,128);
	// text("these", 211,72);
	push();
	fill(128,0,128);
	stroke(0,255,127);
	textFont(RonsFont);
	// text("not", 10,177);
	pop();
	stroke(50,205,50);
	textFont(RonsFont);
	// text("so,", 101,96);
	fill(144,238,144);
	stroke(139,69,19);
	// text("?", 53,96);
	fill(222,184,135);
	stroke(25,25,112);
	textFont(Diggity);
	// text("can", 242,177);
	fill(178,34,34);
	stroke(255,140,0);
	textFont(Ballpointprint);
	// text("?", 327,177);
	fill(219,112,147);
	stroke(0,0,205);
	// text("the", 450,177);
	fill(135,206,250);
	stroke(255,0,255);
	textFont(RonsFont);
	// text("we", 97,124);
	fill(255,69,0);
	stroke(0,139,139);
	textFont(Diggity);
	// text("x", 69,273);
	fill(255,140,0);
	stroke(0,128,0);
	textFont(Ballpointprint);
	// text("I", 133,96);
	fill(75,0,130);
	stroke(0,0,139);
	// text("Are", 282,96);



}
