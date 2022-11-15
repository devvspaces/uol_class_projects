/*
The case of the Python Syndicate
Stage 1

Officer: 3977425
CaseNum: 301-0-65004338-3977425

I gotta give it to you kid, you’ve made an excellent start, but now it’s time
to take things up a level. For some time I’ve suspected that there’s something
big going down in Console City.

These cases that we’ve been working are all connected somehow. I need to use
that considerable brain of yours to work it all out. Let’s start by laying out
who we know.

Place each mugshot in its designated position by doing the following:

- Create a new variable for the X and Y coordinates of each mugshot.
    - One has already been done for you.
    - Make sure you use the same style and format for the variable name.
- Initialise the variables with the correct values. HINT: you should be able to derive these from the image commands below.
- Finally modify the each image command replacing the hard-coded values with your variables. 
- If you've got it right all six images should appear in exactly the same positions as they do now.

*/

var photoBoard;
var ada_lovelace_image;
var robbie_kray_image;
var anna_karpinski_image;
var pawel_karpinski_image;
var countess_hamilton_image;
var cecil_karpinski_image;



//declare your new variables below
var anna_karpinski_x_loc = 701;
var anna_karpinski_y_loc = 40;

var ada_lovelace_x_loc = 115;
var ada_lovelace_y_loc = 40;

var robbie_kray_x_loc = 408;
var robbie_kray_y_loc = 40;

var pawel_karpinski_x_loc = 115;
var pawel_karpinski_y_loc = 309;

var countess_hamilton_x_loc = 408;
var countess_hamilton_y_loc = 309;

var cecil_karpinski_x_loc = 701;
var cecil_karpinski_y_loc = 309;


function preload()
{
	photoBoard = loadImage('photoBoard.png');
	ada_lovelace_image = loadImage("ada.png");
	robbie_kray_image = loadImage("krayBrothers2.png");
	anna_karpinski_image = loadImage("karpinskiWoman.png");
	pawel_karpinski_image = loadImage("karpinskiBros2.png");
	countess_hamilton_image = loadImage("countessHamilton.png");
	cecil_karpinski_image = loadImage("karpinskiBros1.png");

}

function setup()
{
	createCanvas(photoBoard.width, photoBoard.height);
}

function draw()
{
	image(photoBoard, 0, 0);



	//And update these image commands with your x and y coordinates.
	image(anna_karpinski_image, anna_karpinski_x_loc, anna_karpinski_y_loc);

	image(ada_lovelace_image, ada_lovelace_x_loc, ada_lovelace_y_loc);
	image(robbie_kray_image, robbie_kray_x_loc, robbie_kray_y_loc);
	image(pawel_karpinski_image, pawel_karpinski_x_loc, pawel_karpinski_y_loc);
	image(countess_hamilton_image, countess_hamilton_x_loc, countess_hamilton_y_loc);
	image(cecil_karpinski_image, cecil_karpinski_x_loc, cecil_karpinski_y_loc);

}