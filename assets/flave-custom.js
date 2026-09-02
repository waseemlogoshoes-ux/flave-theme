/* ================================================
   FLAVE — Premium Brand JavaScript
   Smart scroll header + Animations + Account drawer
   ================================================ */
(function () {
  'use strict';

  /* ── 1. SMART SCROLL HEADER ── */
  (function () {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var lastScroll = 0;
    var scrollThreshold = 80;
    var ticking = false;

    function updateHeader() {
      var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > scrollThreshold) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
        header.classList.remove('header--hidden');
        lastScroll = currentScroll;
        return;
      }

      if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        // Scrolling DOWN → hide
        header.classList.add('header--hidden');
      } else if (currentScroll < lastScroll) {
        // Scrolling UP → show
        header.classList.remove('header--hidden');
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
    var revealEls = document.querySelectorAll(
      '.slideshow__text-content, ' +
      '.rich-text__heading, .rich-text__text, ' +
      '.background-image-text__text-wrapper, ' +
      '.grid-product, ' +
      '.testimonials-wrapper, ' +
      '.section-header, ' +
      '.index-section > .page-width > *'
    );

    if (!revealEls.length) return;

    revealEls.forEach(function (el) {
      el.classList.add('flave-reveal');
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  })();

  /* ── 3. ACCOUNT DRAWER (replaces popup) ── */
  (function () {
    // Create account drawer HTML
    var drawerHTML = '<div class="flave-account-drawer__overlay" id="flaveAccountOverlay"></div>' +
      '<div class="flave-account-drawer" id="flaveAccountDrawer" role="dialog" aria-label="Account">' +
        '<div class="flave-account-drawer__header">' +
          '<span class="flave-account-drawer__title">My Account</span>' +
          '<button class="flave-account-drawer__close" id="flaveAccountClose" aria-label="Close">&#x2715;</button>' +
        '</div>' +
        '<div class="flave-account-drawer__body">' +
          '<nav>' +
            '<a href="/account/login" class="flave-account-nav__item">Log In</a>' +
            '<a href="/account/register" class="flave-account-nav__item">Create Account</a>' +
            '<a href="/account" class="flave-account-nav__item">My Orders</a>' +
            '<a href="/account/addresses" class="flave-account-nav__item">Addresses</a>' +
          '</nav>' +
        '</div>' +
      '</div>';

    document.body.insertAdjacentHTML('beforeend', drawerHTML);

    var drawer = document.getElementById('flaveAccountDrawer');
    var overlay = document.getElementById('flaveAccountOverlay');
    var closeBtn = document.getElementById('flaveAccountClose');

    function openAccountDrawer() {
      drawer.classList.add('is-open');
      overlay.classList.add('is-visible');
      document.body.style.overflow = 'hidden';
    }

    function closeAccountDrawer() {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-visible');
      document.body.style.overflow = '';
    }

    // Intercept account icon clicks
    var accountLinks = document.querySelectorAll(
      'a[href="/account"], a[href="/account/login"], .site-header__icon--account, .js-account-icon'
    );
    accountLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openAccountDrawer();
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeAccountDrawer);
    if (overlay) overlay.addEventListener('click', closeAccountDrawer);

    // ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeAccountDrawer();
      }
    });
  })();

  /* ── 4. DRAWER OVERLAY ENHANCEMENT ── */
  (function () {
    // Add flave-style overlay to nav drawer
    var navDrawer = document.getElementById('NavDrawer');
    if (!navDrawer) return;

    var overlay = document.createElement('div');
    overlay.className = 'flave-nav-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(44,32,23,0.45);z-index:8;opacity:0;pointer-events:none;transition:opacity 0.38s ease;';
    document.body.appendChild(overlay);

    // Watch for drawer open class
    var observer = new MutationObserver(function () {
      if (document.body.classList.contains('js-drawer-open--nav') ||
          document.body.classList.contains('js-drawer-open')) {
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
      } else {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
      }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    overlay.addEventListener('click', function () {
      // Close nav drawer
      var closeBtn = document.querySelector('.js-drawer-close');
      if (closeBtn) closeBtn.click();
    });
  })();

  /* ── 5. PRODUCT IMAGE HOVER ZOOM ── */
  (function () {
    var productImages = document.querySelectorAll('.grid-product__image-wrapper');
    productImages.forEach(function (wrapper) {
      var img = wrapper.querySelector('img');
      if (!img) return;
      img.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
      wrapper.addEventListener('mouseenter', function () {
        img.style.transform = 'scale(1.05)';
      });
      wrapper.addEventListener('mouseleave', function () {
        img.style.transform = 'scale(1)';
      });
    });
  })();

  /* ── 6. SECTION STAGGER ANIMATIONS ── */
  (function () {
    var gridItems = document.querySelectorAll('.grid-product');
    gridItems.forEach(function (item, i) {
      item.style.transitionDelay = (i % 4 * 0.1) + 's';
    });
  })();

})();
