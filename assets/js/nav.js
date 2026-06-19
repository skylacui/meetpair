(function () {
  'use strict';

  function currentPage() {
    var file = window.location.pathname.split('/').pop();
    if (!file || file === 'index.html') return 'home';
    return file.replace('.html', '');
  }

  function active(page) {
    return currentPage() === page ? ' aria-current="page"' : '';
  }

  function buildNav() {
    return `
      <nav class="site-nav" aria-label="Main navigation">
        <div class="nav-left">
          <a href="index.html" class="nav-logo-link">
            <img src="assets/images/pair-logo.png" alt="PAIR — home" class="nav-logo">
          </a>
          <div class="nav-dropdown">
            <a href="index.html" class="nav-dropdown-trigger">
              PAIR '26 <span class="nav-caret" aria-hidden="true"></span>
            </a>
            <div class="nav-dropdown-menu">
              <a href="mentees.html"${active('mentees')}>For Mentees</a>
              <a href="mentors.html"${active('mentors')}>For Mentors</a>
            </div>
          </div>
        </div>
        <div class="nav-right">
          <a href="about.html"${active('about')}>About</a>
          <a href="archive.html"${active('archive')}>Archive</a>
        </div>
      </nav>`;
  }

  // <p class="footer-text">Questions?</p>
  // <a href="mailto:cuiskyla@gmail.com?subject=PAIR%20%2726!!!" class="btn-small">Contact us</a>
  function buildFooter() {
    return `
      <div class="footer-inner">
        <p style="margin-bottom: 3px;" class="hero-sub">Questions?</p>
        <a style="margin-bottom: 3px;" href="mailto:cuiskyla@gmail.com?subject=PAIR%20%2726!!!" class="hero-sub footer-text">Contact us</a>
      </div>`;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var hdr = document.getElementById('site-header');
    if (hdr) hdr.innerHTML = buildNav();

    var ftr = document.getElementById('site-footer');
    if (ftr) ftr.innerHTML = buildFooter();

    // Close dropdown when Escape is pressed while focus is inside it
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var focused = document.activeElement;
        if (focused && focused.closest('.nav-dropdown')) {
          var trigger = document.querySelector('.nav-dropdown-trigger');
          if (trigger) trigger.focus();
        }
      }
    });
  });
})();
