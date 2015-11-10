document.addEventListener("DOMContentLoaded", function(event) {

  var container = document;
  var imageClass = document.getElementsByClassName('img--is-in-background__img')[0];
  var imageHeight = imageClass.clientHeight;
  var documentHeader = document.getElementsByTagName('header')[0];
  var documentHeaderHeight = documentHeader.clientHeight;
  var documentHeaderDifference = imageHeight - documentHeaderHeight;

  console.log(imageHeight);
  console.log(documentHeaderDifference);

  container.onscroll = function () {
    var y = window.scrollY;
    if(y > documentHeaderDifference) {
      documentHeader.classList.add('is-scrolled');
    } else {
      documentHeader.classList.remove('is-scrolled');
    }
  };
});
