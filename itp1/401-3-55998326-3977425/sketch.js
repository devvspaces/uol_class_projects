/*

Officer: 3977425
CaseNum: 401-3-55998326-3977425

Case 401 - The Case of Norbert's Weiner Stand
Stage 4 - Mortal Cupcake

It seems that Norbert is getting desperate now. In what appears to be his final stand he has set up his own cupcake shop. The laced cupcakes look delicious but they are extremely dangerous. Just a brief whiff of one can induce a series of
deadly symptoms. This is Norbert’s most complex poison to date, so you’ll have to work hard to produce a viable antidote.

You must develop the antidote by using conditional statements in the draw loop to do the following.

	- When strychnine dips below 0.5, Deadly_Nightshade goes above 0.59, sarin goes above 0.56, and also methanol goes above 0.31, reduce antitoxin by 0.03
	- When novichok dips below 0.54, ricin dips below 0.49, and also snake_venom goes above 0.55, increment antitoxin by 0.04
	- If either methanol goes above 0.69, ricin goes above 0.26, Deadly_Nightshade goes above 0.66, or perhaps sarin goes above 0.42, decrease paracetamol by 0.04
	- When snake_venom goes above 0.69, whilst at the same time, strychnine dips below 0.71 or novichok goes above 0.41, increase paracetamol by 0.01
	- If Deadly_Nightshade goes above 0.39 and arsenic goes above 0.74, or on the other hand, strychnine dips below 0.68 and novichok goes above 0.55, try decreasing opioids by 0.04
	- When ricin dips below 0.59, sarin dips below 0.37, snake_venom goes above 0.75, and also methanol dips below 0.72, raise opioids by 0.03
	- If arsenic dips below 0.41 and ricin dips below 0.3, or on the other hand, Deadly_Nightshade goes above 0.63 or strychnine dips below 0.75, decrease aspirin by 0.02
	- When either novichok goes above 0.51, methanol dips below 0.42, or perhaps sarin dips below 0.55, increment aspirin by 0.03
	- If Deadly_Nightshade goes above 0.47 and snake_venom dips below 0.53, or on the other hand, strychnine goes above 0.62 or novichok goes above 0.3, decrement methylene by 0.01
	- When ricin goes above 0.68 or arsenic dips below 0.58, whilst at the same time, sarin goes above 0.67, raise methylene by 0.04


Your conditional statements should consider the following poisons:

	- snake_venom
	- Deadly_Nightshade
	- arsenic
	- ricin
	- methanol
	- strychnine
	- novichok
	- sarin


Your conditional statements should modify the following antidotes:

	- antitoxin
	- paracetamol
	- opioids
	- aspirin
	- methylene


- There are many ways to complete this task but you should only use the following commands:

	if(){}
	>
	<
	&&
	||
	+=
	-=

*/

//Declare the poison variables
var snake_venom;
var Deadly_Nightshade;
var arsenic;
var ricin;
var methanol;
var strychnine;
var novichok;
var sarin;


//Declare the antidote variables
var antitoxin;
var paracetamol;
var opioids;
var aspirin;
var methylene;


//This variable is used for drawing the graph
var graphs;


function setup()
{

	createCanvas(800,600);
	strokeWeight(2);

	//initialise the poisons and antidotes
	snake_venom = 0.5;
	Deadly_Nightshade = 0.5;
	arsenic = 0.5;
	ricin = 0.5;
	methanol = 0.5;
	strychnine = 0.5;
	novichok = 0.5;
	sarin = 0.5;
	antitoxin = 0.5;
	paracetamol = 0.5;
	opioids = 0.5;
	aspirin = 0.5;
	methylene = 0.5;


	//fills the graph with empty values
	graphs = [];

	for(var i = 0; i < 8; i++)
	{
		graphs.push([]);
		for(var j = 0; j < 512; j++)
		{
			graphs[i].push(0.5);
		}
	}

}

