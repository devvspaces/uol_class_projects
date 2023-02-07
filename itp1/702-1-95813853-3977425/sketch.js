/*

Officer: 3977425
CaseNum: 702-1-95813853-3977425

Case 702 - The case of Vanishing Vannevar
Stage 2 - Downtown traffic

“All units: Vannevar is heading into the downtown area. Heavy traffic ahead. Drive safely.”
Complete the helper functions below to drive the car and avoid other vehicles. Keep on it kid.

There are many possible ways of completing this task,
but you should ONLY use the following commands and techniques:

	- Incrementing and assiging variables
	- Maths function such as random and constrain
	- Conditional statements
	- Traversing arrays with for loops
	- calling functions and returning values

HINT: make sure you take a look at the initialisation of DetectiveVehicleObject and the cars in
VehicleObjectList to understand their properties.

*/

///////////////////////// HELPER FUNCTIONS /////////////////////

function driveVehicle() {
	/*
	This function should do the following: 
	 - increment DetectiveVehicleObject's MilesAmount property by its GasValue property 
	 - add a random amount between -0.1 and 0.1 to DetectiveVehicleObject's VibrateAmt property
	 - use the constrain function to constrain DetectiveVehicleObject's VibrateAmt property to values between 0.07 and 0.75
	 - call the cycleEngine function passing DetectiveVehicleObject as an argument
	*/
	DetectiveVehicleObject.MilesAmount += DetectiveVehicleObject.GasValue;
	DetectiveVehicleObject.VibrateAmt += random(-0.1, 0.1);
	DetectiveVehicleObject.VibrateAmt = constrain(DetectiveVehicleObject.VibrateAmt, 0.07, 0.75);
	cycleEngine(DetectiveVehicleObject);
}


function switchLanes(target_vehicle) {
	/*
	This function should do the following: 
	 - move target_vehicle from one lane to the other.
	 - do the move in a single step without any extra animation.
	 - use Lane_PosA and Lane_PosB to effect the change.
	 hint: You will need to modify the PositionX property of target_vehicle.
	*/
	if (target_vehicle.PositionX == Lane_PosA) {
		target_vehicle.PositionX = Lane_PosB;
	}
	else {
		target_vehicle.PositionX = Lane_PosA;
	}
}


function carInfront(car) {
	/*
	This function should do the following: 
	 - determine if car is in the same lane and less than 200px behind any of the cars in VehicleObjectList.
	 - do this by traversing VehicleObjectList and comparing each car's MilesAmount property to that of car.
	 - if you find a car that matches these requirements then return the NumberPlate property for the car. Otherwise return false.
	*/
	for (var i = 0; i < VehicleObjectList.length; i++) {
		if ((VehicleObjectList[i].PositionX == car.PositionX) && (VehicleObjectList[i].MilesAmount > car.MilesAmount) && (VehicleObjectList[i].MilesAmount - 200 < car.MilesAmount)) {
			console.log(true)
			return VehicleObjectList[i].NumberPlate;
		}
	}
	return false;
}


//////////////DO NOT CHANGE CODE BELOW THIS LINE//////////////////

var DetectiveVehicleObject;

var roadWidth;
var roadLeftEdge;
var Lane_PosA;
var Lane_PosB;
var carImages = {};

var VehicleObjectList = [
	{ PositionX: 300, PositionY: 0, MilesAmount: -200, CarVariety: 'blueCar', NumberPlate: 'Z6FM0T', GasValue: 2, exhaust: [] }, { PositionX: 500, PositionY: 0, MilesAmount: 200, CarVariety: 'blueCar', NumberPlate: '1ZZ7FF', GasValue: 2, exhaust: [] }, { PositionX: 500, PositionY: 0, MilesAmount: 600, CarVariety: 'redCar', NumberPlate: 'VHY4SS', GasValue: 2, exhaust: [] }, { PositionX: 300, PositionY: 0, MilesAmount: 1000, CarVariety: 'blueCar', NumberPlate: 'D33IQQ', GasValue: 2, exhaust: [] }, { PositionX: 500, PositionY: 0, MilesAmount: 1400, CarVariety: 'greenCar', NumberPlate: '54CY8H', GasValue: 2, exhaust: [] }, { PositionX: 300, PositionY: 0, MilesAmount: 1800, CarVariety: 'redCar', NumberPlate: 'T03YOP', GasValue: 2, exhaust: [] }, { PositionX: 500, PositionY: 0, MilesAmount: 2200, CarVariety: 'whiteCar', NumberPlate: 'W0BBEJ', GasValue: 2, exhaust: [] }, { PositionX: 500, PositionY: 0, MilesAmount: 2600, CarVariety: 'redCar', NumberPlate: '8UE157', GasValue: 2, exhaust: [] }, { PositionX: 300, PositionY: 0, MilesAmount: 3000, CarVariety: 'whiteCar', NumberPlate: 'IAFNA2', GasValue: 2, exhaust: [] }, { PositionX: 300, PositionY: 0, MilesAmount: 3400, CarVariety: 'redCar', NumberPlate: '619SMX', GasValue: 2, exhaust: [] }, { PositionX: 500, PositionY: 0, MilesAmount: 3800, CarVariety: 'blueCar', NumberPlate: '4BL6H6', GasValue: 2, exhaust: [] }, { PositionX: 300, PositionY: 0, MilesAmount: 4200, CarVariety: 'greenCar', NumberPlate: 'PMSBR8', GasValue: 2, exhaust: [] }, { PositionX: 300, PositionY: 0, MilesAmount: 4600, CarVariety: 'redCar', NumberPlate: 'E08FFR', GasValue: 2, exhaust: [] }, { PositionX: 500, PositionY: 0, MilesAmount: 5000, CarVariety: 'greenCar', NumberPlate: 'KR1YVD', GasValue: 2, exhaust: [] }, { PositionX: 500, PositionY: 0, MilesAmount: 5400, CarVariety: 'redCar', NumberPlate: '8QHXZN', GasValue: 2, exhaust: [] }, { PositionX: 500, PositionY: 0, MilesAmount: 5800, CarVariety: 'greenCar', NumberPlate: 'ZMWS55', GasValue: 2, exhaust: [] }, { PositionX: 500, PositionY: 0, MilesAmount: 6200, CarVariety: 'whiteCar', NumberPlate: 'HED9BD', GasValue: 2, exhaust: [] }, { PositionX: 300, PositionY: 0, MilesAmount: 6600, CarVariety: 'greenCar', NumberPlate: 'P9FEAG', GasValue: 2, exhaust: [] }, { PositionX: 500, PositionY: 0, MilesAmount: 7000, CarVariety: 'redCar', NumberPlate: '3ER38F', GasValue: 2, exhaust: [] }, { PositionX: 300, PositionY: 0, MilesAmount: 7400, CarVariety: 'redCar', NumberPlate: 'SW48PY', GasValue: 2, exhaust: [] }
];



