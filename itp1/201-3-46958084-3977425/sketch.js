/*
201 - The case of Judge Hopper
Stage 4 - The warehouse

Officer: 3977425
CaseNum: 201-3-46958084-3977425

As you enter the ALGOL warehouse you are struck by the most horrendous stench - it’s not the fish. Lying amongst piles of fish carcasses you find the body of Judge Hopper. Gathering yourself together, you tie a handkerchief around your nose and mouth and quickly set about recording the evidence.

Draw around the Judge’s body ...

HINT: You should only need around 20 vertices to draw round the judge. Make sure you close your shape!

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  beginShape()
  endShape()
  vertex()

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

    // write the code to draw around the Judge's body below

    beginShape();
    vertex(436, 313);
    vertex(377, 371);
    vertex(390, 388);
    vertex(416, 383);
    vertex(418, 363);
    vertex(440, 356);
    vertex(461, 368);
    vertex(464, 392);
    vertex(457, 402);
    vertex(485, 471);
    vertex(538, 487);
    vertex(568, 485);
    vertex(602, 460);
    vertex(677, 478);
    vertex(704, 506);
    vertex(724, 498);
    vertex(707, 451);
    vertex(646, 426);
    vertex(620, 428);
    vertex(580, 407);
    vertex(590, 377);
    vertex(606, 363);
    vertex(608, 349);
    vertex(700, 172);
    vertex(657, 170);
    vertex(712, 136);
    vertex(732, 70);
    vertex(697, 66);
    vertex(678, 108);
    vertex(657, 127);
    vertex(640, 120);
    vertex(643, 100);
    vertex(600, 109);
    vertex(582, 148);
    vertex(576, 166);
    vertex(548, 163);
    vertex(527, 244);
    vertex(518, 284);
    vertex(487, 335);
    vertex(457, 317);
    vertex(445, 318);
    endShape(CLOSE);



    //A helpful mouse pointer
	push();
        fill(0);
        noStroke();
        text(mouseX + "," + mouseY, mouseX,mouseY);
    pop();

}
