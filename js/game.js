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

isPaused = false;

function setup() {
	var body = document.getElementById("body");

	var div = document.createElement("div");
		div.id = "div";

	var canvas = document.createElement("canvas");
		canvas.id = "canvas";

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		canvas.addEventListener("mousedown",saveAnt,false);
		window.addEventListener("keydown",keyboardEvent, true);

	ctx = canvas.getContext("2d");
	
	bkg = new Image();
	bkg.src = "img/spiderweb.jpg";

	img = new Image();
	img.src = "img/pxSpider.gif";

	div.appendChild(canvas);
	body.appendChild(div);

	createBug();

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
			ctx.fillStyle = "white";
			ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
			ctx.drawImage(bkg,0,0);
			
			if( (speedx <= posX+10 && speedx >= posX-10) && (speedy <= posY+10 && speedy >= posY-10) ) {
				if(mpx == 1) mpx = 0;
				alert("Game over, você obteve "  + (mpx * 100) + " pontos.");
				mpx = 0;
				mpy = 0;
				createBug();

			}

			if(bugImg) {
				ctx.drawImage(bugImg,posX,posY);
			}

			ctx.drawImage(img,speedx,speedy);
			if(!isPaused) {
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
			}
			montarMenu();
		}
		
	} catch(e) {
		console.error("Erro: " + e);
	}
}

function saveAnt(event) {
	var x = event.pageX;
	var y = event.pageY;
	if(!isPaused && (x <= posX+30 && x >= posX-30) && (y <= posY+30 && y >= posY-30) ) {
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

function montarMenu() {
	//Titulo
	ctx.font = '40pt Calibri';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'blue';
    ctx.strokeText('Save Ant. V1.0', window.innerWidth/2 , 50);
    //By
	ctx.font = '10pt sans-serif';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    ctx.strokeText('por Yuri Fialho', window.innerWidth/2 , 70);
    //Pontos
    ctx.font = '20pt sans-serif';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'blue';
    ctx.strokeText("Pontos: " + (mpx == 1 ? 0 : (mpx * 100)), 50 , 50);
    //Tempo
    var data = new Date();
    ctx.font = '20pt sans-serif';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'blue';
    ctx.strokeText("Tempo: " + data.getHours() + ":" + data.getMinutes() + ":" + (data.getSeconds() < 10 ? "0" + data.getSeconds() : data.getSeconds()) , 50 , 100);

    //Pausado
    if(isPaused) {
    	//Titulo
		ctx.font = '40pt Calibri';
    	ctx.lineWidth = 3;
    	ctx.strokeStyle = 'red';
    	ctx.strokeText('Pausado.. (Press P to continue)', 300 , 500);
    }
}

function keyboardEvent(event) {

	if(event.keyCode == 80 && isPaused) {
		isPaused = false;
	} else if(event.keyCode == 80 && !isPaused) {
		isPaused = true;
	}
}