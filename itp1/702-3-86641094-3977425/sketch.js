/*

Officer: 3977425
CaseNum: 702-3-86641094-3977425

Case 702 - The case of Vanishing Vannevar
Stage 4 - High speed chase

“All units: Vannevar is on the run. They are driving a red car with a licencePlate of DKQS9G.  Pursue at speed.
I repeat pursue at speed.” Okay Vannevar’s game is nearly up. Go get him kid.
Complete the helper functions below to locate, chase and arrest Vannevar.

There are many possible ways of completing this task,
but you should ONLY use the following commands and techniques:

	- Incrementing and assiging variables
	- Maths function such as random, min, abs, and constrain
	- Conditional statements
	- Traversing arrays with for loops
	- calling functions and returning values

HINT: make sure you take a look at the initialisation of chaseVehicle and the cars in
vehicleObjectsData to understand their properties.

*/

///////////////////////// HELPER FUNCTIONS /////////////////////

function move_vehicle()
{
	/*
	This function should do the following: 
	 - increment chaseVehicle's kmsAmount property by its speedVal property 
	 - add a random amount between -0.01 and 0.01 to chaseVehicle's vibrateVal property
	 - use the constrain function to constrain chaseVehicle's vibrateVal property to values between 0.02 and 0.84
	 - call the drive_motor function passing chaseVehicle as an argument
	*/
	chaseVehicle.kmsAmount += chaseVehicle.speedVal;
	chaseVehicle.vibrateVal += random(-0.01, 0.01);
	chaseVehicle.vibrateVal = constrain(chaseVehicle.vibrateVal, 0.02, 0.84);
	drive_motor(chaseVehicle);
}


function cross_lanes(target_vehicle)
{
	/*
	This function should do the following: 
	 - move target_vehicle from one lane to the other.
	 - do the move in a single step without any extra animation.
	 - use Lane_PositionA and Lane_PositionB to effect the change.
	 hint: You will need to modify the coordX property of target_vehicle.
	*/
	if (target_vehicle.coordX == Lane_PositionA) {
		target_vehicle.coordX = Lane_PositionB;
	}
	else {
		target_vehicle.coordX = Lane_PositionA;
	}
}


function checkCar_isAhead( target_vehicleA, target_vehicleB )
{
	/*
	This function should do the following: 
	 - determine if target_vehicleA is in the same lane and less than 200px behind target_vehicleB.
	 - do this by comparing the two cars' kmsAmount properties
	 - if these requirements are met then return target_vehicleB. Otherwise return false.
	*/
	if (
		(target_vehicleA.coordX === target_vehicleB.coordX) &&
		(target_vehicleB.kmsAmount > target_vehicleA.kmsAmount) &&
		(target_vehicleB.kmsAmount - 200 < target_vehicleA.kmsAmount)
	)
	{
		return target_vehicleB;
	}
	return false;
}


function car_isParallel( vehicleA, vehicleB )
{
	/*
	This function should do the following: 
	 - determine if vehicleA is parallel with vehicleB.
	 - if vehicleA is found to be parallel to vehicleB then return true.
	 - cars are considered parallel if the absolute difference between their kmsAmount properties is less than 25 px and they have non-matching coordX properties	*/
	if (
		(abs(vehicleA.kmsAmount - vehicleB.kmsAmount) < 25) &&
		(vehicleA.coordX !== vehicleB.coordX)
	)
	{
		return true;
	}
	return false;
}


function identify_suspect()
{
	/*
	This function should do the following: 
	 - Check cars passing parallel to chaseVehicle to see if they match the licencePlate property in the suspect description.
	 - it does this by traversing vehicleObjectsData and calling car_isParallel for each car
.	 - if a positive result is returned then the licencePlate property of the found car is then checked against the suspect description.
	 - if a match is found then the car in question is assigned to the global variable suspect.
	*/
	for (var i = 0; i < vehicleObjectsData.length; i++) {
		if (car_isParallel(chaseVehicle, vehicleObjectsData[i])) {
			if (vehicleObjectsData[i].licencePlate === "DKQS9G") {
				suspect = vehicleObjectsData[i];
			}
		}
	}
}


function tail_suspect()
{
	/*
	This function should do the following: 
	 - only operate if the global variable suspect is assigned to an object.
	 - scale the speedVal property of chaseVehicle by a factor of 1.001.
	 - use the min function to make sure that chaseVehicle's speedVal property does not exceed 6.
	 - it should traverse vehicleObjectsData calling checkCar_isAhead for each car to detect any cars in front of chaseVehicle.
	 - if a positive result is returned it should check to see if the licencePlate property of that car matches that of suspect.
	 - for a match, book_suspect should be called, otherwise call cross_lanes.
	*/
	if (suspect) {
		chaseVehicle.speedVal = min(chaseVehicle.speedVal * 1.001, 6);
		for (var i = 0; i < vehicleObjectsData.length; i++) {
			var car = checkCar_isAhead(chaseVehicle, vehicleObjectsData[i]);
			if (car) {
				if (car.licencePlate === suspect.licencePlate) {
					book_suspect(i);
				}
				else {
					cross_lanes(car);
				}
			}
		}
	}
}


