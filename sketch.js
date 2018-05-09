function setup() {
	createCanvas(windowWidth-17,windowHeight-17);

	background(205, 130, 220);
	noCursor();
	noStroke();
	fill(40, 232, 64);
}

function draw() {
	ellipse(mouseX, mouseY, 22);
}

function mouseClicked(){
	setup();
}
