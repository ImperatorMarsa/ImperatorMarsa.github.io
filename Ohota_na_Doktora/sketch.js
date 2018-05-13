var canvis;
var dalik;
var doktor;
var mozg;
var schitalka;
var povorotik;
var buffer;
var input=[1, 1];
var oldCoord_X=0;
var oldCoord_Y=0;
var oldAngel=-1;
var imDalik;
var imTardis;
var dihalka=0;
var stars=[];

function preload() {
	imDalik=loadImage('./css/img/dalik.png');
	imTardis=loadImage('./css/img/tardis.png');
}

function setup() {
	canvis=createCanvas(windowWidth,windowHeight);
	imageMode(CENTER);
	noCursor();
	// background(7, 0, 15, 45);

	if(oldAngel==-1){ 
		for(let i=0; i<123; i++) { stars.push(new Star()); } 
		oldAngel=1;
	}

	mozg=new Mozgi();
	dalik=new Dalik(oldCoord_X, oldCoord_Y, oldAngel, mozg.ves[0], mozg.ves[1]);
	doktor=new Docktor();

	schitalka=0;
	povorotik=0;

	dalik.show();
	buffer=doktor.otzavis(dalik.coord);
}

function draw() {
	for(let i=0; i<stars.length; i++) { stars[i].show(); }

	var delta=doktor.otzavis(dalik.coord)-buffer;
	input[0]=(delta<0)? 5 : -5;
	input[1]=-input[0];

	var schetPovtorov=input[0]*mozg.ves[0]+input[1]*mozg.ves[1];
	// print(input[0], "*", mozg.ves[0], "+", input[1], "*", mozg.ves[1], "=", schetPovtorov);
	schitalka+=(schetPovtorov==0)? 1 : 0;
	if(schitalka<10) {
		mozg.obuchenie(input, 1);
		buffer=doktor.otzavis(dalik.coord);

		dalik.set(mozg.ves[0], mozg.ves[1]);
		dalik.show();
	} else {
		dalik.set(0, 1);
		doktor.otzavis(dalik.coord);
		dalik.show();
		povorotik++;
		if(povorotik>42) {
			schitalka=0;
			povorotik=0;
		}
	}
	if(doktor.nayden(dalik.coord)) {
		oldCoord_X=dalik.coord.x;
		oldCoord_Y=dalik.coord.y;
		oldAngel=dalik.Angle;
		setup();
	}

	dalik.show();
	doktor.otzavis(dalik.coord);

	background(7, 0, 15, 45);	
}

function Dalik(x, y, angle, v1, v2) {
	this.Angle=angle;
	this.rotor=(v1+v2!=0)? (v1-v2)/abs(v1+v2) : 0;
	this.skor=(v1+v2)/2;
	this.gromkost=0.0;
	this.coord=new createVector(x, y);

	this.show=function() {
		this.Angle+=this.rotor/100.0;
		this.coord.x+=this.skor*cos(PI*this.Angle);
		this.coord.y+=this.skor*sin(PI*this.Angle);
	
		push();
	
		translate(this.coord.x, this.coord.y);
		rotate(PI*this.Angle);
		image(imDalik, 0, 0);
	
		pop();
	}
	this.zov=function(gromkost) { this.gromkost=gromkost; }
	
	this.set=function(v1, v2) {
		this.rotor=(v1+v2!=0)? (v1-v2)/abs(v1+v2) : 0;
		this.skor=(v1+v2)/2;
	}
}

function Docktor() {
	this.coord=createVector(random(width/5, width*4/5), random(height/5, height*4/5));

	this.otzavis=function(mesto) {
		push();
	
		noStroke();
		translate(this.coord.x, this.coord.y);
		pom=1+noise(dihalka);
		dihalka+=.01;
		fill(0, 0, 255, 45);
		ellipse(1, -37, 23*pom);
		fill(7, 0, 15, 45);
		ellipse(1, -37, 20*pom);
		fill(0, 0, 255, 45);
		ellipse(1, -37, 17*pom);
		fill(7, 0, 15, 45);
		ellipse(1, -37, 14*pom);
		fill(0, 0, 255, 45);
		ellipse(1, -37, 11*pom);
		image(imTardis, 0, 0);
	
		pop();
	
		return this.coord.dist(mesto);
	}

	this.nayden=function(mesto) {
		return (this.coord.dist(mesto)<45)? true : false;
	}
}

function Mozgi() {
	this.ves=[1, 1];
	this.skorObuch=0.1;

	this.ugad=function(input) {
		var sum=0;
		for(let i=0; i<input.length; i++) { sum+=input[i]*this.ves[i]; }
		return (sum>0)? 1 : -1;
	}

	this.obuchenie=function(input, cel) {
		var error=cel-this.ugad(input);
		if(error!=0) {
			for(let i=0; i<input.length; i++) { this.ves[i]+=input[i]*error*this.skorObuch; }
		}
	}
}

function Star() {
	this.delta=random(0, 100);
	this.shag=random(0.001, 0.02);
	this.radiuse=random(3, 7);
	this.coord=createVector(random(-13, 13+width), random(-13, 13+height));

	this.show=function() {
		push();

		stroke(255, 255, 173);
		fill(200, 200, 255);
		ellipse(this.coord.x, this.coord.y, this.radiuse*(1+noise(this.delta)));
		this.delta+=this.shag

		pop();
	}
}