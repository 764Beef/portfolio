/*cursor.js  —  Custom cursor behaviour*/

(function () {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });

  function animateRing() {
    const lerp = 0.12;
    ringX += (mouseX - ringX) * lerp;
    ringY += (mouseY - ringY) * lerp;

    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';

    requestAnimationFrame(animateRing);
  }

  animateRing();

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

  document.addEventListener('mousedown', () => {
    dot.style.transform  = 'translate(-50%, -50%) scale(0.7)';
    ring.style.transform = 'translate(-50%, -50%) scale(0.85)';
  });

  document.addEventListener('mouseup', () => {
    dot.style.transform  = 'translate(-50%, -50%) scale(1)';
    ring.style.transform = 'translate(-50%, -50%) scale(1)';
  });
})();
