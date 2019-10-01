

var screenWidth;
var screenHeight;

var toRotate;
// init();
$(document).ready(init());

function init()
{
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight; //change to div height?
	// toRotate = $("#circleDiv");
	toRotate = $(".mainSquare");
	/* console.log("cmon man"); */
}

var maxDegrees = 45;

$(window).mousemove(function( event ) {
	// var newX;
	// var newY;
	// console.log("cmon man");
	// console.log(event.pageX/screenWidth);
	var clickX = event.pageX/screenWidth;	
	var clickY = 0.5*event.pageY/screenHeight;
	var yDegrees = (clickX*maxDegrees)-0.5*maxDegrees;
	var xDegrees = -(clickY*maxDegrees)+0.8*maxDegrees;
	
	// console.log(clickY +" & "+ xDegrees+" & "+ clickX +" & "+ yDegrees);
	// toRotate.css({transform: 'rotateY('+degrees+'deg)'});
	// $("#circleDiv").css({transform: 'rotateY('+yDegrees+'deg) rotateX('+xDegrees+'deg)'});

	/* please change to vanilla */
	$(".mainSquare").css({transform: 'rotateY('+yDegrees+'deg) rotateX('+xDegrees+'deg)'});	

});