function draw()
{

	//Develop the antidote below
	//Write conditional statements to change the amount of each substance ...

	
	if (strychnine < 0.5 && Deadly_Nightshade > 0.59 && sarin > 0.56 && methanol > 0.31) {
		antitoxin -= 0.03;
	}

	if (novichok < 0.54 && ricin < 0.49 && snake_venom > 0.55) {
		antitoxin += 0.04;
	}

	if (methanol > 0.69 || ricin > 0.26 || Deadly_Nightshade > 0.66 || sarin > 0.42) {
		paracetamol -= 0.04;
	}

	if (snake_venom > 0.69 && (strychnine < 0.71 || novichok > 0.41)) {
		paracetamol += 0.01;
	}

	if ((Deadly_Nightshade > 0.39 && arsenic > 0.74) || (strychnine < 0.68 && novichok > 0.55)) {
		opioids -= 0.04;
	}

	if ((ricin < 0.59 && sarin < 0.37 && snake_venom > 0.75 && methanol < 0.72)) {
		opioids += 0.03;
	}

	if ((arsenic < 0.41 && ricin < 0.3) || (Deadly_Nightshade > 0.63 || strychnine < 0.75)) {
		aspirin -= 0.02;
	}

	if (novichok > 0.51 || methanol < 0.42 || sarin < 0.55) {
		aspirin += 0.03;
	}

	if ((Deadly_Nightshade > 0.47 && snake_venom < 0.53) || (strychnine > 0.62 || novichok > 0.3)) {
		methylene -= 0.01;
	}

	if ((ricin > 0.68 || arsenic < 0.58) && (sarin > 0.67)) {
		methylene += 0.04;
	}



	//////////////////////////////////////////////////////

	//the code below generates new values using random numbers

	/*
		For testing, you might want to temporarily comment out
		these lines and set the same variables to constant values
		instead.
	*/

	snake_venom = nextValue(graphs[0],snake_venom);
	Deadly_Nightshade = nextValue(graphs[1],Deadly_Nightshade);
	arsenic = nextValue(graphs[2],arsenic);
	ricin = nextValue(graphs[3],ricin);
	methanol = nextValue(graphs[4],methanol);
	strychnine = nextValue(graphs[5],strychnine);
	novichok = nextValue(graphs[6],novichok);
	sarin = nextValue(graphs[7],sarin);


	antitoxin = constrain(antitoxin, 0, 1);
	paracetamol = constrain(paracetamol, 0, 1);
	opioids = constrain(opioids, 0, 1);
	aspirin = constrain(aspirin, 0, 1);
	methylene = constrain(methylene, 0, 1);


	///////// DO NOT CHANGE THE CODE BELOW ///////////

	//drawing code

	// set background
	background(0);
	noFill();

	//draw the graphs for the vitals

	var colors = [
		color(255, 0, 0),
		color(0, 255, 0),
		color(0, 0, 255),
		color(255, 0, 255),
		color(255, 255, 0),
		color(0, 255, 255),
		color(255, 100, 100),
		color(255, 100, 0)
	];

	for(var i = 0; i < graphs.length; i++)
	{
		stroke(colors[i]);
		drawGraph(graphs[i]);
	}

	//draw the poisons as text
	noStroke();
	fill(colors[0]);
	text('snake_venom: ' + nf(snake_venom,1,2), 20,20);
	fill(colors[1]);
	text('Deadly_Nightshade: ' + nf(Deadly_Nightshade,1,2), 20,40);
	fill(colors[2]);
	text('arsenic: ' + nf(arsenic,1,2), 20,60);
	fill(colors[3]);
	text('ricin: ' + nf(ricin,1,2), 20,80);
	fill(colors[4]);
	text('methanol: ' + nf(methanol,1,2), 20,100);
	fill(colors[5]);
	text('strychnine: ' + nf(strychnine,1,2), 20,120);
	fill(colors[6]);
	text('novichok: ' + nf(novichok,1,2), 20,140);
	fill(colors[7]);
	text('sarin: ' + nf(sarin,1,2), 20,160);


	//draw the antidotes bar chart
	drawBar(antitoxin,50,'antitoxin');
	drawBar(paracetamol,200,'paracetamol');
	drawBar(opioids,350,'opioids');
	drawBar(aspirin,500,'aspirin');
	drawBar(methylene,650,'methylene');


}

function nextValue(graph, val)
{
	//gets the next value for a vital and puts it in an array for drawing
	var delta = random(-0.03,0.03);

	val += delta;
	if(val > 1 || val < 0)
	{
		delta *= -1;
		val += delta * 2;
	}

	graph.push(val)
	graph.shift();
	return val;
}

function drawGraph(graph)
{
	//draws an array as a graph
	beginShape();
	for(var i = 0; i < graph.length; i++)
	{
			vertex(width * i/512, height * 0.5 - graph[i]* height/3)
	}
	endShape();
}


function drawBar(val, x, name)
{
	//draws the bars for bar chart
    noStroke();
    fill(0,100,100);
	var mh = height * 0.4 - 50;
	rect(x,(height - 50) - val*mh, 100, val*mh);
    fill(255);
	text(name + ": " + val, x, height - 20);
}
