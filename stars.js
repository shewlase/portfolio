
var canvasHeight;
var canvasWidth;
var canvas;
var ctx;

var staticCanvas;
var staticCtx;

var starList = [];
var twinklerList = [];
var shooter = [];
var sattellite = [];
var ufoImage;
var timeOfLastFrame;
var minimumSize;
var starAmount;
var shooters = [];
var ufoResetting;
init();

function init()
{	
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	//canvas for static stars to save redrawing them all each animateframe
	staticCanvas = document.getElementById("staticStarCanvas");
	staticCtx = canvas.getContext("2d");		

	//should get css value of canvas dimensions
	canvasHeight  = window.innerHeight*1.5;
	canvasWidth = window.innerWidth*1.3;
	ctx.canvas.height = canvasHeight;
    ctx.canvas.width = canvasWidth;
	ctx.fillStyle = "#FFFFFF";
	
	staticCtx.canvas.height = canvasHeight;
    staticCtx.canvas.width = canvasWidth;
	staticCtx.fillStyle = "#FFFFFF";
	
	ufoImage = new Image();
	ufoImage.src = "ufp.png";
	
	generateTwinklingStars();
	generateStaticStars();
	// generateSattellite();
	
	generateShooters();	
	
	minimumSize = 1;
	starAmount = 500;
	ufoResetting = false;
	setInterval(function() 
	{ 			
		twinkle();
	},150);

	timeOfLastFrame = new Date().getTime();
	requestAnimationFrame(animate);
}


function animate()
{
	//twinkle stars
	var timeOfThisFrame = (new Date()).getTime();
	//delta in seconds
	var delta = (timeOfThisFrame - timeOfLastFrame)/1000;
	timeOfLastFrame = timeOfThisFrame;
	//shooting stars
	for(var k = 0; k < shooters.length; k++)
	{
		var thisShooter = shooters[k];
		thisShooter[0] += delta*thisShooter[2];	
		// shooter[0] += delta*shooter[2];	
		thisShooter[1] += delta*thisShooter[3];
		// shooter[1] += delta*shooter[3];
		if(thisShooter[4] > 0.2)
		{
			// shooter[4] -= delta*1;		
			thisShooter[4] -= 0.2;		
		}
		else
		{
			shooters.splice(thisShooter);
		}
	}
	//why no working mayne
	// sattellite[0] -= delta*70;	
	// sattellite[1] -= delta*500;	
	sattellite[0] += delta*sattellite[2];	
	sattellite[1] += delta*sattellite[3];
	//thisActivates
	if(sattellite[0] < -100 || sattellite[1] < -100)
	{
		if(!ufoResetting)
		{			
			ufoResetting = true;
			setTimeout(generateSattellite, 3000);
			
		}
		//change image
	}
	else
	{
		
	}
	
	requestAnimationFrame(animate);	
	draw();
	//removed this from draw to improve performance
	//    was redrawing all the static stars each draw() call
	drawStaticStars();
}

function drawStaticStars()
{
	for(var j = 0; j < starList.length; j++)
	{
		var x = starList[j][0];
		var y = starList[j][1];
		var size = starList[j][2];
		var opacity = starList[j][3];
		
		ctx.beginPath();
		ctx.arc(x, y, size, 0, 2 * Math.PI);
		ctx.fillStyle = 'rgba(255,255,255,'+opacity+')';
		ctx.fill();
	}
}

