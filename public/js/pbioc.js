$(function() {
	var scrollDuration = function(currentTop, targetTop) {
		return 1000;
	}

    var s = skrollr.init({forceHeight : false});
    skrollr.menu.init(s, {duration: scrollDuration});

    $('#menu-toggle').click(function () {
        $('body').toggleClass('menuActive');
    });
});