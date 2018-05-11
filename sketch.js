var canvis;
var links=[];
var yacheyka;
var skrok;
var colon;
var x0;
var y0;
var schitalka=0;

var polosochki=[];

function setup() {
	canvis=createCanvas(windowWidth,windowHeight);
background(27, 52, 64);

	var link='Koch snowflake';
	links.push(createA('/Snejinka_Koha/index.html', link));
	links[0].position(windowWidth/2-windowWidth*.04*link.split('').length/5-windowWidth*.01,windowWidth*.04+windowWidth*.01);

	yacheyka=(windowWidth>windowHeight)? windowWidth/42:windowHeight/42 ;
	strok=floor(windowHeight/yacheyka+1);
	colon=floor(windowWidth/yacheyka+1);
	x0=(colon*yacheyka-windowWidth)/2;
	y0=(strok*yacheyka-windowHeight)/2;

	for(let j=0; j<strok; j++) {
		for(let i=0; i<colon; i++) {
			polosochki.push(random()>.5);
		}
	}
}

function draw() {
	background(27, 52, 64, 70);
	fill(74, 132, 159, 140);
	// 180, 214, 198
	// 245, 241, 213
	// 242, 132, 92
	schitalka+=.05;

	for(let i=0; i<colon; i++) {
		for(let j=0; j<strok; j++) {
			var dlina=sqrt(sq(i*yacheyka-mouseX)+sq(j*yacheyka-mouseY));
			if (dlina>(1+2*noise(schitalka))*yacheyka){
				Slesh(i*yacheyka-x0, j*yacheyka-y0, yacheyka, polosochki[j*colon+i]);
			} else {
				polosochki[j*colon+i]=random()>.5;
			}
		}
	}
}
function Slesh(x, y, razm, orientaciya) {
	push();
	noStroke();
	translate(x, y);
	beginShape();

	if(orientaciya) {
		vertex(0, 0);
		vertex(razm/10, 0);
		vertex(razm, razm*9/10);
		vertex(razm, razm);
		vertex(razm*9/10, razm);
		vertex(0, razm/10);
	} else {
		vertex(razm, 0);
		vertex(razm*9/10, 0);
		vertex(0, razm*9/10);
		vertex(0, razm);
		vertex(razm/10, razm);
		vertex(razm, razm/10);
	}


	endShape(CLOSE);
	pop();
}