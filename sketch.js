var canvis;
var mRad;
var mas;
var dR;
var x;
var y;

function setup() {
	canvis=createCanvas(windowWidth-16,windowHeight-73);
	
	mRad=((width<height)? width : height)-42;
	mas=[createSlider(.01, .99, .3, .01), createSlider(.01, .99, .4, .01), createSlider(.01, .99, .5, .01)];
	dR=createSlider(1, 100, 73, 2);
	x=(-mas[1].value()+mas[2].value())/(2*sum(mas));
	y=(mas[1].value()-(mas[1].value()+mas[2].value())*sqrt(3)/2)/(sum(mas));
	
	colorMode(HSB, 100);
	strokeWeight(5);
	ellipseMode(CENTER);
	background(0);
	noCursor();
}

function draw() {
	x=(-mas[1].value()+mas[2].value())/(2*sum(mas));
	y=(mas[0].value()-(mas[1].value()+mas[2].value())*sqrt(3)/2)/(sum(mas));

	translate(width/2, height/2);
	for (let i=2*mRad; i>0; i--){
		noFill();
		stroke(i/(2*mRad)*73, 100, 100);
		ellipse(x*dR.value(), y*dR.value(), i);
		stroke(0);
		ellipse(0, 0, i+mRad);
	}

	fill(100);
	noStroke();
	ellipse(0, -(mRad+13)/2, 13);
	ellipse((mRad+13)/2*sin(2*PI/3), -(mRad+13)/2*cos(2*PI/3), 13);
	ellipse(-(mRad+13)/2*sin(2*PI/3), -(mRad+13)/2*cos(2*PI/3), 13);
	text(mas[0].value(), 10, -(mRad+7)/2);
	text(mas[1].value(), (mRad+1)/2*sin(2*PI/3), -(mRad+99)/2*cos(2*PI/3));
	text(mas[2].value(), -(mRad+42)/2*sin(2*PI/3), -(mRad+99)/2*cos(2*PI/3));
}

function mousePressed(){
	background(0);
}
function sum(m){
	var pom=0;
	for (let i=0; i<m.length; i++) {
		pom+=m[i].value();
	}
	return pom;
}