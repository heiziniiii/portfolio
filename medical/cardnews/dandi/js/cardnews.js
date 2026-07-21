(function () {
  var campaigns = window.CAMPAIGNS || [];
  var grid = document.getElementById('campaign-grid');

  campaigns.forEach(function (c, idx) {
    var card = document.createElement('div');
    card.className = 'campaign-card';
    card.innerHTML =
      '<div class="campaign-card__thumb"><img src="' + c.images[0] + '" alt="' + c.title + '" loading="lazy"></div>' +
      '<div class="campaign-card__meta">' +
        '<div class="campaign-card__title">' + c.title + '<span class="campaign-card__sub">' + c.images.length + '장</span></div>' +
      '</div>';
    card.addEventListener('click', function () { openModal(idx); });
    grid.appendChild(card);
  });

  var modal = document.getElementById('cn-modal');
  var track = modal.querySelector('.cn-slide-track');
  var viewport = modal.querySelector('.cn-slide-viewport');
  var prevBtn = modal.querySelector('.cn-slide-btn.prev');
  var nextBtn = modal.querySelector('.cn-slide-btn.next');
  var counter = modal.querySelector('.cn-slide-counter');
  var closeBtn = modal.querySelector('.cn-modal__close');
  var backdrop = modal.querySelector('.cn-modal__backdrop');

  var total = 0;
  var domIndex = 0;
  var count = visibleCount();

  function visibleCount() {
    return window.innerWidth <= 699 ? 1 : 2;
  }

  function buffer() {
    return Math.min(count, total || count);
  }

  function buildSlides(images) {
    track.innerHTML = '';
    images.forEach(function (src) {
      var slide = document.createElement('div');
      slide.className = 'cn-slide';
      var img = document.createElement('img');
      img.src = src;
      slide.appendChild(img);
      track.appendChild(slide);
    });
    total = images.length;
    count = visibleCount();

    if (total > 1) {
      var buf = buffer();
      var real = Array.prototype.slice.call(track.children);
      var fragStart = document.createDocumentFragment();
      real.slice(total - buf).forEach(function (n) {
        var c = n.cloneNode(true);
        c.setAttribute('aria-hidden', 'true');
        fragStart.appendChild(c);
      });
      track.insertBefore(fragStart, track.firstChild);

      var fragEnd = document.createDocumentFragment();
      real.slice(0, buf).forEach(function (n) {
        var c = n.cloneNode(true);
        c.setAttribute('aria-hidden', 'true');
        fragEnd.appendChild(c);
      });
      track.appendChild(fragEnd);

      domIndex = buf;
    } else {
      domIndex = 0;
    }

    prevBtn.style.display = total > 1 ? '' : 'none';
    nextBtn.style.display = total > 1 ? '' : 'none';
  }

  function render(animate) {
    if (!animate) track.style.transition = 'none';
    var slideWidth = viewport.clientWidth / count;
    track.style.transform = 'translateX(-' + (domIndex * slideWidth) + 'px)';
    if (!animate) {
      track.getBoundingClientRect(); // force reflow before re-enabling transition
      track.style.transition = '';
    }
    var buf = buffer();
    var realIndex = total > 1 ? ((domIndex - buf) % total + total) % total : 0;
    if (counter) counter.textContent = (realIndex + 1) + ' / ' + total;
  }

  function settleLoop() {
    if (total <= 1) return;
    var buf = buffer();
    if (domIndex >= buf + total) {
      domIndex -= total;
      render(false);
    } else if (domIndex < buf) {
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

  function openModal(idx) {
    var c = campaigns[idx];
    buildSlides(c.images);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    render(false);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    track.innerHTML = '';
  }

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  window.addEventListener('resize', function () {
    if (modal.classList.contains('is-open')) {
      count = visibleCount();
      render(false);
    }
  });
})();
