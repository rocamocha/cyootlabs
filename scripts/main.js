$(document).ready(function() {
  $(".landing-text").hide();

  $(".landing-content").mouseenter(function() {
    $(".landing-text").fadeIn(1000);
  });
  $(".landing-content").mouseleave(function() {
    $(".landing-text").fadeOut(200);
  });
});