function book_suspect(car)
{
	/*
	This function should do the following: 
	 - set the isApprehended property of the car at the index of car to true.
	 - set the arrestingSuspect property of chaseVehicle to true.
	 - set the speedVal properties of both vehicles to zero.
	*/
	vehicleObjectsData[car].isApprehended = true;
	chaseVehicle.arrestingSuspect = true;
	vehicleObjectsData[car].speedVal = 0;
	chaseVehicle.speedVal = 0;
}


//////////////DO NOT CHANGE CODE BELOW THIS LINE//////////////////

var chaseVehicle;

var roadWidth;
var roadLeftEdge;
var Lane_PositionA;
var Lane_PositionB;
var carImages = {};
var suspect;

var vehicleObjectsData = [
{ coordX: 500, coordY: 0, kmsAmount: -200, vehicleModel: 'blueCar', licencePlate: '1D0GZ1', speedVal: 2, exhaust: [  ]} , { coordX: 300, coordY: 0, kmsAmount: 200, vehicleModel: 'greenCar', licencePlate: 'X0MQJC', speedVal: 2, exhaust: [  ]} , { coordX: 300, coordY: 0, kmsAmount: 600, vehicleModel: 'whiteCar', licencePlate: 'W6A04H', speedVal: 2, exhaust: [  ]} , { coordX: 300, coordY: 0, kmsAmount: 1000, vehicleModel: 'redCar', licencePlate: 'Y3DIJL', speedVal: 2, exhaust: [  ]} , { coordX: 300, coordY: 0, kmsAmount: 1400, vehicleModel: 'redCar', licencePlate: 'USFC5L', speedVal: 2, exhaust: [  ]} , { coordX: 500, coordY: 0, kmsAmount: 1800, vehicleModel: 'redCar', licencePlate: 'VHIA88', speedVal: 2, exhaust: [  ]} , { coordX: 300, coordY: 0, kmsAmount: 2200, vehicleModel: 'redCar', licencePlate: '6GFFG3', speedVal: 2, exhaust: [  ]} , { coordX: 300, coordY: 0, kmsAmount: 2600, vehicleModel: 'redCar', licencePlate: 'TYBQX8', speedVal: 2, exhaust: [  ]} , { coordX: 500, coordY: 0, kmsAmount: 3000, vehicleModel: 'redCar', licencePlate: 'RP6WJI', speedVal: 2, exhaust: [  ]} , { coordX: 500, coordY: 0, kmsAmount: 3400, vehicleModel: 'blueCar', licencePlate: 'QZS18S', speedVal: 2, exhaust: [  ]} , { coordX: 500, coordY: 0, kmsAmount: 3800, vehicleModel: 'redCar', licencePlate: 'DKQS9G', speedVal: 2, exhaust: [  ]} , { coordX: 500, coordY: 0, kmsAmount: 4200, vehicleModel: 'blueCar', licencePlate: 'YBJ2J2', speedVal: 2, exhaust: [  ]} , { coordX: 300, coordY: 0, kmsAmount: 4600, vehicleModel: 'redCar', licencePlate: '2CISFR', speedVal: 2, exhaust: [  ]} , { coordX: 500, coordY: 0, kmsAmount: 5000, vehicleModel: 'greenCar', licencePlate: '87SCLT', speedVal: 2, exhaust: [  ]} , { coordX: 300, coordY: 0, kmsAmount: 5400, vehicleModel: 'blueCar', licencePlate: '9GC1VL', speedVal: 2, exhaust: [  ]} , { coordX: 300, coordY: 0, kmsAmount: 5800, vehicleModel: 'redCar', licencePlate: 'WCKK8B', speedVal: 2, exhaust: [  ]} , { coordX: 500, coordY: 0, kmsAmount: 6200, vehicleModel: 'blueCar', licencePlate: 'LPIGA3', speedVal: 2, exhaust: [  ]} , { coordX: 300, coordY: 0, kmsAmount: 6600, vehicleModel: 'greenCar', licencePlate: '9AE72T', speedVal: 2, exhaust: [  ]} , { coordX: 500, coordY: 0, kmsAmount: 7000, vehicleModel: 'whiteCar', licencePlate: 'NV5JE0', speedVal: 2, exhaust: [  ]} , { coordX: 500, coordY: 0, kmsAmount: 7400, vehicleModel: 'blueCar', licencePlate: '2BOQQ8', speedVal: 2, exhaust: [  ]} 
];



