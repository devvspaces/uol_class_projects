/*

Officer: 3977425
CaseNum: 403-3-62815121-3977425

Case 403 - Captured - stage 4

A coordinated action is under way to arrest Shiffman. Police are currently in pursuit on Meyers Way.
In order to catch him we must be able to alert all forces of his whereabouts according to the following rules:

- if Shiffman is within 122 meters from Torvald's House then alert local police by drawing a MediumBlue circle around it with a radius of 122 pixels.
- if Shiffman is in City Narrows then the neighbourhood watch must be notified by drawing a DarkBlue rectangle around it.
- if Shiffman is in neither position, a global alert must be issued by drawing a Coral rectangle covering the area between Reynolds Street, Ada Avenue, Meyers Way and Mullenweg Street.

Shiffman's position is signified by the mouse.

Note: all road coordinates are measured from their center.

Use X11 colours. You can find a reference table at https://www.w3.org/TR/css3-iccprof#numerical.

There are many possible ways of investigating this case, but you should use ONLY the following commands, operators and variables:

  if(){}
  >
  <
  &&
  else
  fill()  - Use r,g,b values between 0 and 255.
  dist()
  ellipse()
  rect()
  mouseX
  mouseY

*/

var img;

function preload()
{
	img = loadImage('map.jpg');
}

function setup()
{
	createCanvas(img.width,img.height);
}

function draw()
{
    // draw the image
    image(img,0,0);

    //Write your code below here ...
    var torvaldHouseX = 399
    var torvaldHouseY = 100

    var cityNarrowsMinX = 1978
    var cityNarrowsMinY = 93
    var cityNarrowsMaxX = 2097
    var cityNarrowsMaxY = 207

    var globalMinX = 360
    var globalMinY = 240
    var globalMaxX = 552
    var globalMaxY = 440

    
    if (dist(mouseX, mouseY, torvaldHouseX, torvaldHouseY) < 122) {
        fill(0,0,205);
        ellipse(torvaldHouseX, torvaldHouseY, 122*2, 122*2);
    } else if (mouseX > cityNarrowsMinX && mouseX < cityNarrowsMaxX && mouseY > cityNarrowsMinY && mouseY < cityNarrowsMaxY) {
        fill(0,0,139);
        rect(cityNarrowsMinX, cityNarrowsMinY, cityNarrowsMaxX - cityNarrowsMinX, cityNarrowsMaxY - cityNarrowsMinY);
    } else {
        fill(255,127,80);
        rect(globalMinX, globalMinY, globalMaxX - globalMinX, globalMaxY - globalMinY);
    }

    // finally, draw Shiffman's position
    strokeWeight(2);
    stroke(255);
    fill(255,0,0);
    ellipse(mouseX, mouseY, 10, 10);


    // a helpful mouse coordinate pointer
    fill(0, 128, 0);
    noStroke();
    text(`${mouseX},${mouseY}`,mouseX, mouseY);
}