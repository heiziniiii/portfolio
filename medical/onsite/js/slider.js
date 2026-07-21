(function () {
  var viewport = document.querySelector('.slider-viewport');
  var track = document.querySelector('.slider-track');
  var prevBtn = document.querySelector('.slider-btn.prev');
  var nextBtn = document.querySelector('.slider-btn.next');
  var counter = document.querySelector('.slider-counter');

  var realSlides = Array.prototype.slice.call(track.children);
  var total = realSlides.length;
  var BUFFER = 3; // >= max visible count, so the loop always has a clone to slide into

  // seamless infinite loop: [clones of last BUFFER] + [real slides] + [clones of first BUFFER]
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
  var count = visibleCount();

  function visibleCount() {
    var w = window.innerWidth;
    if (w <= 699) return 1;
    if (w <= 999) return 2;
    return 3;
  }

  function slideWidth() {
    return viewport.clientWidth / count;
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
    count = visibleCount();
    render(false);
  });

  render(false);
})();
