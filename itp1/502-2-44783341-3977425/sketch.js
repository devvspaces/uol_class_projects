/*

Officer: 3977425
CaseNum: 502-2-44783341-3977425

Case 502 - Out of the picture - stage 3

Yet another document has come my way. This one is even more tricky to decipher.
The Governor must really have something to hide.

- Run the sketch and you'll see the redacted text on the left and the missing words on the right
- Your task is to replace the redacted sections in redactedText with the missing words. 
- You must do this by finding each word in the data structures  below and then concatenating redactedText with references to the word in the respective data structure.

*/

var redactedText;

// arrays to be referenced in redactedText
var A_Paper = {
	Element_0: [ "campaign", "sail", "charge"], 
	Element_1: [ "smile", "start", "meddle"], 
	Element_2: [ "stuff", "clip", "rejoice"], 
	Element_3: [ "protect", "rejoice", "radiate"], 
	Element_4: [ "syndicate", "clip", "bake"], 
	Element_5: [ "mend", "sneeze", "charge"], 
	Element_6: [ "mend", "mend", "mend"], 
	Element_7: [ "mend", "play", "meddle"], 
	Element_8: [ "rejoice", "hit", "Edsger"], 
	Element_9: [ "plug", "succeed", "start"]
};

var B_Paper = {
	Element_0: [ "sneeze", "succeed", "protect"], 
	Element_1: [ "hurry", "mend", "charge"], 
	Element_2: [ "a donation", "clip", "sail"], 
	Element_3: [ "radiate", "fence", "Governor Zuckerberg"], 
	Element_4: [ "stuff", "meddle", "$200,000"], 
	Element_5: [ "sneeze", "Hopper", "meddle"], 
	Element_6: [ "meddle", "meddle", "sneeze"], 
	Element_7: [ "tug", "sneeze", "hurry"], 
	Element_8: [ "fence", "start", "stuff"], 
	Element_9: [ "sneeze", "ALGOL", "rejoice"]
};

var myFont;
var backgroundImg;

function preload() {
  myFont = loadFont('SpecialElite.ttf');
  backgroundImg = loadImage("Background.png");
}

function setup()
{
  createCanvas(1280,800);

  // replace all redacted words with the correct values from the data structures above
  redactedText = "Dear " + B_Paper.Element_3[2] + ", I am sure that something could be worked out \
in terms of " + B_Paper.Element_2[0] + " for your " + A_Paper.Element_0[0] + ". How does " + B_Paper.Element_4[2] + " sound ? I am afraid I will need to be \
so crude as to spell out what ALGOL requires in return. " + B_Paper.Element_5[1] + " needs to be out of the picture. \
She’s caused enough trouble. Get the " + A_Paper.Element_4[0] + " to organise the " + A_Paper.Element_8[1] + " but I’d prefer it you don’t \
mention me or " + B_Paper.Element_9[1] + ". I owe them enough favours already. Your old friend, " + A_Paper.Element_8[2];

}

function draw()
{
  // you don't need to change this
  image(backgroundImg, 0, 0);
  stroke(0);
  strokeWeight(3);
  line(width/2, 10, width/2, height - 10);
  noStroke();
  textFont(myFont);
  textSize(14);
  text(redactedText, 30, 100, 580, 600);
  text("Governor Zuckerberg, a donation, campaign, $200,000, Hopper, syndicate, hit, ALGOL, Edsger", 670, 100, 580, 600);
}
