/* 
   scroll.js
*/

(function () {

  const THRESHOLD = 0.12;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: THRESHOLD });

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });

})();
