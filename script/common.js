
function generateStar(windowWidth, windowHeight, rect = new DOMRect(0, 0, 0, 0)) {

    var star = document.createElement("div");

    star.classList.add("star");

    var positionWidth = Math.floor(Math.random()*(windowWidth-4));
    var positionHeight = Math.floor(Math.random()*(windowHeight-4));

    while(overlapsTitle(positionWidth, positionHeight, rect)) {
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

function overlapsTitle(positionWidth, positionHeight, rect = new DOMRect(0, 0, 0, 0)) {

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

function getBlogCoordinates() {

    var blog = document.getElementById("blog");
    var rect = blog.getBoundingClientRect();

    return rect;

};

function generateTwinklyStar() {

	var twinklyStar = document.createElement("div");
	var twinkleDiv1 = document.createElement("div");
	var twinkleDiv2 = document.createElement("div");

    var duration = Math.random() + 1;
    twinkleDiv1.style.animation = "twinkle-width " + duration + "s ease infinite";
    twinkleDiv2.style.animation = "twinkle-height " + duration + "s ease infinite";

    twinklyStar.classList.add("star-twinkle");
    twinklyStar.appendChild(twinkleDiv1);
    twinklyStar.appendChild(twinkleDiv2);

    var positionWidth = Math.floor(Math.random()*(100-4));
    var positionHeight = Math.floor(Math.random()*(100-4));

    twinklyStar.style.right = positionWidth + "%";
    twinklyStar.style.top = positionHeight + "%";

    var size = Math.random() + 0.2;
    twinklyStar.style.transform = "scale(" + size + "," + size + ")";

    var starsContainer = document.getElementById("stars-container");
	starsContainer.appendChild(twinklyStar);

};

function generateAllStars(starsBackgroundNumber, twinklyStarsNumber) {
    var windowWidth = $(document).width();
    var windowHeight = $(document).height();

    var titleRect = getTitleCoordinates();

    for(var i = 0; i < starsBackgroundNumber; i++) {      
        generateStar(windowWidth, windowHeight, titleRect);
    }

    for(var i = 0; i < twinklyStarsNumber; i++) {
        generateTwinklyStar();
    }
};