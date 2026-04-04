/* ─────────────────────────────────────────
   progress.js  —  Progress bar animations
   Reads data-width on each .progress-fill
   and animates to that value when the
   parent .card enters the viewport.
───────────────────────────────────────── */

(function () {

  const THRESHOLD = 0.2;   // 20% of card visible before triggering
  const DELAY_MS  = 350;   // small delay so card reveal finishes first

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const fills = entry.target.querySelectorAll('.progress-fill');

      fills.forEach((fill) => {
        const target = fill.dataset.width;
        if (!target) return;

        setTimeout(() => {
          fill.style.width = target + '%';
        }, DELAY_MS);
      });

      // Stop watching once animated
      cardObserver.unobserve(entry.target);
    });
  }, { threshold: THRESHOLD });

  document.querySelectorAll('.card').forEach((card) => {
    cardObserver.observe(card);
  });

})();
