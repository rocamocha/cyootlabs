var doorClosed = true;

window.onload = function() {

  // disallow pinch to zoom
  disableTouch();
  enableTouch();

  // landing page click functionality
  var landingContent = document.getElementById('landing-content')
      landingContentClick = function() {
        if (doorClosed) {
          openDoors();
          doorClosed = false;
        } else {
          console.log("NAVIGATION!");
        }
      }

  landingContent.addEventListener('click', landingContentClick);

  fetch('../linktree.html')
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Error. Status code' + response.status);
            return;
          }

          response.text().then(function(data) {
            // inject html
            document.querySelector('#content').innerHTML = data;
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
}

function disableTouch() {
  //this is to prevent pinch zooming, to keep the visual frame undisturbed
  document.addEventListener('touchstart', function(e){
    e.preventDefault();
  },{passive: false});
}

function enableTouch() {
  for (var element of document.getElementsByClassName('touch-on')) {
      element.addEventListener('touchstart', function(e){e.stopPropagation()}, false);
  }
}

function setStyle(querySelector, property, value) {
  document.querySelector(querySelector).style[property] = value;
}

function openDoors() {
  setStyle('.landing-content:hover .landing-text', 'transitionDelay', 'initial');
  setStyle('.landing-content', 'animation', 'landing-content-glow 2s infinite, landing-content-enter 3s forwards');
  setStyle('.landing-content', 'boxShadow', '0px 0px 0px 6px #FFF');
  
  setStyle('#lt-left', 'top', 'calc(var(--nav-stripe-enter-margin) + 1vw)');
  setStyle('#lt-left', 'opacity', '0');
  setStyle('#lt-right', 'top', 'calc(var(--nav-stripe-enter-margin) + 1vw)');
  setStyle('#lt-right', 'opacity', '0');
  
  setStyle('.nav-stripe', 'animation', 'nav-stripe-glow 2s infinite, nav-stripe-enter 3s forwards');
  setStyle('.nav-door', 'animation', 'nav-door-open 3s forwards');

  setStyle('.content-wrapper', 'animation', 'content-wrapper-reveal 3s forwards');
  setStyle('.content-door', 'animation', 'content-door-open 3s forwards');

  setTimeout(function() {
    document.querySelector('.content-wrapper').classList.add('touch-on');
    document.querySelector('#content').classList.add('touch-on');
    enableTouch(); // needs to be called again to re-evaluate touch-enabled elements

    console.log('Doors opened!');
  }, 3000);
}