function draw()
{	
	ctx.clearRect(0,0,canvasWidth,canvasHeight);
	// drawTwinklers();
	
	for(var i = 0; i < twinklerList.length; i++)
	{
		var x = twinklerList[i][0];
		var y = twinklerList[i][1];
		var size = twinklerList[i][2];
		var opacity = twinklerList[i][3];
		
		ctx.beginPath();
		ctx.arc(x, y, size, 0, 2 * Math.PI);	
		ctx.fillStyle = 'rgba(255,255,255,'+opacity+')';
		ctx.fill();
	}
	
	
	ctx.fillStyle = 'white';
	ctx.drawImage(ufoImage, sattellite[0], sattellite[1], sattellite[4], sattellite[4]);
	for(var k = 0; k < shooters.length; k++)
	{
		var thisShooter = shooters[k];
		ctx.beginPath();
		ctx.arc(thisShooter[0], thisShooter[1], thisShooter[4], 0, 2 * Math.PI);	
		ctx.fill();
	}
	
	
	/* ctx.beginPath();
	ctx.arc(sattellite[0], sattellite[1], sattellite[4], 0, 2 * Math.PI);	
	ctx.fill();
	 */
	
	// drawShooter();
}

function generateSattellite()
{
	/* var randomX = Math.random() * canvasWidth;
	var randomY = Math.random() * canvasHeight;
	
	var randomVX = Math.random() * 2;
	var randomVY = Math.random() * 2; */
	ufoResetting = false; //so animate doesn't generate many satellites
	var startX = canvasWidth;
	var startY = Math.random() * canvasHeight;
	//px per second
	// var vX = (Math.random()*canvasHeight/25);
	// var vX = (Math.random() * 500) + 50;
	// var vY = (Math.random()*canvasWidth/25);
	var vX = (Math.random()*(canvasHeight/10)-canvasWidth/5);
	var vY = (Math.random()*(canvasWidth/10)-canvasWidth/20);
	
	// var rotationAngle = 0;//tan-1 vy/vx
	
	sattellite = [startX, startY, vX, vY, 0.06*canvasHeight];
}

function generateStaticStars()
{
	for(var i = 0; i < 500; i++)
	// for(var i = 0; i < 20; i++)
	{
		var randomX = Math.random() * canvasWidth;
		var randomY = Math.random() * canvasHeight;
		// var randomSize = (Math.random() * minimumSize) + 1;
		var randomSize = (Math.random() * 1) + 1;
		//between 0.1 and 0.6
		var randomOpacity = (Math.random() * 0.5) + 0.1;
		// starList[i] = [randomX, randomY, randomSize];
		starList[i] = [randomX, randomY, randomSize, randomOpacity];
	}
}

function generateTwinklingStars()
{
	for(var i = 0; i < 500/20; i++)
	{
		var randomX = Math.random() * canvasWidth;
		var randomY = Math.random() * canvasHeight;
		var randomSize = (Math.random() * 1) + 1;
		var randomOpacity = (Math.random() * 0.5) + 0.4;
		twinklerList[i] = [randomX, randomY, randomSize, randomOpacity];
	}
}

function generateShooters()
{	
	//shooter (x, y, vx, vy)
	// var randomX = (Math.random() * 0.5*canvasWidth) +0.5*canvasWidth;
	// var randomY = (Math.random() * 0.5*canvasHeight);
	var randomX = Math.random() * canvasWidth;
	var randomY = Math.random() * canvasHeight;
	
	// var randomVX = (Math.random() * 1000) - 500;
	// var randomVY = (Math.random() * 1000) - 500;
	//to make one direction, vx and vy always negative?
	var randomVX = (Math.random() * -500) - 50;
	var randomVY = (Math.random() * 500)  + 50;
	
	shooter = [randomX, randomY, randomVX, randomVY, 5];
	shooters.push(shooter);
	// var randomTime = (Math.random()*2000)+550;
	var randomTime = (Math.random()*2000);
	//recalculate time again		
	setTimeout(function() 
	{ 					
		generateShooters();
	}, randomTime);
	
	//random start position
	//random x velocity
	
	//random y velocity
	
	//start size to end size (0)
}

function twinkle()
{	
	for(var i = 0; i < twinklerList.length; i++)
	{		
		var randomSize = (Math.random() * 2) + 1;
		twinklerList[i][2] = randomSize;
	}
}



