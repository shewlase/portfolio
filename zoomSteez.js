

var divAmount = 150;
                       //light to dark ->
var colours = ['#8499B1','#7B6D8D', '#593F62'];
//89, 63, 98    123, 109, 141     132, 153, 177
init();
var zPositions;
var screenWidth;
var screenHeight;
//need parameter to say which page its for
function init()
{
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;

	//largest difference between z positions
	// var zRange = 1600;
	var zRange = 100;
	var zStart = -(0.6*zRange); //start with negative values
	zPositions = [];
	var zPosition = zStart;
	for(var i = 0; i < divAmount; i++)
	{
		// create a new div element
		var newDiv = document.createElement("div");
		// and give it some content
		// var newContent = document.createTextNode("Yes!");
		// add the text node to the newly created div
		// newDiv.appendChild(newContent);
		newDiv.classList.add("randomDiv");
		newDiv.classList.add("animatedCircles");//needs its own class for this
		/* newDiv.classList.add("pulse"); */
		//random x y and z position
		//x and y between 20 and 70%
		// newDiv.style.left = Math.random()*70+10+"%";
		newDiv.style.left = Math.random()*90+"%";
		// newDiv.style.top = Math.random()*70+10+"%";
		newDiv.style.top = Math.random()*190+"%";

		// var zPosition = Math.random()*800-400;
		// zPosition = i*(zRange/divAmount);
		zPosition += (zRange/divAmount);
		// newDiv.style.transform = "translateZ("+zPosition+"px)";
		newDiv.style.transform = "translateZ("+zPosition+"vw)";
		zPositions.push(zPosition);

		var randomColour = colours[Math.floor(Math.random() * 3)];
		newDiv.style.backgroundColor = randomColour;
		newDiv.style.borderColor = randomColour;
		/* newDiv.style.borderWidth = '10px'; */
		// add the newly created element and its content into the DOM
		// var title = document.querySelector("#backgroundCircles");
		// var child = document.querySelector("#circlesBefore");
		// var parent = document.querySelector("#backgroundCircles");
		// var parent = document.querySelector("#perspective");
		var beforeThis = document.querySelector("#down");
		document.querySelector("#top").insertBefore(newDiv,beforeThis);
		// parent.appendChild(newDiv);


		// parent.insertBefore(newDiv,child);
		// console.log(zPosition);
	}
}

function goNextPage(nextPage)
{

	zoomAllRandomDivs();
	//fade h1 and text, replace with new page
	// document.getElementById('title').style.opacity = 0;
	// document.getElementsByClassName('text')[0].style.opacity = 0;
	let topSection = document.getElementsByClassName('icons')[0];

	// document.getElementById('top').style.opacity = 0;
	topSection.style.opacity = 0;
	document.getElementById('main').style.display = 'none';
	if(nextPage == 'siteme')
	{
		document.getElementById('siteMeCase').style.display = 'block';
	}
	else if (nextPage == 'tanx')
	{
		document.getElementById('tanxCase').style.display = 'block';
	}
	else if (nextPage == 'home')
	{
		// document.getElementById('top').style.display = 'block';
		topSection.style.display = 'flex';
		document.getElementById('main').style.display = 'block';
		document.getElementById('siteMeCase').style.opacity = 0;
		document.getElementById('tanxCase').style.opacity = 0;
	}
	setTimeout(function(){
		//after transition, show next page
		if(nextPage == 'siteme')
		{
			// document.getElementById('top').style.display = 'none';
			topSection.style.display = 'none';
			document.getElementById('siteMeCase').style.opacity = 1;
		}
		else if (nextPage == 'tanx')
		{
			// document.getElementById('top').style.display = 'none';
			topSection.style.display = 'none';
			document.getElementById('tanxCase').style.opacity = 1;
		}
		else if (nextPage == 'home')
		{
			topSection.style.opacity = 1;
			// document.getElementById('top').style.opacity = 1;
			document.getElementById('siteMeCase').style.display = 'none';
			document.getElementById('tanxCase').style.display = 'none';
		}

		//change text and opacity to one
		// if(isZoomed)
		// {
		// 	document.getElementById('title').innerHTML = 'Page Two.';
		// 	document.getElementsByTagName('p')[0].innerHTML = "Page 2 paragraph."
		// }
		// else
		// {
		// 	document.getElementById('title').innerHTML = 'First Page.';
		// 	document.getElementsByTagName('p')[0].innerHTML = "Lorem ipsum dolor sit amet, an option dissentiet usu. Facete abhorreant te vis, cu mentitum instructior vis. Vis esse cibo clita cu. His in prima vituperata, utroque constituto disputando duo ei, appetere atomorum et vel. Omnis expetendis te nam, posse neglegentur vix at. Et duo soleat utroque detraxit.Ut eos erat persius. Ad per augue malorum. Mea mutat vocibus vituperata te, mea quis sint augue in. Sit et vidit liber atomorum."
		// }
		// document.getElementById('title').style.opacity = 1;
		// document.getElementsByClassName('text')[0].style.opacity = 1;
	}, 2000)
	// setTimeout(createRandomDivs, 3000);
	// createRandomDivs();
}

var isZoomed = false;
function zoomAllRandomDivs()
{
	//for every randomDiv, +1000px to its translateZ
			//will be this laters
	// document.getElementById('firstPage').getElementsByClassName('randomDiv')
	var elementsToTransition = document.getElementsByClassName('randomDiv');
	for(var i = 0; i < elementsToTransition.length; i++)
	{
		var newZ;
		if(isZoomed)
		{
			newZ = zPositions[i]-50;
			zPositions[i] = newZ;
		}
		else
		{
			newZ = zPositions[i]+50;
			zPositions[i] = newZ;
		}
		// newZ = zPositions[i]+1000;
			// zPositions[i] = newZ;
		// elementsToTransition[i].style.transform = "translateZ("+newZ+"px)";
		elementsToTransition[i].style.transform = "translateZ("+newZ+"vw)";
	}
	isZoomed = !isZoomed;
}

// window.onmousemove = function( event ) {
//
// 	var mouseX = event.pageX/screenWidth;
// 	var mouseY = event.pageY/screenHeight;
//
// 	var originX = (mouseX * 7) + 40;
// 	var originY = (mouseY * 10) + 40;
//
// 	document.body.style.perspectiveOrigin = originX+'% '+originY+'% ';
// };
