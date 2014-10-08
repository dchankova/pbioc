// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

var DEFAULT_LANG = "bg";

var subs = {
    en : {
        label : "English",
        srclang : "en",
        src : "subs/en-subs.vtt"
    },
    bg : {
        label : "Bulgarian",
        srclang : "bg",
        src : "subs/bg-subs.vtt",
        dflt : true
    }
}

$(function() {

    scrollrInit();
    videoInit();
    closeResponsiveMenuOnClick();    
    initMenuAnimation();

    $('.video-js').css('position','relative');
});

var initMenuAnimation = function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
}

var closeResponsiveMenuOnClick = function() {
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });    
}

var scrollrInit = function() {
    var s = skrollr.init();
}


// Video scripts
var videoInit = function() {

    var BV = new $.BigVideo({useFlashForFirefox:false});
    BV.init();

    var vid = document.getElementById("big-video-vid_html5_api");
    vid.muted = true;

    if (Modernizr.touch) {
        BV.show('video-poster.jpg');
    } else if (/opera/.test(navigator.userAgent.toLowerCase())){
        BV.show('http://video-js.zencoder.com/oceans-clip.mp4', { doLoop:true});
    } else {
        BV.show('http://video-js.zencoder.com/oceans-clip.mp4',{ doLoop:true, altSource:'http://video-js.zencoder.com/oceans-clip.mp4'});
    }

    $('#sound-toggle').on('click', function(e) {
        if (this.checked) {
            vid.muted = false;
        } else {
            vid.muted = true;
        }
    });

    $('#subs-toggle').on('click', function(e) {
        if (this.checked) {
            vid.textTracks[0].mode = "showing";
        } else {
            vid.textTracks[0].mode = "disabled";
        }
    });

    //textTrack.mode = "showing"; // e.g. "disabled", hidden" or "showing"
    var textTracks = vid.textTracks; // one for each track element
    var textTrack = textTracks[0]; // corresponds to the first track element
//    vid.innerHTML = textTrack.init(vid, subs[defaultLang]);
    vid.innerHTML = _generateTrack(subs[DEFAULT_LANG], true);

    $('.lang-flag').on('click', function(e) {
        var _this = $(this);
        var lang = _this.attr('alt');
        vid.innerHTML = _generateTrack(subs[lang]);
    });
}

var _generateTrack = function(sub, isDefault) {
    var def = "";
    if (isDefault) {
        def = "default";
    }
    return '<track kind="subtitles" src="' + sub.src + '" srclang="' + sub.srclang + '" label="' + sub.label + '" ' + def + '>';
}