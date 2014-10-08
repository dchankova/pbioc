/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    scrollrInit();
    videoInit();
    $('.video-js').css('position','relative');

    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

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

    $('#subs-toggle').click(function() {
        if (this.checked) {
            alert(1);
            $('#big-video-wrap video track').addClass('show');
            $('#big-video-wrap video track').removeClass('hide');
        } else {
            $('#big-video-wrap video track').addClass('hide');
            $('#big-video-wrap video track').removeClass('show');
        }
    });

    //var textTracks = vid.textTracks; // one for each track element
    // var textTrack = textTracks[0]; // corresponds to the first track element
    //textTrack.kind = "subtitles"; // e.g. "subtitles"
    //textTrack.mode = "showing"; // e.g. "disabled", hidden" or "showing"
    vid.innerHTML = '<track id="videoBGSubs" kind="captions" src="subs/bgSubs.vtt" srclang="en" label="Bulgarian" default>'
        $('#flag-en').on('click', function(e) {
            $('#videoBGSubs').remove();
            vid.innerHTML = '<track id="videoENSubs" kind="captions" src="subs/enSubs.vtt" srclang="en" label="English">'
        });
    $('#flag-bg').on('click', function(e) {
        $('#videoENSubs').remove();
        vid.innerHTML = '<track id="videoBGSubs" kind="captions" src="subs/bgSubs.vtt" srclang="en" label="Bulgarian">'
    });
}
