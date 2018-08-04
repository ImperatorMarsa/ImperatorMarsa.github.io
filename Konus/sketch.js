var canvis;
var mRad;
var m1;
var m2;
var dR;
var x;
var y;

function setup() {
	canvis=createCanvas(444,444);
	
	mRad=((width<height)? width : height)-42;
	dR=123;
	m1=[new Dot(new p5.Vector(cos(  PI/2), sin(  PI/2)), .7),
		new Dot(new p5.Vector(cos(7*PI/6), sin(7*PI/6)), .3),
		new Dot(new p5.Vector(cos( -PI/6), sin( -PI/6)), .3),
		new Dot(new p5.Vector(          0,           0), .01)];

	m2=[new Dot(new p5.Vector(0, 0), 0),
		new Dot(new p5.Vector(0, 0), 0),
		new Dot(new p5.Vector(0, 0), 0)]

	m2[0].new(m1[0], m1[1], m1[3]);
	m2[1].new(m1[0], m1[2], m1[3]);
	m2[2].new(m1[2], m1[1], m1[3]);

	x=(m2[0].mX+m2[1].mX+m2[2].mX)/(m2[0].msa+m2[1].msa+m2[2].msa);
	y=(m2[0].mY+m2[1].mY+m2[2].mY)/(m2[0].msa+m2[1].msa+m2[2].msa);
	
	colorMode(HSB, 100);
	strokeWeight(5);
	ellipseMode(CENTER);
	background(0);
	noCursor();

	translate(width/2, height/2);
	for (let i=2*mRad; i>0; i--){
		noFill();
		stroke(i/(2*mRad)*73, 100, 100);
		ellipse(x*dR, y*dR, i);
		stroke(0);
		ellipse(0, 0, i+mRad);
	}

	fill(66);
	noStroke();
	for (let i=0; i<m1.length; i++) {
		ellipse(m1[i].coord.x*mRad/2, m1[i].coord.y*mRad/2, 13);	
	}
	fill(100);
	for (let i=0; i<m2.length; i++) {
		ellipse(m2[i].coord.x*mRad/2, m2[i].coord.y*mRad/2, 13);	
	}
	
	// text(m1[0].msa, 10, -(mRad+7)/2);
	// text(m1[1].msa, (mRad+1)/2*sin(2*PI/3), -(mRad+99)/2*cos(2*PI/3));
	// text(m1[2].msa, -(mRad+42)/2*sin(2*PI/3), -(mRad+99)/2*cos(2*PI/3));
}

function draw() {

}

// function mousePressed(){
// 	background(0);
// }
function sum(m1){
	var pom=0;
	for (let i=0; i<m1.length; i++) {
		pom+=m1[i];
	}
	return pom;
}

function Dot(Coord, Msa){
	this.coord=Coord;
	this.msa=Msa;
	this.mX=this.msa*this.coord.x;
	this.mY=this.msa*this.coord.y;

	this.new=function(d1, d2, d3){
		var x=(d1.mX+d2.mX+d3.mX)/(d1.msa+d2.msa+d3.msa);
		var y=(d1.mY+d2.mY+d3.mY)/(d1.msa+d2.msa+d3.msa);
		var m=(d1.msa+d2.msa+d3.msa)/3;

		this.coord=new p5.Vector(x, y);
		this.msa=m;
		this.mX=this.msa*this.coord.x;
		this.mY=this.msa*this.coord.y;
	}
}