(function () {
  var viewport = document.querySelector('.slider-viewport');
  var track = document.querySelector('.slider-track');
  var prevBtn = document.querySelector('.slider-btn.prev');
  var nextBtn = document.querySelector('.slider-btn.next');
  var counter = document.querySelector('.slider-counter');

  var realSlides = Array.prototype.slice.call(track.children);
  var total = realSlides.length;
  var BUFFER = 1; // one slide visible at a time, so a single clone on each side is enough

  // seamless infinite loop: [clone of last] + [real slides] + [clone of first]
  var fragStart = document.createDocumentFragment();
  realSlides.slice(total - BUFFER).forEach(function (n) {
    var c = n.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    fragStart.appendChild(c);
  });
  track.insertBefore(fragStart, track.firstChild);

  var fragEnd = document.createDocumentFragment();
  realSlides.slice(0, BUFFER).forEach(function (n) {
    var c = n.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    fragEnd.appendChild(c);
  });
  track.appendChild(fragEnd);

  var domIndex = BUFFER; // points at real slide 0

  function slideWidth() {
    return viewport.clientWidth;
  }

  function render(animate) {
    if (!animate) track.style.transition = 'none';
    track.style.transform = 'translateX(-' + (domIndex * slideWidth()) + 'px)';
    if (!animate) {
      track.getBoundingClientRect(); // force reflow before re-enabling transition
      track.style.transition = '';
    }
    var realIndex = ((domIndex - BUFFER) % total + total) % total;
    if (counter) counter.textContent = (realIndex + 1) + ' / ' + total;
  }

  function settleLoop() {
    if (domIndex >= BUFFER + total) {
      domIndex -= total;
      render(false);
    } else if (domIndex < BUFFER) {
      domIndex += total;
      render(false);
    }
  }

  track.addEventListener('transitionend', function (e) {
    if (e.propertyName === 'transform') settleLoop();
  });

  prevBtn.addEventListener('click', function () {
    domIndex -= 1;
    render(true);
  });

  nextBtn.addEventListener('click', function () {
    domIndex += 1;
    render(true);
  });

  window.addEventListener('resize', function () {
    render(false);
  });

  render(false);
})();
