var a=[];
function setup() {

	createCanvas(windowWidth-16,windowHeight-16); // fullscreen();
	
	var len=width/4;
	var gipoten=len/cos(PI*1/6)/2;
	var pos=createVector(gipoten*cos(PI*-5/6), gipoten*sin(PI*-5/6));
	var axis=0;
	append(a,new Krivaya(pos, axis, len));
	
	pos=createVector(gipoten*cos(PI*-1/6), gipoten*sin(PI*-1/6));
	axis=2/3;
	append(a,new Krivaya(pos, axis, len));
	
	pos=createVector(gipoten*cos(PI*3/6), gipoten*sin(PI*3/6));
	axis=-2/3;
	append(a,new Krivaya(pos, axis, len));
}
function draw() { 
	background(0);
	translate(width/2, height/2);
	for(var i=0; i<a.length; i++){
	
		a[i].show();
	} 
}
function mousePressed() {

	push();
	
	var b=[];
	
	for(var i=0; i<a.length; i++){
		translate(a[i].pos.x, a[i].pos.y);
		rotate(PI*a[i].axis);
		var pos=createVector(a[i].pos.x, a[i].pos.y);
		var axis=a[i].axis;
		var len=a[i].len/3.0;
		append(b, new Krivaya(pos, axis, len));
		
		pos=createVector(a[i].pos.x+2*len*cos(PI*axis), a[i].pos.y+2*len*sin(PI*axis));
		append(b, new Krivaya(pos, axis, len));
		
		var boobs=1/6;
		var alfa=atan(3*tan(boobs*PI));
		var lens=len/(2*cos(alfa));
		
		pos=createVector(a[i].pos.x+len*cos(PI*axis), a[i].pos.y+len*sin(PI*axis));	
		
		axis+=-alfa/PI;
		
		append(b, new Krivaya(pos, axis, lens));
		
		pos=createVector(a[i].pos.x+3*len/(2*cos(PI*boobs))*cos(PI*(a[i].axis-boobs)), a[i].pos.y+3*len/(2*cos(PI*boobs))*sin(PI*(a[i].axis-boobs)));
		axis+=2*alfa/PI;
		append(b, new Krivaya(pos, axis, lens));
		
	}
	arrayCopy(b, a);

	pop();
}
//808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080
function Krivaya(pos, axis, dlina){
	this.pos=pos;
	this.axis=axis;
	this.len=dlina;
	
	this.show=function(){
		push();
		
		stroke(255);

		strokeWeight(1);
		
		translate(this.pos.x, this.pos.y);
		rotate(PI*this.axis);
		
		line(0,0,this.len,0);
		pop();
		
		}
	}
//808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080808080
