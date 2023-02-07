/*

Officer: 3977425
CaseNum: 502-3-45402351-3977425

Case 502 - A donation - stage 4

This final document will seal the deal. C’mon kid, let’s send these crooks down.

- Run the sketch and you'll see the redacted text on the left and the missing words on the right
- Your task is to replace the redacted sections in redactedText with the missing words. 
- You must do this by finding each word in the data structures  below and then concatenating redactedText with references to the word in the respective data structure.


*/


var redactedText;

// data structures to be referenced in redactedText
var ADocument = [
{
	word0: ["bake", "fence", "plug", "tug"], 
	word1: ["consider", "clip", "radiate", "play"], 
	word2: ["stuff", "succeed", "radiate", "mend"]
},
{
	word0: ["sneeze", "play", "play", "bake"], 
	word1: ["mend", "donation", "you", "charge"], 
	word2: ["Governor Zuckerberg", "clip", "hurry", "clip"]
},
{
	word0: ["charge", "succeed", "bake", "rejoice"], 
	word1: ["charge", "bake", "rejoice", "hurry"], 
	word2: ["rejoice", "charge", "start", "rejoice"]
},
{
	word0: ["meddle", "mend", "radiate", "mend"], 
	word1: ["clip", "tug", "COBOL", "plug"], 
	word2: ["rejoice", "hurry", "clip", "consider"]
},
{
	word0: ["sneeze", "protect", "ALGOL fish wholesalers", "protect"], 
	word1: ["start", "rejoice", "clip", "bake"], 
	word2: ["clip", "syndicate", "charge", "tug"]
}];

var BDocument = [
{
	word0: ["fence", "rejoice", "smile", "radiate"], 
	word1: ["play", "succeed", "charge", "tug"], 
	word2: ["smile", "fence", "sail", "bake"]
},
{
	word0: ["rejoice", "bake", "rejoice", "charge"], 
	word1: ["protect", "succeed", "sail", "hurry"], 
	word2: ["play", "start", "charge", "succeed"]
},
{
	word0: ["succeed", "plug", "mend", "charge"], 
	word1: ["development", "succeed", "stuff", "bake"], 
	word2: ["plug", "hurry", "sail", "clip"]
},
{
	word0: ["start", "plug", "consider", "ALGOL"], 
	word1: ["clip", "mend", "play", "play"], 
	word2: ["meddle", "sail", "$200,000", "meddle"]
},
{
	word0: ["sneeze", "mend", "Edsger", "bake"], 
	word1: ["smile", "meddle", "bake", "charge"], 
	word2: ["sail", "mend", "start", "tug"]
}];

var myFont;
var backgroundImg;

function preload() {
  myFont = loadFont('SpecialElite.ttf');
  backgroundImg = loadImage("Background.png");
}

function setup()
{
  createCanvas(1280, 800);

  // replace all redacted words with the correct values from the data structures above
  redactedText = "My dearest "+ BDocument[4].word0[2] +", I have just received \
  your very generous "+ ADocument[1].word1[1] +" of \
"+ BDocument[3].word2[2] +". \
Thank you. This will be invaluable to our campaign. "+ BDocument[3].word0[3] +" is a \
stalwart part of the community \
and I look forward to continuing our strong partnership in the future. \
Regard the other matter, \
I think you will find that all has been satisfactorily dealt with. Just read this \
morning’s front pages. \
You can rest assured that no mention was made of \
"+ ADocument[1].word1[2] +" or "+ ADocument[4].word0[2] +" to \
the "+ ADocument[4].word2[1] +". \
Your new "+ BDocument[2].word1[0] +" at the \
"+ ADocument[3].word1[2] +" can now proceed without impediment. \
Yours sincerely, "+ ADocument[1].word2[0] +"";

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
  text("Edsger, donation, $200,000, ALGOL, you, ALGOL fish wholesalers, syndicate, development, COBOL, Governor Zuckerberg", 670, 100, 580, 600);
}
