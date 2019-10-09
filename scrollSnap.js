var lastScrollPosition;
var newScrollPosition;

var currentSection;
var nextSection;

var transitionTime = 750;
var isAnimating = false; //disable scroll during animation
$(document).ready(function () {
	
	currentSection = 'top';
	lastScrollPosition = $(window).scrollTop();
});

var isScrollingDown;
window.onscroll = function(e) 
{
	
  // print "false" if direction is down and "true" if up
  newScrollPosition = $(window).scrollTop();  
  isScrollingDown = lastScrollPosition < newScrollPosition;
  
	if(isScrollingDown &&
	currentSection == 'top' &&
	!isAnimating) 
	{	
		scrollToMain();
	}
	else if(!isScrollingDown &&
	currentSection == 'main' &&
	!isAnimating) 
	{		
		isAnimating = true;
		//up
		$('html, body').animate(
		{
			 scrollTop: $("#top").offset().top //aka 0px 
		}, transitionTime, "swing")			
		
		setTimeout(function(){
			currentSection = 'top'			
			isAnimating = false;			
			toggleScroll();
		}, transitionTime);
	}   
  lastScrollPosition = newScrollPosition;
}
// disables scroll
// window.onwheel = function() 
// {
	// return false;
// }


function scrollToMain()
{
	isAnimating = true;
		toggleScroll();
		//down
		$('html, body').animate(
		{
			scrollTop: $("#main").offset().top
		}, transitionTime, "swing")
		
		setTimeout(function(){
			currentSection = 'main'
			isAnimating = false;			
			toggleScroll();
		}, transitionTime);
}

//stop user scrolling while animating between sections
function toggleScroll()
{
	function noscroll() {
		/* window.scrollTo( 0, 0 ); */
	}
	if(!isAnimating)
	{
		// Remove listener to disable scroll
		window.removeEventListener('scroll', noscroll);
	}
	else
	{
		// add listener to disable scroll
		window.addEventListener('scroll', noscroll);
	}
	/* function wheel(e) { preventDefault(e); }
function disableScroll() {
  if (window.addEventListener) {
	window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}
function enableScroll() {
  if (window.removeEventListener) {
	window.removeEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = document.onkeydown = null;
} */
	
}