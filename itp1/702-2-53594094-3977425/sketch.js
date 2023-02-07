/*

Officer: 3977425
CaseNum: 702-2-53594094-3977425

Case 702 - The case of Vanishing Vannevar
Stage 3 - Where's Vannevar

“All units: Vannevar’s car has been sighted. It is a white car with a licence_plate of 3DKTAX. Approach with
caution.” This is your big chance kid. Don’t blow it. Complete the helper functions below to
drive through the traffic and locate Vannevar.

There are many possible ways of completing this task,
but you should ONLY use the following commands and techniques:

	- Incrementing and assiging variables
	- Maths function such as random, min, abs, and constrain
	- Conditional statements
	- Traversing arrays with for loops
	- calling functions and returning values

HINT: make sure you take a look at the initialisation of sleuth_vehicleObject and the cars in
VehicleObjects_Array to understand their properties.

*/

///////////////////////// HELPER FUNCTIONS /////////////////////

function Drive_Vehicle()
{
	/*
	This function should do the following: 
	 - increment sleuth_vehicleObject's dist_driven property by its gas_amt property 
	 - add a random amount between -0.04 and 0.04 to sleuth_vehicleObject's shudder_value property
	 - use the constrain function to constrain sleuth_vehicleObject's shudder_value property to values between 0.06 and 1.13
	 - call the Turn_Engine function passing sleuth_vehicleObject as an argument
	*/
	sleuth_vehicleObject.dist_driven += sleuth_vehicleObject.gas_amt;
	sleuth_vehicleObject.shudder_value += random(-0.04, 0.04);
	sleuth_vehicleObject.shudder_value = constrain(sleuth_vehicleObject.shudder_value, 0.06, 1.13);
	Turn_Engine(sleuth_vehicleObject);
}


function Swap_Lanes(car)
{
	/*
	This function should do the following: 
	 - move car from one lane to the other.
	 - do the move in a single step without any extra animation.
	 - use Lane_position_A and Lane_position_B to effect the change.
	 hint: You will need to modify the x property of car.
	*/
	if (car.x === Lane_position_A)
	{
		car.x = Lane_position_B;
	}
	else
	{
		car.x = Lane_position_A;
	}
}


function SearchCar_IsInfront( Target_vehicle_A, Target_vehicle_B )
{
	/*
	This function should do the following: 
	 - determine if Target_vehicle_A is in the same lane and less than 200px behind Target_vehicle_B.
	 - do this by comparing the two cars' dist_driven properties
	 - if these requirements are met then return Target_vehicle_B. Otherwise return false.
	*/
	if (
		(Target_vehicle_A.x === Target_vehicle_B.x) &&
		(Target_vehicle_B.dist_driven > Target_vehicle_A.dist_driven) &&
		(Target_vehicle_B.dist_driven - 200 < Target_vehicle_A.dist_driven)
	)
	{
		return Target_vehicle_B;
	}
	return false;
}


function CheckCar_BySide( car_obj )
{
	/*
	This function should do the following: 
	 - determine if car_obj is parallel with sleuth_vehicleObject.
	 - if car_obj is found to be parallel to sleuth_vehicleObject then return car_obj.
	 - cars are considered parallel if the absolute difference between their dist_driven properties is less than 25 px and they have non-matching x properties	*/
	if (abs(car_obj.dist_driven - sleuth_vehicleObject.dist_driven) < 25 && car_obj.x !== sleuth_vehicleObject.x)
	{
		return car_obj;
	}
	return false;
}


function Identify_Criminal()
{
	/*
	This function should do the following: 
	 - Check cars passing parallel to sleuth_vehicleObject to see if they match the licence_plate property in the criminal description.
	 - it does this by traversing VehicleObjects_Array and calling CheckCar_BySide for each car
.	 - if a positive result is returned then the licence_plate property of the found car is then checked against the criminal description.
	 - if a match is found then the object of the car in question is returned.
	 - otherwise return false.
	*/
	for (var i = 0; i < VehicleObjects_Array.length; i++)
	{
		var car_obj = CheckCar_BySide(VehicleObjects_Array[i]);
		if (car_obj && car_obj.licence_plate === "3DKTAX")
		{
			return car_obj;
		}
	}
}


//////////////DO NOT CHANGE CODE BELOW THIS LINE//////////////////

var sleuth_vehicleObject;

var roadWidth;
var roadLeftEdge;
var Lane_position_A;
var Lane_position_B;
var carImages = {};
var criminal;

