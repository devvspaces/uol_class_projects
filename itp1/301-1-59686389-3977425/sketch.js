/*
The case of the Python Syndicate
Stage 2


Officer: 3977425
CaseNum: 301-1-59686389-3977425

- Word on the street is that there is a new gang in town - The Python Syndicate.
It seems my bones were correct on this one. I need you to organise the gang
around the suspected leader Bones Karpinski

- The variables for Bones Karpinski have been declared and initialised.
- This time you are NOT allowed to create any new variables.
- Instead you must position each mug shot relative to Bones Karpinski
- To do this you will need to control the positions of the mugshots by adding/subtracting hard-coded values to the appropriate Bones Karpinski variable for each parameter.
- If you've got it right all six images should appear in exactly the same positions as they do now.

REMEMBER:
- Do not create any new variables
- Do not change the values of the variables for Bones Karpinski 
- Do not add any additional commands

*/

var photoBoard;
var pawel_karpinski_image;
var bones_karpinski_image;
var ada_lovelace_image;
var anna_karpinski_image;
var countess_hamilton_image;
var robbie_kray_image;


var bones_karpinski_location_x = 408;
var bones_karpinski_location_y = 40;


function preload()
{
	photoBoard = loadImage('photoBoard.png');
	pawel_karpinski_image = loadImage("karpinskiBros2.png");
	bones_karpinski_image = loadImage("karpinskiDog.png");
	ada_lovelace_image = loadImage("ada.png");
	anna_karpinski_image = loadImage("karpinskiWoman.png");
	countess_hamilton_image = loadImage("countessHamilton.png");
	robbie_kray_image = loadImage("krayBrothers2.png");

}

function setup()
{
	createCanvas(photoBoard.width, photoBoard.height);
}

function draw()
{
	image(photoBoard, 0, 0);

	//And update these image commands with your x and y coordinates.
	image(bones_karpinski_image, bones_karpinski_location_x, bones_karpinski_location_y);

	image(pawel_karpinski_image, bones_karpinski_location_x - 293, bones_karpinski_location_y);
	image(ada_lovelace_image, bones_karpinski_location_x + 293, bones_karpinski_location_y);
	image(anna_karpinski_image, bones_karpinski_location_x - 293, bones_karpinski_location_y + 269);
	image(countess_hamilton_image, bones_karpinski_location_x, bones_karpinski_location_y + 269);
	image(robbie_kray_image, bones_karpinski_location_x + 293, bones_karpinski_location_y + 269);
}