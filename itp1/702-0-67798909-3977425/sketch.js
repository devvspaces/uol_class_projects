/*

Officer: 3977425
CaseNum: 702-0-67798909-3977425

Case 702 - The case of Vanishing Vannevar
Stage 1 - Mobilise

“Calling all units: the notorious criminal and speedster known as Vanishing Vannevar is on the run.
All cars to mobilise.” Word has it that you’re pretty nifty behind the wheel. I want you in on
this action kid. Get your car on the road by completing the </DRIVE_NAME/> function below.

There are many possible ways of completing this task,
but you should ONLY use the following commands and techniques:

	- increment variables
	- random
	- constrain
	- calling functions

HINT: make sure you take a look at the initialisation of Chase_VehicleObject
to understand it's properties.

*/

///////////////////////// HELPER FUNCTIONS /////////////////////

function MoveCar()
{
	/*
	This function should do the following: 
	 - increment Chase_VehicleObject's Dist_Amt property by its Gas_Value property 
	 - add a random amount between -0.02 and 0.02 to Chase_VehicleObject's Shudder_Amount property
	 - use the constrain function to constrain Chase_VehicleObject's Shudder_Amount property to values between 0.1 and 0.77
	 - call the TurnoverMotor function passing Chase_VehicleObject as an argument
	*/
	Chase_VehicleObject.Dist_Amt += Chase_VehicleObject.Gas_Value;
	Chase_VehicleObject.Shudder_Amount += random(-0.02, 0.02);
	Chase_VehicleObject.Shudder_Amount = constrain(Chase_VehicleObject.Shudder_Amount, 0.1, 0.77);
	TurnoverMotor(Chase_VehicleObject);
}


//////////////DO NOT CHANGE CODE BELOW THIS LINE//////////////////

var Chase_VehicleObject;

var roadWidth = 400;
var roadLeftEdge = 200;
var carImages = {};


function preload()
{
	carImages.detective = loadImage("cars/detective.png");
}

function setup()
{
	createCanvas(800,800);

	Chase_VehicleObject = 
	{
		Position_X: roadLeftEdge + roadWidth/4,
		Position_Y: 300,
		Dist_Amt: 0,
		Gas_Value: 3,
		Shudder_Amount: 0,
		Car_Variety: 'detective',
		Licence_Plate: '5L3UTH',
		exhaust: []
	}


}



function draw()
{
	background(0);


	MoveCar();


	drawRoad();
	drawCars();
}

/////////////////////////DRAWING FUNCTIONS////////////////////////

function drawRoad()
{
	stroke(100);
	fill(50);
	rect(roadLeftEdge,0,roadWidth,800);
	stroke(255);

	for(var i = -1; i < 20; i++)
	{
		line(
		roadLeftEdge + roadWidth/2 , i * 100 + (Chase_VehicleObject.Dist_Amt%100),
		roadLeftEdge + roadWidth/2 , i * 100 + 70 + (Chase_VehicleObject.Dist_Amt%100)
		);
	}
}

function drawCars()
{
	//draw the detective car

	image
	drawExhaust(Chase_VehicleObject);
	image
	(
		carImages["detective"],
		Chase_VehicleObject.Position_X - carImages["detective"].width/2 + random(-Chase_VehicleObject.Shudder_Amount, Chase_VehicleObject.Shudder_Amount),
		Chase_VehicleObject.Position_Y + random(-Chase_VehicleObject.Shudder_Amount, Chase_VehicleObject.Shudder_Amount)
	);

}

function TurnoverMotor(car)
{

	car.exhaust.push({size: 2, x: car.Position_X, y: car.Position_Y + carImages[car.Car_Variety].height});

	for(var i = car.exhaust.length -1; i >= 0 ; i--)
	{

		car.exhaust[i].y  += max(0.75, car.Gas_Value/3);
		car.exhaust[i].x += random(-1,1);
		car.exhaust[i].size += 0.5;

		if(car.exhaust[i].y  > height)
		{
			car.exhaust.splice(i,1);
		}
	}
}


function drawExhaust(car)
{
		noStroke();
		for(var i = 0; i < car.exhaust.length; i++)
		{
				var alpha = map(car.exhaust[i].size, 0, 40, 50,0);
				fill(125,alpha);
				ellipse(car.exhaust[i].x + 20, car.exhaust[i].y , car.exhaust[i].size);

		}
}
