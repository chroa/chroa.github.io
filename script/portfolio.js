$(document).ready(function() {

	var windowWidth = $(document).width();
    var windowHeight = $(document).height();

    var titleRect = getTitleCoordinates();

    for(var i = 0; i < 100; i++) {      
        generateStar(windowWidth, windowHeight, titleRect);
    }

});