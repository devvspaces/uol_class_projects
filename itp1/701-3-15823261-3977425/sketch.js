/*

Officer: 3977425
CaseNum: 701-3-15823261-3977425

Case 701 - Believable burglar - stage 4

Those guys down at the precinct need to take your brain for one final spin.
This burglar has been a particularly slippery character and now they believe that they have them.
Luckily they have a have a witness statement from malinda niemela.
All they need is for you to do the detective work.

This time you must implement two functions:

- A checkSuspectTraits function that takes a suspect object as parameter from the data structure below.
Your function should return a number value indicating how many of their properties match the witness statement.
You should use conditional statements to compare the suspect's properties to the statement.

- A locateGuilty function which traverses the array of suspects and returns the object representing the guilty suspect,
otherwise - return an empty object.

There are many possible ways of carrying out your duties,
but you should complete this task using ONLY the following
commands:

 - function checkSuspectTraits(suspectObj){}
 - function locateGuilty(){}
 - if()

Witness statement:

I remember walking down the street and then I saw them.
I'll never forget their grey eyes. I'm not quite sure.
I distinctly remember that they were wearing a pink scarf,
I remember thinking that was quite unusual.
They were fairly tall, I think between a height of 151 and 181 cm.
It was so scary! It's hard to say. I remember they had a ox tattoo.
They brobably weigh between 73 and 83 kg.
They were wearing a black hoodie.
The person I saw was male.
They seemed to be between the age of 32 and 65 years old.
They wore dark brown glasses. Can I go home now Sir? 

*/

var allSuspects = [
	{ 
		"name": "LINETTE DURANTS",
		"glasses": "dark brown",
		"item": "pink scarf",
		"tattoo": "ox",
		"coat": "black hoodie",
		"age": 41,
		"height": 170,
		"weight": 81
	},
	{ 
		"name": "KITTY MYRLE",
		"glasses": "very thin",
		"item": "purple hat",
		"tattoo": "big arrow",
		"coat": "white fur coat",
		"age": 38,
		"height": 163,
		"weight": 71
	},
	{ 
		"name": "LIANNE ADVERSANE",
		"glasses": "light tan",
		"item": "dotted necktie",
		"tattoo": "chinese lettering",
		"coat": "yellow poncho",
		"age": 39,
		"height": 160,
		"weight": 89
	},
	{ 
		"name": "LAKESHA GOODBURY",
		"glasses": "very thick",
		"item": "net weave shirt",
		"tattoo": "neck",
		"coat": "green jacket",
		"age": 37,
		"height": 167,
		"weight": 81
	},
	{ 
		"name": "RANDEE ASHELY",
		"glasses": "blue",
		"item": "red necktie",
		"tattoo": "jellyfish",
		"coat": "blue overcoat",
		"age": 51,
		"height": 192,
		"weight": 78
	},
	{ 
		"name": "JULIANA CROME",
		"glasses": "black",
		"item": "pair of leather trousers",
		"tattoo": "anchor",
		"coat": "green army coat",
		"age": 41,
		"height": 174,
		"weight": 75
	},
	{ 
		"name": "DRUSILLA ZETLAND",
		"glasses": "cheap plastic",
		"item": "fur vest",
		"tattoo": "facial",
		"coat": "black overcoat",
		"age": 40,
		"height": 186,
		"weight": 78
	}
];

var myFont;
var backgroundImg;

function preload() {
  myFont = loadFont('SpecialElite.ttf');
  backgroundImg = loadImage("Background.png");
}

function setup()
{
	createCanvas(640,480);
	textFont(myFont);
}

// Declare both your functions here
function checkSuspectTraits(suspectObj){
	traits = 0

	if (suspectObj.glasses == "dark brown"){
		traits += 1
	}
	if (suspectObj.item == "pink scarf"){
		traits += 1
	}
	if (suspectObj.tattoo == "ox"){
		traits += 1
	}
	if (suspectObj.coat == "black hoodie"){
		traits += 1
	}
	if (suspectObj.age >= 32 && suspectObj.age <= 65){
		traits += 1
	}
	if (suspectObj.height >= 151 && suspectObj.height <= 181){
		traits += 1
	}
	if (suspectObj.weight >= 73 && suspectObj.weight <= 83){
		traits += 1
	}
	return traits
}

function locateGuilty(){
	for (var i = 0; i < allSuspects.length; i++){
		if (checkSuspectTraits(allSuspects[i]) == 7){
			return allSuspects[i]
		}
	}
	return {}
}


function draw()
{
  //You don't need to alter this code
  image(backgroundImg, 0, 0);

  fill(255,0,0);
  text(locateGuilty().name + " is guilty!", 60, 80);
}
