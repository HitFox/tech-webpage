

(function() {
  var container = document.body;

  var checkScroll = function() {
    var imageHeader = document.getElementsByClassName('img--is-in-background__img')[0];
    var scrollPosition = container.scrollTop;
    var documentHeader = document.getElementsByTagName('header')[0];
    var imageHeight = imageHeader.clientHeight - documentHeader.clientHeight;

    if(scrollPosition > imageHeight) {
      console.log('yeeeehaaaa');
      documentHeader.classList.add('is-scrolled');
    } else {
      documentHeader.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', function() {
    checkScroll();
  });

  window.addEventListener('resize', function() {
    checkScroll();
  });  
}) ();
