/*

Officer: 3977425
CaseNum: 401-1-87323129-3977425

Case 401 - The Case of Norbert's Weiner Stand
Stage 2 - Toxic Burrito

Norbert is at it again. This time he’s set up a burrito stall and is lacing burritos with his foul toxin. The chaos is spreading. People are dropping like flies and burrito sales have fallen through the floor. To make matters worse it seems Norbert has cottoned on to our methods and has upped the complexity of his poison. You’ll find the antidote harder to develop this time. So kid, head down to the lab and get working.

You must develop the antidote by using conditional statements in the draw loop to do the following:

	- If novichok goes above 0.74 or hemlock goes above 0.54, decrease insulin by 0.05
	- If sarin goes above 0.7 or Spider_Venom goes above 0.26, increment insulin by 0.05
	- If hemlock goes above 0.39 and novichok dips below 0.35, reduce opioids by 0.04
	- If sarin goes above 0.3 and Spider_Venom dips below 0.5, increase opioids by 0.01
	- If sarin dips below 0.69 and novichok goes above 0.67, try decreasing protamine by 0.04
	- When hemlock goes above 0.5, raise protamine by 0.05
	- If Spider_Venom dips below 0.64, try decreasing aspirin by 0.03
	- If sarin dips below 0.52 and novichok dips below 0.5, try increasing aspirin by 0.05


Your conditional statements should consider the following poisons:

	- sarin
	- hemlock
	- Spider_Venom
	- novichok


Your conditional statements should modify the following antidotes:

	- insulin
	- opioids
	- protamine
	- aspirin


- There are many ways to complete this task but you should only use the following commands and operators:

	if(){}
	>
	<
	&&
	||
	+=
	-=

*/

//Declare the poison variables
var sarin;
var hemlock;
var Spider_Venom;
var novichok;


//Declare the antidote variables
var insulin;
var opioids;
var protamine;
var aspirin;


//This variable is used for drawing the graph
var graphs;


function setup()
{

	createCanvas(800,600);
	strokeWeight(2);

	//initialise the poisons and antidotes
	sarin = 0.5;
	hemlock = 0.5;
	Spider_Venom = 0.5;
	novichok = 0.5;
	insulin = 0.5;
	opioids = 0.5;
	protamine = 0.5;
	aspirin = 0.5;


	//fills the graph with empty values
	graphs = [];

	for(var i = 0; i < 4; i++)
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

	
	if (novichok > 0.74 || hemlock > 0.54) {
		insulin -= 0.05;
	}

	if (sarin > 0.7 || Spider_Venom > 0.26) {
		insulin += 0.05;
	}

	if (hemlock > 0.39 && novichok < 0.35) {
		opioids -= 0.04;
	}

	if (sarin > 0.3 && Spider_Venom < 0.5) {
		opioids += 0.01;
	}

	if (sarin < 0.69 && novichok > 0.67) {
		protamine -= 0.04;
	}

	if (hemlock > 0.5) {
		protamine += 0.05;
	}

	if (Spider_Venom < 0.64) {
		aspirin -= 0.03;
	}

	if (sarin < 0.52 && novichok < 0.5) {
		aspirin += 0.05;
	}

	//////////////////////////////////////////////////////

	//the code below generates new values using random numbers

	/*
		For testing, you might want to temporarily comment out
		these lines and set the same variables to constant values
		instead.
	*/

	sarin = nextValue(graphs[0],sarin);
	hemlock = nextValue(graphs[1],hemlock);
	Spider_Venom = nextValue(graphs[2],Spider_Venom);
	novichok = nextValue(graphs[3],novichok);


	insulin = constrain(insulin, 0, 1);
	opioids = constrain(opioids, 0, 1);
	protamine = constrain(protamine, 0, 1);
	aspirin = constrain(aspirin, 0, 1);


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
	text('sarin: ' + nf(sarin,1,2), 20,20);
	fill(colors[1]);
	text('hemlock: ' + nf(hemlock,1,2), 20,40);
	fill(colors[2]);
	text('Spider_Venom: ' + nf(Spider_Venom,1,2), 20,60);
	fill(colors[3]);
	text('novichok: ' + nf(novichok,1,2), 20,80);


	//draw the antidotes bar chart
	drawBar(insulin,50,'insulin');
	drawBar(opioids,200,'opioids');
	drawBar(protamine,350,'protamine');
	drawBar(aspirin,500,'aspirin');


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
