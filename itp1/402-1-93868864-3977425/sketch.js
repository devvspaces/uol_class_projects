/*
402 - The case of the Why Gang ruby heist
Stage 2 - Katz

Officer: 3977425
CaseNum: 402-1-93868864-3977425

There are still three more Why gang members to catch. The gang member Katz was seen heading in this direction. If you’re quick enough you might just catch her. 

- In the draw function write if statements which use the road you are currently on to set your direction.
- The currentRoad variable stores the road that you are currently on. 
- Set the direction using the properties of the detective object, speedX and speedY. 
	- For example, to go north you would write the following code:
		det.speedX = 0; 
		det.speedY = -1;

I'll point you in the right direction to get started but the rest is up to you kid!

- There are many ways to complete this task but you should only use the following commands and operators:

	if(){}
	else if
	==

*/


var currentRoad;
var direction;
var mapImage;
var overlayImage;
var mainSpeed;

//the detective object
var det = {
	speedX: 0,
	speedY: 0,
	locationX: 73,
	locationY: 73,
	currentStreet: 'Packard Avenue',
	image: './det.png'
};

function preload()
{
	perp.image = loadImage(perp.image);
	det.image = loadImage(det.image);
	mapImage = loadImage("./map.png");
	overlayImage = loadImage("./overlay.png")
}

function setup()
{
	createCanvas(1024, 768);
	currentRoadObj = getCurrentRoad();
	mainSpeed = 5;

}

function draw()
{
	///////////////////ADD YOUR CODE HERE///////////////////
	if (currentRoad == "Packard Avenue")
	{
		det.speedX = 0;
		det.speedY = mainSpeed;
	} else if (currentRoad == "Meyers Way"){
		det.speedX = mainSpeed;
		det.speedY = 0;
	} else if (currentRoad == "Berners-lee Street"){
		det.speedX = 0;
		det.speedY = -mainSpeed;
	} else if (currentRoad == "Mullenweg Street"){
		det.speedX = mainSpeed;
		det.speedY = 0;
	} else if (currentRoad == "Romero Avenue"){
		det.speedX = 0;
		det.speedY = -mainSpeed;
	} else if (currentRoad == "Dijkstra Street"){
		det.speedX = -mainSpeed;
		det.speedY = 0;
	}


	///////////////DO NOT CHANGE CODE BELOW THIS POINT///////////////////
	background(50);

	if (perp.caught === 0)
	{
		det.locationX += det.speedX;
		det.locationY += det.speedY;
	}

	currentRoadObj = getCurrentRoad();

	//draw the images of the map perp and the detective
	image(mapImage, 0, 0);
	image(overlayImage, 0, 0);
	image(perp.image, perp.locationX - roadWidth, perp.locationY - roadWidth, roadWidth * 2, roadWidth * 2);

	push();
	translate(det.locationX, det.locationY);
	if (det.speedX != 0) rotate((det.speedX - 1.5) * PI);
	else if (det.speedY < 0) rotate(PI);
	image(det.image, -roadWidth, -roadWidth, roadWidth * 2, roadWidth * 2);
	pop();

	push();
	textAlign(CENTER);
	textSize(32);
	noStroke();

	//the perp has been caught
	if (dist(det.locationX, det.locationY, perp.locationX, perp.locationY) < 3)
	{
		//display message to the player
		fill(0, 220, 0);
		text("Just in the nick of time! \nYou caught " + perp.name, width / 2, height / 2);
		perp.caught = 1;
	}

	//not on any roads, therefore the game is lost.
	if (currentRoadObj == null || (det.speedX == 0 && det.speedY == 0))
	{
		fill(255, 0, 0);
		text("You let " + perp.name + " get away.\n Better luck next time.", width / 2, height / 2);
		perp.caught = -1;
	}

	pop();

	hud();


}

function hud()
{
	push();
	fill(250);
	noStroke();
	textAlign(LEFT, TOP);
	text("detective location - x: " + det.locationX + " y: " + det.locationY + "\tstreet: " + currentRoad, 5, 5);
	pop();
}

function getCurrentRoad()
{
	var road = null;
	for (var i = 0; i < roads.length; i++)
	{
		if (mapImage.get(det.locationX, det.locationY)[0] == roads[i].strokeC)
		{
			road = roads[i];
		}
	}

	if (road && currentRoad != road.name)
	{
		currentRoad = road.name;
		det.locationX = road.start.x;
		det.locationY = road.start.y;
	}

	return road;
}

var roadWidth = 25;

var roads = [
{
	start:
	{
		x: 73,
		y: 72
	},
	end:
	{
		x: 73,
		y: 633
	},
	name: 'Packard Avenue',
	strokeC: 170
},
{
	start:
	{
		x: 73,
		y: 633
	},
	end:
	{
		x: 324,
		y: 633
	},
	name: 'Meyers Way',
	strokeC: 171
},
{
	start:
	{
		x: 324,
		y: 633
	},
	end:
	{
		x: 324,
		y: 384
	},
	name: 'Berners-lee Street',
	strokeC: 172
},
{
	start:
	{
		x: 324,
		y: 384
	},
	end:
	{
		x: 700,
		y: 384
	},
	name: 'Mullenweg Street',
	strokeC: 173
},
{
	start:
	{
		x: 700,
		y: 384
	},
	end:
	{
		x: 700,
		y: 197
	},
	name: 'Romero Avenue',
	strokeC: 174
},
{
	start:
	{
		x: 700,
		y: 197
	},
	end:
	{
		x: 324,
		y: 197
	},
	name: 'Dijkstra Street',
	strokeC: 175
}];
var perp = {
	caught: 0,
	name: 'Katz',
	image: './perp.png',
	locationX: 324,
	locationY: 197
};