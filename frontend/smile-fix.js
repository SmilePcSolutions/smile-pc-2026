document.addEventListener('DOMContentLoaded', () => {
  let lastY = window.scrollY; const nav = document.querySelector('header, nav, .navbar');
  if(nav) { window.addEventListener('scroll', () => { const y = window.scrollY; if (y < 0) return; if (y > lastY && y > 60) nav.classList.add('nav-hidden'); else nav.classList.remove('nav-hidden'); lastY = y; }, { passive: true }); }
  document.addEventListener('click', (e) => { const m = document.querySelector('[class*=\"menu-content\"], ul'); const b = document.querySelector('[class*=\"burger\"]'); if (m && getComputedStyle(m).position === 'fixed' && !m.contains(e.target) && (!b || !b.contains(e.target))) m.classList.remove('show', 'open', 'active'); });
});
