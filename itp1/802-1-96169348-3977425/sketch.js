/*
802 - The case of Monte Carlo
Stage 2 - King of Cards


Officer: 3977425
CaseNum: 802-1-96169348-3977425

You aren’t going to look like much of a Poker player unless you can do a good shuffle.
We’ll need to be able to do this with one hand tied behind our back if we are going to pose as pros at the big game.

- Write a function called shuffle_seed.
- Declare an empty array in the function.
- Using a for loop, fill the array with 52 random integers between 5 and 89.
- Make sure you use the push method to add values to your array and the round function to convert your random values to integers.
- At the end of the function, return the array 
- Call shuffle_seed in setup.
- Call Shuffle deck using the return value from shuffle_seed as the argument.

*/

var deck = [ { type: 'Spades', v: 'A'} , { type: 'Spades', v: '2'} , { type: 'Spades', v: '3'} , { type: 'Spades', v: '4'} , { type: 'Spades', v: '5'} , { type: 'Spades', v: '6'} , { type: 'Spades', v: '7'} , { type: 'Spades', v: '8'} , { type: 'Spades', v: '9'} , { type: 'Spades', v: '10'} , { type: 'Spades', v: 'J'} , { type: 'Spades', v: 'Q'} , { type: 'Spades', v: 'K'} , { type: 'Clubs', v: 'A'} , { type: 'Clubs', v: '2'} , { type: 'Clubs', v: '3'} , { type: 'Clubs', v: '4'} , { type: 'Clubs', v: '5'} , { type: 'Clubs', v: '6'} , { type: 'Clubs', v: '7'} , { type: 'Clubs', v: '8'} , { type: 'Clubs', v: '9'} , { type: 'Clubs', v: '10'} , { type: 'Clubs', v: 'J'} , { type: 'Clubs', v: 'Q'} , { type: 'Clubs', v: 'K'} , { type: 'Hearts', v: 'A'} , { type: 'Hearts', v: '2'} , { type: 'Hearts', v: '3'} , { type: 'Hearts', v: '4'} , { type: 'Hearts', v: '5'} , { type: 'Hearts', v: '6'} , { type: 'Hearts', v: '7'} , { type: 'Hearts', v: '8'} , { type: 'Hearts', v: '9'} , { type: 'Hearts', v: '10'} , { type: 'Hearts', v: 'J'} , { type: 'Hearts', v: 'Q'} , { type: 'Hearts', v: 'K'} , { type: 'Diamonds', v: 'A'} , { type: 'Diamonds', v: '2'} , { type: 'Diamonds', v: '3'} , { type: 'Diamonds', v: '4'} , { type: 'Diamonds', v: '5'} , { type: 'Diamonds', v: '6'} , { type: 'Diamonds', v: '7'} , { type: 'Diamonds', v: '8'} , { type: 'Diamonds', v: '9'} , { type: 'Diamonds', v: '10'} , { type: 'Diamonds', v: 'J'} , { type: 'Diamonds', v: 'Q'} , { type: 'Diamonds', v: 'K'}  ];
var deck_img;
var table_img;
var drawCounter = 0;

function preload()
{
	deck_img = loadImage("deck.png");
	table_img = loadImage("table.png");
}
function setup()
{
	createCanvas(table_img.width, table_img.height);
	frameRate(30);


	//call your shuffle_seed function here. Followed by a call to shuffleDeck with the return value of shuffle_seed as an argument.
	shuffleDeck(shuffle_seed());

}

//write your shuffle_seed function here
function shuffle_seed()
{
	var arr = [];
	for(var i = 0; i < 52; i++)
	{
		arr.push(round(random(5, 89)));
	}
	return arr;
}


/////////////////////DON'T CHANGE ANYTHING BELOW HERE/////////////////////////
function shuffleDeck(shuffleSeed)
{
		//shuffle the deck by rotating the cards location with the values in
		//shuffleSeed. Repeat this a random number of times between 20 and 50
    var shuffleIterations = parseInt(random(20, 50));
    for(var i = 0; i < shuffleIterations; i++)
    {
	   for (var j = 0; j < deck.length; j++)
	   {
		  var tempCard = deck.splice(j, 1);
          var newLoc = (j + shuffleSeed[j])%52;
          deck.splice(newLoc, 0, tempCard[0]);
	   }
    }
}

function draw()
{
	image(table_img, 0, 0);

	if (frameCount % 7 == 0)
	{
		drawCounter++;
		if (drawCounter == 52)
		{
			noLoop();
		}
	}
	for (var i = 0; i < drawCounter; i++)
	{
		if (deck[i].marked)
		{
			drawCard(deck[i], 400 + i * 18, 230);
		}
		else
		{
			drawCard(deck[i], 400 + i * 18, 250);
		}
	}


}


function drawCard(card, x, y)
{

	var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
	var suits = ["Spades", "Clubs", "Hearts", "Diamonds"];

	for (var i = 0; i < suits.length; i++)
	{
		for (var j = 0; j < values.length; j++)
		{
			if (card.v == values[j] && card.type == suits[i])
			{
			//img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
				image(deck_img, j * 200, i * 300, 200, 300, x, y, 100, 150);
				break;
			}
		}
	}
}
