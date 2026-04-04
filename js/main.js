/* ─────────────────────────────────────────
   main.js  —  Entry point & misc features
───────────────────────────────────────── */

(function () {

  // ── Update footer copyright year automatically ──
  const yearEl = document.querySelector('footer span:first-child');
  if (yearEl) {
    const year = new Date().getFullYear();
    yearEl.textContent = `© ${year} YourName`;
  }

  // ── Smooth scroll for anchor links ──
  const NAV_HEIGHT = 80;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ── Stat counter animation ──
  function animateCounter(el, endValue, suffix) {
    const duration = 1200;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.floor(eased * endValue);

      el.textContent = current + suffix;

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.querySelectorAll('.stat-number').forEach((el) => {
        const text = el.textContent.trim();

        if (text === '∞') return;

        const match = text.match(/^(\d+)(.*)$/);
        if (!match) return;

        const endVal = parseInt(match[1], 10);
        const suffix = match[2] || '';

        animateCounter(el, endVal, suffix);
      });

      counterObserver.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.about-stats');
  if (statsSection) counterObserver.observe(statsSection);

  // ── Typing effect for hero subtitle ──
  const heroSub = document.querySelector('.hero-sub');
  if (heroSub) {
    const originalText = heroSub.textContent;
    heroSub.textContent = '';
    let index = 0;

    setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (index < originalText.length) {
          heroSub.textContent += originalText[index];
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 28);
    }, 700);
  }

  // ── Tilt effect on project cards ──
  document.querySelectorAll('.project-card, .card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect  = card.getBoundingClientRect();
      const cx    = rect.left + rect.width  / 2;
      const cy    = rect.top  + rect.height / 2;
      const dx    = (e.clientX - cx) / (rect.width  / 2);
      const dy    = (e.clientY - cy) / (rect.height / 2);
      const tiltX = dy * -4;
      const tiltY = dx *  4;

      card.style.transform = `translateY(-3px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.35s var(--ease), border-color 0.35s var(--ease), background 0.35s var(--ease)';
    });
  });

  // ── Contact form handler ──
  async function handleContactSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.contact-submit');
    const originalHTML = btn.innerHTML;

    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const response = await fetch(e.target.action, {
        method: 'POST',
        body: new FormData(e.target),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        e.target.reset();
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      } else {
        throw new Error('Failed');
      }
    } catch {
      btn.textContent = '✗ Failed — try emailing directly';
      btn.style.background = 'linear-gradient(135deg, #ef4444, #b91c1c)';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }
  }

  // Expose to global scope for inline onsubmit
  window.handleContactSubmit = handleContactSubmit;

})();