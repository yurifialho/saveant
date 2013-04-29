ctx = null;
frameRate = 10000/30;

img = null;
bkg = null;
bugImg = null;

speedy = 0;
speedx = 0;
mp = 0;
sfx = 0;
sfy = 0;

isPaused = false;
isGameOver = false;
isStarted = false;
isSafe = false;

tempoInicial = new Date().getTime();
tempoFinal = tempoInicial;

nivel = 1;

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

	bugImg = new Image();
	bugImg.src = "img/bug_two.png";

	bugHpy = new Image();
	bugHpy.src = "img/bug_happy.jpg";

	overImg = new Image();
	overImg.src = "img/over.png";

	div.appendChild(canvas);
	body.appendChild(div);

	setInterval( function (e) { // Don't do this for time-critical animations
   animate();               // A function that draws the current animation frame
}, 1000 / 60);
}

function animate() {
	try {
		renderBackground();
		
		if(isStarted) renderMenu();
		if(!isStarted && !isGameOver) renderStartGame();
		if(isGameOver) renderGameOver();
		if(isPaused) renderPause();
		if(isSafe) renderSafe();

		if(isStarted && !isGameOver && !isSafe) renderGame();
		if(isStarted && !isPaused && !isSafe && !isGameOver) {
			processarPassos();
			testGameOver()
		}

	} catch(e) {
		console.error("Erro: " + e);
	}
}





/* ACTIONS AND EVENTS */

function keyboardEvent(event) {
	
	if(event.keyCode == 80 && isPaused) {
		isPaused = false;
	} else if(event.keyCode == 80 && !isPaused) {
		isPaused = true;
	}

	if(event.keyCode == 13 && !isStarted) {
		resetGame();
		isStarted = true
	} else if(event.keyCode == 13 && isSafe) {
		isSafe = false;
	} else if(event.keyCode == 13 && isGameOver) {
		resetGame();
	}
}

function saveAnt(event) {
	if(isSafe) {
		isSafe = false;
	}
	if(!isStarted) {
		resetGame();
		isStarted = true
	}
	if(isGameOver) {
		resetGame();
	}
	if(isPaused) {
		isPaused = false;
	}
	var x = event.pageX;
	var y = event.pageY;
	testSaveAnt(x, y);


} 

function processarPassos() {
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

	if(speedx > sfx) {
		speedx -= mp;
	} if(speedx < sfx) {
		speedx += mp;
	} 

	if(speedy > sfy) {
		speedy -= mp;
	} if(speedy < sfy) {
		speedy += mp;
	}
}

function createBug() {
	sfx = Math.floor(Math.random()*(window.innerWidth-100));
	sfy = Math.floor(Math.random()*(window.innerHeight-100));

	while (sfx < 500) {
		sfx = Math.floor(Math.random()*(window.innerWidth-100));
	}
	while (sfy < 500) { 
		sfy = Math.floor(Math.random()*(window.innerHeight-100));
	}

	mp += 1;
}

function resetGame() {
	mp = 0;
	speedx = 0;
	speedy = 0;
	isPaused = false;
	isGameOver = false;
	isStarted = false;
	tempoInicial = new Date().getTime();
	nivel = 1;
	createBug();
}

/* TESTERS */

function testGameOver() {
	if( (speedx <= sfx+10 && speedx >= sfx-10) && 
		(speedy <= sfy+10 && speedy >= sfy-10) ) {
		isGameOver = true;
	}
}

function testSaveAnt(x, y) {
	if(!isGameOver && isStarted && !isPaused && 
		(x <= sfx+70 && x >= sfx-20) && 
		(y <= sfy+70 && y >= sfy-20) ) {
		isSafe = true;

		speedx = 0;
		speedy = 0;
		mp += 1;
		nivel += 1;
		createBug();
	}
}

/* RENDERIZADORES */

function renderBackground() {
	if(ctx && bkg) {
		ctx.fillStyle = "white";
		ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
		ctx.drawImage(bkg,0,0);

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
	}
}

function renderMenu() {
	if(ctx) {
		//Pontos
	    ctx.font = '20pt sans-serif';
	    ctx.lineWidth = 1;
	    ctx.strokeStyle = 'blue';
	    ctx.strokeText("Pontos: " + (mp == 1 ? 0 : (mp * 100)), 50 , 50);
	    //Tempo
	    if(!isPaused && !isGameOver) tempoFinal = new Date().getTime();
	    ctx.font = '20pt sans-serif';
	    ctx.lineWidth = 1;
	    ctx.strokeStyle = 'blue';
	    ctx.strokeText("Tempo: " + parseInt((tempoFinal - tempoInicial)/1000), 50 , 100);
	    //Nivel
	    ctx.font = '20pt sans-serif';
	    ctx.lineWidth = 1;
	    ctx.strokeStyle = 'blue';
	    ctx.strokeText("Nível: " + nivel, 50 , 150);
	}
}

function renderGame() {
	//Draw Ant
	ctx.drawImage(bugImg,sfx,sfy);
	//Draw Spider
	ctx.drawImage(img,speedx,speedy);
	console.debug("SF: " + sfx + ":" + sfy + " - SP: " + speedx + ":" + speedy);
}

function renderGameOver() {
	if(ctx) {
		ctx.font = '40pt Calibri';
    	ctx.lineWidth = 3;
    	ctx.strokeStyle = 'red';
    	ctx.strokeText("Fim de jogo, você conseguiu: " + (mp == 1 ? 0 : (mp * 100)) + " Pontos", 200 , 400);
    	ctx.strokeText("(Press <Enter> to start again!)", 200 , 450);

    	ctx.drawImage(overImg, 300, 100);
	}
}

function renderPause() {
	if(ctx) {
		ctx.font = '40pt Calibri';
    	ctx.lineWidth = 3;
    	ctx.strokeStyle = 'red';
    	ctx.strokeText('Pausado.. (Press P to continue)', 200 , 400);
	}
}

function renderSafe() {
	if(ctx) {
		ctx.font = '40pt Calibri';
    	ctx.lineWidth = 3;
    	ctx.strokeStyle = 'red';
    	ctx.strokeText("Parabéns, você conseguiu!", 200 , 400);
    	ctx.strokeText("(Pressione <Enter> para ir ao próximo nível!)", 200 , 450);

    	ctx.drawImage(bugHpy, 300, 200);
	}
}

function renderStartGame() {
	if(ctx) {
		ctx.font = '40pt Calibri';
    	ctx.lineWidth = 3;
    	ctx.strokeStyle = 'red';
    	ctx.strokeText("Bem vindo!", 200 , 400);
    	ctx.strokeText("(Pressione <Enter> para iniciar o jogo)", 200 , 450);
	}
}