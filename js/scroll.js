/* ─────────────────────────────────────────
   scroll.js  —  Scroll-reveal animations
   Watches .reveal elements and adds
   .visible when they enter the viewport.
───────────────────────────────────────── */

(function () {

  // Threshold: how much of the element must be visible before triggering
  const THRESHOLD = 0.12;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Once revealed, no need to keep watching
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: THRESHOLD });

  // Observe every element with the .reveal class
  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });

})();
