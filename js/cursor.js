/* ─────────────────────────────────────────
   cursor.js  —  Custom cursor behaviour
   Dot snaps instantly; ring lags behind.
───────────────────────────────────────── */

(function () {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');

  // Current mouse position
  let mouseX = 0, mouseY = 0;
  // Ring's interpolated position
  let ringX  = 0, ringY  = 0;

  // ── Track mouse ──
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows instantly
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Hide cursor when it leaves the window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });

  // ── Animate ring with lerp ──
  function animateRing() {
    // Lerp factor — lower = laggier
    const lerp = 0.12;
    ringX += (mouseX - ringX) * lerp;
    ringY += (mouseY - ringY) * lerp;

    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';

    requestAnimationFrame(animateRing);
  }

  animateRing();

  // ── Expand ring on interactive elements ──
  const hoverTargets = [
    'a', 'button',
    '.card', '.project-card',
    '.skill-item', '.stat-card',
    '.project-action-btn',
    '.nav-hamburger',
  ].join(', ');

  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });

  // ── Compress dot on click ──
  document.addEventListener('mousedown', () => {
    dot.style.transform  = 'translate(-50%, -50%) scale(0.7)';
    ring.style.transform = 'translate(-50%, -50%) scale(0.85)';
  });

  document.addEventListener('mouseup', () => {
    dot.style.transform  = 'translate(-50%, -50%) scale(1)';
    ring.style.transform = 'translate(-50%, -50%) scale(1)';
  });
})();
