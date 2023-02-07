/*

Officer: 3977425
CaseNum: 502-1-42598820-3977425

Case 502 - A delicate matter - stage 2

We’re hot on the trail kid, and another document has come my way. This message is a little more tricky to decipher, but I know you can do it.

- Run the sketch and you'll see the redacted text on the left and the missing words on the right
- Your task is to replace the redacted sections in redactedText with the missing words. 
- You must do this by finding each word in the data structures  below and then concatenating redactedText with references to the word in the respective data structure.

*/

var redactedText;

// data structures to be referenced in redactedText
var DocumentA = [
	{ Detail0: "mend", Detail1: "mend", Detail2: "bake" },
	{ Detail0: "mend", Detail1: "protect", Detail2: "smile" },
	{ Detail0: "protect", Detail1: "rejoice", Detail2: "mend" },
	{ Detail0: "charge", Detail1: "COBOL", Detail2: "a donation" },
	{ Detail0: "sneeze", Detail1: "bake", Detail2: "play" },
	{ Detail0: "stuff", Detail1: "delicate", Detail2: "radiate" },
	{ Detail0: "smile", Detail1: "rejoice", Detail2: "Hopper’s" },
	{ Detail0: "mend", Detail1: "tug", Detail2: "clip" },
	{ Detail0: "hurry", Detail1: "fence", Detail2: "meddle" },
	{ Detail0: "sneeze", Detail1: "syndicate", Detail2: "romantic" }
];

var DocumentB = [
	{ Detail0: "hurry", Detail1: "sail", Detail2: "Governor Zuckerberg" },
	{ Detail0: "start", Detail1: "stuff", Detail2: "charge" },
	{ Detail0: "tug", Detail1: "mend", Detail2: "clip" },
	{ Detail0: "capital", Detail1: "hurry", Detail2: "charge" },
	{ Detail0: "hurry", Detail1: "protect", Detail2: "charge" },
	{ Detail0: "smile", Detail1: "hurry", Detail2: "smile" },
	{ Detail0: "succeed", Detail1: "radiate", Detail2: "mend" },
	{ Detail0: "sneeze", Detail1: "fence", Detail2: "Edsger" },
	{ Detail0: "radiate", Detail1: "rejoice", Detail2: "sneeze" },
	{ Detail0: "she has", Detail1: "sail", Detail2: "charge" }
];

var myFont;
var backgroundImg;

function preload() {
	myFont = loadFont('SpecialElite.ttf');
	backgroundImg = loadImage("Background.png");
}

function setup() {
	createCanvas(1280, 800);

	// replace all redacted words with the correct values from the data structures above
	redactedText = "My dearest " + DocumentB[7].Detail2 + ", Please don’t doubt my sincerity when I say that I hadn’t the faintest idea about " + DocumentA[6].Detail2 + " intervention. \
I suspect that " + DocumentB[9].Detail0 + " a " + DocumentA[9].Detail2 + " interest at the " + DocumentA[3].Detail1 + ". I and the " + DocumentA[9].Detail1 + " appreciate your many contributions over the years. \
However, this is a most " + DocumentA[5].Detail1 + " matter which would require significant " + DocumentB[3].Detail0 + " for me to deal with it satisfactorily. \
I would not be so crude as to suggest a sum but perhaps " + DocumentA[3].Detail2 + " to my forthcoming campaign would help. Yours sincerely, " + DocumentB[0].Detail2;

}

function draw() {
	// you don't need to change this
	image(backgroundImg, 0, 0);
	stroke(0);
	strokeWeight(3);
	line(width / 2, 10, width / 2, height - 10);
	noStroke();
	textFont(myFont);
	textSize(14);
	text(redactedText, 30, 100, 580, 600);
	text("Edsger, Hopper’s, she has, romantic, COBOL, syndicate, delicate, capital, a donation, Governor Zuckerberg", 670, 100, 580, 600);
}
