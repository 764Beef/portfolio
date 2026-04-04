(function () {
  const RATE_LIMIT_MS = 60000;
  const STORAGE_KEY = 'contact_last_sent';

  const form = document.getElementById('contact-form');
  const btn = document.getElementById('contact-btn');
  const status = document.getElementById('form-status');

  function showStatus(msg, ok) {
    status.style.display = 'block';
    status.style.color = ok ? '#22c55e' : '#ef4444';
    status.textContent = msg;
  }

  function resetBtn() {
    btn.disabled = false;
    btn.innerHTML = 'Send Message <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
  }

  function isRateLimited() {
    const last = localStorage.getItem(STORAGE_KEY);
    if (!last) return false;
    return Date.now() - parseInt(last) < RATE_LIMIT_MS;
  }

  function getRemainingSeconds() {
    const last = localStorage.getItem(STORAGE_KEY);
    if (!last) return 0;
    return Math.ceil((RATE_LIMIT_MS - (Date.now() - parseInt(last))) / 1000);
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (isRateLimited()) {
      showStatus(`✗ Please wait ${getRemainingSeconds()}s before sending another message.`, false);
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending...';
    status.style.display = 'none';

    try {
      const res = await fetch('https://formspree.io/f/mwvwwkaj', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
        showStatus("✓ Message sent — I'll get back to you soon!", true);
        form.reset();
      } else {
        const json = await res.json();
        throw new Error(json.errors ? json.errors.map(e => e.message).join(', ') : 'Something went wrong.');
      }
    } catch (err) {
      showStatus('✗ ' + err.message, false);
    }

    resetBtn();
  });
})();