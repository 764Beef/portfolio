/* 
   progress.js
*/

(function () {

  const THRESHOLD = 0.2;   
  const DELAY_MS  = 350;   

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

      cardObserver.unobserve(entry.target);
    });
  }, { threshold: THRESHOLD });

  document.querySelectorAll('.card').forEach((card) => {
    cardObserver.observe(card);
  });

})();
