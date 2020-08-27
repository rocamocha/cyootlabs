$(document).ready(function() {
  $(".landing-content").click(function () {
    //move the landing-content
    $(".landing-content").css("animation", "landing-content-glow 2s infinite, landing-content-enter 3s forwards");
    $(".landing-content").css("box-shadow", "0px 0px 0px 6px #FFF");

    //move the nav-stripe
    $(".nav-stripe").css("animation", "nav-stripe-glow 2s infinite, nav-stripe-enter 3s forwards");

    //move the landing-text
    $(".landing-content:hover .landing-text").css("transition-delay", "initial");
    $("#lt-left").css("top", "-112px");
    $("#lt-left").css("opacity", "0");
    $("#lt-right").css("top", "calc(var(--nav-stripe-enter-margin) + 1vw)");
    $("#lt-right").css("color", "white");

    //reveal the content wrapper
    $(".content-wrapper").css("animation", "content-wrapper-reveal 3s forwards");
  });
});
