var snejinka=[];

function setup() {
	createCanvas(windowWidth, windowHeight);

	// background(0);
	stroke(255);
	strokeWeight(5);

	var pony=1.5;
	var pussy=-PI/73;

	var len=(windowWidth<windowHeight)? windowWidth/1.23 : windowHeight/1.23;
	snejinka.push(new Koha(new createVector(0, 0), 0, len/pony, color(255)));
	snejinka.push(new Koha(new createVector(0, 0), pussy, len, color(255, 255, 0, 100)));
	snejinka.push(new Koha(new createVector(0, 0), 2*pussy, len*pony, color(255, 0, 0, 50)));
	
}
function draw() { 
	background(0, 0);
	translate(windowWidth/2, windowHeight/2);
	for(let i=0; i<snejinka.length; i++) {
		snejinka[i].show();
		snejinka[i].ugol+=.001;
	}
}

function mousePressed() {
	for(let i=0; i<snejinka.length; i++) {
		snejinka[i].uslojnenie();
	}
}

function Koha(coord, ugol, dlina, cvetik) {
	this.cvetik=cvetik;
	this.coord=coord;
	this.ugol=ugol;
	this.dlina=dlina;
	this.krivaya=[];

	var gipoten=this.dlina/cos(PI*1/6)/2;
	var pos=createVector(gipoten*cos(PI*-5/6), gipoten*sin(PI*-5/6));
	var axis=0;
	this.krivaya.push([pos, axis, this.dlina]);

	pos=createVector(gipoten*cos(PI*-1/6), gipoten*sin(PI*-1/6));
	axis=2/3;
	this.krivaya.push([pos, axis, this.dlina]);

	pos=createVector(gipoten*cos(PI*3/6), gipoten*sin(PI*3/6));
	axis=-2/3;
	this.krivaya.push([pos, axis, this.dlina]);

	this.show=function() {
		push();

		translate(this.coord.x, this.coord.y);
		rotate(PI*this.ugol);
		for(let i=0; i<this.krivaya.length; i++) {
			push();

			stroke(this.cvetik);
			strokeWeight(2);
			translate(this.krivaya[i][0].x, this.krivaya[i][0].y);
			rotate(PI*this.krivaya[i][1]);
			line(0, 0, this.krivaya[i][2], 0);

			pop();
		}

		pop();
	}

	this.uslojnenie=function() {
		push();

		var buffer=[];
		for(var i=0; i<this.krivaya.length; i++){
			translate(this.krivaya[i][0].x, this.krivaya[i][0].y);
			rotate(PI*this.krivaya[i][1]);
			var pos=createVector(this.krivaya[i][0].x, this.krivaya[i][0].y);
			var axis=this.krivaya[i][1];
			var len=this.krivaya[i][2]/3.0;
			buffer.push([pos, axis, len]);

			pos=createVector(this.krivaya[i][0].x+2*len*cos(PI*axis), this.krivaya[i][0].y+2*len*sin(PI*axis));
			buffer.push([pos, axis, len]);

			var boobs=1/6;
			var alfa=atan(3*tan(boobs*PI));
			var lens=len/(2*cos(alfa));

			pos=createVector(this.krivaya[i][0].x+len*cos(PI*axis), this.krivaya[i][0].y+len*sin(PI*axis));
			axis+=-alfa/PI;
			buffer.push([pos, axis, lens]);

			pos=createVector(this.krivaya[i][0].x+3*len/(2*cos(PI*boobs))*cos(PI*(this.krivaya[i][1]-boobs)), this.krivaya[i][0].y+3*len/(2*cos(PI*boobs))*sin(PI*(this.krivaya[i][1]-boobs)));
			axis+=2*alfa/PI;
			buffer.push([pos, axis, lens]);

		}
		arrayCopy(buffer, this.krivaya);

		pop();
	}
}