var $ = window.$ = require('jquery');
window.picturefill = require('picturefill');

(function(){
    function addFont() {
        var style = document.createElement('style');
        style.rel = 'stylesheet';
        document.head.appendChild(style);
        style.textContent = localStorage.finleapFonts;
    }
    try {
        if (localStorage.finleapFonts) {
            addFont();
        } else {
            var request = new XMLHttpRequest();
            request.open('GET', '/stylesheets/fonts-data.css', true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    localStorage.finleapFonts = request.responseText;
                    addFont();
                }
            };
            request.send();
        }
    } catch(ex) {
      void 0;
    }
}());

document.createElement( 'picture' );

$(function(){
  $('.nav-main__toggle').on('click touchstart', function(event){
    event.preventDefault();
    $('.list-nav').toggleClass('is-active');
  });
});

$(window).on('scroll', function(){
  var scrollTop = $(window).scrollTop(),
  elementOffset = $('.section-content').offset().top,
  distance = (elementOffset - scrollTop);
  if(distance <= 0){
    $('.page-header').addClass('🍌');
  } else {
    $('.page-header').removeClass('🍌');
  }
});
