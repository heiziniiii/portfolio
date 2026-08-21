(function () {
	var DATA = window.BANNERS || [];
	var GAP = 22;
	var MIN_CARD_W = 120;
	var MAX_CARD_W = 240;

	var carousel = document.querySelector('.banner-carousel');
	var viewport = document.querySelector('.banner-viewport');
	var track = document.getElementById('banner-track');
	var prevBtn = document.querySelector('.banner-nav-btn.prev');
	var nextBtn = document.querySelector('.banner-nav-btn.next');

	var cardW = 220, cardH = 0, slot = 0, viewCount = 3, viewportW = 0;
	var page = 0;
	var activeIndex = null;
	var items = [];
	var descEl = null;

	function buildDOM() {
		DATA.forEach(function (b, i) {
			var item = document.createElement('div');
			item.className = 'banner-item';
			item.innerHTML =
				'<div class="banner-item__card">' +
					'<div class="banner-item__thumb"><img src="' + b.image + '" alt="' + b.title + '" loading="lazy"></div>' +
				'</div>';
			item.addEventListener('click', function () { toggle(i); });
			track.appendChild(item);
			items.push(item);
		});

		descEl = document.createElement('div');
		descEl.className = 'banner-desc';
		descEl.innerHTML =
			'<button type="button" class="banner-desc__close" aria-label="닫기">&times;</button>' +
			'<span class="banner-desc__eyebrow">HOTEL AQUAPALACE</span>' +
			'<h3 class="banner-desc__title"></h3>' +
			'<div class="banner-desc__text"></div>' +
			'<div class="banner-desc__foot">60 &times; 180cm &middot; Photoshop, Illustrator</div>';
		track.appendChild(descEl);
		descEl.querySelector('.banner-desc__close').addEventListener('click', function (e) {
			e.stopPropagation();
			close();
		});
	}

	function computeMetrics() {
		var available = carousel.clientWidth - (46 + 18) * 2; // room minus the two nav buttons+gaps
		if (window.innerWidth <= 640) {
			viewCount = 2;
		} else if (window.innerWidth <= 960) {
			viewCount = 2;
		} else {
			viewCount = 3;
		}
		cardW = Math.floor((available - (viewCount - 1) * GAP) / viewCount);
		cardW = Math.max(MIN_CARD_W, Math.min(MAX_CARD_W, cardW));
		cardH = Math.round(cardW * (2126 / 709));
		slot = cardW + GAP;
		viewportW = viewCount * cardW + (viewCount - 1) * GAP;

		viewport.style.width = viewportW + 'px';
		viewport.style.height = cardH + 'px';
		track.style.height = cardH + 'px';

		items.forEach(function (item) {
			item.style.width = cardW + 'px';
		});
		descEl.style.width = (viewportW - slot) + 'px';
		descEl.style.height = cardH + 'px';

		var maxPage = Math.max(0, DATA.length - viewCount);
		page = Math.min(page, maxPage);
	}

	function render(animate) {
		var maxPage = Math.max(0, DATA.length - viewCount);

		items.forEach(function (item, i) {
			var card = item.querySelector('.banner-item__card');
			item.classList.remove('is-active');

			if (activeIndex === null) {
				var x = (i - page) * slot;
				item.style.transform = 'translateX(' + x + 'px)';
				item.style.opacity = '1';
				item.style.zIndex = '1';
			} else if (i === activeIndex) {
				item.style.transform = 'translateX(0px)';
				item.style.opacity = '1';
				item.style.zIndex = '3';
				item.classList.add('is-active');
			} else if (i < activeIndex) {
				item.style.transform = 'translateX(' + (-(viewportW + cardW)) + 'px)';
				item.style.opacity = '0';
				item.style.zIndex = '1';
			} else {
				item.style.transform = 'translateX(' + (viewportW + cardW) + 'px)';
				item.style.opacity = '0';
				item.style.zIndex = '1';
			}
		});

		if (activeIndex === null) {
			descEl.classList.remove('is-open');
			descEl.style.transform = 'translateX(' + slot + 'px)';
		} else {
			var b = DATA[activeIndex];
			descEl.querySelector('.banner-desc__title').textContent = b.title;
			descEl.querySelector('.banner-desc__text').innerHTML = b.descHTML || ('<p>' + b.desc + '</p>');
			descEl.style.transform = 'translateX(' + slot + 'px)';
			descEl.classList.add('is-open');
		}

		prevBtn.disabled = activeIndex !== null || page <= 0;
		nextBtn.disabled = activeIndex !== null || page >= maxPage;
	}

	function toggle(i) {
		activeIndex = (activeIndex === i) ? null : i;
		render(true);
	}
	function close() {
		activeIndex = null;
		render(true);
	}

	prevBtn.addEventListener('click', function () {
		if (activeIndex !== null) return;
		page = Math.max(0, page - 1);
		render(true);
	});
	nextBtn.addEventListener('click', function () {
		if (activeIndex !== null) return;
		var maxPage = Math.max(0, DATA.length - viewCount);
		page = Math.min(maxPage, page + 1);
		render(true);
	});

	var resizeTimer;
	window.addEventListener('resize', function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			computeMetrics();
			render(false);
		}, 120);
	});

	buildDOM();
	computeMetrics();
	render(false);

	/* scroll-to-top / back button, same pattern as every other guide page */
	var topBtn = document.querySelector('.top.fixed');
	if (topBtn) {
		topBtn.querySelector('a').addEventListener('click', function (e) {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
		window.addEventListener('scroll', function () {
			if (window.scrollY > 120) {
				topBtn.classList.add('show');
			} else {
				topBtn.classList.remove('show');
			}
		});
	}
})();
