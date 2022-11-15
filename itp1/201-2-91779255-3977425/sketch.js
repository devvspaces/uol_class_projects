/*
201 - The case of Judge Hopper
Stage 3 - The dressing room

Officer: 3977425
CaseNum: 201-2-91779255-3977425

No sooner do you enter the lobby of the Cobol Theatre than the sound of gunshots leads you running towards the backstage area. You head towards a swinging door, the star dressing room. Sure enough you find a series of bullet holes peppered across the mirror. You are about to turn round and resume your chase when you notice a familiar pattern in the holes. Frantically you grab some lipstick from the dresser and draw on the mirror.

Use the vertex function to complete the pattern.


*/

var img;

function preload()
{
    img = loadImage('scene.png');
}

function setup()
{
    createCanvas(img.width,img.height);
}

function draw()
{

    image(img,0,0);
    stroke(255, 0, 0);
    strokeWeight(3);
    noFill();

    // write the code to join the bullet holes below
    beginShape();
    vertex(444, 45);
    vertex(436, 114);
    vertex(351, 171);
    vertex(351, 263);
    vertex(433, 212);
    vertex(492, 73);
    endShape(CLOSE);

    // //A helpful mouse pointer
	// push();
    //     fill(0);
    //     noStroke();
    //     text(mouseX + "," + mouseY, mouseX,mouseY);
    // pop();

}
