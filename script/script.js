
function generateStar(windowWidth, windowHeight, titleRect) {

    var star = document.createElement("div");

    star.classList.add("star");

    var positionWidth = Math.floor(Math.random()*(windowWidth-4));
    var positionHeight = Math.floor(Math.random()*(windowHeight-4));

    while(overlapsTitle(positionWidth, positionHeight, titleRect)) {
    	positionWidth = Math.floor(Math.random()*(windowWidth-4));
    	positionHeight = Math.floor(Math.random()*(windowHeight-4));
    }

    star.style.top = positionHeight + "px";
    star.style.left = positionWidth + "px";

    var sizeStar = Math.random()*4 + "px";
    star.style.width = sizeStar;
    star.style.height = sizeStar;

    var constelation = document.getElementById("constelation");
	constelation.appendChild(star);

};

function overlapsTitle(positionWidth, positionHeight, rect) {

	var isOverlapping = false;

	if(positionWidth > rect.left && positionWidth < rect.right 
		&& positionHeight > rect.top && positionHeight < rect.bottom) {
		isOverlapping = true;
	}

	return isOverlapping;

};

function getTitleCoordinates() {

	var title = document.getElementById("title");
	var rect = title.getBoundingClientRect();

	return rect;

};

function generateTwinklyStar() {

	var twinklyStar = document.createElement("div");
	var twinkleDiv1 = document.createElement("div");
	var twinkleDiv2 = document.createElement("div");

    twinklyStar.classList.add("star-twinkle");
    twinklyStar.appendChild(twinkleDiv1);
    twinklyStar.appendChild(twinkleDiv2);

    var range = 200;

    var positionWidth = Math.floor(Math.random()*(range+200))+20;
    var positionHeight = Math.floor(Math.random()*(range+100));

    twinklyStar.style.right = positionWidth + "px";
    twinklyStar.style.top = positionHeight + "px";

    var starsContainer = document.getElementById("stars-container");
	starsContainer.appendChild(twinklyStar);

};

function removeAllAndReGenerateStars() {

    console.log("called resize");

    var parentConstelation = document.getElementById("constelation");
    var bodyStars = parentConstelation.childNodes;
    for(var i = 0; i < bodyStars.length; i++) {
        parentConstelation.removeChild(bodyStars[i]);
    }

    generateAllStars();

};

function generateAllStars() {
    var windowWidth = $(document).width();
    var windowHeight = $(document).height();

    var titleRect = getTitleCoordinates();

    for(var i = 0; i < 300; i++) {      
        generateStar(windowWidth, windowHeight, titleRect);
    }

    for(var i = 0; i < 7; i++) {
        generateTwinklyStar();
    }
};


var doit;

$(document).ready(function() {

    $(window).resize(function() { 
        clearTimeout(doit);
        doit = setTimeout(removeAllAndReGenerateStars(), 500);
    });

    generateAllStars();

});