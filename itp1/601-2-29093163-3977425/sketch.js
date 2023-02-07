/*
Officer: 3977425
CaseNum: 601-2-29093163-3977425

Case 601 - Murdering Again - stage 3

Now murders are beginning to occur - we're pretty sure that this is the work of Fry.
If we can place her near any of the recent crime scenes in the area we should be able narrow down her location.

In the setup function, use a for loop to traverse the sightings, marking all of the locations on the map
where she was last seen. Do this by drawing small, Turquoise fill rectangles centered over each location.

In addition, we've assembled a list of recent thefts in the area. Using another for loop to traverse the
recent crime records, you should mark those locations on the map. Do this by drawing small, ForestGreen stroke triangles centered over each location.

Use X11 colours. You can find a reference table at https://www.w3.org/TR/css3-iccprof#numerical.

Let's try to catch Fry by looking patterns between sightings and crimes. If she was within less than 32 pixels of any of the crimes then the details should be pushed to possible matches with the following format.

{ suspect_x: 0, suspect_y: 0 ,crime_x: 0, crime_y: 0, victimName: "John_Doe" }

Note that the possible matches are already being drawn. Your job is simply to fill the array with the correct data.

For this mission you will need ONLY the following:

- for loop
- dist()
- if()
- <
- .push()
- rect() NB. Draw each rectangle with the point at its center.rectMode(CENTER) is not accepted

- triangle() NB. Draw each triangle with the point roughly at its center.

- stroke(), fill() - rgb values only
- noStroke(), noFill()

*/

var countyMap;

var possibleMatches = [];

//Sightings of Casey Fry.

var suspectLog = {
	LocX: [639, 681, 712, 756, 715, 701, 753, 815, 795, 788, 781, 768, 750, 732, 714, 695, 693, 654, 624, 594, 555],
	LocY: [288, 286, 293, 310, 368, 425, 436, 468, 506, 497, 486, 489, 500, 506, 514, 531, 552, 523, 500, 484, 474],
};

//Recent crime records.

var murdersceneData = {
	Pos_X: [409, 443, 465, 709, 695, 652, 641, 119, 114, 90, 76, 615, 349, 456],
	Pos_Y: [446, 419, 548, 552, 421, 268, 306, 344, 359, 490, 516, 741, 796, 770],
	Murdered_: ['TAMICA MAUBERT', 'LAKESHA SYMMES', 'ERMELINDA OORIN', 'DARBY MYRLE', 'KITTY THAXTER', 'RANDEE CROME', 'BRAD SILVEIRA', 'PIERRE DORCEY', 'JESUS FORSLIN', 'JULIANA ADVERSANE', 'LAVERNE JACQUELIN', 'DRUSILLA WARMAN', 'LIANNE COURTWOOD', 'NICOLE ASHELY'],
};

function preload()
{
	countyMap = loadImage("map.png")
}

function setup()
{
	createCanvas(countyMap.width, countyMap.height);
	noFill();
	noStroke();
	image(countyMap, 0,0);

	//add your code below here
	push();
	for (let sightings_x = 0; sightings_x < suspectLog.LocX.length; sightings_x++){
		fill(64,224,208);
		rect(suspectLog.LocX[sightings_x] - 2.5, suspectLog.LocY[sightings_x] - 2.5, 5, 5);
	}
	pop();

	push();
	for (let crimes_x = 0; crimes_x < murdersceneData.Pos_X.length; crimes_x++){
		stroke(34,139,34);
		let centerPointX = murdersceneData.Pos_X[crimes_x]
		let centerPointY = murdersceneData.Pos_Y[crimes_x]
		triangle(centerPointX, centerPointY - 5, centerPointX - 5, centerPointY + 5, centerPointX + 5, centerPointY + 5);
	}
	pop();


	for(let i = 0 ; i < suspectLog.LocX.length ; i++)
	{
		for(let j = 0 ; j < murdersceneData.Pos_X.length ; j++)
		{
			if(dist(suspectLog.LocX[i], suspectLog.LocY[i], murdersceneData.Pos_X[j], murdersceneData.Pos_Y[j]) < 32)
			{
				possibleMatches.push({
					suspect_x: suspectLog.LocX[i],
					suspect_y: suspectLog.LocY[i],
					crime_x: murdersceneData.Pos_X[j],
					crime_y: murdersceneData.Pos_Y[j],
					victimName: murdersceneData.Murdered_[j]
				});
			}
		}
	}


	// code to draw the matches ( if any)
	for(let i = 0 ; i < possibleMatches.length ; i++)
	{
		stroke(127);
		strokeWeight(3);
		line(possibleMatches[i].crime_x, possibleMatches[i].crime_y, possibleMatches[i].suspect_x, possibleMatches[i].suspect_y);

		noStroke();
		fill(127);
		text(possibleMatches[i].victimName, possibleMatches[i].crime_x + 15, possibleMatches[i].crime_y + 15);
	}
}

//We are not using the draw function this time
