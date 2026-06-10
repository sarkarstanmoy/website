/* ============================================================
   PiXLMe — main.js
   ============================================================ */

/* --- Promo banner: add body class so header shifts down --- */
(function () {
  if (document.getElementById('promo-banner')) {
    document.body.classList.add('has-promo-banner');
  }
})();

/* --- Sticky header on scroll --- */
document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('header');
  if (!header) return;
  let lastScrollY = window.scrollY;
  if (window.scrollY === 0) header.classList.add('sticky');
  window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;
    if (currentScrollY < lastScrollY) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
    lastScrollY = currentScrollY;
  });
});

/* --- Hamburger menu --- */
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  }
});

/* --- Scroll-reveal animation --- */
document.addEventListener('DOMContentLoaded', function () {
  const animated = document.querySelectorAll('.animate-on-scroll');
  function checkAnimation() {
    const trigger = window.innerHeight * 0.88;
    animated.forEach(function (el) {
      if (el.getBoundingClientRect().top < trigger) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', checkAnimation);
  checkAnimation();
});

/* --- New FAQ accordion (.faq-item / .faq-header) --- */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.faq-item').forEach(function (item) {
    const hdr = item.querySelector('.faq-header');
    if (!hdr) return;
    hdr.addEventListener('click', function () {
      const isOpen = item.classList.contains('active');
      /* close all */
      document.querySelectorAll('.faq-item.active').forEach(function (open) {
        open.classList.remove('active');
      });
      /* open clicked if it was closed */
      if (!isOpen) {
        item.classList.add('active');
        trackEvent('faq_open', { question: hdr.textContent.trim() });
      }
    });
  });
});

/* --- Legacy QA accordion (.qaAccordion / .qaaHeader) --- */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.qaAccordion').forEach(function (accordion) {
    const hdr = accordion.querySelector('.qaaHeader');
    if (!hdr) return;
    hdr.addEventListener('click', function () {
      accordion.classList.toggle('active');
      document.querySelectorAll('.qaAccordion').forEach(function (other) {
        if (other !== accordion) other.classList.remove('active');
      });
    });
  });
});

/* --- Tab navigation (legacy step-by-step tabs) --- */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.tab-link').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.tab-link').forEach(function (t) { t.classList.remove('active'); });
      document.querySelectorAll('.tab-content').forEach(function (c) { c.classList.remove('active'); });
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
});

/* --- Features tab navigation (legacy .tab-link1) --- */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.tab-link1').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.tab-link1').forEach(function (t) { t.classList.remove('active'); });
      document.querySelectorAll('.tab-content1').forEach(function (c) { c.classList.remove('active'); });
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.tab1);
      if (target) target.classList.add('active');
    });
  });
});

/* --- Carousel rotation (legacy contest images) --- */
(function () {
  const images = document.querySelectorAll('.carousel .image');
  if (!images.length) return;
  let index = 0;
  function rotateImages() {
    images.forEach(function (img) { img.classList.remove('left', 'center', 'right'); });
    index = (index + 1) % images.length;
    images[index].classList.add('center');
    images[(index + 1) % images.length].classList.add('right');
    images[(index + 2) % images.length].classList.add('left');
  }
  setInterval(rotateImages, 3000);
})();

/* --- Smooth scroll for in-page anchor links --- */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = -80;
      const top = target.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
});

/* ============================================================
   Analytics event tracking
   Fires window.pixlmeAnalytics(event, props) if defined,
   and logs to console in development.
   ============================================================ */
function trackEvent(event, props) {
  props = props || {};
  if (typeof window.pixlmeAnalytics === 'function') {
    window.pixlmeAnalytics(event, props);
  }
  if (window.gtag) {
    window.gtag('event', event, props);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  /* Track all [data-analytics] clicks */
  document.addEventListener('click', function (e) {
    const el = e.target.closest('[data-analytics]');
    if (!el) return;
    const key = el.getAttribute('data-analytics');
    const eventMap = {
      'banner-cta':               'banner_cta_click',
      'hero-start-free-trial':    'homepage_start_free_trial',
      'hero-watch-demo':          'homepage_watch_demo',
      'hiw-start-free-trial':     'homepage_start_free_trial',
      'pricing-start-free-trial': 'homepage_start_free_trial',
      'home-learn-artist-accounts': 'homepage_artist_learn_more',
      'pricing-hero-start-free-trial': 'pricing_start_free_trial',
      'pricing-final-cta':        'pricing_start_free_trial',
      'artist-join-as-artist':    'artist_join_click',
      'artist-see-guidelines':    'artist_guidelines_click',
      'artist-download-guidelines': 'artist_guidelines_click',
      'nav-home':       'nav_click',
      'nav-how-it-works': 'nav_click',
      'nav-for-artists':  'nav_click',
      'nav-pricing':      'nav_click',
      'nav-about':        'nav_click',
      'nav-sign-in':      'nav_click',
      'nav-start-free-trial': 'nav_start_free_trial',
    };
    const eventName = eventMap[key] || 'click';
    trackEvent(eventName, { label: key, page: window.location.pathname });
  });
});

/* --- App Store Modal --- */
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('appStoreModal');
  const closeBtn = document.getElementById('closeAppStoreModal');

  if (!modal) return;

  // Find all "Start Free Trial" buttons/links
  function setupStartFreeTrialButtons() {
    // Selectors for various "Start Free Trial" buttons/links
    const selectors = [
      'a[href="https://app.pixlme.com/register"]',
      'button:has(a[href="https://app.pixlme.com/register"])',
      '.signup.cta-primary',
      '.btn-primary[href="https://app.pixlme.com/register"]',
      '[data-analytics="nav-start-free-trial"]'
    ];

    document.addEventListener('click', function (e) {
      const target = e.target.closest(selectors.join(', '));
      if (!target) return;

      e.preventDefault();
      showAppStoreModal();
      
      // Track the event
      trackEvent('start_free_trial_modal_opened', { 
        page: window.location.pathname 
      });
    }, true); // Use capture phase
  }

  function showAppStoreModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAppStoreModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeAppStoreModal);
  }

  // Close on overlay click (but not on modal content)
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeAppStoreModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeAppStoreModal();
    }
  });

  setupStartFreeTrialButtons();
});
