$(document).ready(function() {

	var windowWidth = $(document).width();
    var windowHeight = $(document).height();

    var blogRect = getBlogCoordinates();

    for(var i = 0; i < 100; i++) {      
        generateStar(windowWidth, windowHeight, blogRect);
    }

});