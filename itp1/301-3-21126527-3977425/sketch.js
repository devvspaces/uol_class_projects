/*
The case of the Python Syndicate
Stage 4

Officer: 3977425
CaseNum: 301-3-21126527-3977425

To really crack the Python Syndicate we need to go in deep. I want to understand
all the connections. I have the data but it’s a mess and I need you to sort it out.

- Organise each syndicate member into a new object. 
    - I’ve done one for you as an example.
    - Be sure to replicate the naming conventions for your own objects.
- Modify the image commands to make them use the new objects you created.
- Once you have done this you can delete the old variables.
- If you've got it right, then all six images should appear in exactly the same positions as they do now.

*/

var photoBoard;
var countessHamiltonImage;
var rockyKrayImage;
var bonesKarpinskiImage;
var adaLovelaceImage;
var pawelKarpinskiImage;
var annaKarpinskiImage;

var adaLovelaceObj;
var photoBoardObj;
var countessHamiltonObj;
var rockyKrayObj;
var bonesKarpinskiObj;
var adaLovelaceObj;
var pawelKarpinskiObj;
var annaKarpinskiObj;


//declare your new objects below


var countessHamiltonXCoord = 115;
var countessHamiltonYCoord = 40;
var rockyKrayXCoord = 408;
var rockyKrayYCoord = 40;
var bonesKarpinskiXCoord = 701;
var bonesKarpinskiYCoord = 40;
var pawelKarpinskiXCoord = 408;
var pawelKarpinskiYCoord = 309;
var annaKarpinskiXCoord = 701;
var annaKarpinskiYCoord = 309;


function preload()
{
	photoBoard = loadImage('photoBoard.png');
	countessHamiltonImage = loadImage("countessHamilton.png");
	rockyKrayImage = loadImage("krayBrothers1.png");
	bonesKarpinskiImage = loadImage("karpinskiDog.png");
	adaLovelaceImage = loadImage("ada.png");
	pawelKarpinskiImage = loadImage("karpinskiBros2.png");
	annaKarpinskiImage = loadImage("karpinskiWoman.png");

}

function setup()
{
	createCanvas(photoBoard.width, photoBoard.height);

	adaLovelaceObj = {
		x: 115,
		y: 309,
		image: adaLovelaceImage
	};

	photoBoardObj = {
		x: 0,
		y: 0,
		image: photoBoard
	};

	countessHamiltonObj = {
		x: 115,
		y: 40,
		image: countessHamiltonImage
	};

	rockyKrayObj = {
		x: 408,
		y: 40,
		image: rockyKrayImage
	};

	bonesKarpinskiObj = {
		x: 701,
		y: 40,
		image: bonesKarpinskiImage
	};

	adaLovelaceObj = {
		x: 115,
		y: 309,
		image: adaLovelaceImage
	};

	pawelKarpinskiObj = {
		x: 408,
		y: 309,
		image: pawelKarpinskiImage
	};

	annaKarpinskiObj = {
		x: 701,
		y: 309,
		image: annaKarpinskiImage
	};



	//define your new objects below
}

function draw()
{
	image(photoBoardObj.image, photoBoardObj.x, photoBoardObj.y);

	//And update these image commands with your x and y coordinates.
	image(countessHamiltonObj.image, countessHamiltonObj.x, countessHamiltonObj.y);
	image(rockyKrayObj.image, rockyKrayObj.x, rockyKrayObj.y);
	image(bonesKarpinskiObj.image, bonesKarpinskiObj.x, bonesKarpinskiObj.y);
	image(adaLovelaceObj.image, adaLovelaceObj.x, adaLovelaceObj.y);
	image(pawelKarpinskiObj.image, pawelKarpinskiObj.x, pawelKarpinskiObj.y);
	image(annaKarpinskiObj.image, annaKarpinskiObj.x, annaKarpinskiObj.y);


}