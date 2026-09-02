/* =============================================
   Autonex Stacking Scroll — Dynamic Header Fix
   ============================================= */
(function() {
  'use strict';

  function getHeaderHeight() {
    // Impulse uses .header-sticky-wrapper
    var stickyWrapper = document.querySelector('.header-sticky-wrapper');
    var announcementBar = document.querySelector('.announcement-bar--sticky, .announcement-bar');
    var toolbar = document.querySelector('.toolbar');

    var height = 0;

    if (toolbar && toolbar.offsetParent !== null) {
      height += toolbar.offsetHeight;
    }
    if (announcementBar && announcementBar.offsetParent !== null) {
      height += announcementBar.offsetHeight;
    }
    if (stickyWrapper && stickyWrapper.offsetParent !== null) {
      height += stickyWrapper.offsetHeight;
    }

    // Fallback
    if (height === 0) {
      var header = document.querySelector('header, .site-header');
      if (header) height = header.offsetHeight;
    }

    return height || 98;
  }

  function initStacking() {
    var frames = document.querySelectorAll('.atx-sticky-frame');
    var blocks = document.querySelectorAll('.atx-scroll-block');
    if (!frames.length) return;

    var headerH = getHeaderHeight();
    var viewportH = window.innerHeight;
    var sectionH = viewportH - headerH;

    frames.forEach(function(frame, i) {
      frame.style.top = headerH + 'px';
      frame.style.height = sectionH + 'px';
      frame.style.zIndex = (i + 1) * 10;

      var scene = frame.querySelector('.atx-scene');
      if (scene) {
        scene.style.height = sectionH + 'px';
      }
    });

    // Fix header z-index conflict
    // Impulse header z-index is 28 — our sections start at 10,20,30...
    // We need sections BELOW header but stacking on each other
    // Solution: wrap sections in a lower z-index context
    var headerWrapper = document.querySelector('.header-sticky-wrapper');
    if (headerWrapper) {
      // Keep header on top always
      headerWrapper.style.zIndex = '1000';
    }
  }

  function onResize() {
    clearTimeout(window._atxResizeTimer);
    window._atxResizeTimer = setTimeout(initStacking, 150);
  }

  // Init on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStacking);
  } else {
    initStacking();
  }

  // Also run after full page load (fonts, images)
  window.addEventListener('load', initStacking);

  // Rerun on resize
  window.addEventListener('resize', onResize, { passive: true });

})();
