/*

Officer: 3977425
CaseNum: 202-0-62413270-3977425

Case 202 - The case of Bob and Daisy - stage 1

That pair of notorious criminals Woz and Jobs are up to no good again.
I’ve intercepted letters sent between them. It seems that they are
communicating through an ingenious code in which they masquerade as
besotted lovers, Daisy and Bob. I need you crack their code and determine
the details of their next heist so that we can catch them in the act.

Discover the hidden code by commenting out all text commands except
those which produce Khaki text (see https://www.w3.org/TR/css3-iccprof#numerical). 
Only comment out text commands - leave fill & stroke commands uncommented.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  // comments are all that are needed for this case.
  Do NOT add any new lines of code.

*/

var letterFont;

function preload()
{
	letterFont = loadFont('Ballpointprint.ttf');
}

function setup()
{
	createCanvas(507,403);
	textFont(letterFont);
	textSize(21);
}

function draw()
{
	background(255);

	fill(176,224,230);
	// text("from", 267,86);
	fill(139,0,0);
	// text("Daisy,", 97,21);
	fill(0,0,255);
	// text("think", 52,201);
	fill(255,69,0);
	// text("Ever", 208,179);
	fill(165,42,42);
	// text("a", 424,157);
	fill(72,209,204);
	// text("face,", 142,86);
	fill(135,206,250);
	// text("seconds", 404,86);
	fill(255,0,255);
	// text("am", 415,110);
	fill(178,34,34);
	// text("you", 55,110);
	fill(233,150,122);
	// text("like", 318,133);
	fill(25,25,112);
	// text("your", 113,179);
	fill(107,142,35);
	// text("x", 53,311);
	// text("my", 408,201);
	// text("saw", 16,86);
	fill(32,178,170);
	// text("From", 244,63);
	fill(0,0,128);
	// text("makea", 80,63);
	// text("your", 52,86);
	fill(255,99,71);
	// text("in", 12,133);
	// text("confession", 137,63);
	fill(199,21,133);
	// text("your", 232,133);
	// text("Bob", 12,311);
	fill(144,238,144);
	// text("the", 271,157);
	fill(138,43,226);
	// text("the", 92,157);
	fill(0,0,205);
	// text("love.", 243,110);
	fill(240,230,140);
	text("date", 366,179);
	fill(123,104,238);
	// text("I", 412,179);
	// text("are", 372,201);
	fill(238,130,238);
	// text("green", 228,201);
	fill(240,128,128);
	// text("of", 63,157);
	fill(0,0,205);
	// text("were", 88,110);
	fill(106,90,205);
	// text("am", 83,179);
	fill(30,144,255);
	// text("that", 122,133);
	fill(65,105,225);
	// text("alone", 445,110);
	// text("I", 389,110);
	fill(127,255,0);
	// text("when", 340,110);
	fill(0,255,255);
	// text("I", 193,86);
	fill(128,128,0);
	// text("darling,", 165,201);
	fill(0,128,0);
	// text("my", 137,110);
	fill(240,230,140);
	text("is", 317,110);
	text("first", 325,63);
	text("May", 12,63);
	fill(244,164,96);
	// text("of", 98,201);
	fill(255,165,0);
	// text("I", 161,133);
	// text("harp.", 129,157);
	fill(160,82,45);
	// text("April.", 80,227);
	// text("true", 204,110);
	fill(128,0,0);
	// text("It", 286,110);
	fill(0,139,139);
	// text("the", 36,133);
	// text("Love", 12,269);
	// text("luckiest", 308,157);
	fill(0,255,127);
	// text("music", 18,157);
	fill(148,0,211);
	// text("I", 173,157);
	fill(0,0,139);
	// text("quiet", 73,133);
	// text("last", 332,179);
	fill(50,205,50);
	// text("that", 18,179);
	fill(135,206,235);
	// text("lovely", 90,86);
	fill(139,0,0);
	// text("can", 438,179);
	fill(0,191,255);
	// text("I", 469,63);
	fill(75,0,130);
	// text("I", 57,179);
	fill(233,150,122);
	// text("one", 168,110);
	fill(240,128,128);
	// text("eyes.", 284,201);
	fill(255,69,0);
	// text("moment", 369,63);
	fill(75,0,130);
	// text("kisses,", 96,269);
	// text("the", 357,133);
	fill(0,0,139);
	// text("hear", 187,133);
	fill(255,127,80);
	// text("the", 288,63);
	fill(123,104,238);
	// text("You", 336,201);
	fill(65,105,225);
	// text("person", 370,157);
	fill(106,90,205);
	// text("that", 16,110);
	fill(250,128,114);
	// text("only", 15,201);
	fill(205,133,63);
	// text("knew", 219,86);
	fill(139,69,19);
	// text("must", 199,157);
	fill(75,0,130);
	// text("our", 303,179);
	fill(135,206,235);
	// text("?", 220,63);
	fill(0,250,154);
	// text("live", 432,157);
	fill(0,255,127);
	// text("voice", 270,133);
	fill(240,230,140);
	text("chosen", 151,179);
	fill(128,128,0);
	// text("blessed", 394,133);
	// text("be", 238,157);
	fill(173,216,230);
	// text("sunny", 439,201);
	fill(127,255,212);
	// text("and", 59,269);
	fill(0,250,154);
	// text("I", 54,63);
	fill(173,216,230);
	// text("Oh", 12,21);
	fill(64,224,208);
	// text("those", 311,86);
	// text("day", 17,227);
	fill(184,134,11);
	// text("since", 256,179);
	fill(127,255,212);
	// text("your", 127,201);
	fill(138,43,226);
	// text("in", 56,227);
	fill(255,127,80);
	// text("lovely", 45,21);
	fill(135,206,250);
	// text("few", 360,86);
	// text("that", 430,63);



}
