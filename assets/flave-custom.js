/* ================================================
   FLAVE — Premium Brand JavaScript
   ================================================ */
(function () {
  'use strict';

  /* ── 1. SMART SCROLL HEADER ── */
  (function () {
    var header = document.querySelector('.site-header');
    var stickyWrapper = document.querySelector('.header-sticky-wrapper');
    if (!header) return;

    var lastScroll = 0;
    var scrollThreshold = 100;
    var ticking = false;

    function updateHeader() {
      var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      // Add shadow when scrolled
      if (currentScroll > 20) {
        header.classList.add('header--scrolled');
        if (stickyWrapper) stickyWrapper.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
        header.classList.remove('header--hidden');
        if (stickyWrapper) {
          stickyWrapper.classList.remove('header--scrolled');
          stickyWrapper.classList.remove('header--hidden');
        }
        lastScroll = 0;
        ticking = false;
        return;
      }

      // Hide on scroll down, show on scroll up
      if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        header.classList.add('header--hidden');
        if (stickyWrapper) stickyWrapper.classList.add('header--hidden');
      } else if (currentScroll < lastScroll) {
        header.classList.remove('header--hidden');
        if (stickyWrapper) stickyWrapper.classList.remove('header--hidden');
      }

      lastScroll = currentScroll <= 0 ? 0 : currentScroll;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  })();

  /* ── 2. SCROLL REVEAL ANIMATIONS ── */
  (function () {
    if (!window.IntersectionObserver) return;

    var selectors = [
      '.slideshow__text-content',
      '.rich-text__heading',
      '.rich-text__text',
      '.background-image-text__text-wrapper',
      '.grid-product',
      '.testimonials-wrapper',
      '.section-header',
      '.featured-collection .grid__item',
      '.index-section .rte',
    ].join(', ');

    var els = document.querySelectorAll(selectors);
    if (!els.length) return;

    // Set initial hidden state
    els.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) ' + (i % 4 * 0.1) + 's, transform 0.8s cubic-bezier(0.16,1,0.3,1) ' + (i % 4 * 0.1) + 's';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    els.forEach(function (el) { observer.observe(el); });
  })();

  /* ── 3. PRODUCT IMAGE HOVER ZOOM ── */
  (function () {
    var wrappers = document.querySelectorAll('.grid-product__image-wrapper');
    wrappers.forEach(function (wrapper) {
      var img = wrapper.querySelector('img');
      if (!img) return;
      img.style.transition = 'transform 0.65s cubic-bezier(0.16,1,0.3,1)';
      wrapper.style.overflow = 'hidden';
      wrapper.addEventListener('mouseenter', function () {
        img.style.transform = 'scale(1.06)';
      });
      wrapper.addEventListener('mouseleave', function () {
        img.style.transform = 'scale(1)';
      });
    });
  })();

  /* ── 4. ANNOUNCEMENT BAR TICKER PAUSE ON HOVER ── */
  (function () {
    var ticker = document.querySelector('.announcement-bar__ticker');
    if (!ticker) return;
    ticker.addEventListener('mouseenter', function () {
      ticker.style.animationPlayState = 'paused';
    });
    ticker.addEventListener('mouseleave', function () {
      ticker.style.animationPlayState = 'running';
    });
  })();

  /* ── 5. SMOOTH SECTION ENTRY ON PAGE LOAD ── */
  (function () {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    window.addEventListener('load', function () {
      document.body.style.opacity = '1';
    });
    // Fallback if load is slow
    setTimeout(function () {
      document.body.style.opacity = '1';
    }, 800);
  })();

})();
