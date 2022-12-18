/*
The case of the Python Syndicate
Stage 3


Officer: 3977425
CaseNum: 301-2-19189866-3977425

Right kid let’s work out which of our ‘friends’ is connected to the syndicate.

- An object for Countess Hamilton has been declared and initialised
- Position each mugshot relative to Countess Hamilton
- Do this by modifying the x and y parameters of each image command to use the x and y properties from the Countess Hamilton object.
- You will need to combine add and subtract operators with the relevant property for each parameter.
- If you've got it right, then all six images should appear in exactly the same positions as they do now.

REMEMBER:
- Do not create any new variables
- Do not change the values of the properties for Countess Hamilton 
- Do not add any additional commands

*/

var photoBoard;
var pawel_karpinski_image;
var countess_hamilton_image;
var bones_karpinski_image;
var rocky_kray_image;
var cecil_karpinski_image;
var anna_karpinski_image;

var countess_hamilton_object;




function preload()
{
	photoBoard = loadImage('photoBoard.png');
	pawel_karpinski_image = loadImage("karpinskiBros2.png");
	countess_hamilton_image = loadImage("countessHamilton.png");
	bones_karpinski_image = loadImage("karpinskiDog.png");
	rocky_kray_image = loadImage("krayBrothers1.png");
	cecil_karpinski_image = loadImage("karpinskiBros1.png");
	anna_karpinski_image = loadImage("karpinskiWoman.png");

}

function setup()
{
	createCanvas(photoBoard.width, photoBoard.height);
	countess_hamilton_object = {
		x: 408,
		y: 40,
		image: countess_hamilton_image
	};
}

function draw()
{
	image(photoBoard, 0, 0);

	//And update these image commands with your x and y coordinates.
	image(countess_hamilton_object.image, countess_hamilton_object.x, countess_hamilton_object.y);

	image(pawel_karpinski_image, countess_hamilton_object.x - 293, countess_hamilton_object.y);
	image(bones_karpinski_image, countess_hamilton_object.x + 293, countess_hamilton_object.y);
	image(rocky_kray_image, countess_hamilton_object.x - 293, countess_hamilton_object.y + 269);
	image(cecil_karpinski_image, countess_hamilton_object.x, countess_hamilton_object.y + 269);
	image(anna_karpinski_image, countess_hamilton_object.x + 293, countess_hamilton_object.y + 269);

}