ctx = null;
frameRate = 10000/30;
img = null;
speedy = 0;
speedx = 0;
mpx = 0;
mpy = 0;
sfx = 0;
sfy = 0;

bugImg = null;
posX = 0;
posY = 0;

function setup() {
	var body = document.getElementById("body");

	var div = document.createElement("div");
		div.id = "div";

	var canvas = document.createElement("canvas");
		canvas.id = "canvas";

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		//canvas.addEventListener("mousemove",moverSpider,false);
		canvas.addEventListener("mousedown",saveAnt,false);
	ctx = canvas.getContext("2d");
	
	bkg = new Image();
	bkg.src = "img/spiderweb.jpg";

	img = new Image();
	img.src = "img/pxSpider.gif";

	div.appendChild(canvas);
	body.appendChild(div);

	createBug();

	//animate();
	setInterval( function (e) { // Don't do this for time-critical animations
   animate();               // A function that draws the current animation frame
}, 1000 / 60);
}

function animate() {
	try {
		if(speedy <= 0) {
			speedy = 0;	
		}
		if(speedy >= window.innerHeight) {
			speedy = window.innerHeight;	
		}

		if(speedx <= 0) {
			speedx = 0;	
		}
		if(speedx >= window.innerWidth) {
			speedx = window.innerWidth;	
		}

		

		if(ctx && img) {
			//ctx.fillStyle = "white";
			//ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
			ctx.drawImage(bkg,0,0);
			
			if( (speedx <= posX+10 && speedx >= posX-10) && (speedy <= posY+10 && speedy >= posY-10) ) {
				if(mpx == 1) mpx = 0;
				alert("Game over, você obteve "  + (mpx * 100) + " pontos.");
				mpx = 0;
				mpy = 0;
				createBug();

			}

			//ctx.fillStyle = "black";
			//ctx.fillRect(0,0,300,300);

			//ctx.drawImage(bugImg,posX,posY);

			if(bugImg) {
				ctx.drawImage(bugImg,posX,posY);
			}

			ctx.drawImage(img,speedx,speedy);
			
			if(speedx > sfx) {
				speedx -= (1 * mpx);
			} if(speedx < sfx) {
				speedx += (1 * mpx);
			} 

			if(speedy > sfy) {
				speedy -= (1 * mpy);
			} if(speedy < sfy) {
				speedy += (1 * mpy);
			}


			//console.log("SPEED: X:"+speedx+" Y:"+speedy);
		}
		//setInterval(animate(), 2000);
	} catch(e) {
		console.error("Erro: " + e);
	}
	
}

function moverSpider(event) {
	
	var x = event.pageX;
	var y = event.pageY;
	//console.log("ATUAL: X:"+speedx+" Y:"+speedy);
	
	if(sfx == x) {
		mpx *= 2;
	} else {
		mpx = 1;
	}

	
	if(sfy == y) {
		mpy *= 2;
	} else {
		mpy = 1;
	}

	//console.log("NOVA: X:"+x+" Y:"+y);
	sfx = x;
	sfy = y;

}

function saveAnt(event) {
	var x = event.pageX;
	var y = event.pageY;
	console.log("TOUCH: X:"+x+" Y:"+y);
	console.log("ATUAL: X:"+sfx+" Y:"+sfy);
	if( (x <= posX+30 && x >= posX-30) && (y <= posY+30 && y >= posY-30) ) {
		alert("Parabéns você salvou a formiguinha....");
		createBug();
	}
} 

function createBug() {
	posX = Math.floor(Math.random()*(window.innerWidth-100));
	posY = Math.floor(Math.random()*(window.innerHeight-100));

	while (posX < 500) {
		posX = Math.floor(Math.random()*(window.innerWidth-100));
	}
	while (posY < 500) { 
		posY = Math.floor(Math.random()*(window.innerHeight-100));
	}

	sfx = posX;
	sfy = posY;

	mpx += 1;
	mpy += 1;

	speedy = 0;
	speedx = 0;

	bugImg = new Image();
	bugImg.src = "img/bug_one.png";

}
