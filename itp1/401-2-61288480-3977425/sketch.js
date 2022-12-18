/*

Officer: 3977425
CaseNum: 401-2-61288480-3977425

Case 401 - The Case of Norbert's Weiner Stand
Stage 3 - Bilious bagel

As I suspected Norbert has struck again. Ever inventive he’s set up a bagel stand and has laced the cream cheese with an ingenious but vicious toxin. This one is quite deadly so get yourself down to the lab right away.

You must develop the antidote by using conditional statements in the draw loop to do the following.

	- When lead goes above 0.28 and methanol dips below 0.39, or on the other hand, insecticide goes above 0.32, decrement protamine by 0.04
	- If hemlock dips below 0.27 and chlorine dips below 0.32, raise protamine by 0.05
	- When methanol dips below 0.48 or hemlock dips below 0.27, reduce antitoxin by 0.04
	- When insecticide goes above 0.26 and botulinium dips below 0.35, increase antitoxin by 0.05
	- If botulinium goes above 0.4 and hemlock dips below 0.54, reduce opioids by 0.02
	- If methanol goes above 0.69 and insecticide dips below 0.58, or on the other hand, chlorine dips below 0.33, raise opioids by 0.02
	- If chlorine dips below 0.37, or on the other hand, lead dips below 0.63 and methanol goes above 0.49, try decreasing beta_blocker by 0.05
	- If hemlock goes above 0.38 or insecticide goes above 0.74, increase beta_blocker by 0.02


Your conditional statements should consider the following poisons:

	- botulinium
	- methanol
	- chlorine
	- insecticide
	- lead
	- hemlock


Your conditional statements should modify the following antidotes:

	- protamine
	- antitoxin
	- opioids
	- beta_blocker


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
var botulinium;
var methanol;
var chlorine;
var insecticide;
var lead;
var hemlock;


//Declare the antidote variables
var protamine;
var antitoxin;
var opioids;
var beta_blocker;


//This variable is used for drawing the graph
var graphs;


function setup()
{

	createCanvas(800,600);
	strokeWeight(2);

	//initialise the poisons and antidotes
	botulinium = 0.5;
	methanol = 0.5;
	chlorine = 0.5;
	insecticide = 0.5;
	lead = 0.5;
	hemlock = 0.5;
	protamine = 0.5;
	antitoxin = 0.5;
	opioids = 0.5;
	beta_blocker = 0.5;


	//fills the graph with empty values
	graphs = [];

	for(var i = 0; i < 6; i++)
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

	if((lead > 0.28 && methanol < 0.39) || (insecticide > 0.32)){
		protamine -= 0.04;
	}

	if(hemlock < 0.27 && chlorine < 0.32){
		protamine += 0.05;
	}

	if(methanol < 0.48 || hemlock < 0.27){
		antitoxin -= 0.04;
	}

	if(insecticide > 0.26 && botulinium < 0.35){
		antitoxin += 0.05;
	}

	if(botulinium > 0.4 && hemlock < 0.54){
		opioids -= 0.02;
	}

	if((methanol > 0.69 && insecticide < 0.58) || (chlorine < 0.33)){
		opioids += 0.02;
	}

	if((chlorine < 0.37) || (lead < 0.63 && methanol > 0.49)){
		beta_blocker -= 0.05;
	}

	if(hemlock > 0.38 || insecticide > 0.74){
		beta_blocker += 0.02;
	}


	//////////////////////////////////////////////////////

	//the code below generates new values using random numbers

	/*
		For testing, you might want to temporarily comment out
		these lines and set the same variables to constant values
		instead.
	*/

	botulinium = nextValue(graphs[0],botulinium);
	methanol = nextValue(graphs[1],methanol);
	chlorine = nextValue(graphs[2],chlorine);
	insecticide = nextValue(graphs[3],insecticide);
	lead = nextValue(graphs[4],lead);
	hemlock = nextValue(graphs[5],hemlock);


	protamine = constrain(protamine, 0, 1);
	antitoxin = constrain(antitoxin, 0, 1);
	opioids = constrain(opioids, 0, 1);
	beta_blocker = constrain(beta_blocker, 0, 1);


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
	color(0, 255, 255)
	];

	for(var i = 0; i < graphs.length; i++)
	{
		stroke(colors[i]);
		drawGraph(graphs[i]);
	}

	//draw the poisons as text
	noStroke();
	fill(colors[0]);
	text('botulinium: ' + nf(botulinium,1,2), 20,20);
	fill(colors[1]);
	text('methanol: ' + nf(methanol,1,2), 20,40);
	fill(colors[2]);
	text('chlorine: ' + nf(chlorine,1,2), 20,60);
	fill(colors[3]);
	text('insecticide: ' + nf(insecticide,1,2), 20,80);
	fill(colors[4]);
	text('lead: ' + nf(lead,1,2), 20,100);
	fill(colors[5]);
	text('hemlock: ' + nf(hemlock,1,2), 20,120);


	//draw the antidotes bar chart
	drawBar(protamine,50,'protamine');
	drawBar(antitoxin,200,'antitoxin');
	drawBar(opioids,350,'opioids');
	drawBar(beta_blocker,500,'beta_blocker');


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