function preload()
{

	var carTypes = [
		"detective",
		"redCar",
		"greenCar",
		"blueCar",
		"whiteCar",
	];

	for(var i = 0; i < carTypes.length; i++)
	{
		carImages[carTypes[i]] = loadImage("cars/" + carTypes[i] + ".png");
	}
}

function setup()
{
	createCanvas(800,800);
	textSize(30);
	textAlign(CENTER);

	roadWidth = 400;
	roadLeftEdge = 200;
	Lane_PositionA = 300;
	Lane_PositionB = 500;

	chaseVehicle = 
	{
		coordX: roadLeftEdge + roadWidth/4,
		coordY: 550,
		kmsAmount: 0,
		speedVal: 3,
		vibrateVal: 0,
		vehicleModel: 'detective',
		licencePlate: '5L3UTH',
		arrestingSuspect: false,
		tailingSuspect: false,
		exhaust: []
	}


}



function draw()
{
	background(0);

	drawRoad();
	drawCars();

	if(suspect)
	{
		if(suspect.isApprehended)
		{
			fill(255);

			text("suspect isApprehended!", width/2, height/2);
		}

	}


	////////////////////// HANDLE DETECTIVE /////////////////////////

	if(!chaseVehicle.tailingSuspect&& !chaseVehicle.arrestingSuspect)
	{
		move_vehicle();
		for(var i = 0; i < vehicleObjectsData.length; i++)
		{
var b2b = checkCar_isAhead(chaseVehicle, vehicleObjectsData[i]);
			if(b2b)cross_lanes(chaseVehicle);
		}
		identify_suspect();
		if(suspect)chaseVehicle.tailingSuspect = true;
	}
	else if(!chaseVehicle.arrestingSuspect)
	{
		tail_suspect();
		move_vehicle();
	}


	////////////////////// HANDLE ASSAILANT /////////////////////////

	if(suspect)
	{
		if(!suspect.isApprehended)
		{
			suspect.speedVal = 5;
			for(var i = 0; i < vehicleObjectsData.length; i++)
			{
				var b2b = checkCar_isAhead(suspect, vehicleObjectsData[i]);
				if(b2b)
				{
					if(b2b.licencePlate != suspect.licencePlate)
					{
						cross_lanes(suspect);
					}
				}
			}
		}
	}


	//////////////////////HANDLE THE OTHER CARS//////////////////////

	for(var i = 0; i < vehicleObjectsData.length; i++)
	{
		vehicleObjectsData[i].kmsAmount += vehicleObjectsData[i].speedVal;
		vehicleObjectsData[i].coordY = chaseVehicle.coordY - vehicleObjectsData[i].kmsAmount + chaseVehicle.kmsAmount;

		if(suspect)
		{
			if(suspect.isApprehended)
			{
				if(vehicleObjectsData[i].coordX==chaseVehicle.coordX)
				{
					if(vehicleObjectsData[i].kmsAmount<chaseVehicle.kmsAmount)
					{
						if(vehicleObjectsData[i].kmsAmount-chaseVehicle.kmsAmount < 200)
						{
							cross_lanes(vehicleObjectsData[i]);
						}
					}
				}
			}
		}

	}

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
		roadLeftEdge + roadWidth/2 , i * 100 + (chaseVehicle.kmsAmount%100),
		roadLeftEdge + roadWidth/2 , i * 100 + 70 + (chaseVehicle.kmsAmount%100)
		);
	}
}

function drawCars()
{
	//draw the detective car

	drawExhaust(chaseVehicle);
	image
	(
		carImages["detective"],
		chaseVehicle.coordX - carImages["detective"].width/2 + random(-chaseVehicle.vibrateVal, chaseVehicle.vibrateVal),
		chaseVehicle.coordY + random(-chaseVehicle.vibrateVal, chaseVehicle.vibrateVal)
	);

	//draw all other cars

	for(var i = 0; i < vehicleObjectsData.length; i ++)
	{
		if(vehicleObjectsData[i].coordY < height && vehicleObjectsData[i].coordY > -height/2)
		{
			image(
			carImages[vehicleObjectsData[i].vehicleModel],
			vehicleObjectsData[i].coordX - carImages[vehicleObjectsData[i].vehicleModel].width/2,
			vehicleObjectsData[i].coordY
			);
			drive_motor(vehicleObjectsData[i]);

			drawExhaust(vehicleObjectsData[i]);
		}
	}

}

function drive_motor(car)
{

	car.exhaust.push({size: 2, x: car.coordX, y: car.coordY + carImages[car.vehicleModel].height});

	for(var i = car.exhaust.length -1; i >= 0 ; i--)
	{

		car.exhaust[i].y  += max(0.75, car.speedVal/3);
		if(car.vehicleModel != "detective")car.exhaust[i].y += (chaseVehicle.speedVal - car.speedVal);
		car.exhaust[i].x += random(-1,1);
		car.exhaust[i].size += 0.5;

		if(car.exhaust[i].y  > height || car.exhaust[i].y < 0)
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
