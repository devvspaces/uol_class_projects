/*
Officer: 3977425
CaseNum: 601-0-45767497-3977425

Case 601 - Escaped - stage 1

We've got an emergency here. The notorious killer Casey Fry has escaped from the Federal Correctional Institution.
She is on the loose and we have been asked to track her movements.

In the setup function, use a for loop to traverse the sightings, marking all of the locations on the map
where she was last seen. Do this by drawing small, Magenta fill ellipses at each location.

Use X11 colours. You can find a reference table at https://www.w3.org/TR/css3-iccprof#numerical.

For this mission you will need ONLY the following:

- for loop
- ellipse()

- stroke(), fill() - rgb values only
- noStroke(), noFill()

*/

var countyMap;

//Sightings of Casey Fry.

var fugitive_sighted_location_x = [127, 156, 179, 200, 220, 228, 249, 269, 292, 321, 354, 390, 396, 429, 456, 467, 483, 531, 547, 571, 589, 637];
var fugitive_sighted_location_y = [175, 158, 192, 154, 133, 168, 149, 139, 168, 133, 159, 144, 225, 228, 230, 277, 267, 291, 278, 274, 318, 280];


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
	for (let x_idx = 0; x_idx < fugitive_sighted_location_x.length; x_idx++) {
		fill(255, 0, 255);
		ellipse(fugitive_sighted_location_x[x_idx], fugitive_sighted_location_y[x_idx], 5, 5);
	}

}

//We are not using the draw function this time
