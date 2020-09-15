var doorClosed = true;
var navOpen = false;
var fragmentsLoaded = false;

var getHtmlFragments = async (url) => { //loads html into fragments using fetch()
  await fetch(url)
    .then(response => response.text())
    .then(data => {
        fragments[url] = fragmentFromString(data);
        console.log(fragments);
        console.log(fragments[url].childElementCount);
  });
  setStyle('.loader1', 'opacity', '0'); //outer loading circle
  setStyle('.loader2', 'opacity', '0'); //inner loading circle
  setStyle('.landing-content img', 'opacity', '1'); //face
  fragmentsLoaded = true;
}

var fragments = [];
var navItems = ['experiments','samplepack','about'];
var currentPage;
var scrollPos;


window.addEventListener('load', (event) => {
  for (const search of ['samplepack','about']) {
    if (location.href.search(search) !== -1) {
      getPage(search + '.html');    
    } else {
      getPage('experiments.html'); //load the landing page onto the screen
    }
  }
  currentPage = ('experiments.html')
  navItems.forEach(e => getHtmlFragments(html(e))); //load all pages into memory to reduce loading time between navigation

  // navigation hover preview
  const navElements = document.querySelectorAll('.nav-item');
  navElements.forEach(element => {
    element.addEventListener('mouseover', function(event) {
      if (navOpen) {
        loadPage(html(element.id));
        if (currentPage == html(element.id)) {
          // if you are mousing over the current page selector, maintain scroll position
          let scrollpos = sessionStorage.getItem('scrollpos');
          if (scrollpos) window.scrollTo(0, scrollpos);
        } else {
          // otherwise scroll to the top
          window.scrollTo(0, 0);
        }
      }
    });
    // when you mouse off the selectors, go back to displaying the last page
    element.addEventListener('mouseleave', function(event) {
      if (navOpen) {
        loadPage(currentPage);
        let scrollpos = sessionStorage.getItem('scrollpos');
        if (scrollpos) window.scrollTo(0, scrollpos);
      }
    });
  });

  // make the navigation not appear at first, since it is on the door
  document.querySelectorAll('.nav-item').forEach(e => e.style.display = 'none');

  // landing page click functionality
  var landingContent = document.getElementById('landing-content')
      landingContentClick = function() {
        if (doorClosed & fragmentsLoaded) { //what to do when the page is first opened
          openDoor();
          doorClosed = false;
        } else if (!navOpen) { //open the navigation
          setStyle('.content-door', 'animation', 'content-door-open-nav 1s forwards');
          blurOn();
          sessionStorage.setItem('scrollpos', window.scrollY);
          document.querySelectorAll('.nav-item').forEach(e => e.style.display = 'block');
          navOpen = true;
        } else if (navOpen) { //close the navigation
          setStyle('.content-door', 'animation', 'content-door-close-nav 1s forwards');
          blurOff();
          loadPage(currentPage); // load the last page since no navigation was selected
          let scrollpos = sessionStorage.getItem('scrollpos');
          if (scrollpos) window.scrollTo(0, scrollpos);
          navOpen = false;
        }
      }

  landingContent.addEventListener('click', landingContentClick);

  // page load from navigation select
  for (const name of navItems) {
    let element = document.getElementById(name);
    if (element != null) {
      element.addEventListener('click', function() {
        loadPage(html(element.id));
        currentPage = html(element.id);
        setStyle('.content-door', 'animation', 'content-door-close-nav 1s forwards');
        blurOff();
        navOpen = false;
      });
    }
  }
});

function loadPage(target) {
  let e = document.querySelector('#content');
  let f = fragments[target];
  e.innerHTML = "";
  e.appendChild(f.cloneNode(true));
}

function blurOn() {
  setStyle('.content-wrapper', 'filter', 'blur(15px)');
  setStyle('.content-wrapper', '-webkit-filter', 'blur(15px)');
}

function blurOff() {
  setStyle('.content-wrapper', 'filter', 'none');
  setStyle('.content-wrapper', '-webkit-filter', 'none');
}

function html(n) {
  return (n + '.html');
}

function fragmentFromString(strHTML) {
  return document.createRange().createContextualFragment(strHTML);
}

function getPage(url) { //loads html using fetch()
  fetch(url)
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

function disableTouch(el) {
  for (var element of document.getElementsByClassName('touch-on')) {}
    element.addEventListener('touchstart', function(e){e.preventDefault();},{passive: false});
}

function enableTouch() {
  for (var element of document.getElementsByClassName('touch-on')) {
    element.addEventListener('touchstart', function(e){e.stopPropagation()}, false);
  }
}

function setStyle(querySelector, property, value) {
  document.querySelectorAll(querySelector).forEach(element => {
    element.style[property] = value;
  });
}

function openDoor() {
  setStyle('.landing-content:hover .landing-text', 'transitionDelay', 'initial');
  setStyle('.landing-content', 'animation', 'landing-content-glow 2s infinite, landing-content-enter 3s forwards');
  setStyle('.landing-content', 'boxShadow', '0px 0px 0px 6px #FFF');
  
  setStyle('#lt-left', 'top', 'calc(var(--nav-stripe-enter-margin) + 1vw)');
  setStyle('#lt-left', 'opacity', '0');
  setStyle('#lt-right', 'top', 'calc(var(--nav-stripe-enter-margin) + 1vw)');
  setStyle('#lt-right', 'opacity', '0');
  
  setStyle('.nav-stripe', 'animation', 'nav-stripe-glow 2s infinite, nav-stripe-enter 3s forwards');
  setStyle('.nav-door', 'animation', 'nav-door-open 3s forwards');
  setStyle('.nav-item:hover', 'background-color', 'black');

  setStyle('.content-wrapper', 'animation', 'content-wrapper-reveal 3s forwards');
  setStyle('.content-door', 'animation', 'content-door-open 3s forwards');
  setStyle('.cyootface', 'animation', 'face-down 3s forwards');
  setStyle('footer', 'color', 'black');
  setStyle('.nav-item', 'color', 'white');
  setStyle('.menu-pointer', 'color', '#b8b84b');
  setStyle('#link-plain-html', 'display', 'none');

  setTimeout(function() {
    document.querySelector('.content-wrapper').classList.add('touch-on');
    document.querySelector('#content').classList.add('touch-on');
    !function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/7212e76da953ad2b1f9d5425f/bf1eeb8f1e6c87029f7622556.js");

    console.log('Doors opened!');
  }, 3000);
}