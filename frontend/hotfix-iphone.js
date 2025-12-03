document.addEventListener('DOMContentLoaded', () => {
  let lastScrollY = window.scrollY;
  const navbar = document.querySelector('header, nav, .navbar');
  
  if(navbar) {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 0) return;
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        navbar.classList.add('nav-hidden');
      } else {
        navbar.classList.remove('nav-hidden');
      }
      lastScrollY = currentScrollY;
    }, { passive: true });
  }

  document.addEventListener('click', (e) => {
    const menuContent = document.querySelector('[class*="menu-content"], ul');
    const burger = document.querySelector('[class*="burger"], [class*="toggle"]');
    if (menuContent && window.getComputedStyle(menuContent).position === 'fixed') {
       if (!menuContent.contains(e.target) && (!burger || !burger.contains(e.target))) {
         menuContent.classList.remove('show', 'open', 'active');
       }
    }
  });
});
