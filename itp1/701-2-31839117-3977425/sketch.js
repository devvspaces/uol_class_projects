/*

Officer: 3977425
CaseNum: 701-2-31839117-3977425

Case 701 - Recognisable robber - stage 3

Kid you’re becoming a victim of your own success.
I just had a call from DI Max down at the precinct. He specifically requested your services.
They finally have a reliable witness for a robber who has been causing mayhem for some months.
Luckily they have a witness statement from hang mohwawk. You know what to do kid.

Please create a function that takes a suspect object as parameter from the data structure below.
Your function should return a number value indicating how many of their properties match the witness statement.
You should use conditional statements to compare the suspect's properties to the statement.

The function is already being called in draw() but it is your job to implement it.

There are many possible ways of carrying out your duties,
but you should complete this task using ONLY the following
commands:

 - function checkSuspectTraits(suspectObj){}
 - if()

Witness statement:

I remember walking down the street and then I saw them.
They brobably weigh between 78 and 88 kg. It's hard to say.
They were wearing a black hoodie.
I remember they had a sword tattoo.
They were fairly tall, I think between a height of 148 and 190 cm.
I'll never forget their green eyes.
It's so hard to remember right now.
I distinctly remember that they were wearing a purple hat, I remember thinking that was quite unusual.
They seemed to be between the age of 36 and 50 years old.
The person I saw was male. I hope I never have to go through that again. 

*/

var suspectsArray = [
	{ 
		"name": "LESLEY TINTLE",
		"gender": "male",
		"coat": "yellow poncho",
		"tattoo": "big arrow",
		"item": "pair of leather trousers",
		"height": 176,
		"weight": 56,
		"age": 29
	},
	{ 
		"name": "LIANNE ZETLAND",
		"gender": "female",
		"coat": "green jacket",
		"tattoo": "dragon",
		"item": "net weave shirt",
		"height": 167,
		"weight": 69,
		"age": 45
	},
	{ 
		"name": "BRIDGET ADVERSANE",
		"gender": "female",
		"coat": "white fur coat",
		"tattoo": "chinese lettering",
		"item": "orange socks",
		"height": 178,
		"weight": 70,
		"age": 37
	},
	{ 
		"name": "RANDEE ASHELY",
		"gender": "female",
		"coat": "blue overcoat",
		"tattoo": "facial",
		"item": "red necktie",
		"height": 173,
		"weight": 76,
		"age": 40
	},
	{ 
		"name": "JESUS SILVEIRA",
		"gender": "female",
		"coat": "green army coat",
		"tattoo": "bull",
		"item": "fur vest",
		"height": 180,
		"weight": 76,
		"age": 30
	},
	{ 
		"name": "NICOLE COURTWOOD",
		"gender": "male",
		"coat": "red parka",
		"tattoo": "dark black",
		"item": "pink scarf",
		"height": 175,
		"weight": 71,
		"age": 32
	},
	{ 
		"name": "JAUNITA MONKSFORD",
		"gender": "male",
		"coat": "black hoodie",
		"tattoo": "sword",
		"item": "purple hat",
		"height": 175,
		"weight": 81,
		"age": 38
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

// Declare your function here
function checkSuspectTraits(suspectObj){
	traits = 0
	if (suspectObj.weight > 78 || suspectObj.weight < 88){
		traits += 1
	}
	
	if (suspectObj.coat == "black hoodie"){
		traits += 1
	}

	if (suspectObj.tattoo == "sword"){
		traits += 1
	}

	if (suspectObj.item == "purple hat"){
		traits += 1
	}

	if (suspectObj.height > 148 || suspectObj.height < 190){
		traits += 1
	}

	if (suspectObj.age > 36 || suspectObj.age < 50){
		traits += 1
	}

	if (suspectObj.gender == 'male'){
		traits += 1
	}

	return traits

}


function draw()
{
  //You don't need to alter this code
  image(backgroundImg, 0, 0);

  for(let i = 0 ; i < suspectsArray.length; i++){
    let matchingProperties = checkSuspectTraits(suspectsArray[i]);
    fill(50 * matchingProperties,250 - (50 * matchingProperties),0);
    text("found " + matchingProperties + " matching properties for " + suspectsArray[i].name, 60, 60 + i * 20);
  }
}
