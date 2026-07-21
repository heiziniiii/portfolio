(function () {
  var modal = document.getElementById('poster-modal');
  var modalImg = document.getElementById('poster-modal-img');
  var closeBtn = modal.querySelector('.poster-modal__close');
  var backdrop = modal.querySelector('.poster-modal__backdrop');
  var track = document.querySelector('.slider-track');

  function openModal(src, alt) {
    modalImg.src = src;
    modalImg.alt = alt || '';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  track.addEventListener('click', function (e) {
    var img = e.target.closest('img');
    if (!img) return;
    openModal(img.src, img.alt);
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
})();
