/*

Officer: 3977425
CaseNum: 202-1-33189428-3977425

Case 202 - The case of Bob and Daisy - stage 2

Here’s another letter kid. This time it’s from Daisy (aka. Woz).
Decode it to uncover more about Woz and Job’s dastardly plan.

Discover the hidden code by commenting out all text commands except
those which produce Medium Purple filled text with a Cyan outline 
(see https://www.w3.org/TR/css3-iccprof#numerical).
Only comment out text commands - leave fill & stroke commands uncommented.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  // comments are all that are needed for this case.
  Do NOT add any new lines of code.

*/

var letterFont;

function preload()
{
	letterFont = loadFont('Melissa.otf');
}

function setup()
{
	createCanvas(642,503);
	textFont(letterFont);
	textSize(32);
}

function draw()
{
	background(255);

	fill(153,50,204);
	stroke(0,255,255);
	// text("Forev", 8,337);
	fill(199,21,133);
	stroke(178,34,34);
	// text("we", 62,131);
	fill(176,224,230);
	stroke(46,139,87);
	// text("er", 56,337);
	fill(238,130,238);
	stroke(0,0,128);
	// text("small", 368,240);
	fill(34,139,34);
	stroke(154,205,50);
	// text("having", 117,96);
	fill(32,178,170);
	stroke(148,0,211);
	// text("w", 111,240);
	fill(255,99,71);
	stroke(0,0,139);
	// text("is", 539,96);
	fill(138,43,226);
	stroke(139,69,19);
	// text("?", 535,205);
	fill(255,69,0);
	stroke(32,178,170);
	// text("I", 222,131);
	fill(65,105,225);
	stroke(128,0,128);
	// text("you", 350,131);
	fill(233,150,122);
	stroke(0,255,127);
	// text("feels", 471,240);
	fill(128,128,0);
	stroke(34,139,34);
	// text("longing", 187,205);
	fill(65,105,225);
	stroke(255,165,0);
	// text("wift", 197,273);
	fill(0,100,0);
	// text("yours,", 82,337);
	fill(255,0,0);
	stroke(0,0,255);
	// text("sky,", 97,170);
	fill(123,104,238);
	stroke(255,69,0);
	// text("How", 392,170);
	fill(0,139,139);
	stroke(0,255,127);
	// text("Daisy", 8,401);
	fill(139,0,0);
	stroke(128,0,128);
	// text("How", 371,96);
	fill(255,255,0);
	stroke(153,50,204);
	// text("many", 414,96);
	fill(75,0,130);
	stroke(160,82,45);
	// text("you", 178,96);
	fill(128,128,0);
	stroke(220,20,60);
	// text("nk", 257,170);
	fill(218,112,214);
	stroke(255,69,0);
	// text("longer", 486,170);
	fill(139,0,139);
	stroke(255,140,0);
	// text("ithout", 125,240);
	fill(173,216,230);
	stroke(25,25,112);
	// text("When", 269,205);
	fill(218,165,32);
	stroke(0,255,255);
	// text("My", 8,32);
	fill(255,0,0);
	stroke(32,178,170);
	// text("be", 398,205);
	fill(0,0,205);
	stroke(153,50,204);
	// text("since", 10,131);
	fill(255,215,0);
	stroke(210,105,30);
	// text("in", 602,205);
	stroke(218,165,32);
	// text("arms.", 440,131);
	fill(0,255,255);
	stroke(0,250,154);
	// text("around", 214,96);
	fill(210,105,30);
	stroke(148,0,211);
	// text("desolate.", 524,240);
	fill(139,0,0);
	stroke(199,21,133);
	// text("again", 484,205);
	fill(50,205,50);
	stroke(210,105,30);
	// text("this", 144,205);
	fill(127,255,212);
	stroke(128,128,0);
	// text("thi", 233,170);
	fill(0,206,209);
	stroke(139,0,0);
	// text("the", 277,96);
	fill(135,206,235);
	stroke(124,252,0);
	// text("s", 186,273);
	fill(30,144,255);
	stroke(0,128,0);
	// text("at", 221,240);
	fill(139,0,139);
	stroke(0,0,255);
	// text("you.", 353,170);
	fill(0,128,128);
	stroke(0,128,128);
	// text("your", 142,273);
	fill(255,255,0);
	stroke(148,0,211);
	// text("you", 185,240);
	fill(128,128,0);
	stroke(255,0,255);
	// text("in", 386,131);
	fill(0,128,0);
	stroke(128,0,128);
	// text("kissed", 140,131);
	fill(148,0,211);
	stroke(128,128,0);
	// text("town", 420,240);
	fill(255,99,71);
	stroke(0,0,128);
	// text("x", 63,401);
	fill(50,205,50);
	stroke(199,21,133);
	// text("Bob,", 107,32);
	fill(178,34,34);
	stroke(0,191,255);
	// text("night", 46,170);
	fill(123,104,238);
	stroke(139,0,139);
	// text("I'm", 10,273);
	fill(255,105,180);
	stroke(0,255,127);
	// text("months", 466,96);
	fill(186,85,211);
	stroke(0,128,128);
	// text("darling", 44,32);
	fill(176,224,230);
	stroke(0,0,255);
	// text("can", 196,170);
	fill(250,128,114);
	stroke(255,0,255);
	// text("only", 284,170);
	fill(147,112,219);
	stroke(0,255,255);
	text("at", 596,131);
	text("spring", 50,240);
	fill(255,127,80);
	stroke(0,100,0);
	// text("it", 562,96);
	fill(238,232,170);
	stroke(32,178,170);
	// text("of", 325,170);
	fill(176,224,230);
	stroke(255,215,0);
	// text("have", 11,205);
	fill(75,0,130);
	stroke(148,0,211);
	// text("on", 115,273);
	fill(0,0,128);
	stroke(160,82,45);
	// text("we", 363,205);
	fill(205,133,63);
	stroke(127,255,0);
	// text("stare", 512,131);
	fill(34,139,34);
	stroke(154,205,50);
	// text("this", 325,240);
	fill(233,150,122);
	stroke(0,250,154);
	// text("the", 8,170);
	fill(240,128,128);
	stroke(0,0,128);
	// text("place.", 315,96);
	fill(128,0,0);
	stroke(0,0,205);
	// text("return.", 247,273);
	fill(127,255,212);
	stroke(0,128,0);
	// text("much", 435,170);
	fill(255,105,180);
	stroke(0,0,128);
	// text("the", 12,240);
	fill(147,112,219);
	stroke(0,255,255);
	text("bank", 46,273);
	text("hold", 308,131);
	fill(154,205,50);
	stroke(124,252,0);
	// text("store", 87,205);
	fill(222,184,135);
	stroke(0,100,0);
	// text("Even", 553,205);
	fill(124,252,0);
	stroke(255,140,0);
	// text("to", 59,205);
	fill(147,112,219);
	stroke(0,255,255);
	text("side", 282,240);
	text("up", 569,131);
	fill(160,82,45);
	stroke(0,0,255);
	// text("do", 545,170);
	fill(0,191,255);
	stroke(0,255,127);
	// text("I", 179,170);
	fill(238,232,170);
	stroke(25,25,112);
	// text("last", 97,131);
	fill(255,99,71);
	stroke(255,0,0);
	// text("?", 204,131);
	fill(30,144,255);
	stroke(139,0,139);
	// text("ing", 84,273);
	stroke(255,0,0);
	// text("my", 249,240);
	fill(255,105,180);
	stroke(128,0,0);
	// text("How", 8,96);
	fill(178,34,34);
	stroke(34,139,34);
	// text("I", 573,170);
	fill(30,144,255);
	stroke(0,255,127);
	// text("and", 142,170);
	fill(127,255,0);
	stroke(0,100,0);
	// text("I", 51,96);
	fill(250,128,114);
	stroke(139,69,19);
	// text("?", 251,205);
	fill(127,255,0);
	stroke(255,0,0);
	// text("to", 280,131);
	fill(178,34,34);
	stroke(128,0,128);
	// text("long", 239,131);
	fill(0,255,255);
	stroke(0,0,205);
	// text("united", 425,205);
	fill(250,128,114);
	stroke(75,0,130);
	// text("my", 407,131);
	fill(106,90,205);
	stroke(50,205,50);
	// text("miss", 68,96);
	fill(127,255,0);
	stroke(139,0,0);
	// text("I", 495,131);
	fill(128,0,0);
	stroke(153,50,204);
	// text("will", 325,205);



}
