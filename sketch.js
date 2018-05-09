var canvis;
var lin;

function setup() {
	canvis=createCanvas(windowWidth,windowHeight);
	
	lin=createA('/Snejinka_Koha/index.html', 'Koch snowflake');
	lin.position(8, 8);

	background(205, 130, 220);
	noCursor();
	noStroke();
	fill(40, 232, 64);
}

function draw() {
	ellipse(mouseX, mouseY, 22);
}

function mousePressed(){
	background(205, 130, 220);
}