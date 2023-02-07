/*

Officer: 3977425
CaseNum: 701-0-51788075-3977425

Case 701 - Probable pick pocket - stage 1

There has been a spate of pickpocketing downtown
and we’ve been asked to lend a hand down at the precinct.
They’ve managed to collect a witness statement from an
unsuspecting tourist majorie pegord and also rounded up a bunch of the usual suspects.
We need you to unravel this mess and work out who is the guilty one.

Please create a function that takes a suspect object as parameter from the data structure below.
Your function should return a boolean value indicating whether or not they match the witness statement.
You should use conditional statements to compare the suspect's properties to the statement.
It should only return "true" if the suspect matches the description in full.

The function is already being called in draw() but it is your job to implement it.

There are many possible ways of carrying out your duties,
but you should complete this task using ONLY the following
commands:

 - function checkSuspectTraits(suspectObj){}
 - if()

Witness statement:

It was last Thursday, I heard noises outside so I looked out and saw a person in the steet.
I'm not quite sure. I distinctly remember that they were wearing a pair of leather trousers,
I remember thinking that was quite unusual. They were wearing a green jacket.
The person I saw was female. It's so hard to remember right now.
I can't remember anything else about them.

*/

var lineupLog = [
	{
		"name": "MAJORIE MYRLE",
		"gender": "female",
		"item": "pair of leather trousers",
		"coat": "green jacket"
	},
	{
		"name": "DEEDEE PORTOS",
		"gender": "female",
		"item": "purple hat",
		"coat": "black overcoat"
	},
	{
		"name": "JESUS PHINNEY",
		"gender": "male",
		"item": "net weave shirt",
		"coat": "white fur coat"
	}
];

var myFont;
var backgroundImg;

function preload() {
	myFont = loadFont('SpecialElite.ttf');
	backgroundImg = loadImage("Background.png");
}

function setup() {
	createCanvas(640, 480);
	textFont(myFont);
}

// Declare your function here
function checkSuspectTraits(suspectObj){
	return (suspectObj.gender === 'female' && suspectObj.item === 'pair of leather trousers' && suspectObj.coat === 'green jacket')
}


function draw() {
	//You don't need to alter this code
	image(backgroundImg, 0, 0);

	for (let i = 0; i < lineupLog.length; i++) {
		if (checkSuspectTraits(lineupLog[i]) == true) {
			fill(255, 0, 0);
			text(lineupLog[i].name + " is guilty!", 60, 60 + i * 20);
		} else {
			fill(0, 155, 0);
			text(lineupLog[i].name + " is not guilty", 60, 60 + i * 20);
		}
	}
}
