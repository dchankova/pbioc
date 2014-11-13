$(function() {
    var s = skrollr.init({forceHeight : false});
    skrollr.menu.init(s, {});

    $('#menu-toggle').click(function () {
        $('body').toggleClass('menuActive');
    });
});