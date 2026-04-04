/*
nav.js  
*/

(function () {
  const nav           = document.getElementById('nav');
  const hamburger     = document.getElementById('navHamburger');
  const mobileMenu    = document.getElementById('mobileMenu');
  const navLinks      = document.querySelectorAll('.nav-links a');
  const mobileLinks   = document.querySelectorAll('.mobile-menu a');
  const sections      = document.querySelectorAll('section[id], div[id="home"]');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    highlightActiveLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  function highlightActiveLink() {
    let current = '';

    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  function toggleMenu() {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();