var VehicleObjects_Array = [
{ x: 300, y: 0, dist_driven: -200, vehicle_type: 'blueCar', licence_plate: '2QTMOU', gas_amt: 2, exhaust: [  ]} , { x: 300, y: 0, dist_driven: 200, vehicle_type: 'whiteCar', licence_plate: 'WSRS2U', gas_amt: 2, exhaust: [  ]} , { x: 300, y: 0, dist_driven: 600, vehicle_type: 'blueCar', licence_plate: 'LHUGF4', gas_amt: 2, exhaust: [  ]} , { x: 500, y: 0, dist_driven: 1000, vehicle_type: 'greenCar', licence_plate: 'RIMDLL', gas_amt: 2, exhaust: [  ]} , { x: 500, y: 0, dist_driven: 1400, vehicle_type: 'whiteCar', licence_plate: '3DKTAX', gas_amt: 2, exhaust: [  ]} , { x: 500, y: 0, dist_driven: 1800, vehicle_type: 'blueCar', licence_plate: '89CR2P', gas_amt: 2, exhaust: [  ]} , { x: 500, y: 0, dist_driven: 2200, vehicle_type: 'whiteCar', licence_plate: '460V37', gas_amt: 2, exhaust: [  ]} , { x: 500, y: 0, dist_driven: 2600, vehicle_type: 'greenCar', licence_plate: 'JFNYSX', gas_amt: 2, exhaust: [  ]} , { x: 300, y: 0, dist_driven: 3000, vehicle_type: 'whiteCar', licence_plate: 'EKSFXX', gas_amt: 2, exhaust: [  ]} , { x: 500, y: 0, dist_driven: 3400, vehicle_type: 'redCar', licence_plate: 'HJH8CL', gas_amt: 2, exhaust: [  ]} , { x: 500, y: 0, dist_driven: 3800, vehicle_type: 'greenCar', licence_plate: 'YDM94D', gas_amt: 2, exhaust: [  ]} , { x: 500, y: 0, dist_driven: 4200, vehicle_type: 'greenCar', licence_plate: 'RJ6JOE', gas_amt: 2, exhaust: [  ]} , { x: 500, y: 0, dist_driven: 4600, vehicle_type: 'whiteCar', licence_plate: '1NU75F', gas_amt: 2, exhaust: [  ]} , { x: 500, y: 0, dist_driven: 5000, vehicle_type: 'blueCar', licence_plate: 'O2SEXA', gas_amt: 2, exhaust: [  ]} , { x: 500, y: 0, dist_driven: 5400, vehicle_type: 'redCar', licence_plate: '5O67FN', gas_amt: 2, exhaust: [  ]} , { x: 300, y: 0, dist_driven: 5800, vehicle_type: 'greenCar', licence_plate: '0FUQ2J', gas_amt: 2, exhaust: [  ]} , { x: 300, y: 0, dist_driven: 6200, vehicle_type: 'redCar', licence_plate: '7COK9G', gas_amt: 2, exhaust: [  ]} , { x: 500, y: 0, dist_driven: 6600, vehicle_type: 'blueCar', licence_plate: 'W4XOBV', gas_amt: 2, exhaust: [  ]} , { x: 500, y: 0, dist_driven: 7000, vehicle_type: 'blueCar', licence_plate: 'GN55ZV', gas_amt: 2, exhaust: [  ]} , { x: 500, y: 0, dist_driven: 7400, vehicle_type: 'whiteCar', licence_plate: 'S6WWIQ', gas_amt: 2, exhaust: [  ]} 
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
	Lane_position_A = 300;
	Lane_position_B = 500;

	sleuth_vehicleObject = 
	{
		x: roadLeftEdge + roadWidth/4,
		y: 550,
		dist_driven: 0,
		gas_amt: 3,
		shudder_value: 0,
		vehicle_type: 'detective',
		licence_plate: '5L3UTH',
		exhaust: []
	}


}



function draw()
{
	background(0);



	drawRoad();
	drawCars();

	if(criminal)
	{
		fill(255);

		text("criminal found !", width/2, height/2);
		return;
	}

	////////////////////// HANDLE DETECTIVE /////////////////////////

	Drive_Vehicle();
	for(var i = 0; i < VehicleObjects_Array.length; i++)
	{
var b2b = SearchCar_IsInfront(sleuth_vehicleObject, VehicleObjects_Array[i]);
		if(b2b)Swap_Lanes(sleuth_vehicleObject);
	}
	var a = Identify_Criminal();
	if(a != false)criminal = a;


	//////////////////////HANDLE THE OTHER CARS//////////////////////

	for(var i = 0; i < VehicleObjects_Array.length; i++)
	{
		VehicleObjects_Array[i].dist_driven += VehicleObjects_Array[i].gas_amt;
		VehicleObjects_Array[i].y = sleuth_vehicleObject.y - VehicleObjects_Array[i].dist_driven + sleuth_vehicleObject.dist_driven;
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
		roadLeftEdge + roadWidth/2 , i * 100 + (sleuth_vehicleObject.dist_driven%100),
		roadLeftEdge + roadWidth/2 , i * 100 + 70 + (sleuth_vehicleObject.dist_driven%100)
		);
	}
}

function drawCars()
{
	//draw the detective car

	image
	drawExhaust(sleuth_vehicleObject);
	image
	(
		carImages["detective"],
		sleuth_vehicleObject.x - carImages["detective"].width/2 + random(-sleuth_vehicleObject.shudder_value, sleuth_vehicleObject.shudder_value),
		sleuth_vehicleObject.y + random(-sleuth_vehicleObject.shudder_value, sleuth_vehicleObject.shudder_value)
	);

	//draw all other cars

	for(var i = 0; i < VehicleObjects_Array.length; i ++)
	{
		if(VehicleObjects_Array[i].y < height && VehicleObjects_Array[i].y > -height/2)
		{
			image(
			carImages[VehicleObjects_Array[i].vehicle_type],
			VehicleObjects_Array[i].x - carImages[VehicleObjects_Array[i].vehicle_type].width/2,
			VehicleObjects_Array[i].y
			);
			Turn_Engine(VehicleObjects_Array[i]);

			drawExhaust(VehicleObjects_Array[i]);
		}
	}

}

function Turn_Engine(car)
{

	car.exhaust.push({size: 2, x: car.x, y: car.y + carImages[car.vehicle_type].height});

	for(var i = car.exhaust.length -1; i >= 0 ; i--)
	{

		car.exhaust[i].y  += max(0.75, car.gas_amt/3);
		if(car.vehicle_type != "detective")car.exhaust[i].y += (sleuth_vehicleObject.gas_amt - car.gas_amt);
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
