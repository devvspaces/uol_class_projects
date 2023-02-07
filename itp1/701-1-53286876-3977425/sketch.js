/*

Officer: 3977425
CaseNum: 701-1-53286876-3977425

Case 701 - Credible cat thief - stage 2

Kid they need you down at the precinct again.
This time it's a sneaky cat thief who has been absconding with the neighbourhoods felines for some time.
Luckily old Mrs Olivetti caught a glimpse of them as they disappeared over her back fence.
We’ve a bunch of likely characters lined-up but we need your brains to solve the mystery.

Please create a function that takes a suspect object as parameter from the data structure below.
Your function should return a boolean value indicating whether or not they match the witness statement.
You should use conditional statements to compare the suspect's properties to the statement.
It should only return "true" if the suspect matches the description in full.

The function is already being called in draw() but it is your job to implement it.

There are many possible ways of carrying out your duties,
but you should complete this task using ONLY the following
commands:

 - function testSuspect(suspectObj){}
 - if()

Witness statement:

It was last Thursday, I heard noises outside so I looked out and saw a person in the steet.
I'm pretty sure they were above the age of 30.
I distinctly remember that they were wearing a pair of leather trousers,
I remember thinking that was quite unusual. I'm not quite sure.
It's so hard to remember right now.
Their expression seemed empty.
They were wearing a yellow poncho.
I would say they were shorter than 164 cm.
The person I saw was female.
Can I go home now Sir? 

*/

var suspectsArray = [
	{ 
		"name": "LAKESHA JOYER",
		"expression": "menacing",
		"item": "fur vest",
		"gender": "female",
		"age": 42,
		"height": 160
	},
	{ 
		"name": "HANG MOHWAWK",
		"expression": "blank",
		"item": "red necktie",
		"gender": "male",
		"age": 63,
		"height": 171
	},
	{ 
		"name": "LOUISE CASIMERE",
		"expression": "menacing",
		"item": "orange socks",
		"gender": "female",
		"age": 72,
		"height": 185
	},
	{ 
		"name": "BRIDGET COURTWOOD",
		"expression": "empty",
		"item": "pair of leather trousers",
		"gender": "female",
		"age": 36,
		"height": 155
	},
	{ 
		"name": "LIANNE WARMAN",
		"expression": "angry",
		"item": "net weave shirt",
		"gender": "female",
		"age": 45,
		"height": 182
	}
];


// Declare your function here
function testSuspect(suspectObj){
	console.log(suspectObj)
	return (suspectObj.age > 30) && (suspectObj.item === 'pair of leather trousers') && (suspectObj.expression === 'empty') && (suspectObj.height < 164) && (suspectObj.gender === 'female')
}

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

function draw()
{
  //You don't need to alter this code
  image(backgroundImg, 0, 0);

  for(let i = 0 ; i < suspectsArray.length; i++){
    if(testSuspect(suspectsArray[i]) == true){
      fill(255,0,0);
      text(suspectsArray[i].name + " is guilty!", 60, 60 + i * 20);
    }else{
      fill(0,155,0);
      text(suspectsArray[i].name + " is not guilty", 60, 60 + i * 20 );
    }
  }
}
