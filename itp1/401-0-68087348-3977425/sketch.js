/*

Officer: 3977425
CaseNum: 401-0-68087348-3977425

Case 401 - The Case of Norbert's Weiner Stand
Stage 1 - Noxious Weiner

Console city has been plunged into chaos. The notorious poisoner Norbert has struck the population down with a potent poison. Word has it that he is smuggling his venomous filth via a streetside weiner stand. Hundreds of people have been affected, and the municipal water company tells me that their sewers are at full capacity. This is no laughing matter. I need you to head down to our lab and work on an antidote.

You must develop the antidote by using conditional statements in the draw loop to
do the following:

	- If mercury dips below 0.37, try decreasing BetaBlocker by 0.03
	- If hemlock dips below 0.39, raise BetaBlocker by 0.02
	- If hemlock goes above 0.38, reduce plasma by 0.01
	- When mercury goes above 0.65, raise plasma by 0.02
	- If mercury dips below 0.64, try decreasing chalk by 0.02
	- If hemlock dips below 0.47, increment chalk by 0.03


Your conditional statements should consider the following poisons:

	- mercury
	- polonium
	- hemlock


Your conditional statements should modify the following antidotes:

	- BetaBlocker
	- plasma
	- chalk


- There are many ways to complete this task but you should only use the following commands and operators:

	if(){}
	>
	<
	+=
	-=

*/

//Declare the poison variables
var mercury;
var polonium;
var hemlock;


//Declare the antidote variables
var BetaBlocker;
var plasma;
var chalk;


//This variable is used for drawing the graph
var graphs;


function setup()
{

	createCanvas(800,600);
	strokeWeight(2);

	//initialise the poisons and antidotes
	mercury = 0.5;
	polonium = 0.5;
	hemlock = 0.5;
	BetaBlocker = 0.5;
	plasma = 0.5;
	chalk = 0.5;


	//fills the graph with empty values
	graphs = [];

	for(var i = 0; i < 3; i++)
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
	if (mercury < 0.37) {
		BetaBlocker -= 0.03;
	}
	if (mercury > 0.65) {
		plasma += 0.02;
	}
	if (mercury < 0.64) {
		chalk -= 0.02;
	}

	if (hemlock < 0.39) {
		BetaBlocker += 0.02;
	}

	if (hemlock > 0.38) {
		plasma -= 0.01;
	}

	if (hemlock < 0.47) {
		chalk += 0.03;
	}


	//////////////////////////////////////////////////////

	//the code below generates new values using random numbers

	/*
		For testing, you might want to temporarily comment out
		these lines and set the same variables to constant values
		instead.
	*/

	mercury = nextValue(graphs[0],mercury);
	polonium = nextValue(graphs[1],polonium);
	hemlock = nextValue(graphs[2],hemlock);


	BetaBlocker = constrain(BetaBlocker, 0, 1);
	plasma = constrain(plasma, 0, 1);
	chalk = constrain(chalk, 0, 1);


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
	text('mercury: ' + nf(mercury,1,2), 20,20);
	fill(colors[1]);
	text('polonium: ' + nf(polonium,1,2), 20,40);
	fill(colors[2]);
	text('hemlock: ' + nf(hemlock,1,2), 20,60);


	//draw the antidotes bar chart
	drawBar(BetaBlocker,50,'BetaBlocker');
	drawBar(plasma,200,'plasma');
	drawBar(chalk,350,'chalk');


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