function preload() {
	var carTypes = [
		"detective",
		"redCar",
		"greenCar",
		"blueCar",
		"whiteCar",
	];

	for (var i = 0; i < carTypes.length; i++) {
		carImages[carTypes[i]] = loadImage("cars/" + carTypes[i] + ".png");
	}
}

function setup() {
	createCanvas(800, 800);

	roadWidth = 400;
	roadLeftEdge = 200;
	Lane_PosA = 300;
	Lane_PosB = 500;

	DetectiveVehicleObject =
	{
		PositionX: roadLeftEdge + roadWidth / 4,
		PositionY: 550,
		MilesAmount: 0,
		GasValue: 3,
		VibrateAmt: 0,
		CarVariety: 'detective',
		NumberPlate: '5L3UTH',
		exhaust: []
	}


}



function draw() {
	background(0);



	drawRoad();
	drawCars();

	////////////////////// HANDLE DETECTIVE /////////////////////////


	driveVehicle();
	var b2b = carInfront(DetectiveVehicleObject);
	if (b2b) switchLanes(DetectiveVehicleObject);


	//////////////////////HANDLE THE OTHER CARS//////////////////////

	for (var i = 0; i < VehicleObjectList.length; i++) {
		VehicleObjectList[i].MilesAmount += VehicleObjectList[i].GasValue;
		VehicleObjectList[i].PositionY = DetectiveVehicleObject.PositionY - VehicleObjectList[i].MilesAmount + DetectiveVehicleObject.MilesAmount;
	}

}

/////////////////////////DRAWING FUNCTIONS////////////////////////

function drawRoad() {
	stroke(100);
	fill(50);
	rect(roadLeftEdge, 0, roadWidth, 800);
	stroke(255);

	for (var i = -1; i < 20; i++) {
		line(
			roadLeftEdge + roadWidth / 2, i * 100 + (DetectiveVehicleObject.MilesAmount % 100),
			roadLeftEdge + roadWidth / 2, i * 100 + 70 + (DetectiveVehicleObject.MilesAmount % 100)
		);
	}
}

function drawCars() {
	//draw the detective car

	image
	drawExhaust(DetectiveVehicleObject);
	image
		(
			carImages["detective"],
			DetectiveVehicleObject.PositionX - carImages["detective"].width / 2 + random(-DetectiveVehicleObject.VibrateAmt, DetectiveVehicleObject.VibrateAmt),
			DetectiveVehicleObject.PositionY + random(-DetectiveVehicleObject.VibrateAmt, DetectiveVehicleObject.VibrateAmt)
		);

	//draw all other cars

	for (var i = 0; i < VehicleObjectList.length; i++) {
		if (VehicleObjectList[i].PositionY < height && VehicleObjectList[i].PositionY > -height / 2) {
			image(
				carImages[VehicleObjectList[i].CarVariety],
				VehicleObjectList[i].PositionX - carImages[VehicleObjectList[i].CarVariety].width / 2,
				VehicleObjectList[i].PositionY
			);
			cycleEngine(VehicleObjectList[i]);

			drawExhaust(VehicleObjectList[i]);
		}
	}

}

function cycleEngine(car) {

	car.exhaust.push({ size: 2, x: car.PositionX, y: car.PositionY + carImages[car.CarVariety].height });

	for (var i = car.exhaust.length - 1; i >= 0; i--) {

		car.exhaust[i].y += max(0.75, car.GasValue / 3);
		if (car.CarVariety != "detective") car.exhaust[i].y += (DetectiveVehicleObject.GasValue - car.GasValue);
		car.exhaust[i].x += random(-1, 1);
		car.exhaust[i].size += 0.5;

		if (car.exhaust[i].y > height || car.exhaust[i].y < 0) {
			car.exhaust.splice(i, 1);
		}
	}
}


function drawExhaust(car) {
	noStroke();
	for (var i = 0; i < car.exhaust.length; i++) {
		var alpha = map(car.exhaust[i].size, 0, 40, 50, 0);
		fill(125, alpha);
		ellipse(car.exhaust[i].x + 20, car.exhaust[i].y, car.exhaust[i].size);

	}
}
