var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
console.log(isTouch);

$(document).ready(function() {
  //$(".landing-text").hide();

  $(".landing-content").mouseenter(function() {
    $(".landing-text").css("transition", "color 1700ms");
  });
  $(".landing-content").mouseleave(function() {
    $(".landing-text").css("transition", "color 300ms");
  });
});
